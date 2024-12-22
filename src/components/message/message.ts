import { Block } from '../../lib/block'
import { MessageInputTemplate, MessageListTemplate, MessageSeporatorTemplate, MessageTemplate } from './message.tmpl'
import './message.scss'
import Button from '../button/button'
import { Input } from '../input/input'
import { Validators } from '../../utils/validators'
import { FormMessage } from '../form/form'

interface MessageProps {
  direction: 'incoming' | 'outgoing'
  message: string
  className?: string
  check: boolean
  time: string
}

interface MessageListProps {
  messages: Block[]
}

interface MessageInputProps {
  buttonMedia?: Block
  input?: Block
  buttonSend?: Block
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
      check: props.direction === 'outgoing' && props.check,
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
          props?.buttonMedia || new Button({ icon: 'fa-regular fa-paperclip', className: 'btn-icon btn-icon-xl' }),
        inputs: [
          new Input({
            id: 'message-input',
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение',
            className: 'form-message',
            validators: Validators,
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
