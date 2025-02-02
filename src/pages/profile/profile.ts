import './profile.scss'
import { userInputInfoProps, userInputsPasswordsProps } from '../../components/input/config'
import { InputGroup } from '../../components/input/input'
import Button from '../../components/button/button'
import { Block } from '../../lib/block'
import Avatar, { getAvatar } from '../../components/avatar/avatar'
import MainForm from '../../components/form/form'
import { Link } from '../../components/link/link'
import { ProfileTemplate } from './profile.tmlp'
import { Validators } from '../../utils/validators'
import { Router, RouterPath } from '../../router/router'
import authController from '../../controllers/auth-controller'
import { ModalChangeAvatar } from '../../components/modal/modals'
import userController, { UserPasswordType, UserType } from '../../controllers/user-controller'
import { connect } from '../../lib/connect'
import store from '../../store/store'

class Profile extends Block {
  constructor() {
    userController.getUser()

    const _Avatar = connect(state => ({
      src: getAvatar(state.user?.avatar as string),
      size: 'xl',
      name: state.user?.first_name,
      changeAvatar: true,
      events: {
        click: () => {
          new ModalChangeAvatar({ changeAvatarType: 'changeUser' }).open()
        },
      },
    }))(Avatar)

    const getInputsInfo = (changeUserInfo = true) => {
      const { userLoginProps, userEmailProps, firstNameProps, secondNameProps, userPhoneProps, userDisplayNameProps } =
        userInputInfoProps

      const userLogin = new InputGroup({
        ...userLoginProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.login,
      })
      const userEmail = new InputGroup({
        ...userEmailProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.email,
      })
      const firstName = new InputGroup({
        ...firstNameProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.first_name,
      })
      const secondName = new InputGroup({
        ...secondNameProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.second_name,
      })
      const userPhone = new InputGroup({
        ...userPhoneProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.phone,
      })
      const userDisplayName = new InputGroup({
        ...userDisplayNameProps,
        isReadonly: changeUserInfo,
        value: store.getState().user?.display_name,
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

    let defaultInputs = getInputsInfo()

    const _Form = connect(state => {
      defaultInputs = getInputsInfo()
      const nameForm = state.formName as 'change-profile-data' | 'change-profile-password'

      return {
        formError: state.formError,
        inputs: defaultInputs,
        classNames: 'form-plain',
        validators: Validators,
        onSubmit: async (data: UserType | UserPasswordType) => {
          if (nameForm === 'change-profile-data') {
            await userController.changeProfile(data as UserType)
            this.children.form.setLists({
              inputs: defaultInputs,
              buttons: [],
            })
            this.setProps({ links: true })
          }

          if (nameForm === 'change-profile-password') {
            const passwords = data as UserPasswordType

            try {
              await userController.changePassword({
                oldPassword: passwords.oldPassword,
                newPassword: passwords.password as string,
              })
              this.children.form.setLists({
                inputs: defaultInputs,
                buttons: [],
              })
              this.setProps({ links: true })
            } catch (error) {
              const err = error as Record<string, string>
              if (err.reason === 'Password is incorrect') {
                store.set('formError', 'Некоректный пароль')
              }
            }
          }
        },
      }
    })(MainForm)

    super({
      buttonBack: new Button({
        icon: 'fa-sharp fa-solid fa-circle-arrow-left',
        className: 'btn-icon btn-icon-xl btn-icon-primary',
        events: {
          click: () => {
            if (defaultInputs === this.children.form.lists.inputs) {
              new Router().go(RouterPath.chat)
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
      avatar: new _Avatar({}),
      form: new _Form({}),
      linkChangeData: new Link({
        label: 'Изменить данные',
        href: '#',
        className: 'link-primary',
        onClick: () => {
          store.set('formName', 'change-profile-data')
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
          store.set('formName', 'change-profile-password')
          const inputs = getInputsPassword()
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
      linkExit: new Link({
        label: 'Выйти',
        href: '#',
        className: 'link-red',
        onClick: () => {
          authController.logout()
        },
      }),
      links: true,
    })
  }

  render() {
    return this.compile(ProfileTemplate, this.props)
  }
}

export default connect(() => ({}))(Profile)
