const { execSync } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');

try {
  execSync('git add -A', { cwd: repoDir, stdio: 'inherit' });
  console.log('Files added');
  
  execSync('git commit -m "Update: article detail page and contact"', { cwd: repoDir, stdio: 'inherit' });
  console.log('Committed');
  
  execSync('git push origin main', { cwd: repoDir, stdio: 'inherit' });
  console.log('Pushed successfully!');
} catch (e) {
  console.error('Error:', e.message);
}
