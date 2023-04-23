import Avatar from '@components/Avatar'
import React from 'react'
import { Message } from 'src/util/type'
import newJeans from '@images/newJeans.png'
import tony from '@images/tony.webp'
import garen from '@images/garen.jpeg'
import spondge from '@images/spondge.jpeg'
import gobugi from '@images/gobugobu.jpeg'
import { transformToTime } from 'src/util'

const imageArray = [newJeans, tony, garen, spondge, gobugi]
const nickNameList = ['개발진스', '토니스탱크', '데마시아', '스폰지송', '꼬북맨']

type ChatingProps = {
  chat: Message
  headCountIndex: number
}

function Chating({ chat, headCountIndex }: ChatingProps) {
  const randomNumber = Math.floor(Math.random() * Number(headCountIndex))

  return (
    <>
      {chat.role === 'user' ? (
        <li className="flex flex-col max-w-sm	ml-auto p-4 items-end ">
          <p className="p-4 mb-2 break-all bg-cs-mainyellow text-cs-mainblack rounded-lg text-end">
            {chat.content}
          </p>
          <time className="text-xs text-end">{transformToTime(new Date())}</time>
        </li>
      ) : (
        <li className="w-full flex justify-start p-4">
          <div className="shrink-0 mr-2">
            <Avatar imageUrl={imageArray[randomNumber]} size={40} />
          </div>
          <div>
            <p className="mt-2 mb-3 text-white text-sm">{nickNameList[randomNumber]}</p>
            <p className="p-4 mb-2 bg-cs-mainblack text-white rounded-lg">{chat.content}</p>
            <time className="block text-xs text-end">{transformToTime(new Date())}</time>
          </div>
        </li>
      )}
    </>
  )
}

export default React.memo(Chating)
