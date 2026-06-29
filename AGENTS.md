<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Automated Git Push Rule for AI Agents

After making any changes and verifying them, you MUST stage, commit, and push the changes directly to the `main` branch on GitHub.
You can execute the automated sync script:
`powershell -NoProfile -ExecutionPolicy Bypass -File ./git-sync.ps1`
Or run:
1. `git add -A`
2. `git commit -m "Descriptive commit message detailing the changes"`
3. `git push origin main`
Ensure the remote GitHub repository is always updated before completing the task.
