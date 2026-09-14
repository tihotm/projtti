## 2024-09-14 - Bash Native Version Checking
**Learning:** Shell scripts checking node versions were incurring a ~80ms penalty by booting V8 (node) multiple times per validation. Bash parameter expansion (`${var%%.*}`) is virtually instantaneous compared to process spawning.
**Action:** Always prefer native bash string manipulation over spawning language runtimes (`node -e`, `ruby -e`, `python -c`) for simple string parsing tasks in wrapper/validation scripts.
