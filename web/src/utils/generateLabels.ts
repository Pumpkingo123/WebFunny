import { format } from 'date-fns'

export const generateLabels = (
  start: number,
  end: number,
  formatString: string = 'MM-dd',
  interval: 'hour' | 'day' = 'day'
): string[] => {
  const labelList: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  while (startDate <= endDate) {
    labelList.push(format(startDate, formatString))
    if (interval === 'hour') {
      startDate.setHours(startDate.getHours() + 1)
    } else {
      startDate.setDate(startDate.getDate() + 1)
    }
  }
  return labelList
}
