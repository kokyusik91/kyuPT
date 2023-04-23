import React, { ReactNode } from 'react'

type ScaffoldPageProps = {
  children: ReactNode
  appHeader: ReactNode
  bgColor?: string
}

function ScaffoldPage({ children, appHeader, bgColor = 'bg-slate-500' }: ScaffoldPageProps) {
  return (
    <main className={`w-full h-screen relative ${bgColor}`}>
      {appHeader && <header className="h-12">{appHeader}</header>}
      <section style={{ height: 'calc(100vh - 48px)' }} className="relatvie overflow-auto">
        {children}
      </section>
    </main>
  )
}

export default ScaffoldPage
