---
description: "Install dependencies and start the development server"
argument-hint: "[route] e.g. /about"
model: Claude Haiku 4.5 (copilot)
---

Do the following silently with no explanation. Reply only with "Done" when finished.

1. Run `pkill -f "next dev"` to stop any running dev servers
2. Run `npm install`
3. Run `npm run dev` in background
4. Open `http://localhost:3000${argument}` in the integrated browser
