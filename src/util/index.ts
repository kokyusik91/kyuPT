// 유효성 체크 검사
export const validCheck = (value: string) => {
  if (value.trim().length === 0) return false
  else return true
}
