import React from 'react'
import Avatar from './Avatar'
import Icon from './Icon/Icon'
import { ChatRoomResModel } from 'src/util/type'
import { transFormToDayFormat } from 'src/util'

type ChatProps = {
  roomInfo: ChatRoomResModel
  handleClickRoomList: (roomInfo: ChatRoomResModel) => void
  handleDeleteChatRoom: (id: number) => Promise<void>
  handleFindWillEditingRoom: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => void
}

function Chat({
  roomInfo,
  handleClickRoomList,
  handleDeleteChatRoom,
  handleFindWillEditingRoom,
}: ChatProps) {
  const handleDeleteButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation()
    await handleDeleteChatRoom(id)
  }
  return (
    <li
      className="py-4 flex border-b bg-white cursor-pointer"
      onClick={() => handleClickRoomList(roomInfo)}
    >
      <div className="shrink-0 mr-4 flex justify-center items-center">
        <Avatar imageUrl="/images/user.png" />
      </div>
      <div className="w-full flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-cs-skyblue text-lg ">{roomInfo.title}</h1>
          <time className="text-cs-600 shrink-0 text-sm">
            {transFormToDayFormat(roomInfo.createdAt)}
          </time>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-cs-600">방인원 : {roomInfo.headCount} 명</p>
          <div className="flex">
            <button
              className="bg-cs-skyblue mr-2 p-2 rounded-md"
              onClick={(e) => handleFindWillEditingRoom(e, roomInfo.id)}
            >
              <Icon icon="edit" />
            </button>
            <button
              className="bg-cs-mainred p-2 rounded-md"
              onClick={(e) => handleDeleteButton(e, roomInfo.id)}
            >
              <Icon icon="delete_icon" />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Chat
