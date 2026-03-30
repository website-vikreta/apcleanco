---
description: "Use when: run project, start project, dev server, npm run dev, or similar. Installs dependencies and starts the development server, or opens existing browser if already running."
argument-hint: "[route] e.g. /about"
model: Claude Haiku 4.5 (copilot)
---

Do the following silently with no explanation. Reply only with "Done" when finished.

1. Check if dev server is running: `lsof -i :3000 | grep node`
2. If running, skip to step 5
3. If not running:
   a. Run `npm install`
   b. Run `npm run dev` in background
   c. Wait 2-3 seconds for startup
   d. Check for errors: `lsof -i :3000 | grep node`
   e. If NO process on port 3000, run `pkill -f "next dev"` and report failure ("Project startup failed")
4. Open `http://localhost:3000${argument}` in the integrated browser (or refocus existing tab)
5. Done
