import { useNavigate } from 'react-router'
import { EventSkeleton } from '../common/ui/Skeleton'
import ViewMoreBtn from '../main/common/ViewMoreBtn'
import { useGetEvent } from '../main/hooks/useEventLists'
import { InEventMainList } from '../main/types/eventTypes'

const MainEvent = () => {
  const navigate = useNavigate()

  const { data: eventList, isFetching } = useGetEvent()

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
          eventList?.data?.eventMainList.slice(0, 4).map((event: InEventMainList) => (
            <div
              key={event.eventId}
              className="relative w-full h-[330px] xs-max:h-[215px] rounded-xl flex flex-col items-start my-2 shadow-basic hover:cursor-pointer"
              onClick={() => navigate('/event')}
            >
              <img
                className="w-full h-[145px] md:h-[226px] rounded-t-xl object-fit md:object-cover overflow-hidden"
                src={event.imageUrl}
                alt="event-image"
              />
              {event.topFixed === 0 && (
                <span className="absolute bottom-[70px] right-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5611 5.49511L15.1442 1.0782C14.681 0.615224 14.0595 0.344982 13.4051 0.32192C12.7506 0.298857 12.1117 0.524688 11.617 0.953917C11.1224 1.38315 10.8088 1.98388 10.7395 2.63509C10.6701 3.2863 10.8501 3.93961 11.2432 4.46339L11.0385 4.69394L6.96939 6.48154L5.19383 5.52207C5.00001 5.41764 4.77718 5.37998 4.5598 5.41491C4.34242 5.44985 4.14261 5.55543 3.99127 5.71533L2.26013 7.54885C2.08025 7.73749 1.98156 7.98918 1.9853 8.24982C1.98903 8.51045 2.09488 8.75922 2.28009 8.94263L6.51699 13.1795L0.318359 19.3781V20.3209H1.2612L7.45979 14.1223L11.6773 18.3398C11.8598 18.5234 12.1064 18.6288 12.3652 18.6338C12.6239 18.6388 12.8744 18.543 13.0638 18.3666L14.915 16.6528C15.0784 16.5018 15.1867 16.3005 15.2227 16.0809C15.2588 15.8613 15.2205 15.636 15.1139 15.4406L14.1412 13.6548L15.8967 9.8831L16.2551 9.45316C16.7864 9.82119 17.4361 9.97718 18.0766 9.89047C18.7171 9.80376 19.302 9.48062 19.7164 8.98456C20.1307 8.48849 20.3445 7.8554 20.3158 7.2097C20.2871 6.564 20.0178 5.9524 19.5611 5.49511ZM18.6182 8.21321C18.3828 8.44858 18.0635 8.58081 17.7306 8.58081C17.3977 8.58081 17.0785 8.44858 16.8431 8.21321L16.1395 7.50959L14.7611 9.16293L12.6485 13.7021L13.8188 15.8508L12.3934 17.1704L3.45186 8.22884L4.78527 6.81668L6.90909 7.96437L11.8421 5.79725L13.0579 4.42789L12.4263 3.79614C12.1966 3.55958 12.0691 3.24214 12.0716 2.91241C12.074 2.58269 12.2061 2.26715 12.4392 2.03399C12.6724 1.80083 12.9879 1.66877 13.3176 1.66635C13.6474 1.66393 13.9648 1.79134 14.2014 2.02105L18.6183 6.43795C18.8536 6.67336 18.9858 6.99262 18.9858 7.3255C18.9858 7.65838 18.8536 7.97764 18.6183 8.21305L18.6182 8.21321Z"
                      fill="#D3D3D3"
                    />
                  </svg>
                </span>
              )}
              <div className=" h-[95px] rounded-b-xl ml-4 mt-[16px] font-bold">{event.eventTitle}</div>
            </div>
          ))
        )}
      </div>
      <ViewMoreBtn moveTo="/event" />
    </div>
  )
}

export default MainEvent
