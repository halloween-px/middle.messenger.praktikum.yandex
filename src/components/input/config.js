export const userInputInfoProps = {
  userLoginProps: {
    id: 'user_login',
    name: 'login',
    type: 'text',
    label: 'Логин',
    isRequired: true,
  },

  userEmailProps: {
    id: 'user_email',
    name: 'email',
    type: 'text',
    label: 'Почта',
    isRequired: true,
  },

  firstNameProps: {
    id: 'user_first_name',
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    isRequired: true,
  },

  secondNameProps: {
    id: 'user_second_name',
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    isRequired: true,
  },

  userPhoneProps: {
    id: 'user_phone',
    name: 'phone',
    type: 'text',
    label: 'Телефон',
    isRequired: true,
  },

  userDisplayNameProps: {
    id: 'user_display_name',
    name: 'display_name',
    type: 'text',
    label: 'Имя в чате',
    isRequired: true,
  },
}

const userPasswordProps = {
  id: 'user_password',
  name: 'password',
  type: 'password',
  label: 'Пароль',
  isRequired: true,
}

export const userInputsPasswordsProps = {
  userPasswordProps,

  userRepeatPasswordProps: {
    ...userPasswordProps,
    id: 'user_repeat_password',
    label: 'Пароль (еще раз)',
  },

  userOldPasswordProps: {
    ...userPasswordProps,
    id: 'user_old_password',
    name: 'oldPassword',
    label: 'Старый пароль',
  },

  userNewPasswordProps: {
    ...userPasswordProps,
    id: 'user_new_password',
    name: 'newPassword',
    label: 'Новый пароль',
  },

  userRepeatNewPasswordProps: {
    ...userPasswordProps,
    id: 'user_repeat_new_password',
    name: 'repeatNewPassword',
    label: 'Новый пароль',
  },
}
