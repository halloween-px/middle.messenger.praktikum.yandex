import Avatar, { getAvatar } from '../../components/avatar/avatar'
import ButtonProfile from '../../components/button/buttonProfile'
import {
  Conversation,
  ConversationHeader,
  ConversationList,
  ConversationSearch,
} from '../../components/conversation/conversation'
import { SidebarChat } from '../../components/sidebar/sidebar'
import { Block } from '../../lib/block'
import { ChatTemplate } from './chat.tmpl'
import './chat.scss'
import Button from '../../components/button/button'
import { Message, MessageInput, MessageList } from '../../components/message/message'
import store from '../../store/store'
import { ModalTrigger } from '../../components/modal/modalTrigger'
import chatController from '../../controllers/chat-controller'
import { connect } from '../../lib/connect'
import { PopoverTrigger } from '../../components/popover/popoverTrigget'
import userController from '../../controllers/user-controller'
import { escapeHTML } from '../../utils/helpres'
import { getStorage, setStorage } from '../../utils/storage'
import { ModalChangeAvatar } from '../../components/modal/modals'

class Chat extends Block {
  constructor() {
    chatController.init()
    userController.getUser()

    const _ConversationList = connect(state => {
      return {
        conversations: state.conversations.map(chat => {
          return new Conversation({
            avatar: new Avatar({
              size: 'default',
              src: getAvatar(chat.avatar as unknown as string),
            }),
            last_message: {
              ...chat.last_message,
            },
            active: chat.id === Number(getStorage('chatId')),
            title: chat.title,
            unread_count: chat.unread_count,
            id: chat.id,
          })
        }),
      }
    })(ConversationList)

    const _AvatarChatHeader = connect(state => ({
      size: 'sm',
      src: getAvatar(state.activeChat?.avatar as unknown as string),
      changeAvatar: userController.isAdmin(Number(state.user?.id)),
      events: {
        click: () => {
          if (userController.isAdmin(Number(state.user?.id))) {
            new ModalChangeAvatar({ changeAvatarType: 'chageChat' }).open()
          }
        },
      },
    }))(Avatar)

    const _ConversationHeader = connect(state => {
      return {
        title: state.activeChat?.title,
        avatar: new _AvatarChatHeader({}),
        users: state.usersChat.map(user => new Avatar({ size: 'sm', src: getAvatar(user.avatar) })),
        actions: [
          new PopoverTrigger({
            child: new Button({
              icon: 'fa-solid fa-ellipsis-vertical',
              className: 'btn-icon btn-icon-default',
            }),
            popover: 'popover-chat-header',
          }),
        ],
      }
    })(ConversationHeader)

    const _MessageList = connect(state => ({
      messages: state.messages.map(
        message =>
          new Message({
            direction: message.direction,
            time: message.time,
            check: message.check,
            message: escapeHTML(message.message),
          })
      ),
    }))(MessageList)

    super({
      activeChat: !!store.getState().activeChat,
      sidebarChat: new SidebarChat({
        button: new ButtonProfile(),
        conversationSearch: new ConversationSearch(),
        conversationList: new _ConversationList({
          events: {
            click: e => {
              const target = e.target as HTMLElement
              const id = target.closest('.conversation')?.id
              if (id === getStorage('chatId')) return

              if (id) {
                setStorage('chatId', id)
                chatController.clearChat()
                chatController.connectToChat(Number(id))
                chatController.getUsersInChat(Number(id))
              }
            },
          },
        }),
        btnCreateChat: new ModalTrigger({
          modal: 'modal-create-chat',
          label: 'Создать чат',
        }),
      }),
      conversationHeader: new _ConversationHeader({}),
      messageList: new _MessageList({}),
      messageInput: new MessageInput({
        onSubmit(data) {
          const { message } = data
          chatController.sendMessage({ content: message as string, type: 'message' })
        },
      }),
    })
  }

  render() {
    return this.compile(ChatTemplate, this.props)
  }
}

export default connect(state => ({ activeChat: state.activeChat }))(Chat)
