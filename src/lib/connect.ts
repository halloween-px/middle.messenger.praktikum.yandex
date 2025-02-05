import store, { StoreEvent, StoreType } from '../store/store'
import { isEmpty, isEqual } from '../utils/helpres'
import { Block, BlockProps } from './block'

type Indexed<T = unknown> = {
  [key: string]: T
}

export function connect<T extends BlockProps>(mapStateToProps: (state: StoreType) => Indexed) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: T) {
        let state = mapStateToProps(store.getState())
        super({ ...props, ...state })

        store.on(StoreEvent.Updated, () => {
          let newState = mapStateToProps(store.getState())

          if (!isEqual(state, newState)) {
            const newList: Record<string, unknown> = {}
            Object.entries(newState).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                newList[key] = value
              }
            })

            if (!isEmpty(newList)) {
              this.setLists(newList)
            }

            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}
