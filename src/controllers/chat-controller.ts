import { EventWSTransport, MessageOutgoingType, WSTransport } from './../utils/wsTransport'
import { addUsersToChatType, ChatAPI } from '../api/chat-api'
import { ConversionType } from '../components/conversation/conversation'
import store from '../store/store'
import { MessageType, OldMessageType } from '../components/message/message'
import { getStorage } from '../utils/storage'
import { cloneDeep } from '../utils/helpres'

const chatApi = new ChatAPI()
const urlWS = 'wss://ya-praktikum.tech/ws/chats'

export class ChatController {
  socket: WSTransport | undefined

  async createChat(data: { title: string }) {
    try {
      store.set('loading.button', true)
      const { chatId } = (await chatApi.create(data)) as { chatId: number }
      store.set('conversations', [
        ...store.getState().conversations,
        { id: chatId, title: data.title, avatar: '' } as unknown as ConversionType,
      ])
    } catch (error) {
      throw new Error(`failed createChat:${error}`)
    } finally {
      store.set('loading.button', false)
    }
  }

  getChat(id: number) {
    const chat = store.getState().conversations.find(item => item.id === id)
    return chat ? cloneDeep(chat) : null
  }

  async init() {
    const chatId = getStorage('chatId')
    await this.getChats()

    if (chatId) {
      this.connectToChat(Number(chatId))
      this.getUsersInChat(Number(chatId))
    }
  }

  async getChats() {
    try {
      const conversations = await chatApi.request()
      store.set('conversations', conversations)
    } catch (error) {
      throw new Error(`failed getChats:${error}`)
    }
  }

  async connectToChat(id: number) {
    store.set('activeChat', this.getChat(Number(id)))

    if (this.socket) {
      this.socket.close()
    }

    try {
      const userId = store.getState().user?.id
      const { token } = (await chatApi.getToken(id)) as { token: string }

      this.socket = new WSTransport(`${urlWS}/${userId}/${id}/${token}`)
      await this.socket.connect()

      this.socket.send({
        content: '0',
        type: 'get old',
      })

      this.socket.on(EventWSTransport.Message, (data: OldMessageType) => {
        let oldMessages: (OldMessageType | MessageType)[] = []

        if (Array.isArray(data)) {
          oldMessages = data.reverse().map((item: OldMessageType) => {
            return {
              direction: userId === item.user_id ? 'outgoing' : 'incoming',
              time: item.time,
              check: item.is_read,
              message: item.content,
            }
          })

          store.set('messages', [...oldMessages, ...store.getState().messages])
        } else {
          store.set('messages', [
            ...store.getState().messages,
            {
              direction: userId === data.user_id ? 'outgoing' : 'incoming',
              time: data.time,
              check: data.is_read,
              message: data.content,
            },
          ])
        }
      })
    } catch (error) {
      throw new Error(`failed connectToChat:${error}`)
    }
  }

  sendMessage(data: MessageOutgoingType) {
    if (this.socket) {
      this.socket.send(data)
    }
  }

  async addUsersToChat(userId: number) {
    try {
      const chatId = store.getState().activeChat?.id
      if (userId && chatId) {
        const data: addUsersToChatType = {
          users: [userId],
          chatId: chatId,
        }

        await chatApi.addUsersToChat(data)
      }
    } catch (error) {
      throw new Error(`failed addUsersToChat:${error}`)
    }
  }

  async deleteUsersToChat(userId: number) {
    try {
      const chatId = store.getState().activeChat?.id
      if (userId && chatId) {
        const data: addUsersToChatType = {
          users: [userId],
          chatId: chatId,
        }

        await chatApi.deleteUsersToChat(data)
        const newUsersInChats = store.getState().usersChat.filter(user => user.id !== userId)
        console.log(newUsersInChats)
        store.set('usersChat', newUsersInChats)
      }
    } catch (error) {
      throw new Error(`failed addUsersToChat:${error}`)
    }
  }

  async getUsersInChat(id: number) {
    try {
      const users = await chatApi.getUsersInChat(id)
      store.set('usersChat', users)
    } catch (error) {
      throw Error(`failed getUsersInChat:${error}`)
    }
  }

  async uploadAvatar(data: FormData) {
    try {
      const chat = (await chatApi.uploadAvatar(data)) as ConversionType
      const conversation = this.getChat(Number(store.getState().activeChat?.id))

      if (conversation) {
        conversation.avatar = chat.avatar
      }

      store.set('activeChat', { ...store.getState().activeChat, avatar: chat.avatar })
      store.set(
        'conversations',
        store.getState().conversations.map(conv => {
          if (conv.id === chat.id) {
            return conversation
          }
          return conv
        })
      )
      return chat
    } catch (error) {
      throw Error(`failed getUsersInChat:${error}`)
    }
  }

  clearChat() {
    store.set('messages', [])
    store.set('usersChat', [])
  }

  async deleteChat(chatId: number) {
    try {
      return chatApi.delete(chatId)
    } catch (error) {
      throw Error(`failed delete Chat:${error}`)
    }
  }
}

export default new ChatController()
