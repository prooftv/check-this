import { describe, expect, it } from 'vitest';
import { isOriginAllowed, isPathAllowed, isMethodAllowed } from '../cors';

describe('isOriginAllowed', () => {
  it('allows exact origin matches', () => {
    const allowedOrigins = ['https://example.com'];
    expect(isOriginAllowed('https://example.com', allowedOrigins)).toBe(true);
    expect(isOriginAllowed('https://other.com', allowedOrigins)).toBe(false);
  });

  it('handles wildcard domains', () => {
    const allowedOrigins = ['*.example.com'];
    expect(isOriginAllowed('https://sub.example.com', allowedOrigins)).toBe(true);
    expect(isOriginAllowed('https://other.com', allowedOrigins)).toBe(false);
  });

  it('allows all origins with *', () => {
    const allowedOrigins = ['*'];
    expect(isOriginAllowed('https://any.com', allowedOrigins)).toBe(true);
  });
});

describe('isPathAllowed', () => {
  it('allows exact path matches', () => {
    const allowedPaths = ['api/users'];
    expect(isPathAllowed('api/users', allowedPaths)).toBe(true);
    expect(isPathAllowed('api/posts', allowedPaths)).toBe(false);
  });

  it('handles wildcard paths', () => {
    const allowedPaths = ['api/*'];
    expect(isPathAllowed('api/users', allowedPaths)).toBe(true);
    expect(isPathAllowed('api/posts', allowedPaths)).toBe(true);
    expect(isPathAllowed('other/path', allowedPaths)).toBe(false);
  });

  it('normalizes paths with leading slashes', () => {
    const allowedPaths = ['api/users'];
    expect(isPathAllowed('/api/users', allowedPaths)).toBe(true);
  });
});

describe('isMethodAllowed', () => {
  it('allows exact method matches', () => {
    const allowedMethods = ['GET', 'POST'];
    expect(isMethodAllowed('GET', allowedMethods)).toBe(true);
    expect(isMethodAllowed('DELETE', allowedMethods)).toBe(false);
  });

  it('allows all methods with *', () => {
    const allowedMethods = ['*'];
    expect(isMethodAllowed('ANY', allowedMethods)).toBe(true);
  });
});
