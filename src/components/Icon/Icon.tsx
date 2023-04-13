import { FC, SVGProps } from 'react'
import icons from './index'
import React from 'react'

export type IconType = keyof typeof icons

type iconProps = {
  icon: IconType
  color?: string
  size?: number
  handleClickIncon?: any
}

function Icon({ icon, color = '#2F3E39', size = 24, handleClickIncon }: iconProps) {
  const SVGIcon = icons[icon] as FC<SVGProps<SVGSVGElement>>
  return <SVGIcon fill={color} width={size} height={size} onClick={handleClickIncon} />
}

export default React.memo(Icon)
