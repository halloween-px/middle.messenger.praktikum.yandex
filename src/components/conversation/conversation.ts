import { Block } from '../../lib/block'
import { InputSearch } from '../input/input'
import {
  convarsationTemplate,
  conversationHeaderTemplate,
  conversationListTemplate,
  conversationSearchTemplate,
} from './conversation.tmpl'
import './conversation.scss'

interface ConversionPorps {
  avatar: Block
  name: string
  lastTime: string
  message: string
  unreadCnt: string
}

interface ConversationHeaderProps {
  avatar: Block
  name: string
  actions: Block[]
}

interface ConversationListProps {
  conversation: Block[]
}

export class Conversation extends Block {
  constructor(props: ConversionPorps) {
    super(props)
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
