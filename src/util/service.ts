import { fetchInstance } from './fetchInstance'
import { Message } from './type'

const service = {
  fetchLogin: async (apikey: string, callBackFunc: () => void) => {
    return await fetchInstance.post('/api/login', { apikey }, callBackFunc)
  },

  chatWithGpt: async (messageList: Message[]) => {
    return await fetchInstance.post('/api/chat', { messageList })
  },
}

export default service
