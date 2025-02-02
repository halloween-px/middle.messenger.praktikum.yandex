import chatController from '../../controllers/chat-controller'
import userController from '../../controllers/user-controller'
import store from '../../store/store'
import { Validators } from '../../utils/validators'
import buttonAsync from '../button/buttonAsync'
import MainForm from '../form/form'
import { InputFile, InputFloatingLabel } from '../input/input'
import { Modal, ModalType } from './modal'

export type ModalsNames = 'modal-create-chat' | 'modal-add-and-remove-user-to-chat'

export type ModalsType = {
  [key in ModalsNames]: (props: ModalType) => Modal
}

interface ChangeAvatarType extends Partial<ModalType> {
  changeAvatarType: 'chageChat' | 'changeUser'
}

export interface ModalAddAndRemoveUserToChatType extends ModalType {
  variant?: 'add-user' | 'remove-user'
}

export class ModalCreateChat extends Modal {
  constructor(props?: ModalType) {
    const btnCreateProps = {
      className: 'btn-primary',
      label: 'Добавить',
      type: 'submit',
    }

    super({
      ...props,
      content: new MainForm({
        title: 'Создать новый чат',
        validators: Validators,
        inputs: [
          new InputFloatingLabel({
            id: 'input-name-chat',
            name: 'text',
            type: 'text',
            label: 'Название чата',
            events: {
              input: e => {
                const target = e.target as HTMLInputElement
                target.value = target.value.replace(/[^\w\sа-яА-ЯёЁ]/g, '')
              },
            },
          }),
        ],
        buttons: [new buttonAsync(btnCreateProps)],
        onSubmit: data => {
          chatController.createChat({ title: data.text })
        },
      }),
    })
  }
}

export class ModalAddAndRemoveUserToChat extends Modal {
  constructor(props: ModalAddAndRemoveUserToChatType) {
    const btnProps = {
      className: 'btn-primary',
      label: props.variant === 'add-user' ? 'Добавить' : 'Удалить',
      type: 'submit',
    }

    super({
      ...props,
      content: new MainForm({
        title: props.variant === 'add-user' ? 'Добавить пользователя' : 'Удалить пользователя',
        validators: Validators,
        inputs: [
          new InputFloatingLabel({
            id: 'input-name-chat',
            name: 'login',
            type: 'text',
            label: 'Логин пользователя',
          }),
        ],
        buttons: [new buttonAsync(btnProps)],
        onSubmit: async data => {
          store.set('loading.button', true)

          try {
            const user = await userController.searchUser({ login: data.login })
            if (props.variant === 'add-user') {
              await chatController.addUsersToChat(Number(user.id))
            } else {
              await chatController.deleteUsersToChat(Number(user.id))
            }
          } catch (error) {
            store.set('formError', 'Такого пользователя не существует')
          }

          store.set('loading.button', false)
        },
      }),
    })
  }
}

export class ModalChangeAvatar extends Modal {
  constructor(props: ChangeAvatarType) {
    const btnProps = {
      className: 'btn-primary',
      label: 'Загрузить аватар',
      type: 'submit',
    }

    super({
      ...props,
      content: new MainForm({
        title: 'Загрузите файл',
        classNames: 'form-change-avatar',
        validators: Validators,
        inputs: [
          new InputFile({
            id: 'input-name-chat',
            name: 'file',
            type: 'file',
            label: 'Выбрать файл на компьютере',
          }),
        ],
        buttons: [new buttonAsync(btnProps)],
        onSubmit: async () => {
          const formData = new FormData() as FormData
          const form = document.querySelector('.form-change-avatar')
          const input = form?.querySelector('input[type="file"]') as HTMLInputElement
          const files = input.files

          if (files && files.length) {
            if (props.changeAvatarType === 'chageChat') {
              const chatId = store.getState().activeChat?.id
              formData.append('chatId', `${chatId}`)
              formData.append('avatar', files[0])
              await chatController.uploadAvatar(formData)
            }

            if (props.changeAvatarType === 'changeUser') {
              formData.append('avatar', files[0])
              await userController.uploadAvatar(formData)
            }
          }
        },
      }),
    })
  }
}

export const Modals: ModalsType = {
  'modal-create-chat': props => new ModalCreateChat(props),
  'modal-add-and-remove-user-to-chat': props => new ModalAddAndRemoveUserToChat(props),
}
