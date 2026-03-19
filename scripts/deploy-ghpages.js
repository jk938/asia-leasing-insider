const { execSync } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');

try {
  // Create and push gh-pages branch
  execSync('git checkout -b gh-pages', { cwd: repoDir, stdio: 'inherit' });
  execSync('git push origin gh-pages --force', { cwd: repoDir, stdio: 'inherit' });
  console.log('Done! GitHub Pages should be available at:');
  console.log('https://jk938.github.io/asia-leasing-insider/');
} catch (e) {
  console.error(e.message);
}
