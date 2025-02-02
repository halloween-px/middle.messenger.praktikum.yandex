import { Block } from '../../lib/block'
import { MessageInputTemplate, MessageListTemplate, MessageSeporatorTemplate, MessageTemplate } from './message.tmpl'
import './message.scss'
import Button from '../button/button'
import { Input } from '../input/input'
import { Validators } from '../../utils/validators'
import { FormMessage } from '../form/form'
import { convertDataToTime } from '../../utils/helpres'

export interface MessageType {
  direction: 'incoming' | 'outgoing'
  message: string
  className?: string
  check: boolean
  time: string
}

export interface OldMessageType {
  chat_id?: number
  content: string
  file?: null | File
  id?: number
  is_read: boolean
  time: string
  type?: string
  user_id?: number
}

interface MessageListProps {
  messages: Block[]
}

interface MessageInputProps {
  buttonMedia?: Block
  input?: Block
  buttonSend?: Block
  onInput?: () => void
  onSubmit?: <T extends Record<string, unknown>>(data: T) => void
}

export class Message extends Block {
  constructor(props: MessageType) {
    super({
      ...props,
      time: convertDataToTime(props.time),
      className: `${props.direction} ${props.className ? props.className : ''}`,
    })
  }

  render() {
    return this.compile(MessageTemplate, this.props)
  }
}

export class MessageList extends Block {
  constructor(props: MessageListProps) {
    super(props)
  }

  render() {
    return this.compile(MessageListTemplate, this.props)
  }
}

export class MessageSeporator extends Block {
  constructor(props: { date: string }) {
    super(props)
  }

  render() {
    return this.compile(MessageSeporatorTemplate, this.props)
  }
}

export class MessageInput extends Block {
  constructor(props?: MessageInputProps) {
    super({
      form: new FormMessage({
        classNames: 'message-form',
        validators: Validators,
        buttonMedia:
          props?.buttonMedia || new Button({ icon: 'fa-solid fa-paperclip', className: 'btn-icon btn-icon-xl' }),
        onSubmit: data => {
          const input = document.querySelector('.message-form .form-message') as HTMLInputElement
          input.value = ''
          if (props && typeof props.onSubmit === 'function') {
            props.onSubmit(data)
          }
        },
        inputs: [
          new Input({
            id: 'message-input',
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение',
            className: 'form-message',
            validators: Validators,
            events: {
              input: () => {
                if (props && typeof props.onInput === 'function') {
                  props.onInput()
                }
              },
            },
          }),
        ],
        buttonSend:
          props?.buttonSend ||
          new Button({
            icon: 'fa-solid fa-circle-arrow-right',
            className: 'btn-icon btn-icon-primary btn-icon-xl',
            type: 'submit',
          }),
      }),
    })
  }

  render() {
    return this.compile(MessageInputTemplate, this.props)
  }
}
