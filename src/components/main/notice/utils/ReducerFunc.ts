interface ActionType {
  type: number
}

interface InitialState {
  [key: number]: string
}

export const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case 0:
      return {
        ...state,
        0: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 1:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 2:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 3:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 4:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 5:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark',
        6: 'border-b-0 font-[600] text-lenssisStroke'
      }
    case 6:
      return {
        ...state,
        0: 'border-b-0 font-[600] text-lenssisStroke',
        1: 'border-b-0 font-[600] text-lenssisStroke',
        2: 'border-b-0 font-[600] text-lenssisStroke',
        3: 'border-b-0 font-[600] text-lenssisStroke',
        4: 'border-b-0 font-[600] text-lenssisStroke',
        5: 'border-b-0 font-[600] text-lenssisStroke',
        6: 'border-b-[5px] border-solid border-lenssisDark font-[700] text-lenssisDark'
      }
  }
  return state
}
