const getDefaultIgnorePatterns = () => {
  return [
    `${'node'}_modules}`,
    `**/${'node'}_modules}`,
    '**/.cache',
    'build',
    'dist',
    'storybook-static',
    '.pnpm',
    '.turbo',
    `**/.turbo`,
    '.out',
  ];
};

module.exports = {
  getDefaultIgnorePatterns,
};
