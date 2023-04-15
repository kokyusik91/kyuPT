import Image from 'next/image'
import Button from '@components/common/Button'
import ScaffoldPage from '@components/layout/ScaffoldPage'
import AppHeader from '@components/AppHeader'
import Icon from '@components/Icon/Icon'
import Input from '@components/common/Input'
import { useState } from 'react'
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
      console.log(response)
    } catch (error) {
      // 스낵바로 에러 표츌
      console.log(error)
      alert(error)
    }
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
      <div className="absolute max-w-lg w-full px-4 bottom-10">
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
