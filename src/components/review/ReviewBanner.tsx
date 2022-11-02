import { useEffect, useRef, useState } from 'react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import leftArrow from '/assets/leftArrow.svg'
import rightArrow from '/assets/rightArrow.svg'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

const ReviewBanner = () => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null)

  SwiperCore.use([Navigation])
  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 20,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current
        },

        slidesPerView: 6,
        loop: true,

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

  const reviewImgs = [
    'https://user-images.githubusercontent.com/90392240/192992410-a6215ba1-b464-4c3b-ba32-c961ff1468ac.png',
    'https://user-images.githubusercontent.com/90392240/192993730-42fa0211-0cc7-4b7a-8032-f53d6166b032.png',
    'https://user-images.githubusercontent.com/90392240/192992448-24080e81-e4fd-432a-9995-be1369e4ee1a.png',
    'https://user-images.githubusercontent.com/90392240/192992466-2113cc74-e9ca-4c00-9a31-c435276a06c8.png',
    'https://user-images.githubusercontent.com/90392240/192992483-8154bb2b-7315-4a27-a37c-ee587767cc1a.png',
    'https://user-images.githubusercontent.com/90392240/192992502-124b6e7f-1f96-4b67-81f8-591bd729bd09.png'
  ]

  return (
    <div className="py-6 relative">
      <button ref={prevRef} className="absolute top-[42%] left-[-20px] z-[9] hover:color-white">
        <img src={leftArrow} alt="" />
      </button>
      {swiperSetting && (
        <Swiper {...swiperSetting}>
          <div className=" flex w-full justify-between ">
            {reviewImgs.map((img: string, index: number) => (
              <div key={index}>
                <SwiperSlide key={index}>
                  <img src={img} className="rounded-[5px]" width={175} alt="review-image" />
                </SwiperSlide>
              </div>
            ))}
          </div>
        </Swiper>
      )}
      <button ref={nextRef} className="absolute top-[42%] right-[-20px] z-[9] hover:color-white">
        <img src={rightArrow} alt="arrow-right" />
      </button>
    </div>
  )
}

export default ReviewBanner
