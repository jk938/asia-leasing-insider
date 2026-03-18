const { execSync } = require('child_process');
const projectDir = 'c:/Users/Jackie/WorkBuddy/20260318114807';

try {
  // Create GitHub repository
  console.log('Creating GitHub repository...');
  try {
    execSync('gh repo create asia-leasing-insider --public --source=. --description "Asia Leasing Insider - 亚太区融资租赁行业洞察平台" --push', {
      cwd: projectDir,
      stdio: 'inherit'
    });
    console.log('Repository created and pushed successfully!');
  } catch (err) {
    console.log('Repo might already exist, trying to push to existing remote...');

    // Add remote if not exists
    try {
      execSync('git remote add origin https://github.com/jk938/asia-leasing-insider.git', {
        cwd: projectDir,
        stdio: 'inherit'
      });
    } catch (e) {
      // Remote might already exist
    }

    // Push to remote
    execSync('git branch -M main', { cwd: projectDir, stdio: 'inherit' });
    execSync('git push -u origin main', { cwd: projectDir, stdio: 'inherit' });
    console.log('Code pushed to GitHub!');
  }
} catch (err) {
  console.error('Error:', err.message);
}
