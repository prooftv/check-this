import { nanoid } from 'nanoid';

export function randomString(...args: Parameters<typeof nanoid>) {
  return nanoid(...args);
}

export { nanoid } from 'nanoid';
