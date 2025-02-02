import { Block } from '../lib/block'

export const renderDOM = (query: string, block: Block | HTMLElement) => {
  const root = document.querySelector(query)
  const content = block instanceof Block ? block.getContent() : block

  if (root && content) {
    root.insertAdjacentElement('beforeend', content)

    if (block instanceof Block) {
      block.componentDidMount()
    }
  }
}
