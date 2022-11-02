import { useReducer, useState } from 'react'
import { NoticeTitles } from '../../../../constants/NoticeTitles'
import NoticeLists from '../NoticeLists'
import { initialState } from '../utils/InitialState'
import { reducer } from '../utils/ReducerFunc'

interface Title {
  title: string
  value: number
}

function MainNoticeTab() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [requestNumber, setRequestNumber] = useState(0)
  return (
    <>
      <div className="overflow-y-scroll flex  xs:text-center border-b-[1px] border-solid border-lenssisLightGray">
        {NoticeTitles.map((title: Title, index: number) => (
          <button
            onClick={() => {
              dispatch({ type: title.value })
              setRequestNumber(title.value)
            }}
            key={`${title}-${index}`}
            className={`w-[100px] xs:w-[200px] py-[4px] px-2 mx-[2px] xs:mx-auto whitespace-nowrap ${
              state[title.value]
            }`}
          >
            {title.title}
          </button>
        ))}
      </div>
      <NoticeLists requestNumber={requestNumber} />
    </>
  )
}

export default MainNoticeTab
