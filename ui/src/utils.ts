export function formatTs(ts: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Date((Date as any)(ts)).toLocaleString()
}