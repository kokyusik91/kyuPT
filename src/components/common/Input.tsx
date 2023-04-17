import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'

type InputProps = {
  id: string
  value: string
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  name: string
  inputProps: {
    placeholder: string
  }
}

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
