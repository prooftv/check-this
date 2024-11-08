import path from 'path';
import { defineCliConfig } from 'sanity/cli';
import { appConfig } from './config/app';

export default defineCliConfig({
  api: {
    projectId: appConfig.projectId,
    dataset: appConfig.dataset,
  },

  vite: (config) => {
    if (!config.resolve) config.resolve = {};

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': path.resolve(__dirname),
    };

    return config;
  },
});
