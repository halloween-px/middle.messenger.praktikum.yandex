import { connect } from '../../lib/connect'
import store from '../../store/store'
import Button, { ButtonProps } from './button'

class ButtonAsync extends Button {
  constructor(props: ButtonProps) {
    super({
      ...props,
      isLoading: store.getState().loading.button,
    })
  }
}

export default connect(state => ({ isLoading: state.loading.button }))(ButtonAsync)
