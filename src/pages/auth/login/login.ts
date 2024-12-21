import MainForm from '../../../components/form/form'
import { InputFloatingLabel } from '../../../components/input/input'
import { userInputInfoProps, userInputsPasswordsProps } from '../../../components/input/config'
import '../auth.scss'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'
import { Block } from '../../../lib/block'
import { Validators } from '../../../utils/validators'

class Login extends Block {
  constructor() {
    const { userLoginProps } = userInputInfoProps
    const { userPasswordProps } = userInputsPasswordsProps
    const btnAuthProps = {
      className: 'btn-primary',
      label: 'Авторизоваться',
      type: 'submit',
    }

    const btnRegisterAccProps = {
      className: 'btn-link',
      label: 'Нет аккаунта',
    }

    super({
      form: new MainForm({
        title: 'Вход',
        inputs: [new InputFloatingLabel(userLoginProps), new InputFloatingLabel(userPasswordProps)],
        validators: Validators,
        buttons: [
          new Button({
            ...btnAuthProps,
          }),
          new Button(btnRegisterAccProps),
        ],
      }),
    })
  }

  render() {
    return this.compile(AuthTemplate, this.props)
  }
}

export default Login
// content: any

//   constructor({ content }) {
//     this.content = content

//     this.render()
//   }

//   render() {
//     const { userLoginProps } = userInputInfoProps
//     const { userPasswordProps } = userInputsPasswordsProps

//     const btnAuthProps = {
//       className: 'btn-primary',
//       label: 'Авторизоваться',
//     }

//     const btnRegisterAccProps = {
//       className: 'btn-link',
//       label: 'Нет аккаунта',
//     }

//     const userName = new InputFloatingLabel(userLoginProps).render()
//     const userPassword = new InputFloatingLabel(userPasswordProps).render()
//     const btnAuth = new Button(btnAuthProps)

//     const btnRegisterAcc = new Button(btnRegisterAccProps).render()

//     const loginFormProps = {
//       inputs: [userName, userPassword],
//       buttons: [btnAuth.render(), btnRegisterAcc],
//       title: 'Вход',
//     }
//     const form = new MainForm(loginFormProps).render()

//     setTimeout(() => {
//       btnAuth.setProps({
//         label: 'Hellooooo',
//       })
//     }, 1000)

//     const template = Handlebars.compile(AuthTemplate)
//     this.content.innerHTML = template({ form })
//   }
