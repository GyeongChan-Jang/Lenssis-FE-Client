import { useRecoilValue } from 'recoil'
import { CurrentInnerWidth } from '../../store/currentInnerWidth'
import { RecommendSkeleton } from '../common/ui/Skeleton'
import { useGetRecommendProduct } from './hooks/useRecommend'
import RecommendBanner from './recommend/RecommendBanner'

const Recommend = () => {
  const windowWidth = useRecoilValue(CurrentInnerWidth)
  const { data: recommendProductLists, isFetching } = useGetRecommendProduct()
  return (
    <div>
      <div className="flex justify-center items-center text-[24px]  ">
        <span className="px-2 h-[45px] border-b-[5px] border-solid border-[#1B304A] text-[18px] md:text-[24px] mt-[20px] mb-[40px] font-[600] hover:cursor-pointer">
          Recommend
        </span>
      </div>
      <div className="flex">
        {isFetching ? (
          windowWidth > 440 ? (
            <RecommendSkeleton count={4} />
          ) : (
            <RecommendSkeleton count={2} />
          )
        ) : (
          <RecommendBanner recommendProductLists={recommendProductLists} />
        )}
      </div>
    </div>
  )
}

export default Recommend
