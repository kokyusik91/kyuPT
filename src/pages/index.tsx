import Image from 'next/image'
import Button from '@components/common/Button'
import ScaffoldPage from '@components/layout/ScaffoldPage'
import AppHeader from '@components/AppHeader'
import Icon from '@components/Icon/Icon'
import Input from '@components/common/Input'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [value, setValue] = useState('')
  const rotuer = useRouter()

  // 유효성 체크 검사
  const validCheck = (value: string) => {
    if (value.trim().length === 0) return 'invalid'
  }

  const handleClickLogin = () => {
    // TODO : API key 검증
    // 메인 페이지로 replace
    rotuer.replace('/home')
  }

  return (
    <ScaffoldPage
      appHeader={
        <AppHeader
          leftSideComponent={
            <Image src="/images/logo.png" alt="이미지로고" width={124} height={20} />
          }
          rightSideComponent={<Icon icon="plus_big" />}
        />
      }
    >
      <div className="m-auto text-center mt-40 mb-20">
        <Image
          src="/images/gpt-logo.png"
          alt="gpt logo"
          width={120}
          height={120}
          style={{ display: 'inline-block' }}
        />
      </div>
      <div className="w-full px-4">
        <Input
          id="API KEY"
          value={value}
          setValue={setValue}
          inputProps={{
            placeholder: 'API KEY를 입력해주세요',
          }}
        />
      </div>
      <div className="absolute w-full px-4 bottom-10">
        <div className="mb-3">
          <Button
            txtColor="text-cs-mainblack"
            backgroundColor="bg-cs-skyblue"
            handleClickButton={handleClickLogin}
          >
            로그인
          </Button>
        </div>
        <p className="text-cs-mainblack text-center underline underline-offset-3">
          Key 발급받는 방법
        </p>
      </div>
    </ScaffoldPage>
  )
}
