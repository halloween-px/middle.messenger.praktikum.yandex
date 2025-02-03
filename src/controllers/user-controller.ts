import { UserApi } from '../api/user-api'
import store from '../store/store'

interface BaseUser {
  id?: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
}

export interface UserType extends BaseUser {
  phone: string
  email: string
}

export interface UserPasswordType {
  oldPassword: string
  newPassword: string
  password?: string | undefined
}

export interface UsersInChatType extends BaseUser {
  role: 'admin' | 'member' | 'owner'
}

const userApi = new UserApi()

class UserController {
  async getUser() {
    try {
      const user = (await userApi.getUser()) as UserType
      store.set('user', user)
    } catch (error) {
      new Error(`failed user:${error}`)
    }
  }

  async searchUser(data: { login: string }) {
    try {
      const user = (await userApi.searchUser(data)) as UserType[]
      return user[0]
    } catch (error) {
      new Error(`failed searchUser:${error}`)
    }
  }

  async uploadAvatar(data: FormData) {
    try {
      const user = (await userApi.uploadAvatar(data)) as UserType
      store.set('user', { ...store.getState().user, avatar: user.avatar })
    } catch (error) {
      new Error(`failed uploadUser:${error}`)
    }
  }

  async changeProfile(data: UserType) {
    try {
      const user = (await userApi.changeProfile(data)) as UserType
      store.set('user', user)
    } catch (error) {
      new Error(`failed uploadUser:${error}`)
    }
  }

  async changePassword(data: UserPasswordType) {
    try {
      await userApi.changePassword(data)
    } catch (error) {
      new Error(`failed uploadUser:${error}`)
    }
  }

  getAdmin() {
    return store.getState().usersChat.find(user => user.role === 'admin')
  }

  isAdmin(userId?: number) {
    const id = userId ? userId : store.getState().user?.id

    if (id) {
      return id === this.getAdmin()?.id
    }
  }
}

export default new UserController()
