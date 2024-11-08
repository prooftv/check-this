export function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.some((allowedOrigin) => {
    if (allowedOrigin === '*') {
      return true;
    }

    if (allowedOrigin.startsWith('*.')) {
      const domain = allowedOrigin.slice(2);
      return origin.endsWith(domain);
    }

    return origin === allowedOrigin;
  });
}

export function isPathAllowed(path: string, allowedPaths: string[]): boolean {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return allowedPaths.some((allowedPath) => {
    if (allowedPath === '*') {
      return true;
    }

    if (allowedPath.endsWith('/*')) {
      const basePath = allowedPath.slice(0, -2);
      return normalizedPath.startsWith(basePath);
    }

    return normalizedPath === allowedPath;
  });
}

export function isMethodAllowed(method: string, allowedMethods: string[]): boolean {
  return allowedMethods.includes('*') || allowedMethods.includes(method);
}
