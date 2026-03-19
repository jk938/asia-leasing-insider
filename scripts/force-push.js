const { execSync } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');

try {
  execSync('git push origin gh-pages:main --force', { cwd: repoDir, stdio: 'inherit' });
  console.log('Done!');
} catch (e) {
  console.error('Error:', e.message);
}
