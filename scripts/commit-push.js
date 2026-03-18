const { execSync } = require('child_process');
const projectDir = 'c:/Users/Jackie/WorkBuddy/20260318114807';

try {
  execSync('git add -A', { cwd: projectDir, stdio: 'inherit' });
  execSync('git commit -m "Update vercel config"', { cwd: projectDir, stdio: 'inherit' });
  execSync('git push origin main', { cwd: projectDir, stdio: 'inherit' });
  console.log('Done!');
} catch (err) {
  console.error('Error:', err.message);
}
