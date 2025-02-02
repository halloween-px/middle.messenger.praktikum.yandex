import { Block } from '../lib/block'
import { renderDOM } from '../utils/renderDom'

interface Props {
  rootQuery: string
  [key: string]: unknown
}

export class Route {
  pathname: string
  blockClass: typeof Block
  block: Block | null
  props: Props

  constructor(pathname: string, block: typeof Block, props: Props) {
    this.pathname = pathname
    this.blockClass = block
    this.block = null
    this.props = props
  }

  match(pathname: string) {
    return pathname === this.pathname
  }

  leave() {
    if (this.block) {
      this.block.hide()
    }
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass()
      renderDOM(this.props.rootQuery, this.block)
      return
    }

    this.block.show()
  }
}
