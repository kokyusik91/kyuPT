import React, { ChangeEvent, ReactNode } from 'react'

type IconInputProps = {
  value: string
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  IconComponent?: ReactNode
}

function IconInput({ value, handleChangeInput, IconComponent }: IconInputProps) {
  return (
    <div className="relative rounded-sm">
      <input
        type="text"
        className="w-full rounded-xl pl-4 py-3 pr-12 border text-cs-mainblack"
        value={value}
        onChange={handleChangeInput}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex justify-center items-center">
        {IconComponent}
      </div>
    </div>
  )
}

export default IconInput
