import React, { ReactNode } from 'react'

import Portal from './Portal'
import {
  DIMMED_ZINDEX,
  MODAL_CONTAINER_ZINDEX,
  MODAL_INNER_CONTAINER_ZINDEX,
} from 'src/constants/z-index'

type ModalProps = {
  open: boolean
  closeModalHandler: () => void
  children: ReactNode
}

function Modal({ children, open, closeModalHandler }: ModalProps) {
  const handleClickDimmed = () => {
    closeModalHandler()
  }

  return (
    <Portal>
      {/* <Dimmed /> */}
      <div
        style={{ zIndex: 900 }}
        onClick={handleClickDimmed}
        className={`${DIMMED_ZINDEX} ${
          open ? 'block' : 'hidden'
        } fixed w-full h-screen top-0 left-0 bg-gray-500 opacity-75`}
      ></div>
      {/* ModalOuterContainer */}
      <div
        style={{ zIndex: 1000, height: 'auto' }}
        className={`${
          open ? 'block' : 'hidden'
        } absolute w-full max-w-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 flex justify-center items-center`}
      >
        {/* ModalInnerContainer */}
        <div className={`${MODAL_INNER_CONTAINER_ZINDEX} relative w-full p-6 bg-white rounded-2xl`}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
