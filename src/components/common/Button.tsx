import React from 'react'

type ButtonProps = {
  /**
   * 버튼의 텍스트 입니다.
   */
  children: string
  /**
   * 버튼의 텍스트 색상입니다.
   */
  txtColor?: string
  /**
   * 버튼의 배경 색상입니다.
   */
  backgroundColor: string
  /**
   * 버튼을 클릭했을때의 콜백 함수입니다.
   */
  handleClickButton?: () => void
}

/**
 * 프로젝트의 기본적인 버튼입니다.
 */
function Button({
  children,
  txtColor = '#fffff',
  backgroundColor,
  handleClickButton = () => {
    alert('클릭!')
  },
}: ButtonProps) {
  return (
    <button
      className={`w-full ${backgroundColor} h-12 rounded-lg ${txtColor}`}
      onClick={handleClickButton}
    >
      {children}
    </button>
  )
}

export default Button

// py-2 했을때 위 아래 패딩이 8px 먹음 0.5rem

// 1rem = 16px;
