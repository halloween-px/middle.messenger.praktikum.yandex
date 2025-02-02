import MainForm from '../../../components/form/form'
import { InputFloatingLabel } from '../../../components/input/input'
import { userInputInfoProps, userInputsPasswordsProps } from '../../../components/input/config'
import Button from '../../../components/button/button'
import { AuthTemplate } from '../auth.tmpl'
import { Block } from '../../../lib/block'
import { Validators } from '../../../utils/validators'
import { Router, RouterPath } from '../../../router/router'
import '../auth.scss'
import AuthController from '../../../controllers/auth-controller'
import { AuthSingInType } from '../../../api/auth-api'
import ButtonAsync from '../../../components/button/buttonAsync'
import { connect } from '../../../lib/connect'
import store from '../../../store/store'

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
      events: {
        click: () => {
          new Router('.app').go(RouterPath.register)
        },
      },
    }

    AuthController.logout()

    const Form = connect(state => ({ formError: state.formError }))(MainForm)

    super({
      form: new Form({
        formError: store.getState().formError,
        title: 'Вход',
        inputs: [new InputFloatingLabel(userLoginProps), new InputFloatingLabel(userPasswordProps)],
        validators: Validators,
        buttons: [new ButtonAsync(btnAuthProps), new Button(btnRegisterAccProps)],
        onSubmit(data: unknown) {
          AuthController.login(data as unknown as AuthSingInType)
        },
      }),
    })
  }

  render() {
    return this.compile(AuthTemplate, this.props)
  }
}

export default Login
