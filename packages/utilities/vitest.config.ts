import { defineConfig } from 'vitest/config';

const testFiles = ['./**/*.test.{js,ts,jsx,tsx}'];

export default defineConfig({
  plugins: [],
  cacheDir: '../../.cache/vitest/sanity-toolkit', // Global cache directory, split by app or package
  test: {
    environment: 'node',
    globals: true,
    typecheck: {
      enabled: false,
    },
    // threads is good, vmThreads is faster (perf++) but comes with possible memory leaks
    // @link https://vitest.dev/config/#vmthreads
    pool: 'forks',
    poolOptions: {
      vmThreads: {
        // useAtomics -> perf+
        // @link https://vitest.dev/config/#pooloptions-threads-useatomics
        useAtomics: true,
      },
      threads: {
        // minThreads: 4,
        // maxThreads: 16,
        // useAtomics -> perf+
        // @link https://vitest.dev/config/#pooloptions-threads-useatomics
        useAtomics: true,
        // isolate to false makes perf++ but comes with limitations
        // @link https://vitest.dev/config/#pooloptions-threads-isolate
        isolate: true,
      },
    },
    passWithNoTests: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'clover'],
      extension: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['lint-staged.config.cjs', 'vitest.config.ts'],
    },
    include: testFiles,
    // To mimic Jest behaviour regarding mocks.
    // @link https://vitest.dev/config/#clearmocks
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    exclude: [
      '**/node_modules/**',
      'dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
