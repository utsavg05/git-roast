// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [username, setUsername] = useState("");
//   const [roast, setRoast] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRoast = async () => {
//     if (!username) return;
//     setLoading(true);
//     setRoast("");

//     try {
//       const res = await fetch("/api/roast", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username }),
//       });
//       const data = await res.json();
//       setRoast(data.roast);
//     } catch {
//       setRoast("🔥 Something went wrong! Try again later.");
//     }
//     setLoading(false);
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 to-orange-500 text-center p-6">
//       <h1 className="text-4xl font-bold mb-2">GitRoast 🔥</h1>
//       <p className="text-gray-600 mb-4">
//         Enter your GitHub username — and face the roast you deserve 😈
//       </p>

//       <div className="flex gap-2 w-full max-w-md">
//         <input
//           type="text"
//           placeholder="e.g. utsavgpta"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <button
//           onClick={handleRoast}
//           disabled={loading}
//           className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition disabled:opacity-70"
//         >
//           {loading ? "Cooking..." : "Roast Me 🔥"}
//         </button>
//       </div>

//       {roast && (
//         <div className="mt-6 p-4 bg-white text-black shadow rounded-xl border text-lg max-w-md animate-fade-in">
//           {roast}
//         </div>
//       )}
//     </main>
//   );
// }




"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"
import { ThreeDots } from "react-loader-spinner"

export default function GitRoastPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [roast, setRoast] = useState<string | null>(null)

  const handleRoast = async () => {
    if (!username.trim()) return
    setIsLoading(true)
    setRoast(null)

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      const data = await res.json()
      setRoast(data.roast)
    } catch (error) {
      console.error(error)
      setRoast("Something went wrong roasting this developer 💀")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute top-10 right-10 w-96 h-96" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section */}
        <div className="w-full max-w-2xl text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-mono">
            Get Roasted by Your Own Commits 🔥
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Enter your GitHub username and let AI judge your contribution habits.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Input
              type="text"
              placeholder="Enter your GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRoast()}
              className="sm:w-64 h-12 px-4 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono text-sm"
            />
            <Button
              onClick={handleRoast}
              disabled={isLoading || !username.trim()}
              className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white font-mono font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Cooking</span>
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                  />
                </div>
              ) : (
                "Roast Me"
              )}
            </Button>
          </div>
        </div>
        {/* {isLoading && <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />} */}

        {/* Roast Result Section */}
        {roast && (
          <div className="w-full max-w-2xl mb-12">
            <Card className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-mono font-bold text-slate-900 mb-3">{username}</h3>
                  <p className="text-slate-700 leading-5.5 font-mono text-base whitespace-pre-line">
                    {roast}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="w-full max-w-2xl text-center border-t border-slate-200 pt-8 mt-12">
          <p className="text-slate-700 font-mono text-sm mb-4">Built for laughs — not your ego 💀 | Made with fun & chaos 😁 by Utsav</p>
          <p className="text-sm text-slate-600 font-sans">
            Got roasted? Post your screenshots and tag me on{" "}
            <a
              href="https://x.com/0xdevug"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:underline underline-offset-2"
            >
              X.com
            </a>{" "}
            👀
          </p>

        </footer>
      </main>
    </div>
  )
}


