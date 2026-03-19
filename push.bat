@echo off
cd /d "%~dp0"
git add -A
git commit -m "Update: add article detail page, contact email, sources"
git push origin main
pause
