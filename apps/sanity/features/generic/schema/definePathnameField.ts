import { definePathname, PathnameParams } from '@tinloof/sanity-studio';
import { appConfig } from '@/config/app';

export function definePathnameField(schema: PathnameParams = {}) {
  return definePathname({
    ...schema,
    options: {
      prefix: appConfig.preview.domain,
      ...(schema.options || {}),
    },
  });
}
