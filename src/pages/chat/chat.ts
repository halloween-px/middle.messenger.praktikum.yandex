import Avatar from '../../components/avatar/avatar'
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
import { Message, MessageInput, MessageList, MessageSeporator } from '../../components/message/message'

class Chat extends Block {
  constructor() {
    const Conversations = Array.from({ length: 12 }).map((_, index) => {
      return new Conversation({
        avatar: new Avatar({ size: 'default' }),
        lastTime: '15:35',
        message:
          index === 2 ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, suscipit!' : 'hello Jhon',
        name: `Jhon${index + 1}`,
        unreadCnt: `${index + 1}`,
      })
    })

    super({
      sidebarChat: new SidebarChat({
        button: new ButtonProfile(),
        conversationSearch: new ConversationSearch(),
        conversationList: new ConversationList({
          conversation: Conversations,
        }),
      }),
      conversationHeader: new ConversationHeader({
        avatar: new Avatar({ size: 'sm' }),
        name: 'Jhon',
        actions: [
          new Button({
            icon: 'fa-solid fa-ellipsis-vertical',
            className: 'btn-icon btn-icon-default',
          }),
        ],
      }),
      messageList: new MessageList({
        messages: [
          new MessageSeporator({ date: '19 июня' }),
          new Message({
            direction: 'incoming',
            time: '12:23',
            check: true,
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          }),
          new Message({
            check: true,
            direction: 'incoming',
            time: '12:32',
            message: '<img class="image" src="/images/testImage.png" alt="testPhoto">',
          }),
          new Message({ direction: 'outgoing', message: 'Круто', time: '12:50', check: true }),
        ],
      }),
      messageInput: new MessageInput(),
    })
  }

  render() {
    return this.compile(ChatTemplate, this.props)
  }
}

export default Chat
