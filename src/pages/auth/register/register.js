import Handlebars from 'handlebars'
import MainForm from '../../../components/form/form'
import Input from '../../../components/input/input'
import '../auth.scss'
import Button from '../../../components/button/button'
import { TemplateRegister } from './register.tmpl'

class Register {
  render() {
    const userLoginProps = {
      name: 'user-name',
      type: 'text',
      label: 'Логин',
      isRequired: true,
    }

    const userEmailProps = {
      name: 'user-email',
      type: 'text',
      label: 'Почта',
      isRequired: true,
    }

    const userPasswordProps = {
      name: 'user-password',
      type: 'password',
      label: 'Пароль',
      isRequired: true,
    }

    const userRepeatPasswordProps = {
      name: 'user-repeat-password',
      type: 'password',
      label: 'Пароль (еще раз)',
    }

    const userNameProps = {
      name: 'user-name',
      type: 'text',
      label: 'Имя',
      isRequired: true,
    }

    const userSubNameProps = {
      name: 'user-subname',
      type: 'text',
      label: 'Фамилия',
      isRequired: true,
    }

    const userPhoneProps = {
      name: 'user-phone',
      type: 'text',
      label: 'Телефон',
      isRequired: true,
    }

    const btnAuthProps = {
      className: 'btn-link',
      label: 'Вход',
    }

    const btnRegisterProps = {
      className: 'btn-primary',
      label: 'Зарегистрироваться',
    }

    const userLogin = new Input(userLoginProps).render()
    const userName = new Input(userNameProps).render()
    const userEmail = new Input(userEmailProps).render()
    const userPassword = new Input(userPasswordProps).render()
    const userRepeatPassword = new Input(userRepeatPasswordProps).render()
    const userPhone = new Input(userPhoneProps).render()
    const userSubName = new Input(userSubNameProps).render()
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
    const template = Handlebars.compile(TemplateRegister)
    return template({ form })
  }
}

export default Register
