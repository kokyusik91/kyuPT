import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

interface CustomError extends Error {
  // name: string;
  // message: string;
  // stack?: string; - Error 인터페이스 프로퍼티들을 직접 쓰거나 아니면 상속해준다.

  response?: {
    data: any
    status: number
    headers: string
  }
}

type Data = {
  message: string
}

const handleConfirmAPIKEY = async (apikey: string) => {
  const configuration = new Configuration({
    organization: 'org-CYCy6Fovrr0JysXyyvYeSWfC',
    apiKey: apikey,
  })
  const openai = new OpenAIApi(configuration)
  const response = await openai.listModels()

  return response
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // res.status(200).json({ name: 'John Doe' })
  const { apikey } = req.body
  // 프론트에서 넘겨받은 api-key 유효성 검사
  if (apikey.trim() === '') {
    return res.status(400).json({ message: 'api key를 입력해주세요!' })
  }

  try {
    const response = await handleConfirmAPIKEY(apikey)
    console.log(response)
    return res.status(200).json({ message: '로그인에 성공하였습니다!' })
  } catch (error: unknown) {
    const cutomErr = error as CustomError
    if (cutomErr.response?.status === 401) {
      return res.status(401).json({ message: '올바르지 않은 API Key입니다.' })
    } else {
      throw cutomErr
    }
  }
}
