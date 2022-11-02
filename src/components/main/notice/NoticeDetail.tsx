import { useLocation, useNavigate } from 'react-router'

import CardTemplate from '../../common/ui/CardTemplate'
import { useGetDetailNotice } from '../hooks/useNotice'
import { MainBoardList } from '../types/noticeTypes'
import PageLayout from './../../common/ui/PageLayout'

function NoticeDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { data } = useGetDetailNotice(state as number)

  return (
    <>
      <PageLayout layoutWidth="max-w-[1180px]" innerTop="top-[300px]">
        <CardTemplate title="공지사항" isTitleVisible={true}>
          <div className="w-[100%]">
            {data &&
              data?.map((item: MainBoardList) => (
                <div key={item.createdAt}>
                  <div className="flex items-center py-8 border-t-[1px] border-solid">
                    <div className="ml-10 mr-28">제목</div>
                    <div className="text-lenssisDeepGray">{item.boardTitle}</div>
                  </div>
                  <div className="flex items-center py-8 border-t-[1px] border-b-[1px] border-solid">
                    <div className="ml-10 mr-24">작성자</div>
                    <div className="text-lenssisDeepGray">렌시스 관리자</div>
                  </div>
                  <div className="flex justify-end items-center py-4">
                    <span className="font-bold mr-2">작성일</span>
                    <span className="text-lenssisDeepGray mr-6">{item.createdAt}</span>
                  </div>
                  <div className="border-b-[1px] ` border-solid pb-12">
                    <div
                      className="ml-4 w-[70%] text-lenssisGray"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  <button
                    className="w-[150px] h-[40px] my-4 font-[600] rounded-md border-none bg-[#1B304A] text-white"
                    onClick={() => navigate(-1)}
                  >
                    목록
                  </button>
                </div>
              ))}
          </div>
        </CardTemplate>
      </PageLayout>
    </>
  )
}

export default NoticeDetail
