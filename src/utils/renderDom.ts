import { Block } from '../lib/block'

export const renderDOM = (query: string, block: Block) => {
  const root = document.querySelector(query)
  const content = block.getContent()

  if (root && content) {
    root.insertAdjacentElement('beforeend', content)
    block.componentDidMount()
  }
}
