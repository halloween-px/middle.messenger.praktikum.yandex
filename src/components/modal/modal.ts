import { Block } from '../../lib/block'
import { ModalTemplate } from './modal.tmpl'
import './modal.scss'
import { renderDOM } from '../../utils/renderDom'

export interface ModalType {
  content?: Block | string
  className?: string
}

export class Modal extends Block {
  constructor(props: ModalType) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement
          if (!target.closest('.modal-dialog')) {
            this.getContent().remove()
          }
        },
      },
    })
  }

  open() {
    renderDOM('#app', this.getContent())
  }

  render() {
    return this.compile(ModalTemplate, this.props)
  }
}
