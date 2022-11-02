import ReviewMobileBanner from '../components/review/mobile/ReviewMobileBanner'
import ReviewBanner from '../components/review/ReviewBanner'
import ReviewContainer from '../components/review/ReviewContainer'
import Pagination from '../components/main/common/Pagination'
import { useState } from 'react'
import { useGetForProductId, useGetReviewByName } from '../components/review/hooks/useReview'
import { useRecoilValue } from 'recoil'
import { selectedNameState } from '../store/review'

interface NameAndProductId {
  productId: number
  name: string
}

const ReviewPage = () => {
  const { forProductId } = useGetForProductId()
  const reviewItems = useRecoilValue(selectedNameState)
  const [allProductCurrentPage, setAllProductCurrentPage] = useState(1)
  const { GetReviewByNameMutate } = useGetReviewByName()

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget
    GetReviewByNameMutate(value)
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="max-w-[1180px] container pt-44 pb-10 mx-auto ">
          <div className="lg:w-full mx-auto flex-col flex-wrap drop-shadow-basic rounded-[10px] p-8 xs-max:w-[95%] bg-white">
            <div className="text-center mt-4 mb-6 font-bold text-[20px] xs-max:pb-20 pb-20">리뷰</div>
            <select
              name="상품명"
              className="border-solid border-[1px] border-r-0 border-lenssisStroke text-lenssisGray w-[245px] h-[40px] rounded-[5px] pl-[20px] appearance-none bg-[url('/assets/selectArrow.svg')] bg-no-repeat bg-right"
              onChange={selectHandler}
            >
              <option value="all">すべての製品</option>
              {forProductId?.data.data.map((item: NameAndProductId) => (
                <option key={item.productId} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* 웹 */}
            <div className="xs-max:hidden">
              <ReviewBanner />
            </div>
            {/* 모바일 */}
            <div className="xs:hidden">
              <ReviewMobileBanner />
            </div>
            <ReviewContainer />
            <Pagination
              divide={1}
              allCount={reviewItems.length || 1}
              currentPage={1}
              setCurrentPage={setAllProductCurrentPage}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReviewPage
