import React, { ReactNode } from 'react'
import { DIMMED_ZINDEX } from 'src/constants/z-index'

type DimmedProps = {
  handleClickDim?: () => void
}

function Dimmed({ handleClickDim }: DimmedProps) {
  return (
    <div
      className={`fixed w-full h-screen bg-gray-500 opacity-75 ${DIMMED_ZINDEX}`}
      onClick={handleClickDim}
    ></div>
  )
}

export default Dimmed
