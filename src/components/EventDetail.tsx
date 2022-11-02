import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CardTemplate from './common/ui/CardTemplate'
import PageLayout from './common/ui/PageLayout'
import { EventDetailSkeleton } from './common/ui/Skeleton'
import { useAddCoupon } from './event/hooks/useAddCoupon'
import { useGetDetailEvent } from './main/hooks/useEventLists'
import { EventDetailResponseType } from './main/types/eventTypes'

function EventDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [startTime, setStartTime] = useState('')

  const { data: detailEvent, isFetching } = useGetDetailEvent(state as number)

  const addCouponMutate = useAddCoupon()

  const clickEventBtn = () => {
    addCouponMutate(5)
  }

  useEffect(() => {
    if (detailEvent && detailEvent[0]) {
      const time = new Date(detailEvent[0].startTime)
      const year = time.getFullYear()
      const month = time.getMonth()
      const day = time.getDate()
      setStartTime(`${year}년 ${month}월 ${day}일`)
    }
  }, [detailEvent])
  return (
    <PageLayout layoutWidth="max-w-[1180px]" innerTop="top-[40%]">
      <CardTemplate title="이벤트" isTitleVisible={true}>
        {isFetching ? (
          <EventDetailSkeleton />
        ) : (
          detailEvent &&
          detailEvent.map((item: EventDetailResponseType) => (
            <div key={item.imageUrl}>
              <div className="flex items-center py-4 border-t-[1px] border-solid">
                <div className="font-[500] ml-10 mr-28">제목</div>
                <div className="font-[500]">{item.eventTitle}</div>
              </div>
              <div className="flex items-center py-4 border-t-[1px] border-b-[1px] border-solid">
                <div className="font-[500] ml-10 mr-24">작성자</div>
                <div className="font-[500]">렌시스 관리자</div>
              </div>
              <div className="flex justify-end items-center py-2">
                <span className="font-[500] mr-2">작성일</span>
                <span className="text-lenssisGray font-[500] mr-6">{startTime}</span>
              </div>
              <div className=" flex flex-col items-center my-8">
                <img src={item.imageUrl} alt="event-image" />
                <button
                  className="my-8 xs-max:w-[200px] xs-max:h-[50px] w-[300px] h-[80px] text-[20px] text-[#fff] font-bold bg-lenssisSky rounded-md drop-shadow-basic"
                  onClick={clickEventBtn}
                >
                  쿠폰 발급받기
                </button>
              </div>
              <div className="border-b-[1px] border-solid pb-12"></div>
              <button
                className="w-[150px] h-[40px] my-4 font-[600] rounded-md border-none bg-[#1B304A] text-white"
                onClick={() => navigate(-1)}
              >
                목록
              </button>
            </div>
          ))
        )}
      </CardTemplate>
    </PageLayout>
  )
}

export default EventDetail
