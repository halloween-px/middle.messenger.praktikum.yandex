import { Block, BlockProps } from '../../lib/block'
import { InputSearch } from '../input/input'
import {
  convarsationTemplate,
  conversationHeaderTemplate,
  conversationListTemplate,
  conversationSearchTemplate,
} from './conversation.tmpl'
import './conversation.scss'
import { convertDataToTime } from '../../utils/helpres'

export interface ConversionType extends BlockProps {
  id: number
  title: string
  avatar: Block
  unread_count: number
  created_by?: number
  active?: boolean
  last_message: {
    user?: {
      first_name?: string
      second_name?: string
      avatar?: string
      email?: string
      login?: string
      phone?: string
    }
    time: string
    content: string
  }
}

interface ConversationHeaderProps {
  avatar: Block
  title: string
  users: Block[]
  actions: Block[]
}

interface ConversationListProps {
  conversations: Block[]
}

export class Conversation extends Block {
  constructor(props: ConversionType) {
    super({
      ...props,
      last_message: {
        ...props.last_message,
        time: convertDataToTime(props.last_message.time),
      },
    })
  }

  render() {
    return this.compile(convarsationTemplate, this.props)
  }
}

export class ConversationList extends Block {
  constructor(props: ConversationListProps) {
    super(props)
  }

  render() {
    return this.compile(conversationListTemplate, this.props)
  }
}

export class ConversationHeader extends Block {
  constructor(props: ConversationHeaderProps) {
    super(props)
  }

  render() {
    return this.compile(conversationHeaderTemplate, this.props)
  }
}

export class ConversationSearch extends Block {
  constructor() {
    super({
      input: new InputSearch({
        id: 'conversation_search_input',
        name: 'conversation_search_input',
        type: 'text',
        placeholder: ' ',
      }),
    })
  }

  render() {
    return this.compile(conversationSearchTemplate, this.props)
  }
}
