import Icon from '@components/Icon/Icon'
import React, { ChangeEvent, KeyboardEventHandler, ReactNode } from 'react'

type IconInputProps = {
  value: string
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /**
   * 버튼 사이의 간격입니다. 기본 값은 4rem = 16px 입니다.
   */
  iconComponent: ReactNode
}

function IconInput({ value, handleChangeInput, iconComponent, handleKeyDown }: IconInputProps) {
  return (
    <div className="relative rounded-sm">
      <input
        type="text"
        className="w-full rounded-xl pl-4 py-3 pr-12 border text-cs-mainblack placeholder-cs-300"
        value={value}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        placeholder="Chat GPT와 이야기를 해보세요!"
      />
      {value.trim().length > 0 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex justify-center items-center">
          {iconComponent}
        </div>
      )}
    </div>
  )
}

export default IconInput
