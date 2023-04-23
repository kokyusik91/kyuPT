// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from 'openai'
import { Message } from 'src/util/type'
import { StringLiteralLike } from 'typescript'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
})
const openai = new OpenAIApi(configuration)

type Data = {
  result?: any
  error?: {
    message: string
  }
}

const handleGPTInteraction = async (messsageList: Message[]) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'you are my chatting friend, do not repeat same sentance and response like human',
      },
      ...messsageList,
    ],
  })

  return completion
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { messageList } = req.body
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }
  // 마지막 메시지가 없으면 오류
  const chatContent = messageList.at(-1).content || ''
  if (chatContent.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a chat conversation',
      },
    })
    return
  }
  const response = await handleGPTInteraction(messageList)
  console.log(JSON.stringify(response.data.choices[0]))
  res.status(200).json({ result: response.data.choices[0] })
}
