import { useEffect, useRef, useState } from 'react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Scrollbar } from 'swiper'
import { useGetProductRandom } from '../../main/hooks/useProductLists'
import { useUser } from '../../auth/hooks/useUser'

const MobilePoductRecommend = ({ productId }: any) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null)
  const { user } = useUser()
  const data = useGetProductRandom(user?.memberId!, productId)

  SwiperCore.use([Navigation, Scrollbar])
  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        scrollbar: { draggable: true },
        pagination: { clickable: true },
        slidesPerView: 2,
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

  return (
    <div className="pb-5 relative border-solid border-[#1B304A] border-b-2">
      {swiperSetting && (
        <Swiper {...swiperSetting} style={{ borderRadius: '15px', padding: '20px 0' }}>
          <div className=" flex w-full justify-between ">
            {data.map((img: any, index: number) => (
              <div key={index}>
                <SwiperSlide key={index}>
                  <img width={130} height={130} src={img?.colorAndImage[0].imageUrl} alt="recommend-image" />
                </SwiperSlide>
              </div>
            ))}
          </div>
        </Swiper>
      )}
    </div>
  )
}

export default MobilePoductRecommend
