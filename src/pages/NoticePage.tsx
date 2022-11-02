import { Outlet, useLocation } from 'react-router'
import PageLayout from '../components/common/ui/PageLayout'
import ViewMoreBtn from '../components/main/common/ViewMoreBtn'
import MainNotice from '../components/main/notice/MainNotice'
import NoticeTitle from '../components/main/notice/NoticeTitle'
import CardTemplate from './../components/common/ui/CardTemplate'

function NoticePage() {
  const location = useLocation()

  return (
    <>
      {location.pathname.includes('notice') === false ? (
        <div className="max-w-[1180px] mx-auto">
          <div className="w-[90%] mx-auto">
            <MainNotice />
            <Outlet />
            <ViewMoreBtn moveTo="/notice/mustread" />
          </div>
        </div>
      ) : (
        <PageLayout layoutWidth="max-w-[1180px]" innerTop="top-[30%]">
          <CardTemplate title="공지사항" isTitleVisible={true}>
            <NoticeTitle />
            <Outlet />
          </CardTemplate>
        </PageLayout>
      )}
    </>
  )
}

export default NoticePage
