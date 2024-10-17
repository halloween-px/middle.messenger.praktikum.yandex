import Handlebars from 'handlebars'
import { ProfileTemplate } from './profile.tmlp'
import './profile.scss'
import {
  userInputInfoProps,
  userInputsPasswordsProps,
} from '../../components/input/config'
import { InputGroup } from '../../components/input/input'
import Button from '../../components/button/button'

class Profile {
  constructor({ content }) {
    this.content = content
    this.changeUserInfo = false
    this.changePassword = false
    this.noChange = true
    this.activeLink = 'home-profile'

    this.render()
    this.initNavigation()
    this.initBackLink()
  }

  getInputsInfo() {
    const {
      userLoginProps,
      userEmailProps,
      firstNameProps,
      secondNameProps,
      userPhoneProps,
      userDisplayNameProps,
    } = userInputInfoProps

    const userLogin = new InputGroup({
      ...userLoginProps,
      isReadonly: !this.changeUserInfo,
      value: 'ivanivanov',
    }).render()
    const userEmail = new InputGroup({
      ...userEmailProps,
      isReadonly: !this.changeUserInfo,
      value: 'pochta@yandex.ru',
    }).render()
    const firstName = new InputGroup({
      ...firstNameProps,
      isReadonly: !this.changeUserInfo,
      value: 'Иван',
    }).render()
    const secondName = new InputGroup({
      ...secondNameProps,
      isReadonly: !this.changeUserInfo,
      value: 'Иванов',
    }).render()
    const userPhone = new InputGroup({
      ...userPhoneProps,
      isReadonly: !this.changeUserInfo,
      value: '+7 (909) 967 30 30',
    }).render()
    const userDisplayName = new InputGroup({
      ...userDisplayNameProps,
      isReadonly: !this.changeUserInfo,
      value: 'Иван',
    }).render()

    return [
      userLogin,
      userEmail,
      firstName,
      secondName,
      userPhone,
      userDisplayName,
    ]
  }

  getInputsPassword() {
    const {
      userOldPasswordProps,
      userNewPasswordProps,
      userRepeatNewPasswordProps,
    } = userInputsPasswordsProps

    const userOldPassword = new InputGroup({
      ...userOldPasswordProps,
      value: '00000000',
    }).render()
    const userNewPassword = new InputGroup({
      ...userNewPasswordProps,
      value: '00000000',
    }).render()
    const userRepeatNewPassword = new InputGroup({
      ...userRepeatNewPasswordProps,
      value: '00000000',
    }).render()

    return this.changePassword
      ? [userOldPassword, userNewPassword, userRepeatNewPassword]
      : null
  }

  initBackLink() {
    const backLink = document.querySelector('.back-link')
    if (!backLink) return

    backLink.addEventListener('click', () => {
      if (this.activeLink === 'home-profile') {
        location.hash = ''
      } else {
        this.activeLink = 'home-profile'
        this.changeUserInfo = false
        this.changePassword = false
        this.noChange = true
        this.render()
        this.initNavigation()
        this.initBackLink()
      }
    })
  }

  initNavigation() {
    const profileNavigaton = document.querySelectorAll('[data-profile-link]')

    if (!profileNavigaton) return

    profileNavigaton.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        this.activeLink = link.getAttribute('data-profile-link')
        if (this.activeLink === 'changeData') {
          this.changeUserInfo = true
          this.changePassword = false
          this.noChange = false
        }
        if (this.activeLink === 'changePassword') {
          this.changeUserInfo = false
          this.changePassword = true
          this.noChange = false
        }

        this.render()
        this.initBackLink()
      })
    })
  }

  render() {
    const inputsUserInfo = this.getInputsInfo()
    const inputsUserPassword = this.getInputsPassword()
    const buttonSave = new Button({
      className: 'btn-primary btn-save',
      label: 'Cохранить',
    }).render()

    this.content.innerHTML = Handlebars.compile(ProfileTemplate)({
      inputsUserInfo,
      inputsUserPassword,
      buttonSave,
      changeUserInfo: this.changeUserInfo,
      changePassword: this.changePassword,
      noChange: this.noChange,
    })
  }
}

export default Profile
