import HTTPTransport from '../utils/httpTransport'
import { BaseAPI, BaseURL } from './base-api'

export interface addUsersToChatType {
  users: number[]
  chatId: number
}

const chatAPIInstance = new HTTPTransport(BaseURL)

export class ChatAPI extends BaseAPI {
  create(data: { title: string }) {
    return chatAPIInstance.post('/chats', {
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
    })
  }

  request(data?: { title: string }) {
    return chatAPIInstance.get('/chats', { credentials: true, data })
  }

  getToken(chatId: number) {
    return chatAPIInstance.post(`/chats/token/${chatId}`, { credentials: true })
  }

  addUsersToChat(data: addUsersToChatType) {
    return chatAPIInstance.put('/chats/users', {
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
    })
  }

  deleteUsersToChat(data: addUsersToChatType) {
    return chatAPIInstance.put('/chats/users', {
      data,
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      credentials: true,
    })
  }

  getUsersInChat(id: number, data?: Record<string, string>) {
    return chatAPIInstance.get(`/chats/${id}/users`, { credentials: true })
  }

  uploadAvatar(data: FormData) {
    return chatAPIInstance.put('/chats/avatar', {
      credentials: true,
      data,
    })
  }

  delete(id: number): void {
    console.log(id)
    chatAPIInstance.delete('/chats', {
      credentials: true,
      data: { chatId: id },
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
    })
  }
}
