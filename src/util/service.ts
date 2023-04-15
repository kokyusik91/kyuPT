import { fetchInstance } from './fetchInstance'

const service = {
  fetchLogin: async (apikey: string, callBackFunc: () => void) => {
    return await fetchInstance.post('/api/login', { apikey }, callBackFunc)
  },
}

export default service
