import React, { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'

type InputProps = {
  id: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  inputProps: {
    placeholder: string
  }
}

function Input({ id, value, setValue, inputProps }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-cs-mainblack">
        {id}
      </label>
      <input
        value={value}
        onChange={handleChangeValue}
        className="w-full rounded-lg p-4 border text-cs-mainblack placeholder-cs-300 border-cs-skyblue text-ts-mainblack"
        {...inputProps}
        ref={inputRef}
      />
    </div>
  )
}

export default Input
