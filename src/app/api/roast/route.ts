import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    if (!username) return NextResponse.json({ roast: "Missing username." });

    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) return NextResponse.json({ roast: "User not found 😭" });
    const user = await userRes.json();

    // Fetch repos
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=50`);
    const repos = await repoRes.json();

    const repoSummaries = repos
      .slice(0, 5)
      .map((r: any) => `${r.name} (${r.stargazers_count}⭐, ${r.language || "no language"})`)
      .join("\n");

    const prompt = `
You are a sarcastic but friendly AI who roasts developers.
Here’s data for a GitHub user named "${user.login}":

Bio: ${user.bio || "No bio"}
Followers: ${user.followers}
Following: ${user.following}
Public repos: ${user.public_repos}
Top repos:
${repoSummaries}

Now roast this developer in a fun, witty way (under 5 lines).
Be humorous but not rude. Mention their coding or GitHub habits if possible.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const roast = result.response.text();

    return NextResponse.json({ roast });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ roast: "Couldn't roast this user right now 🔥" });
  }
}
