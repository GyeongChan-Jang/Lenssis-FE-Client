import { useEffect, useRef, useState } from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import { RecommendResponse } from '../hooks/useRecommend'
import RecommendCard from './RecommendCard'
import { useRecoilValue } from 'recoil'
import { CurrentInnerWidth } from '../../../store/currentInnerWidth'

interface PropsType {
  recommendProductLists: RecommendResponse[]
}

function RecommendBanner({ recommendProductLists }: PropsType) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null)
  const windowWidth = useRecoilValue(CurrentInnerWidth)
  SwiperCore.use([Navigation, Pagination, Autoplay])
  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 10,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current
        },
        scrollbar: { draggable: true },
        pagination: { clickable: true },
        slidesPerView: 1,
        loop: true,
        autoplay: { delay: 20000, disableOnInteraction: true },
        watchOverflow: true,
        onBeforeInit: (swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
          }
          swiper.navigation.update()
        }
      })
    }
  }, [swiperSetting])

  if (windowWidth >= 1280) {
    const swiperSetting = {
      spaceBetween: 10,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current
      },
      slidesPerView: 4,
      loop: true,
      autoplay: { delay: 20000, disableOnInteraction: true }
    }
    return (
      <div className="w-[90%] mx-auto px-4 relative pb-[50px]">
        <button ref={prevRef} className="absolute top-[45%] left-[-40px] z-[2] hover:color-white">
          <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="18"
              cy="17.5"
              r="17.1874"
              transform="rotate(-180 18 17.5)"
              fill="white"
              fillOpacity="0.5"
              stroke="#1B304A"
              strokeWidth="0.625141"
            />
            <path
              d="M22.5 25L13.5 17.5L22.5 10"
              stroke="#1B304A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {swiperSetting && (
          <Swiper {...swiperSetting} style={{ borderRadius: '15px', padding: '20px 0' }}>
            {recommendProductLists.map((item: RecommendResponse, index: number) => (
              <div key={index}>
                <SwiperSlide
                  key={index}
                  style={{
                    width: '250px',
                    height: '355px',
                    borderRadius: '15px',
                    padding: '10px',
                    border: '1px solid #efefef',
                    margin: '0 auto 50px' // 수치 변경
                  }}
                >
                  <>
                    <img
                      src={item.imageUrl}
                      alt="recommend-image"
                      style={{
                        width: '230px',
                        height: '280px',
                        margin: '0 auto',
                        borderRadius: '15px'
                      }}
                    />

                    <RecommendCard price={item.price} discount={item.discount} name={item.name} />
                  </>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        )}
        <button ref={nextRef} className="absolute top-[45%] right-[-40px] z-[1] hover:color-white">
          <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              r="17.1874"
              transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 18 17.5)"
              fill="white"
              fillOpacity="0.5"
              stroke="#1B304A"
              strokeWidth="0.625141"
            />
            <path
              d="M13.5 25L22.5 17.5L13.5 10"
              stroke="#1B304A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    )
  } else {
    SwiperCore.use([Scrollbar])
    const swiperSetting = {
      spaceBetween: 10,
      scrollbar: { draggable: true },
      loop: true,
      autoplay: { delay: 2000000, disableOnInteraction: true }
    }
    return (
      <div className="w-[96%] mx-auto  relative">
        {swiperSetting && (
          <Swiper
            {...swiperSetting}
            slidesPerView={2}
            style={{ borderRadius: '15px', padding: '20px', margin: '0px 0px 30px 0px' }}
          >
            {recommendProductLists.map((item: RecommendResponse, index: number) => (
              <div key={index}>
                <SwiperSlide
                  key={index}
                  style={{
                    width: '170px',
                    height: '250px',
                    borderRadius: '15px',
                    padding: '2.5px 5px 1px 5px',
                    border: '1px solid #efefef',
                    margin: '5px 5px 50px 0px' // 수치 변경
                  }}
                >
                  <>
                    <img
                      src={item.imageUrl}
                      alt="recommend-image"
                      style={{
                        width: '160px',
                        height: '200px',
                        margin: '0 auto',
                        borderRadius: '15px'
                      }}
                    />

                    <RecommendCard price={item.price} discount={item.discount} name={item.name} />
                  </>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        )}
      </div>
    )
  }
}
export default RecommendBanner
