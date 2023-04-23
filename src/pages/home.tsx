import AppHeader from '@components/AppHeader'
import Avatar from '@components/Avatar'
import Chat from '@components/Chat'
import Button from '@components/common/Button'
import ButtonGroup from '@components/common/ButtonGroup'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import ScaffoldPage from '@components/layout/ScaffoldPage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { validCheck } from 'src/util'
import DatabaseService from 'src/util/DatabaseService'
import IndexedDB from 'src/util/indexedDB'
import { ChatRoomMeta, ChatRoomResModel } from 'src/util/type'

export type Form = {
  title: string
  headCount: string
  createdAt: Date
}

type HomeProps = {
  dbService: DatabaseService
}

function Home({ dbService }: HomeProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [formInfo, setFormInfo] = useState<Form>({
    headCount: '',
    title: '',
    createdAt: new Date(),
  })
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [chatRoomList, setChatRoomList] = useState<ChatRoomResModel[]>([])
  const selectedIDRef = useRef<number | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      const getRooms = await dbService.getChatRooms()
      setChatRoomList(getRooms)
    }

    fetchRooms()
  }, [])

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormInfo((prev) => {
      return {
        ...prev,
        [name]: value,
        createdAt: new Date(),
      }
    })
  }

  const initateForm = () => {
    setFormInfo({
      title: '',
      headCount: '',
      createdAt: new Date(),
    })
  }

  const handleOpenModal = () => {
    setModalMode('create')
    setOpen(true)
  }

  const handleOpenModalEdit = () => {
    setModalMode('edit')
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    initateForm()
  }

  const getRequestModel = (formModel: Form) => {
    const { title, headCount } = formModel
    if (!validCheck(title)) {
      throw new Error('방제목을 입력해주세요!')
    }

    if (Number.isNaN(Number(headCount))) {
      throw new Error('숫자를 입력해주세요')
    }

    if (Number(headCount) < 2 || Number(headCount) > 5) {
      throw new Error('방인원은 2명이상 5명 이하입니다.')
    }

    const requestModel: ChatRoomMeta = {
      title,
      headCount: Number(headCount),
      createdAt: new Date(),
    }

    return requestModel
  }
  const handleCreateRoom = async () => {
    // 방 목록에 추가
    try {
      const requestModel = getRequestModel(formInfo)
      const addedChatRoom = await dbService.addChatRoom(requestModel)
      if (addedChatRoom) {
        setChatRoomList((prev) => [...prev, addedChatRoom])
      }
      initateForm()
      closeModal()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
      }
    }
  }

  const handleDeleteChatRoom = async (id: number) => {
    await dbService.deleteChatroom(id)
    const newRoomList = chatRoomList.filter((chatRoom) => chatRoom.id !== id)
    setChatRoomList(newRoomList)
  }

  const handleFindWillEditingRoom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation()
    selectedIDRef.current = id
    const willEditingRoom = chatRoomList.find((chatRoom) => chatRoom.id === id)
    if (willEditingRoom) {
      const { title, headCount, createdAt } = willEditingRoom
      setFormInfo({
        title,
        headCount: String(headCount),
        createdAt,
      })

      handleOpenModalEdit()
    }
  }

  const handleEditChatRoom = async () => {
    // 방 목록에 추가
    try {
      if (selectedIDRef.current) {
        const requestModel = getRequestModel(formInfo)
        const updateChatRoom = await dbService.updateChatroom(selectedIDRef.current, requestModel)
        const newChatRoomList = chatRoomList.map((chatRoom) =>
          chatRoom.id === selectedIDRef.current ? { ...chatRoom, ...updateChatRoom } : chatRoom,
        )
        setChatRoomList(newChatRoomList)
      }

      selectedIDRef.current = null
      initateForm()
      closeModal()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
      }
    }
  }

  const handleClickRoomList = (roomInfo: ChatRoomResModel) => {
    router.push({
      pathname: `/chatroom/${roomInfo.id}`,
      query: {
        title: roomInfo.title,
        headCount: roomInfo.headCount,
      },
    })
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
      {chatRoomList && chatRoomList.length === 0 && (
        <h1 className="fixed w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-2xl text-center">
          채팅 방을 생성해 보세요! 💬
        </h1>
      )}
      <div style={{ maxHeight: `calc(100vh - 48px)`, overflow: 'auto' }}>
        {chatRoomList && chatRoomList.length > 0 && (
          <ul className="px-4 bg-white">
            {chatRoomList.map((room) => (
              <Chat
                key={room.id}
                roomInfo={room}
                handleClickRoomList={handleClickRoomList}
                handleDeleteChatRoom={handleDeleteChatRoom}
                handleFindWillEditingRoom={handleFindWillEditingRoom}
              />
            ))}
          </ul>
        )}
      </div>
      <button
        className="absolute right-8 bottom-8 rounded-full p-3 bg-cs-skyblue"
        onClick={handleOpenModal}
      >
        <Image src="/images/gpt-logo.png" width={30} height={30} alt="gpt-logo" />
      </button>
      {/* 모달 컴포넌트 */}
      <Modal open={open} closeModalHandler={closeModal}>
        <h1 className="text-center text-cs-mainblack text-lg mb-4">
          {modalMode === 'create' ? '방 생성하기 🏠' : '방 수정하기 🔨'}
        </h1>
        <div className="mb-4">
          <Input
            id="방 이름"
            name="title"
            value={formInfo.title}
            handleChangeInput={handleChangeForm}
            inputProps={{
              placeholder: '방 이름을 입력해주세요',
            }}
          />
        </div>
        <div className="mb-8">
          <Input
            id="방 인원"
            name="headCount"
            value={formInfo.headCount}
            handleChangeInput={handleChangeForm}
            inputProps={{
              placeholder: '방 인원을 입력해주세요',
            }}
          />
        </div>

        <ButtonGroup gap={4}>
          <Button backgroundColor="bg-cs-mainred" handleClickButton={closeModal}>
            취소
          </Button>
          {modalMode === 'create' ? (
            <Button backgroundColor="bg-cs-skyblue" handleClickButton={handleCreateRoom}>
              확인
            </Button>
          ) : (
            <Button backgroundColor="bg-cs-skyblue" handleClickButton={handleEditChatRoom}>
              수정하기
            </Button>
          )}
        </ButtonGroup>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 ">
          <Avatar imageUrl="/images/user.png" size={60} />
        </div>
      </Modal>
    </ScaffoldPage>
  )
}

export default Home
