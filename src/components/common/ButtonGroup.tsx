import React, { ReactNode } from 'react'

type ButtonGroupProps = {
  /**
   * 버튼 그룹에 속에 있는 버튼 입니다. (사용하고 싶은 버튼을 넣어주세요.)
   */
  children: ReactNode
  /**
   * 버튼 사이의 간격입니다. 기본 값은 4rem = 16px 입니다.
   */
  gap?: number
}

/**
 * 프로젝트의 버튼들을 그룹으로 묶는 버튼 그룹 입니다.
 */
function ButtonGroup({ children, gap = 4 }: ButtonGroupProps) {
  const childrenWithMargin = React.Children.map(children, (child, index) => {
    const marginRight = index === 0 ? `mr-${gap}` : ''
    return <div className={`flex w-full ${marginRight}`}>{child}</div>
  })

  return <div className="flex w-full">{childrenWithMargin}</div>
  // const array = React.Children.toArray(children)
  // const childrenWithMargin = array.map((child, idx) => {
  //   const marginRight = idx === 0 ? `mr-${gap}` : ''
  //   return (
  //     <div key={idx} className={`w-full ${marginRight}`}>
  //       {child}
  //     </div>
  //   )
  // })

  // return <div className="w-full flex">{childrenWithMargin}</div>
}

export default ButtonGroup
