import EventCard from '../components/event/Card'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../components/common/ui/PageLayout'
import { EventSkeleton } from '../components/common/ui/Skeleton'
import { useGetEvent } from '../components/main/hooks/useEventLists'
import { InEventMainList } from '../components/main/types/eventTypes'

import CardTemplate from './../components/common/ui/CardTemplate'
import Pagination from './../components/main/common/Pagination'
function EventPage() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPost, setCurrentPost] = useState<InEventMainList[]>([])
  const indexOfLast = currentPage * 8
  const indexOfStart = indexOfLast - 8

  const { data: eventList, isFetching } = useGetEvent()

  useEffect(() => {
    if (eventList) {
      setCurrentPost(eventList?.data?.eventMainList.slice(indexOfStart, indexOfLast))
    }
  }, [eventList, currentPage])

  return (
    <>
      <PageLayout layoutWidth="max-w-[1180px]" innerTop="top-[40%]">
        <CardTemplate title="이벤트" isTitleVisible={true}>
          <div className=" grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-items-stretch xs-max:gap-y-[20px] md:gap-8 md:px-12">
            {isFetching ? (
              <EventSkeleton count={4} />
            ) : (
              <>
                {currentPost &&
                  currentPost.map((event: InEventMainList) => (
                    <EventCard
                      key={event.eventId}
                      event={event}
                      navigate={() => navigate(`/event/${event.eventId}`, { state: event.eventId })}
                    />
                  ))}
              </>
            )}
          </div>
          <div className="relative flex justify-center items-center">
            {eventList?.data?.totalCount && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                allCount={eventList.data.totalCount || 1}
                divide={8}
              />
            )}
          </div>
        </CardTemplate>
      </PageLayout>
    </>
  )
}

export default EventPage
