import { Router, RouterPath } from '../../router/router'
import Button from './button'

class ButtonProfile extends Button {
  constructor() {
    super({
      label: 'Профиль',
      className: 'btn-link-plain text-end',
      icon: 'fa-solid fa-chevron-right',
      events: {
        click: () => {
          new Router().go(RouterPath.profile)
        },
      },
    })
  }
}

export default ButtonProfile
