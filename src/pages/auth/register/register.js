import Handlebars from 'handlebars'
import MainForm from '../../../components/form/form'
import Input from '../../../components/input/input'
import '../auth.scss'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'

class Register {
  render() {
    const userLoginProps = {
      id: 'user_login',
      name: 'login',
      type: 'text',
      label: 'Логин',
      isRequired: true,
    }

    const userEmailProps = {
      id: 'user_email',
      name: 'email',
      type: 'text',
      label: 'Почта',
      isRequired: true,
    }

    const userPasswordProps = {
      id: 'user_password',
      name: 'password',
      type: 'password',
      label: 'Пароль',
      isRequired: true,
    }

    const userRepeatPasswordProps = {
      ...userPasswordProps,
      id: 'user_repeat_password',
      label: 'Пароль (еще раз)',
    }

    const firstNameProps = {
      id: 'user_first_name',
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      isRequired: true,
    }

    const secondNameProps = {
      id: 'user_second_name',
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      isRequired: true,
    }

    const userPhoneProps = {
      id: 'user_phone',
      name: 'phone',
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
    const userName = new Input(firstNameProps).render()
    const userEmail = new Input(userEmailProps).render()
    const userPassword = new Input(userPasswordProps).render()
    const userRepeatPassword = new Input(userRepeatPasswordProps).render()
    const userPhone = new Input(userPhoneProps).render()
    const userSubName = new Input(secondNameProps).render()
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
    return template({ form })
  }
}

export default Register
