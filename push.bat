@echo off
cd /d "%~dp0"
git add -A
git commit -m "Fix content display"
git push origin gh-pages
pause
