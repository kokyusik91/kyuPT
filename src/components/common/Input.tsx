import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'

type InputProps = {
  /**
   * 인풋의 라벨이름 및 input과 label을 연결해주는 값 입니다.
   */
  id: string
  /**
   * 리액트 사용시 input의 value를 연결해 줍니다.
   */
  value: string
  /**
   * 리액트 사용시 input의 onChange Event 핸들러 입니다.
   */
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  /**
   * 객체로 여러 input들을 관리시 각 input을 매칭 시키기 위한 'name' 프로퍼티 입니다.
   */
  name: string
  /**
   * 기타 input props로 받을 프로퍼티 들 입니다. (placeholder)
   */
  inputProps: {
    placeholder: string
  }
}

/**
 * 프로젝트의 기본적인 인풋입니다. ⌨️
 */
function Input({ id, value, handleChangeInput, name, inputProps }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-cs-mainblack">
        {id}
      </label>
      <input
        id={id}
        value={value}
        name={name}
        onChange={handleChangeInput}
        className="w-full rounded-lg px-4 py-3 border text-cs-mainblack placeholder-cs-300 border-cs-skyblue text-ts-mainblack"
        {...inputProps}
        ref={inputRef}
      />
    </div>
  )
}

export default Input
