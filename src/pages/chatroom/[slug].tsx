import AppHeader from '@components/AppHeader'
import Icon from '@components/Icon/Icon'
import Chating from '@components/common/Chating'
import IconInput from '@components/common/IconInput'
import ScaffoldPage from '@components/layout/ScaffoldPage'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import service from 'src/util/service'
import { Message } from 'src/util/type'
import Image from 'next/image'
import { wait } from 'src/util'
import DatabaseService from 'src/util/DatabaseService'

type ChatRoomProps = {
  dbService: DatabaseService
}

function Chatroom({ dbService }: ChatRoomProps) {
  const { query, back, isReady } = useRouter()
  const [value, setValue] = useState('')
  const [messages, setMessage] = useState<Message[] | []>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [hasError, setHasError] = useState(false)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (messages.length > 1 && query) {
      const updateMessage = async () => {
        await dbService.updateChating(Number(query.slug), messages)
      }

      updateMessage()
    }

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isReady && messages.length < 1) {
      const getAllChatMessage = async () => {
        try {
          const response = await dbService.getAllChating(Number(query.slug))
          if (response) {
            setMessage([...response.message])
          }
        } catch (error) {
          console.log(error)
        }
      }

      getAllChatMessage()
    }
  }, [isReady, query])

  useEffect(() => {
    async function startTimeout() {
      if (messages && messages.length > 1 && Number(query.headCount) > 2) {
        setTimeoutId((prevTimeoutId) => {
          if (prevTimeoutId) {
            clearTimeout(prevTimeoutId)
          }
          return setTimeout(async () => {
            const copiedMessage = [...messages]
            // const lastMessage = copiedMessage.pop()
            // const modifyedMessage = { ...lastMessage, role: 'user' } as Message
            try {
              const response = await service.chatWithGpt([...copiedMessage])
              const result = response.result.message

              setMessage((prev) => {
                return [...prev, result]
              })
            } catch (error) {
              console.log(error)
              setHasError(true)
            }
          }, 5000)
        })
      } else return
    }

    function resetTimeout() {
      startTimeout()
    }

    window.addEventListener('keydown', resetTimeout)

    if (hasError) {
      return
    } else startTimeout()

    return () => {
      window.removeEventListener('keydown', resetTimeout)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [messages, hasError])

  const handleSubmit = async () => {
    // 만약에 message가 하나도 없다면, create
    if (hasError) {
      alert('대화를 진행 할 수 없습니다. 채팅방을 나갔다 다시 들어와 주세요')
      return
    }

    if (messages.length < 1 && query) {
      dbService.createChating(Number(query.slug), { role: 'user', content: value })
    }
    // 하나 이상이면 update 때리기.
    // api-routes에 보내주기
    setMessage((prev) => {
      return [
        ...prev,
        {
          role: 'user',
          content: value,
        },
      ]
    })

    try {
      setIsSubmitting(true)
      setValue('')
      const response = await service.chatWithGpt([
        ...messages,
        {
          role: 'user',
          content: value,
        },
      ])
      const result = response.result.message

      setMessage((prev) => {
        return [...prev, result]
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터쳤을때 한글이 두번으로 처리되는거 방지
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <ScaffoldPage
      appHeader={
        <AppHeader
          leftSideComponent={
            <Icon icon="arrow_left_big" color="white" handleClickIncon={() => back()} />
          }
          title={String(query.title)}
        />
      }
      // bgColor="bg-cs-skyblue"
    >
      <ul>
        {messages.length > 0 &&
          messages.map((chat, idx) => (
            <Chating key={idx} chat={chat} headCountIndex={Number(query.headCount) - 1} />
          ))}
      </ul>
      {/* empty 박스 */}
      {isSubmitting && (
        <div className="p-4">
          <Image src="/images/loading.gif" alt="로딩 이미지" width={80} height={80} />
        </div>
      )}
      <div ref={bottomRef} className="h-20"></div>
      <div className="absolute w-full bottom-0 p-4 bg-cs-600">
        <IconInput
          value={value}
          handleKeyDown={handleKeyDown}
          handleChangeInput={handleChangeInput}
          iconComponent={<Icon icon="submit" color="#98D0EF" handleClickIncon={handleSubmit} />}
        />
      </div>
    </ScaffoldPage>
  )
}

export default Chatroom
