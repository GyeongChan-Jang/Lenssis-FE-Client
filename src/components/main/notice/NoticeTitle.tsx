import { useLocation } from 'react-router-dom'
import MainNoticeTab from './tabs/MainNoticeTab'
import NoticePageTab from './tabs/NoticePageTab'

function NoticeTitle() {
  const location = useLocation()

  return (
    <>
      {location.pathname.includes('notice') ? (
        <>
          <NoticePageTab />
        </>
      ) : (
        <>
          <MainNoticeTab />
        </>
      )}
    </>
  )
}
export default NoticeTitle
