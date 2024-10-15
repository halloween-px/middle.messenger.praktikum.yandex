import Handlebars from 'handlebars'
import MainForm from '../../../components/form/form'
import { InputFloatingLabel } from '../../../components/input/input'
import '../auth.scss'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'
import {
  userInputInfoProps,
  userInputsPasswordsProps,
} from '../../../components/input/config'

class Register {
  constructor({ content }) {
    this.content = content

    this.render()
  }

  render() {
    const {
      userLoginProps,
      userEmailProps,
      firstNameProps,
      secondNameProps,
      userPhoneProps,
    } = userInputInfoProps

    const { userPasswordProps, userRepeatPasswordProps } =
      userInputsPasswordsProps

    const btnAuthProps = {
      className: 'btn-link',
      label: 'Вход',
    }

    const btnRegisterProps = {
      className: 'btn-primary',
      label: 'Зарегистрироваться',
    }

    const userLogin = new InputFloatingLabel(userLoginProps).render()
    const userName = new InputFloatingLabel(firstNameProps).render()
    const userEmail = new InputFloatingLabel(userEmailProps).render()
    const userPassword = new InputFloatingLabel(userPasswordProps).render()
    const userRepeatPassword = new InputFloatingLabel(
      userRepeatPasswordProps
    ).render()
    const userPhone = new InputFloatingLabel(userPhoneProps).render()
    const userSubName = new InputFloatingLabel(secondNameProps).render()
    const btnRegister = new Button(btnRegisterProps).render()
    const btnAuth = new Button(btnAuthProps).render()

    const loginFormProps = {
      inputs: [
        userEmail,
        userLogin,
        userName,
        userSubName,
        userPhone,
        userPassword,
        userRepeatPassword,
      ],
      buttons: [btnRegister, btnAuth],
      title: 'Регистрация',
    }

    const form = new MainForm(loginFormProps).render()
    const template = Handlebars.compile(AuthTemplate)
    this.content.innerHTML = template({ form })
  }
}

export default Register
