import { Block } from '../../lib/block'
import { sidebarChatTemplate } from './sidebar.tmpl'
import './sidebar.scss'

interface SidebarChatProps {
  conversationSearch: Block
  conversationList: Block
  button: Block
}

export class SidebarChat extends Block {
  constructor(props: SidebarChatProps) {
    super(props)
  }

  render() {
    return this.compile(sidebarChatTemplate, this.props)
  }
}
