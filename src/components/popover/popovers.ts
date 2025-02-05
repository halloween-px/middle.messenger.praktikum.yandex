import userController from '../../controllers/user-controller'
import { Block } from '../../lib/block'
import { ModalTrigger } from '../modal/modalTrigger'
import { Popover, PopoverType } from './popover'

export type NamePopover = 'popover-chat-header' | 'popover-chat-message'

export type PopoversType = {
  [key in NamePopover]: (props?: PopoverType) => Popover
}

class PopoverChatHeader extends Popover {
  constructor(props?: PopoverType) {
    const DeleteButton = userController.isAdmin()
      ? new ModalTrigger({
          label: 'Удалить пользователя',
          modal: 'modal-add-and-remove-user-to-chat',
          variant: 'remove-user',
        })
      : ''

    super({
      ...props,
      className: 'popover-header-chat',
      content: [
        new ModalTrigger({
          label: 'Добавить пользователя',
          modal: 'modal-add-and-remove-user-to-chat',
          variant: 'add-user',
        }),
        DeleteButton as Block,
      ],
    })
  }
}

export const Popovers: PopoversType = {
  'popover-chat-header': props => new PopoverChatHeader(props),
  'popover-chat-message': props => new PopoverChatHeader(props),
}
