const { execSync } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');

try {
  execSync('git add -A', { cwd: repoDir, stdio: 'inherit' });
  execSync('git commit -m "Fix vercel routing config"', { cwd: repoDir, stdio: 'inherit' });
  execSync('git push origin main', { cwd: repoDir, stdio: 'inherit' });
  console.log('Done!');
} catch (e) {
  console.error(e.message);
}
