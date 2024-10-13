import Handlebars from 'handlebars'
import { TemplateLogin } from './login.tmpl'
import MainForm from '../../../components/form/form'
import Input from '../../../components/input/input'
import '../auth.scss'
import Button from '../../../components/button/button'

class Login {
  render() {
    const userLoginProps = {
      name: 'user-name',
      type: 'text',
      label: 'Логин',
      isRequired: true,
    }
    const userPasswordProps = {
      name: 'user-password',
      type: 'password',
      label: 'Пароль',
      isRequired: true,
    }

    const btnAuthProps = {
      className: 'btn-primary',
      label: 'Авторизоваться',
    }

    const btnRegisterAccProps = {
      className: 'btn-link btn-text-sm',
      label: 'Нет аккаунта',
    }

    const userName = new Input(userLoginProps).render()
    const userPassword = new Input(userPasswordProps).render()
    const btnAuth = new Button(btnAuthProps).render()
    const btnRegisterAcc = new Button(btnRegisterAccProps).render()

    const loginFormProps = {
      inputs: [userName, userPassword],
      buttons: [btnAuth, btnRegisterAcc],
      title: 'Вход',
    }
    const form = new MainForm(loginFormProps).render()

    const template = Handlebars.compile(TemplateLogin)
    return template({ form })
  }
}

export default Login
