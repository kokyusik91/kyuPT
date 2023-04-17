import React from 'react'
import Avatar from './Avatar'
import { Room } from '@pages/home'
import Icon from './Icon/Icon'

type ChatProps = {
  roomInfo: Room
  handleClickRoomList: (roomInfo: Room) => void
  handleDeleteRoom: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
  handleEditRoom: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
}

function Chat({ roomInfo, handleClickRoomList, handleDeleteRoom, handleEditRoom }: ChatProps) {
  return (
    <li className="py-4 flex border-b" onClick={() => handleClickRoomList(roomInfo)}>
      <div className="shrink-0 mr-4 flex justify-center items-center">
        <Avatar imageUrl="/images/user.png" />
      </div>
      <div className="w-full flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-cs-skyblue text-lg ">{roomInfo.title}</h1>
          <time className="text-cs-600">{String(roomInfo.createdAt)}</time>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-cs-600">방인원 : {roomInfo.headCount}</p>
          <div className="flex">
            <button
              className="bg-cs-skyblue mr-2 p-2 rounded-md"
              onClick={(e) => handleEditRoom(e, roomInfo.id)}
            >
              <Icon icon="edit" />
            </button>
            <button
              className="bg-cs-mainred p-2 rounded-md"
              onClick={(e) => handleDeleteRoom(e, roomInfo.id)}
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
