import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
}

function Portal({ children }: PortalProps) {
  const rootElement = process.browser && document.getElementById('portal')

  return <>{rootElement ? createPortal(children, rootElement) : children}</>
}

export default Portal
