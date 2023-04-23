export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type ChatRoomResModel = {
  id: number
  title: string
  headCount: number
  createdAt: Date
}

export type ChatRoomMeta = Omit<ChatRoomResModel, 'id'>

export type ChatingResModel = {
  id: number
  message: Message[]
}
