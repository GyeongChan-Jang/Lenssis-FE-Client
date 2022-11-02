import ViewMoreBtn from '../main/common/ViewMoreBtn'
import { useGetAllReview } from './hooks/useReview'
import MainReviewCard from './MainReviewCard'
import MobileReviewCard from './mobile/MobileReviewCard'

export interface reviewItemType {
  color: string
  content: string
  createdAt: string
  email: string
  graphicDiameter: number
  period: number
  productImageUrl: string
  productName: string
  rating: number
  reviewImageUrl: string
}

const MainReview = () => {
  const allReview = useGetAllReview()
  return (
    <div className=" bg-white rounded-[5px]">
      <div className="flex justify-center items-center text-[24px] ">
        <span className="px-2 border-b-[5px] h-[45px] border-solid border-[#0B0954] mt-[20px] mb-[50px] font-[700] hover:cursor-pointer xs-max:text-[18px] ">
          Review
        </span>
      </div>
      {/* 웹 */}
      <div className="xs-max:hidden flex flex-wrap gap-6 max-w-[1280px] justify-between xl:justify-center mx-12">
        {allReview?.map((review: reviewItemType, idx: number) => (
          <MainReviewCard key={idx} review={review} />
        ))}
      </div>
      {/* 모바일 */}
      <div className="xs:hidden  flex flex-wrap justify-center gap-[8px] max-w-[1280px] mx-auto">
        {allReview?.map((review: reviewItemType, idx: number) => (
          <MobileReviewCard key={idx} review={review} />
        ))}
      </div>
      <ViewMoreBtn moveTo="/review" />
    </div>
  )
}

export default MainReview
