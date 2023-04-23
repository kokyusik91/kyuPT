import { rejects } from 'assert'
import { ChatRoomMeta, ChatRoomResModel, ChatingResModel, Message } from './type'

class IndexedDB {
  // 전역에서 사용해야함.
  private dbName: string
  private dbVersion: number
  public db: IDBDatabase | null = null

  constructor(dbName: string, dbVersion: number) {
    this.dbName = dbName
    this.dbVersion = dbVersion
    // 앱이 켜졌을때 DB 실행
  }

  async connect() {
    if (this.db) {
      return this.db
    }

    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = (event) => {
        reject(request.error)
      }

      request.onsuccess = (event) => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = request.result
        let oldVersion = event.oldVersion
        if (oldVersion < 1) {
          db.createObjectStore('chatroom', { keyPath: 'id', autoIncrement: true })
        }
        if (oldVersion < 2) {
          db.createObjectStore('chating', { keyPath: 'id' })
        }
      }
    })
  }

  // 채팅방 추가
  async addChatRoom(chatRoomData: ChatRoomMeta): Promise<ChatRoomResModel> {
    const db = await this.connect()
    const transcation = db.transaction(['chatroom'], 'readwrite')
    const store = transcation.objectStore('chatroom')
    const request = store.add(chatRoomData)

    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        reject(request.error)
      }

      request.onsuccess = (event) => {
        // result에는 방금 추가한 식별자가 붙는다.
        const id = request.result
        // 바로 store에서 id로 방금 추가한 아이템 조회
        const getItemRequest = store.get(id)
        getItemRequest.onerror = (event) => {
          reject(getItemRequest.error)
        }

        getItemRequest.onsuccess = (event) => {
          const item = getItemRequest.result
          resolve(item)
        }
      }
    })
  }

  /**
   * 채팅방 모든 조회 API
   * @returns 모든 채팅방 리스트
   */
  async getChatRooms(): Promise<ChatRoomResModel[]> {
    const db = await this.connect()
    const transaction = db.transaction(['chatroom'], 'readonly')
    const store = transaction.objectStore('chatroom')
    const requset = store.getAll()

    return new Promise((resolve, reject) => {
      requset.onerror = (event) => {
        reject(requset.error)
      }

      requset.onsuccess = (event) => {
        const chatroomList = requset.result
        resolve(chatroomList)
      }
    })
  }

  async deleteChatRoom(id: number) {
    const db = await this.connect()
    const transaction = db.transaction(['chatroom'], 'readwrite')
    const store = transaction.objectStore('chatroom')
    store.delete(id)
  }

  async updateChatRoom(id: number, updateChatRoomData: ChatRoomMeta): Promise<ChatRoomResModel> {
    const db = await this.connect()
    const transaction = db.transaction(['chatroom'], 'readwrite')
    const store = transaction.objectStore('chatroom')
    const request = store.put({ id, ...updateChatRoomData })

    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        reject(request.error)
      }
      // 고민되는 것
      // 클라에서 제출한 데이터를 그냥 내려줘야하는지?
      // 업데이트한 데이터를 조회해서 내려줘야하는 건지?
      request.onsuccess = (event) => {
        const id = request.result
        const getItemRequest = store.get(id)

        getItemRequest.onsuccess = (event) => {
          const updatedItem = getItemRequest.result
          resolve(updatedItem)
        }

        getItemRequest.onerror = (event) => {
          reject(getItemRequest.error)
        }
      }
    })
  }

  async createChating(id: number, message: Message) {
    const db = await this.connect()
    const transaction = db.transaction(['chating'], 'readwrite')
    const store = transaction.objectStore('chating')
    store.add({ id, message: [message] })
  }

  async updateChating(id: number, messageList: Message[]) {
    const db = await this.connect()
    const transaction = db.transaction(['chating'], 'readwrite')
    const store = transaction.objectStore('chating')
    store.put({ id, message: [...messageList] })
  }

  async getAllChating(id: number): Promise<ChatingResModel> {
    const db = await this.connect()
    const transaction = db.transaction(['chating'], 'readonly')
    const store = transaction.objectStore('chating')
    const request = store.get(id)

    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        reject(request.error)
      }

      request.onsuccess = (event) => {
        const messageList = request.result
        resolve(messageList)
      }
    })
  }
}

export default IndexedDB
