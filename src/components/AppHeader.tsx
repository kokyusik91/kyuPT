import React, { ReactNode } from 'react'

type AppHeaderProps = {
  leftSideComponent?: ReactNode
  rightSideComponent?: ReactNode
  title?: string
}

function AppHeader({ leftSideComponent, rightSideComponent, title = '기본 제목' }: AppHeaderProps) {
  return (
    <div className="w-full h-12 flex justify-center items-center relative">
      <button className="absolute top-2/4	left-4 -translate-y-1/2">{leftSideComponent}</button>
      <h1 className="text-paragraph">{title}</h1>
      <button className="absolute top-2/4	right-4 -translate-y-1/2">{rightSideComponent}</button>
    </div>
  )
}

export default AppHeader
