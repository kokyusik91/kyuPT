// 유효성 체크 검사
export const validCheck = (value: string) => {
  if (value.trim().length === 0) return false
  else return true
}

export const delayFunc = (time: number) => {
  return new Promise(() => {
    setTimeout(() => {}, time)
  })
}

export function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export const transFormToDayFormat = (date: Date) => {
  if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${day}`
    return dateString
  }

  return '0000-00-00'
}
// 시간으로 바꿔줌.
export const transformToTime = (date: Date) => {
  if (date) {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return '00:00'
}
