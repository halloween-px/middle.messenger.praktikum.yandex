import { Block, BlockProps } from '../../lib/block'
import { PopoverTemplate } from './popover.tmpl'
import './popover.scss'
import { renderDOM } from '../../utils/renderDom'

export interface PopoverType extends BlockProps {
  content: Block | string | Block[]
  className?: string
}

export class Popover extends Block {
  static isOpen: boolean
  constructor(props: PopoverType) {
    super(props)
  }

  open(x: number, y: number): void {
    const popoverContent = this.getContent()

    if (Popover.isOpen) {
      return
    }
    Popover.isOpen = true

    const offsetX = this.props.offsetX || 12
    const offsetY = this.props.offsetY || 12
    const popoverWidth = popoverContent.clientWidth
    const popoverHeight = popoverContent.clientHeight

    let popoverX = x
    let popoverY = y + offsetY

    if (x + popoverWidth > window.innerWidth) {
      popoverX = window.innerWidth - popoverWidth - offsetX
    }

    if (y + popoverHeight > window.innerHeight) {
      popoverY = y - popoverHeight - offsetY
    }

    popoverContent.style.left = popoverX + 'px'
    popoverContent.style.top = popoverY + 'px'

    setTimeout(() => {
      popoverContent.addEventListener('click', e => e.stopPropagation())
      document.addEventListener(
        'click',
        () => {
          popoverContent.remove()
          Popover.isOpen = false
        },
        { once: true }
      )
    }, 0)

    renderDOM('body', popoverContent)
  }

  close() {
    Popover.isOpen = false
    this.getContent().remove()
  }

  render() {
    return this.compile(PopoverTemplate, this.props)
  }
}
