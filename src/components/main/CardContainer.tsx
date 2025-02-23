import { useState } from 'react'
import Card from '../common/Card'
import { ProductPropsType, ProductResponseType } from './types/productTypes'
import Pagination from './common/Pagination'
import { useRecoilValue } from 'recoil'
import { ProductMainSkeleton, ProductNewSkeleton } from '../common/ui/Skeleton'
import { filterOptionState } from '../../store/filterVallue'

const CardContainer = ({
  data,
  productLists,
  fetching,
  allProductCurrentPage,
  newProductCurrentPage,
  setAllProductCurrentPage,
  setNewProductCurrentPage,
  currentPost
}: any) => {
  const filterValue = useRecoilValue(filterOptionState)
  // 필터링된 상품 리스트입니다.

  const [filteredProductCurrentPage, setFilteredProductCurrentPage] = useState(1)
  // console.log(productLists)
  return (
    <>
      {data !== 'New' ? (
        <>
          <div className="flex justify-center">
            <span className=" h-[45px] text-center font-[600] px-2 text-[18px] md:text-[24px] mt-[20px] mb-[50px] border-b-[5px] border-solid border-[#1B304A]">
              {data}
            </span>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 w-[98%] md:w-[96%] mx-auto  md:gap-x-[12px] ">
            {fetching ? (
              <ProductMainSkeleton count={9} />
            ) : (
              productLists &&
              productLists
                .slice(0, 9)
                .map((item: ProductResponseType, idx: number) => (
                  <Card
                    key={`${item.productId}-${idx}`}
                    idx={idx}
                    colorAndImage={item.colorAndImage}
                    productId={item.productId}
                    series={item.name}
                    price={item.price}
                    discount={item.discount}
                    graphicDiameter={item.graphicDiameter}
                    isFavorite={item.isFavorite}
                  />
                ))
            )}
          </div>
          {productLists && productLists[0] && (
            <Pagination
              currentPage={allProductCurrentPage}
              setCurrentPage={setAllProductCurrentPage}
              allCount={productLists[0].totalCount}
              divide={9}
            />
          )}
        </>
      ) : data && data === 'New' ? (
        <>
          <div className="flex justify-center ">
            <span className=" h-[45px] text-center font-[600] px-2 text-[18px] md:text-[24px] mt-[20px] mb-[50px] border-b-[5px] border-solid border-[#1B304A]">
              {data}
            </span>
          </div>
          <div className="grid grid-cols-2 justify-items-center xl:grid-cols-4 w-[98%] md:w-[96%] mx-auto  md:gap-x-[12px]">
            {fetching ? (
              <ProductNewSkeleton count={8} />
            ) : (
              currentPost &&
              currentPost?.map((item: ProductPropsType, idx: number) => (
                <Card
                  idx={idx}
                  key={`${item.productId}-${idx}`}
                  colorAndImage={item.colorAndImage}
                  productId={item.productId}
                  series={item.series}
                  price={item.price}
                  discount={item.discount}
                  graphicDiameter={item.graphicDiameter}
                  isFavorite={item.isFavorite}
                />
              ))
            )}
          </div>
          {productLists.totalCount && (
            <Pagination
              currentPage={newProductCurrentPage}
              setCurrentPage={setNewProductCurrentPage}
              allCount={productLists.totalCount}
              divide={8}
            />
          )}
        </>
      ) : null}
    </>
  )
}

export default CardContainer
