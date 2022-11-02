import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import FillHeart from '/assets/FillHeart.svg'
import Heart from '/assets/Heart.svg'
import { MainCartModalState } from '../../store/mainCart'
import {
  FinalProduct,
  finalProductState,
  productByOptionsState,
  ProductByOptionsType
} from '../../store/productByOptions'
import { productDetailsState } from '../../store/productDetails'
import { ProductDetailsType } from '../../store/productDetails'
import { selectProduct } from '../../store/selectProduct'
import { axiosInstance, getJWTToken } from '../axiosinstance'
import { useAddCart } from '../cart/hooks/useCart'
import { getStoredToken } from '../local-storage/userStorage'
import { useAddFavorite, useDeleteFavorite } from '../main/hooks/useFavorite'
import { ProductDetailResponseType } from '../main/types/productTypes'
import OptionAndCount from './OptionAndCount'

interface PropsType {
  isClose?: boolean
  productDetails?: ProductDetailResponseType
  productId: number
  memberId?: number
}

const token = getStoredToken()

const ProductInfo = ({ isClose, productDetails, productId, memberId }: PropsType) => {
  const [detailState, setDetailState] = useRecoilState<ProductDetailsType>(productDetailsState)
  const [productByOptions, setProductByOptions] = useRecoilState<ProductByOptionsType>(productByOptionsState)
  const [optionComplete, setOptionComplete] = useState<boolean>(true)
  const [finalProduct, setFinalProduct] = useRecoilState<FinalProduct>(finalProductState)
  const [favorite, setFavorite] = useState<boolean>(false)
  const { addCartMutate } = useAddCart()
  const addFavor = useAddFavorite()
  const deleteFavor = useDeleteFavorite()
  const resetOptions = useResetRecoilState(productDetailsState)
  const [selectedProduct, setSelectedProduct] = useRecoilState(selectProduct)
  const [finalOption, setFinalOption] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    resetOptions()
  }, [])
  const setModalState = useSetRecoilState(MainCartModalState)

  const getProductByOptions = async (detailState: ProductDetailsType) => {
    const { data } = await axiosInstance({
      method: 'GET',
      url:
        detailState.colorCode == ''
          ? '/productDetails/byPeriodOption'
          : detailState.graphicDiameter == 0
          ? '/productDetails/byColorCodeOption'
          : detailState.degree?.length === 0
          ? '/productDetails/byGraphicOption'
          : '',
      params: {
        productId: productId,
        period: detailState.period !== 0 ? detailState.period : undefined,
        colorCode: detailState.colorCode !== '' ? detailState.colorCode : undefined,
        graphicDiameter: detailState.graphicDiameter !== 0 ? detailState.graphicDiameter : undefined
      },
      headers: token ? getJWTToken(token) : undefined
    })
    return data
  }

  const { mutate: selectOptionMutate } = useMutation(
    (detailState: ProductDetailsType) => getProductByOptions(detailState),
    {
      mutationKey: ['productByOptions', detailState],
      onSuccess: (data) => {
        console.log(data)
        setProductByOptions({ ...productByOptions, ...data.data })
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  const postProductByOptions = async (detailState: ProductDetailsType) => {
    const { data } = await axiosInstance({
      method: 'POST',
      url: '/productDetails/byDetailsOption',
      params: {
        memberId: memberId
      },
      data: {
        colorCode: detailState.colorCode,
        degree: detailState?.degree[0],
        graphicDiameter: detailState.graphicDiameter,
        period: detailState.period,
        productId: productId
      },
      headers: getJWTToken(token)
    })
    return data
  }

  const { mutate: postAllOptions } = useMutation(
    (detailState: ProductDetailsType) => postProductByOptions(detailState),
    {
      mutationKey: ['postAllOptions'],
      onSuccess: (data) => {
        setFinalProduct({ ...finalProduct, ...data.data, pcs: 1 })
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  const optionHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    if (e.currentTarget)
      if (name === 'period') {
        selectOptionMutate({ ...detailState, [name]: Number(value) })
        if (detailState.period === Number(value)) {
          setDetailState({
            ...detailState,
            period: 0
          })
        } else {
          setDetailState(() => ({
            ...detailState,
            period: Number(value)
          }))
        }
      } else if (name === 'color') {
        selectOptionMutate({ ...detailState, colorCode: value })
        if (detailState.colorCode === value) {
          setDetailState({
            ...detailState,
            colorCode: ''
          })
        } else {
          setDetailState(() => ({
            ...detailState,
            colorCode: value
          }))
        }
      } else if (name === 'graphicDiameter') {
        selectOptionMutate({ ...detailState, graphicDiameter: Number(value) })
        if (detailState.graphicDiameter === Number(value)) {
          setDetailState({
            ...detailState,
            graphicDiameter: 0
          })
        } else {
          setDetailState(() => ({
            ...detailState,
            graphicDiameter: Number(value)
          }))
        }
      } else if (name === 'degree') {
        const degreeInfo = value.split(',').map(Number)
        setDetailState({
          ...detailState,
          degree: degreeInfo
        })

        setFinalOption(true)
      }
  }

  const addCartHandler = () => {
    addCartMutate(finalProduct.productDetailsId)
    setModalState((prev) => (prev = false))
    resetOptions()
  }

  const favoriteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const productId = Number(e.currentTarget.value)
    setTimeout(() => {
      if (!favorite) {
        addFavor(productId)
      }
    }, 500)
    setFavorite((prev) => !prev)
    if (favorite) {
      deleteFavor(productId)
    }
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/noImage.jpeg'
  }

  useEffect(() => {
    resetOptions()
  }, [])

  useEffect(() => {
    if (productDetails?.isFavorite === 1) {
      setFavorite(true)
    } else {
      setFavorite(false)
    }
  }, [])

  useEffect(() => {
    setOptionComplete(
      detailState.period !== 0 && detailState.colorCode !== '' && detailState.graphicDiameter !== 0
        ? false
        : true
    )

    if (detailState.period === 0) setFinalOption(false)
    // 도수 선택시 detailState 값이 변경되지 않는문제 -> useEffect로 감시
    if (finalProduct.productName === '' && detailState.graphicDiameter) postAllOptions(detailState)
  }, [productDetails?.price, productByOptions, detailState, finalProduct])

  const buyHandler = () => {
    if (finalOption) {
      setSelectedProduct([
        {
          color: finalProduct.color,
          colorCode: detailState.colorCode!,
          degree: detailState.degree[0],
          graphicDiameter: detailState.graphicDiameter!,
          imageUrl: finalProduct.imageUrlList[0].imageUrl,
          discount: finalProduct.discount,
          name: finalProduct.productName,
          period: detailState.period,
          price: productDetails?.price!,
          productDetailsId: finalProduct.productDetailsId,
          stock: detailState.degree[0],
          pcs: finalProduct.pcs
        }
      ])
      navigate('/payment')
    } else {
      alert('옵션을 선택해주세요.')
    }
    navigate('/payment')
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden relative">
      {isClose && (
        <img
          className="absolute top-[195px] right-[20px] font-bold z-[99999] hover:cursor-pointer"
          onClick={() => setModalState(false)}
          onError={(e) => handleImgError(e)}
          src={'/assets/close.png'}
          alt="close-image"
        />
      )}
      <div className="container pt-44 pb-10 mx-auto ">
        <div className="max-w-[1180px] lg:w-full mx-auto flex flex-wrap drop-shadow-basic rounded-[10px] p-8 xs-max:w-[95%] xs-max:px-[18px] bg-white ">
          <div className="md:flex-row lg:flex-col lg:w-1/2 w-full lg:h-auto flex flex-col gap-4">
            <h2 className="xs:hidden text-center text-[20px] text-lenssisDark font-bold">상품상세</h2>
            <img
              alt="ecommerce"
              className="object-cover object-center rounded mx-auto xs-max:w-[320px] xs-max:h-[315px] h-[460px]"
              src={productDetails?.mainImageUrl}
              width="465"
              height="460"
              onError={(e) => handleImgError(e)}
            />
            <div className="overflow-auto flex xs:justify-between sm:justify-center md:justify-between lg:justify-between gap-3 md:mx-auto md:flex-col lg:gap-[14px] lg:flex-row xl:w-[460px] xl:mx-auto xl:gap-[14.2px] xs-max:w-[320px] xs-max:mx-auto xs-max:gap-2">
              {productDetails?.subMainImageUrlList?.map((image) => (
                <img
                  key={image}
                  onError={(e) => handleImgError(e)}
                  className="rounded xs-max:w-[74px] xs:w-[74px] sm:w-[105px]"
                  src={image}
                  alt="sub-image"
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-2 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-lenssisGray mb-2 text-[12px]">60개의 리뷰 &gt;</h2>
            <div className="text-gray-900 text-3xl title-font font-medium mb-2 flex justify-between">
              <span className="">{productDetails?.name}</span>
              <button onClick={(e) => favoriteHandler(e)} value={productDetails?.productId}>
                {favorite ? (
                  <img src={FillHeart} width={35} height={35} alt="찬 하트" />
                ) : (
                  <img width={35} height={35} src={Heart} alt="빈 하트" />
                )}
              </button>
            </div>
            <div className="leading-relaxed text-[14px]">
              <div className="price flex">
                <div className="text-xl font-bold text-black">
                  {Number(productDetails?.price).toLocaleString()}円
                </div>
                <p className="ml-4 leading-7">
                  {Number(productDetails?.price! * (1 - productDetails?.discount! / 100))
                    .toFixed(0)
                    .toLocaleString()}
                  円
                </p>
              </div>
              <div className="divider h-[1px] bg-[#BCBCBC] my-2 xs-max:hidden"></div>
              <div className="point flex flex-initial my-2 ">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">포인트</p>
                <p className="flex-1">구매 금액의 1%</p>
              </div>
              <div className="card flex my-2">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">카드 혜택</p>
                <p className="flex-1">무이자 할부 카드 안내</p>
              </div>
              <div className="delivery flex my-2">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">배송 안내</p>
                <div>
                  <p className="flex-1 text-[14px] text-lenssisDeepGray">
                    2,500원(50,000원 이상 구매 시 무료)
                  </p>
                  <p className="text-[12px]">영업일 기준 5~7일 이내 배송</p>
                </div>
              </div>
              <div className="divider h-[1px] bg-[#BCBCBC] mt-2 mb-4 sm:hidden"></div>
              <div className="divider"></div>
              <div className="delivery flex my-2">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">사용 기간</p>
                <div className="flex flex-1 gap-2">
                  {productDetails?.periodList?.map((period) => (
                    <button
                      key={period}
                      name="period"
                      value={period}
                      onClick={(e) => optionHandler(e)}
                      className={`${
                        detailState.period === period
                          ? 'bg-lenssisDark text-white border-lenssisDark'
                          : 'text-lenssisDeepGray border-lenssisStroke border-[1px]'
                      } "border-solid rounded-[28px] text-center py-[1px] px-[12px] w-[100px] h-[30px] "`}
                    >
                      {period === 1 ? '원데이' : '먼슬리'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex ">
                <div className="w-[130px] xs-max:w-[70px] lg:w-[160px]"></div>
                <div className="flex-1 text-[#FF7B02]">★ 1箱に10枚入っております</div>
              </div>
              <div className="delivery flex pt-2">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">세부 색상</p>
                <div className="flex gap-2">
                  {productByOptions.colorCodeList.length === 0
                    ? productDetails?.colorCodeList?.map((color: string) => (
                        <button
                          onClick={(e) => optionHandler(e)}
                          name="color"
                          value={color}
                          key={color}
                          className={` ${
                            detailState.colorCode === color
                              ? ' text-white border-lenssisDark border-solid border-4'
                              : ''
                          } w-[30px] h-[30px] rounded-full`}
                          style={{ backgroundColor: `${color}` }}
                        />
                      ))
                    : productByOptions?.colorCodeList?.map((color: string) => (
                        <button
                          onClick={(e) => optionHandler(e)}
                          name="color"
                          value={color}
                          key={color}
                          className={` ${
                            detailState.colorCode === color
                              ? ' text-white border-lenssisDark border-solid border-4'
                              : ''
                          } w-[30px] h-[30px] rounded-full`}
                          style={{ backgroundColor: `${color}` }}
                        />
                      ))}
                </div>
              </div>
              <div className="delivery flex my-2 pt-4">
                <p className="text-black w-[130px] xs-max:w-[70px] lg:w-[160px]">그래프 직경</p>
                <div className="badge flex flex-wrap gap-[5px] lg:flex-wrap lg:w-[280px] xl:w-[355px] xs-max:w-[276px]">
                  {productByOptions.graphicDiameterList.length === 0
                    ? productDetails?.graphicDiameterList?.map((item, index) => (
                        <button
                          onClick={(e) => optionHandler(e)}
                          name="graphicDiameter"
                          value={item}
                          key={index}
                          className={` ${
                            detailState.graphicDiameter === item
                              ? 'bg-lenssisDark text-white border-lenssisDark'
                              : 'text-lenssisDeepGray'
                          } w-[55px] h-[30px] text-[14px] text-center leading-6 border-solid border-[1px] border-lenssisStroke rounded-[20px] px-2`}
                        >
                          {item}
                        </button>
                      ))
                    : productByOptions?.graphicDiameterList?.map((item, index) => (
                        <button
                          onClick={(e) => optionHandler(e)}
                          name="graphicDiameter"
                          value={item}
                          key={index}
                          className={` ${
                            detailState.graphicDiameter === item
                              ? 'bg-lenssisDark text-white border-lenssisDark'
                              : 'text-lenssisDeepGray'
                          } w-[55px] h-[30px] text-[14px] text-center leading-6 border-solid border-[1px] border-lenssisStroke rounded-[20px] px-2`}
                        >
                          {item}
                        </button>
                      ))}
                </div>
              </div>
            </div>
            <div className="flex mt-6 items-center border-b-2 border-gray-100 mb-5">
              <div className="flex ">
                <span className=" text-black w-[130px] xs-max:w-[70px] lg:w-[160px] text-[14px]">도수</span>
              </div>
              <div className="">
                <select
                  name="degree"
                  className="border-solid border-[1px] border-r-0 border-lenssisStroke text-lenssisGray w-[200px] h-[30px] rounded-[5px] pl-[20px] appearance-none bg-[url('/assets/selectArrow.svg')] bg-no-repeat bg-right"
                  disabled={optionComplete}
                  onChange={(e) => optionHandler(e)}
                  value={!finalOption ? '選択してください' : ''}
                >
                  {!finalOption && <option>選択してください</option>}
                  {productByOptions.degreeAndStockList?.map((item: any, index) => (
                    <option key={index + 1} value={[item.degree, item.stock]}>
                      {item.degree} 재고: {item.stock}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex mt-5 items-center border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <p className="w-[130px] xs-max:w-[70px] lg:w-[160px]"></p>
              </div>
              {finalOption && <OptionAndCount onClose={setFinalOption} />}
            </div>
            <div className="flex justify-between py-2">
              <span className="leading-10 text-black text-[16px] font-bold">총 상품 금액</span>
              <span className="title-font text-[25px] text-black font-bold">1,800円</span>
            </div>
            <div className="divder h-[2px] bg-slate-700 my-2"></div>
            <div className="flex gap-4 xs-max:flex-col py-2">
              <button
                onClick={addCartHandler}
                className="w-1/2 cursor-pointer bg-white text-black text-[14px] border-0 ring-1 ring-gray-300 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded xs-max:w-full"
              >
                장바구니
              </button>
              <button
                onClick={buyHandler}
                className="w-1/2 cursor-pointer text-white bg-lenssisDark text-[14px] border-0 ring-1 ring-gray-300 py-2 px-6 focus:outline-none rounded xs-max:w-full"
              >
                바로구매
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductInfo
