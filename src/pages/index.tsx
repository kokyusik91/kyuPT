import Image from 'next/image'
import Button from '@components/common/Button'
import ScaffoldPage from '@components/layout/ScaffoldPage'
import AppHeader from '@components/AppHeader'
import Icon from '@components/Icon/Icon'
import Input from '@components/common/Input'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import service from 'src/util/service'
import { validCheck } from 'src/util'

export default function Home() {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleClickLogin = async () => {
    // TODO : API key 검증
    // 메인 페이지로 replace
    if (!validCheck(value)) {
      alert('api key를 입력해 주세요!')
      return
    }
    try {
      const response = await service.fetchLogin(value, () => router.replace('/home'))
      // 스낵바로 표출
      alert(response.message)
    } catch (error) {
      // 스낵바로 에러 표츌
      console.log(error)
      alert(error)
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <ScaffoldPage
      appHeader={
        <AppHeader
          leftSideComponent={
            <Image src="/images/logo.png" alt="이미지로고" width={124} height={20} />
          }
        />
      }
    >
      <div className="m-auto text-center pt-40 mb-20 animate-bounce">
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
          name="apikey"
          handleChangeInput={handleChangeInput}
          inputProps={{
            placeholder: 'API KEY를 입력해주세요',
          }}
        />
      </div>
      <div className="absolute max-w-lg w-full px-4 bottom-10">
        <div className="mb-3">
          <Button
            txtColor="text-white"
            backgroundColor="bg-cs-skyblue"
            handleClickButton={handleClickLogin}
          >
            로그인
          </Button>
        </div>
        <a
          className="block text-white text-center underline underline-offset-3 text-sm"
          href="https://platform.openai.com/account/api-keys"
          target="_blank"
        >
          키 발급 받는 방법
        </a>
      </div>
    </ScaffoldPage>
  )
}
