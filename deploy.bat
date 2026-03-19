@echo off
cd /d "%~dp0"
git add -A
git commit -m "Fix: add error handling and ensure content displays"
git push origin gh-pages
pause
