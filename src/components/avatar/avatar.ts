import { Block } from '../../lib/block'
import { avatarTemplate } from './avatar.tmpl'
import './avatar.scss'

type sizeAvatar = 'default' | 'xl' | 'sm'

interface AvatarProps {
  size: sizeAvatar
  name?: string
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props)
  }

  render() {
    return this.compile(avatarTemplate, this.props)
  }
}

export default Avatar
