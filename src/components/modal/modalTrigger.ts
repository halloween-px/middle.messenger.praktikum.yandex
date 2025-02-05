import { Block } from '../../lib/block'
import { renderDOM } from '../../utils/renderDom'
import Button from '../button/button'
import { ModalTriggerTemplate } from './modal.tmpl'
import { ModalAddAndRemoveUserToChatType, Modals, ModalsType } from './modals'

interface ModalTriggerType extends ModalAddAndRemoveUserToChatType {
  modal: keyof ModalsType
  content?: Block | string
  label?: string
}

export class ModalTrigger extends Block {
  constructor(props: ModalTriggerType) {
    super({
      events: {
        click: () => {
          if (props.modal && Modals[props.modal]) {
            renderDOM('#app', Modals[props.modal](props))
          }
        },
      },
      content: props.content || new Button({ className: 'btn-primary', label: props.label }),
      ...props,
    })
  }

  render() {
    return this.compile(ModalTriggerTemplate, this.props)
  }
}
