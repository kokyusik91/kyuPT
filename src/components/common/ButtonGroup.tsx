import React, { ReactNode } from 'react'

type ButtonGroupProps = {
  children: ReactNode
  gap?: number
}

function ButtonGroup({ children, gap = 4 }: ButtonGroupProps) {
  const childrenWithMargin = React.Children.map(children, (child, index) => {
    const marginRight = index === 0 ? `mt-${gap}` : ''
    return <div className={`w-full ${marginRight}`}>{child}</div>
  })

  return <div className="w-full flex">{childrenWithMargin}</div>
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
