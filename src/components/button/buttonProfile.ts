import Button from './button'

class ButtonProfile extends Button {
  constructor() {
    super({
      label: 'Профиль',
      className: 'btn-link-plain text-end',
      icon: 'fa-regular fa-chevron-right',
      events: {
        click: () => {
          console.log('Переход в профиль')
        },
      },
    })
  }
}

export default ButtonProfile
