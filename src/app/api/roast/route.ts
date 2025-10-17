// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const { username } = await req.json();
//     if (!username) return NextResponse.json({ roast: "Missing username." });

//     // Fetch user profile
//     const userRes = await fetch(`https://api.github.com/users/${username}`);
//     if (!userRes.ok) return NextResponse.json({ roast: "User not found 😭" });
//     const user = await userRes.json();
//     console.log("user:", user);

//     // Fetch repos
//     const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=50`);
//     const repos = await repoRes.json();

//     const repoSummaries = repos
//       .slice(0, 5)
//       .map((r: any) => `${r.name} (${r.stargazers_count}⭐, ${r.language || "no language"})`)
//       .join("\n");

//     const prompt = `
// You are a sarcastic but friendly AI who roasts developers.
// Here’s data for a GitHub user named "${user.login}":

// Bio: ${user.bio || "No bio"}
// Followers: ${user.followers}
// Following: ${user.following}
// Public repos: ${user.public_repos}
// Top repos:
// ${repoSummaries}

// Now roast this developer in a fun, witty way (under 5 lines).
// Be humorous but not rude. Mention their coding or GitHub habits if possible.
// `;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//     const result = await model.generateContent(prompt);
//     const roast = result.response.text();

//     return NextResponse.json({ roast });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ roast: "Couldn't roast this user right now 🔥" });
//   }
// }



import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { username } = await req.json()
    if (!username) return NextResponse.json({ roast: "Missing username." })

    // Fetch GitHub user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`)
    if (!userRes.ok) return NextResponse.json({ roast: "User not found 😭" })
    const user = await userRes.json()

    // Fetch public repos
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`)
    const repos = await repoRes.json()

    if (!Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json({ roast: "No repos found — nothing to roast 😅" })
    }

    // Prepare top repos summary
    const repoSummaries = repos
      .slice(0, 5)
      .map((r: any) => `${r.name} (${r.stargazers_count}⭐, ${r.language || "no language"})`)
      .join("\n")

    // Fetch recent commits for top repos
    const allCommits: string[] = []
    for (const repo of repos.slice(0, 3)) {
      try {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=10`
        )
        if (commitsRes.ok) {
          const commits = await commitsRes.json()
          commits.forEach((c: any) => {
            if (c?.commit?.message) allCommits.push(c.commit.message)
          })
        }
      } catch (err) {
        console.warn(`Skipping commits for ${repo.name}`)
      }
    }

    const commitMessages =
      allCommits.length > 0
        ? allCommits.slice(0, 40).join("\n")
        : "No recent commits found."

    // ---- 🔥 Gemini Prompt ----
    const prompt = `
You are a sarcastic but friendly AI who roasts developers using their GitHub activity.

Here’s the data for the user "${user.login}":

Bio: ${user.bio || "No bio"}
Followers: ${user.followers}
Following: ${user.following}
Public repos: ${user.public_repos}

Top repos:
${repoSummaries}

Recent commit messages:
${commitMessages}

Now roast this developer in 4-6 witty lines.
Mention their coding or GitHub habits based on commits and repos if possible.
Be funny, clever, and a little savage — but not mean.
Avoid generic compliments or apologies.
`

    // Generate roast
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const result = await model.generateContent(prompt)
    const roast = result.response.text()

    return NextResponse.json({ roast })
  } catch (error) {
    console.error("Error generating roast:", error)
    return NextResponse.json({ roast: "Couldn't roast this user right now 🔥" })
  }
}
