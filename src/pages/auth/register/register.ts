import MainForm from '../../../components/form/form'
import { InputFloatingLabel } from '../../../components/input/input'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'
import { userInputInfoProps, userInputsPasswordsProps } from '../../../components/input/config'
import { Block } from '../../../lib/block'
import '../auth.scss'
import { Validators } from '../../../utils/validators'
import userAuthController from '../../../controllers/auth-controller'
import { AuthSignUpType } from '../../../api/auth-api'
import buttonAsync from '../../../components/button/buttonAsync'

class Register extends Block {
  constructor() {
    const { userLoginProps, userEmailProps, firstNameProps, secondNameProps, userPhoneProps } = userInputInfoProps
    const { userPasswordProps, userRepeatPasswordProps } = userInputsPasswordsProps
    const btnAuthProps = { className: 'btn-link', label: 'Вход' }
    const btnRegisterProps = { className: 'btn-primary', label: 'Зарегистрироваться', type: 'submit' }

    const userLogin = new InputFloatingLabel(userLoginProps)
    const userName = new InputFloatingLabel(firstNameProps)
    const userEmail = new InputFloatingLabel(userEmailProps)
    const userPassword = new InputFloatingLabel(userPasswordProps)
    const userRepeatPassword = new InputFloatingLabel(userRepeatPasswordProps)
    const userPhone = new InputFloatingLabel(userPhoneProps)
    const userSubName = new InputFloatingLabel(secondNameProps)
    const btnRegister = new buttonAsync(btnRegisterProps)
    const btnAuth = new Button(btnAuthProps)

    super({
      form: new MainForm({
        inputs: [userEmail, userLogin, userName, userSubName, userPhone, userPassword, userRepeatPassword],
        buttons: [btnRegister, btnAuth],
        title: 'Регистрация',
        validators: Validators,
        onSubmit: async data => {
          userAuthController.register(data as unknown as AuthSignUpType)
        },
      }),
    })
  }

  render() {
    return this.compile(AuthTemplate, this.props)
  }
}

export default Register
