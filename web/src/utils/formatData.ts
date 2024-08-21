export const formatData = <T>(data: T[], labels: string[], key: keyof T): number[] => {
    return labels.map((label) => {
      const item = data.find((d) => d[key] === label)
      return item ? (item as any).count : 0
    })
  }