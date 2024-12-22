import { Block } from '../../lib/block'
import { LinkTemplate } from './link.tmpl'
import './link.scss'

interface LinkProps {
  href: string
  label: string
  className: string
  onClick?: (e: Event) => void
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: e => {
          e.preventDefault()
          if (props.onClick) {
            props.onClick(e)
          }
        },
      },
    })
  }

  render() {
    return this.compile(LinkTemplate, this.props)
  }
}
