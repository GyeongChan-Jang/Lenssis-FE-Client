import EventCard from './Card'
import { useNavigate } from 'react-router-dom'

import { EventSkeleton } from '../common/ui/Skeleton'
import ViewMoreBtn from '../main/common/ViewMoreBtn'
import { useGetEvent } from '../main/hooks/useEventLists'
import { InEventMainList } from '../main/types/eventTypes'

const MainEvent = () => {
  const { data: eventList, isFetching } = useGetEvent()
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-center text-[24px] ">
        <span className="px-2 h-[45px] border-b-[5px] border-solid border-[#1B304A] text-[18px] md:text-[24px] mt-[25px] mb-[50px] font-[600] hover:cursor-pointer">
          Event
        </span>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mx-2 md:gap-8 md:px-12">
        {isFetching ? (
          <EventSkeleton count={4} />
        ) : (
          eventList?.data?.eventMainList
            .slice(0, 4)
            .map((event: InEventMainList) => (
              <EventCard key={event.eventId} event={event} navigate={() => navigate('/event')} />
            ))
        )}
      </div>
      <ViewMoreBtn moveTo="/event" />
    </div>
  )
}

export default MainEvent
