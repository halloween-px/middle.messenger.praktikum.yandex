import { BaseURL } from './../../api/base-api'
import { Block, BlockProps } from '../../lib/block'
import { avatarTemplate } from './avatar.tmpl'
import './avatar.scss'

type sizeAvatar = 'default' | 'xl' | 'sm'

interface AvatarProps extends BlockProps {
  size: sizeAvatar
  name?: string
  src?: string
  changeAvatar?: boolean
}

export const getAvatar = (src: string) => {
  if (src) {
    const substring = /resourcesnull/

    if (substring.test(src)) {
      src = '/images/no_image.png'
    }

    return BaseURL + '/resources' + src
  }
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
