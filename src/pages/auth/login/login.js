import Handlebars from 'handlebars'
import MainForm from '../../../components/form/form'
import { InputFloatingLabel } from '../../../components/input/input'
import {
  userInputInfoProps,
  userInputsPasswordsProps,
} from '../../../components/input/config'
import '../auth.scss'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'

class Login {
  constructor({ content }) {
    this.content = content

    this.render()
  }

  render() {
    const { userLoginProps } = userInputInfoProps
    const { userPasswordProps } = userInputsPasswordsProps

    const btnAuthProps = {
      className: 'btn-primary',
      label: 'Авторизоваться',
    }

    const btnRegisterAccProps = {
      className: 'btn-link btn-text-sm',
      label: 'Нет аккаунта',
    }

    const userName = new InputFloatingLabel(userLoginProps).render()
    const userPassword = new InputFloatingLabel(userPasswordProps).render()
    const btnAuth = new Button(btnAuthProps).render()
    const btnRegisterAcc = new Button(btnRegisterAccProps).render()

    const loginFormProps = {
      inputs: [userName, userPassword],
      buttons: [btnAuth, btnRegisterAcc],
      title: 'Вход',
    }
    const form = new MainForm(loginFormProps).render()

    const template = Handlebars.compile(AuthTemplate)
    this.content.innerHTML = template({ form })
  }
}

export default Login
