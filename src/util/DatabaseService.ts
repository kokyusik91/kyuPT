import IndexedDB from './indexedDB'
import { ChatRoomMeta, ChatRoomResModel } from './type'

class DatabaseService {
  private static instance: DatabaseService | null = null
  private db: IndexedDB

  constructor(dbName: string, dbVersion: number) {
    this.db = new IndexedDB(dbName, dbVersion)
  }

  static getDBInstance(dbName: string, dbVersion: number): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(dbName, dbVersion)
    }

    return DatabaseService.instance
  }
  async addChatRoom(chatRoomData: ChatRoomMeta): Promise<ChatRoomResModel> {
    return await this.db.addChatRoom(chatRoomData)
  }

  async getChatRooms(): Promise<ChatRoomResModel[]> {
    return await this.db.getChatRooms()
  }

  async deleteChatroom(id: number): Promise<undefined> {
    await this.db.deleteChatRoom(id)
  }

  async updateChatroom(id: number, updateChatRoomData: ChatRoomMeta): Promise<ChatRoomResModel> {
    return await this.db.updateChatRoom(id, updateChatRoomData)
  }
}

export default DatabaseService