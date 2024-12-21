import './profile.scss'
import { userInputInfoProps, userInputsPasswordsProps } from '../../components/input/config'
import { InputGroup } from '../../components/input/input'
import Button from '../../components/button/button'
import { Block } from '../../lib/block'
import Avatar from '../../components/avatar/avatar'
import MainForm from '../../components/form/form'
import { Link } from '../../components/link/link'
import { ProfileTemplate } from './profile.tmlp'
import { Validators } from '../../utils/validators'

//Скорее всего реализация обновления пропсов неправильная, но по другому я не придумал пока что, так что кнопка назад совершенно не работает

class Profile extends Block {
  constructor() {
    const getInputsInfo = (changeUserInfo = true) => {
      const { userLoginProps, userEmailProps, firstNameProps, secondNameProps, userPhoneProps, userDisplayNameProps } =
        userInputInfoProps

      const userLogin = new InputGroup({
        ...userLoginProps,
        isReadonly: changeUserInfo,
        value: 'ivanivanov',
      })
      const userEmail = new InputGroup({
        ...userEmailProps,
        isReadonly: changeUserInfo,
        value: 'pochta@yandex.ru',
      })
      const firstName = new InputGroup({
        ...firstNameProps,
        isReadonly: changeUserInfo,
        value: 'Иван',
      })
      const secondName = new InputGroup({
        ...secondNameProps,
        isReadonly: changeUserInfo,
        value: 'Иванов',
      })
      const userPhone = new InputGroup({
        ...userPhoneProps,
        isReadonly: changeUserInfo,
        value: '+79099673030',
      })
      const userDisplayName = new InputGroup({
        ...userDisplayNameProps,
        isReadonly: changeUserInfo,
        value: 'Иван',
      })

      return [userLogin, userEmail, firstName, secondName, userPhone, userDisplayName]
    }

    const getInputsPassword = () => {
      const { userOldPasswordProps, userNewPasswordProps, userRepeatNewPasswordProps } = userInputsPasswordsProps

      const userOldPassword = new InputGroup({
        ...userOldPasswordProps,
        value: '00000000',
      })
      const userNewPassword = new InputGroup({
        ...userNewPasswordProps,
        value: '00000000',
      })
      const userRepeatNewPassword = new InputGroup({
        ...userRepeatNewPasswordProps,
        value: '00000000',
      })

      return [userOldPassword, userNewPassword, userRepeatNewPassword]
    }

    const defaultInputs = getInputsInfo()

    super({
      buttonBack: new Button({
        icon: 'fa-sharp fa-solid fa-circle-arrow-left',
        className: 'btn-icon btn-icon-xl btn-icon-primary',
        events: {
          click: () => {
            if (defaultInputs === this.children.form.lists.inputs) {
              window.location.hash = ''
            } else {
              this.children.form.setLists({
                inputs: defaultInputs,
                buttons: [],
              })
              this.setProps({ links: true })
            }
          },
        },
      }),
      avatar: new Avatar({ size: 'xl', name: 'Иван' }),
      form: new MainForm({
        inputs: defaultInputs,
        classNames: 'form-plain',
        validators: Validators,
      }),
      linkChangeData: new Link({
        label: 'Изменить данные',
        href: '#',
        className: 'link-primary',
        onClick: () => {
          const inputs = getInputsInfo(false)
          this.children.form.setLists({
            inputs,
            buttons: [
              new Button({
                label: 'Сохранить',
                className: 'btn-primary text-center',
                type: 'submit',
              }),
            ],
          })

          this.setProps({
            links: false,
          })
        },
      }),
      linkChangePassword: new Link({
        label: 'Изменить пароль',
        href: '#',
        className: 'link-primary',
        onClick: () => {
          const inputs = getInputsPassword()
          this.children.form.setLists({
            inputs,
            buttons: [new Button({ label: 'Сохранить', className: 'btn-primary text-center', type: 'submit' })],
          })
          this.setProps({
            links: false,
          })
        },
      }),
      linkExit: new Link({
        label: 'Выйти',
        href: '#',
        className: 'link-red',
      }),
      links: true,
    })
  }

  render() {
    return this.compile(ProfileTemplate, this.props)
  }
}

export default Profile
