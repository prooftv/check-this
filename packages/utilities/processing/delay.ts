// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function delay(timeMs: number, value?: any) {
  return new Promise((resolve) => setTimeout(resolve, timeMs, value));
}
