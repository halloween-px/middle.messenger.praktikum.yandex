import { ConversionType } from '../components/conversation/conversation'
import { UsersInChatType, UserType } from '../controllers/user-controller'
import EventBus from '../lib/eventBus'
import { set } from '../utils/helpres'
import { MessageType } from '../components/message/message'

export enum StoreEvent {
  Updated = 'updated',
}

export type StoreType = {
  formError: string
  conversations: ConversionType[]
  activeChat: ConversionType | null
  formName: string
  user: UserType | null
  usersChat: UsersInChatType[]
  messages: MessageType[]
  loading: {
    button: boolean
  }
}

type Path<T> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends Record<string, any>
            ? `${K}` | `${K}.${Path<T[K]>}`
            : `${K}`
          : never
      }[keyof T]
    : never

type StorePaths = Path<StoreType>

class Store extends EventBus {
  private state: StoreType = {
    formError: '',
    formName: '',
    activeChat: null,
    conversations: [],
    user: null,
    usersChat: [],
    messages: [],
    loading: {
      button: false,
    },
  }

  public set(path: StorePaths, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvent.Updated)
  }

  public getState() {
    return this.state
  }
}

export default new Store()
