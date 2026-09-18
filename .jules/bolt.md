## 2026-08-12 - Bash Script Node.js Optimization
**Learning:** Shell scripts spawning separate runtime processes (like Node.js or Python) just for simple string operations or logic evaluations add unnecessary execution overhead due to interpreter boot times.
**Action:** Always favor native bash string manipulation (e.g., `IFS` for splitting, `[[ ]]` for logic) over spawning heavy runtimes when possible.
