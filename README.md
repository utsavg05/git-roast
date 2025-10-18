# 🔥 RoastMyGit — Get Roasted by Your Own Commits

**RoastMyGit** is a fun AI-powered web app that humorously roasts developers based on their GitHub activity — repos, commits, and coding habits.

---

## 🚀 Live Demo

👉 [roastmygit.vercel.app](https://roastmygit.vercel.app)

---

## 🧠 How It Works

1. Enter your **GitHub username**.
2. The app fetches your public GitHub data (profile, repos, commits).
3. Gemini AI analyzes it and generates a witty roast — all in good fun 💀

---

## 🛠️ Tech Stack

* **Next.js 15 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Google Gemini API**

---

## ⚙️ Setup (Local)

1. Clone the repo:

   ```bash
   git clone https://github.com/utsavg05/git-roast.git
   cd git-roast
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env.local` file:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the dev server:

   ```bash
   npm run dev
   ```

---

## 🧩 Folder Structure

```
/app
 ├─ /api/roast/route.ts   → API route with Gemini integration
 ├─ /page.tsx             → Main frontend page
```

---

## 🤝 Contributing

PRs are welcome! Feel free to suggest new roast ideas or features.

---

## 💀 Credits

Built for laughs — not your ego 😎
Made with ❤️ by [Utsav Gupta](https://x.com/0xdevug)
