import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useRefreshToken } from '../components/auth/hooks/useRefreshToken'
import { useUser } from '../components/auth/hooks/useUser'
import Event from '../components/event/MainEvent'
import Footer from '../components/footer/Footer'
import { getStoredToken } from '../components/local-storage/userStorage'
import CardContainer from '../components/main/CardContainer'
import FilterBar from '../components/main/filterbar/FilterBar'
import MobileFilter from '../components/main/filterbar/mobile/MobileFilter'
import { useGetNewProduct, useGetProductsList } from '../components/main/hooks/useProductLists'
import MainCartModal from '../components/main/MainCartModal'
import Recommend from '../components/main/Recommend'
import MainReview from '../components/review/MainReview'
import { filterOptionState } from '../store/filterVallue'
import { filteredProudcts } from '../store/filterVallue'
import Banner from './../components/Banner'
import { filterOpenState } from './../store/filterOpen'
import NoticePage from './NoticePage'

const Main = () => {
  const refreshToken = useRefreshToken()
  const [filterOpen, setFilterOpen] = useRecoilState(filterOpenState)
  const [title, setTitle] = useState<string>('Best')
  const filteredProducts = useRecoilValue(filteredProudcts)
  const MobileFilterRef = useRef<HTMLDivElement>(null)
  const filterValue = useRecoilValue(filterOptionState)

  const [allProductCurrentPage, setAllProductCurrentPage] = useState(1)
  const [newProductCurrentPage, setNewProductCurrentPage] = useState(1)

  const [currentPost, setCurrentPost] = useState([])
  const indexOfLast = newProductCurrentPage * 8
  const indexOfStart = indexOfLast - 8
  const { user } = useUser()

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!MobileFilterRef.current?.contains(target as Node) && filterOpen) {
      console.log('click outside')
      setFilterOpen(false)
    }
  }

  const toColorTest = useCallback(() => {
    window.location.href =
      'https://www.lenssiscolor.com/?utm_source=homapage_main&utm_medium=personal+color&utm_campaign=personal+color'
  }, [])

  const toTopHandler = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // 메인에서 filterbar를 클릭했을 때 데이터 변경하는 함수입니다.
  const changeTitle = () => {
    if (
      filterValue.periodState.length !== 0 ||
      filterValue.graphicDiameterState.length !== 0 ||
      filterValue.colorState.length !== 0 ||
      filterValue.seriesState.length !== 0 ||
      filterValue.featureState.length !== 0
    ) {
      setTitle(() => 'Products')
    } else {
      setTitle(() => 'Best')
    }
  }

  // 전체 상품 불러오기
  const { data: productLists, isFetching: allProductFetching } = useGetProductsList(
    allProductCurrentPage,
    user ? user?.memberId : 0
  )

  const { data: newProductLists, isFetching: newProductFetching } = useGetNewProduct(
    user ? user?.memberId : 0
  )

  useEffect(() => {
    setCurrentPost(newProductLists?.slice(indexOfStart, indexOfLast))
  }, [newProductLists, newProductCurrentPage])
  useEffect(() => {
    changeTitle()
  }, [filteredProducts, title])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const token = getStoredToken()
    refreshToken(token)
  }, [])

  return (
    <>
      <div className="max-w-[1180px] mx-auto pb-10 ">
        <div className="relative">
          <Banner />
          <section className="flex justify-between  xs-max:my-[20px] my-[30px]">
            <div className="xs-max:hidden hidden lg:block xl:block w-[280px] mr-[20px]">
              <FilterBar />
            </div>
            {filterOpen && (
              <div
                ref={MobileFilterRef}
                className="xs:hidden mobile-filter fixed left-0 top-[100px] z-10 w-full animate-drop"
              >
                <MobileFilter />
              </div>
            )}
            <div className="w-[880px] xs-max:w-[95%] xs-max:mx-auto  border-none rounded-md shadow-basic bg-white">
              {(filterValue.periodState.length !== 0 ||
                filterValue.graphicDiameterState.length !== 0 ||
                filterValue.colorState.length !== 0 ||
                filterValue.seriesState.length !== 0 ||
                filterValue.featureState.length !== 0) &&
              filteredProducts.productData.length === 0 ? (
                <CardContainer data="찾으시는 상품이 없습니다" />
              ) : filterValue.periodState.length !== 0 ||
                filterValue.graphicDiameterState.length !== 0 ||
                filterValue.colorState.length !== 0 ||
                filterValue.seriesState.length !== 0 ||
                filterValue.featureState.length !== 0 ? (
                <CardContainer data={title} productLists={filteredProducts.productData} />
              ) : (
                <CardContainer
                  data={title}
                  productLists={productLists}
                  allProductCurrentPage={allProductCurrentPage}
                  setAllProductCurrentPage={setAllProductCurrentPage}
                  fetching={allProductFetching}
                />
              )}
            </div>
          </section>
          <div
            onClick={toColorTest}
            className="w-full h-auto mb-[30px] mx-auto border-none rounded-md shadow-basic object-fit md:object-cover overflow-hidden cursor-pointer"
          >
            <img
              src="https://user-images.githubusercontent.com/90392240/193073587-58b90f5a-e06c-4f2c-baec-87351fbf4b96.png"
              alt="color-test-banner"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full xs-max:w-[95%] xs-max:mx-auto border-none rounded-md pb-1 shadow-basic bg-white">
            <CardContainer
              data="New"
              currentPost={currentPost}
              productLists={newProductLists}
              newProductCurrentPage={newProductCurrentPage}
              setNewProductCurrentPage={setNewProductCurrentPage}
              fetching={newProductFetching}
            />
          </div>
          <div className="w-full xs-max:w-[95%] xs-max:mx-auto xs-max:my-[20px] my-[30px] border-none rounded-md  shadow-basic bg-white">
            <Event />
          </div>
          <div className="w-full xs-max:w-[95%] xs-max:mx-auto xs-max:my-[20px] my-[30px] border-none rounded-md  shadow-basic bg-white">
            <Recommend />
          </div>
          <div className="w-full xs-max:w-[95%] xs-max:mx-auto xs-max:my-[20px] my-[30px] border-none drop-shadow-basic">
            <MainReview />
          </div>
          <div className="w-full xs-max:w-[95%] xs-max:mx-auto xs-max:my-[20px] my-[30px] border-none rounded-md shadow-basic bg-white">
            <NoticePage />
          </div>
          <MainCartModal />
        </div>
      </div>
      <div className="xs-max:hidden flex justify-end mt-[-60px] mb-[-70px] mr-2">
        <span className="hover:cursor-pointer">
          <img className="inline" src={'/assets/toTopBtn.png'} onClick={toTopHandler} alt="to-top-btn" />
        </span>
      </div>
      <Footer />
    </>
  )
}

export default Main
