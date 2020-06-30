export default function randomId (): string {
  const now = Date.now()
  const rnd = Math.round(10000000 + Math.random() * 10000000).toString(36)

  return `${now}.${rnd}`
}
