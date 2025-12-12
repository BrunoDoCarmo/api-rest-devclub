export function normalizeNull<T extends object>(data: T): T {
  const output: any = {}

  for (const key in data) {
    const value = (data as any)[key]

    // Transforma undefined em null quando permitido pelo Prisma
    output[key] = value === undefined ? null : value
  }

  return output
}
