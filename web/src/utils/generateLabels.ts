import { format } from 'date-fns'

export const generateLabels = (start: number, end: number): string[] => {
    const labelList: string[] = []
    const startDate = new Date(start)
    const endDate = new Date(end)
    while (startDate <= endDate) {
      labelList.push(format(startDate, 'MM-dd'))
      startDate.setDate(startDate.getDate() + 1)
    }
    return labelList
  }