const { execSync } = require('child_process');
const path = require('path');
const projectDir = 'c:/Users/Jackie/WorkBuddy/20260318114807';

try {
  // Set git config
  execSync('git config user.email "jk938@github.com"', { cwd: projectDir, stdio: 'inherit' });
  execSync('git config user.name "jk938"', { cwd: projectDir, stdio: 'inherit' });

  // Add all files
  execSync('git add -A', { cwd: projectDir, stdio: 'inherit' });

  // Commit
  execSync('git commit -m "Initial commit: Asia Leasing Insider website"', { cwd: projectDir, stdio: 'inherit' });

  console.log('Commit successful!');
} catch (err) {
  console.error('Error:', err.message);
}
