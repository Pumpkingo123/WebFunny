import { format } from 'date-fns'

export const generateLabelsHour = (start: number, end: number): string[] => {
  const labelList: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  while (startDate <= endDate) {
    labelList.push(format(startDate, 'MM-dd HH'))
    startDate.setHours(startDate.getHours() + 1)
  }
  return labelList
}