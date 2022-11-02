import { useRecoilValue } from 'recoil'
import ReviewForm from '../../review/ReviewForm'
import CardLayout from '../common/CardLayout'
import { useEffect, useState } from 'react'
import useOrder from '../hooks/useOrder'
import { useUser } from '../../auth/hooks/useUser'
import { myPurchaseState } from '../../../store/myPurchase'

const MyOrder = () => {
  const [isModal, setIsModal] = useState(false)
  const [reviewItem, setReviewItem] = useState<any>()
  const myPurchase = useRecoilValue(myPurchaseState)
  const { getMyOrders, orderData } = useOrder()
  const { user } = useUser()
  const onModalHandler = () => {
    setIsModal(!isModal)
  }
  console.log(user)
  console.log(orderData)
  console.log(myPurchase)
  const addReviewHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setReviewItem(
      myPurchase?.[0].productInfo.filter((item) => item.productDetailsId === Number(e.currentTarget.value))
    )
    onModalHandler()
  }

  useEffect(() => {
    if (!user) return

    getMyOrders({
      email: user.email,
      memberId: user.memberId,
      orderer: user.name,
      orderId: myPurchase ? myPurchase[0].orderInfo.orderId : 0
    })
  }, [user])
  console.log(myPurchase)
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/errorImage.png'
  }

  return (
    <CardLayout title="주문 내역">
      {myPurchase && myPurchase.length !== 0 && user && (
        <ReviewForm
          reviewHandleType="add"
          onClose={onModalHandler}
          isModalOpen={isModal}
          reviewItem={reviewItem}
          memberId={user.memberId}
          orderId={myPurchase[0].orderInfo.orderId}
        />
      )}

      <h4 className="py-0 xs:py-2 border-b border-solid border-[#abc8df] text-[#5a5a5a] font-semibold">
        상품 정보
      </h4>

      {myPurchase && myPurchase.length !== 0
        ? myPurchase.map((product) => (
            <div className="flex flex-col hover:bg-slate-50 max-w-[858px]" key={product.orderInfo.orderId}>
              <h4 className="py-2 text-[#5a5a5a] font-semibold flex justify-start items-center gap-4 text-xs xs:text-base">
                <p className="flex items-center gap-2">
                  <span className="font-bold text-[#1b304a]">주문일자</span>
                  <span className="text-[#7a7a7a]">{product.orderInfo.orderCreatedAt}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold text-[#1b304a]">주문번호수</span>
                  <span className="text-[#7a7a7a]">{product.orderInfo.orderId}</span>
                </p>
              </h4>
              <div className="flex justify-between items-center py-4 gap-1 xs:gap-4 border-b border-solid border-[#abc8df] text-xs xs:text-base w-full">
                {product.productInfo.map((pInfo) => (
                  <div className=" flex flex-row items-center justify-between w-full px-4 gap-4">
                    <div key={pInfo.productId}>
                      <img
                        onError={handleImgError}
                        width={100}
                        height={100}
                        src={pInfo.imageUrl}
                        alt="눈알"
                      />
                    </div>
                    <div className="grow ">
                      <p className="text-[#7a7a7a]">{pInfo.productName}</p>
                      <p className="font-bold text-[#1b304a] py-1">{pInfo.color}</p>
                      <div className="block xs:flex py-1 text-[#7a7a7a]">
                        {/* <span>옵션 선택-</span>
                  {item.option.map((option) => (
                    <span key={item.lensTitle + option}>{option} /</span>
                  ))} */}
                      </div>
                      <p className="py-1 text-[#7a7a7a] font-semibold">{pInfo.price.toLocaleString()} 円</p>
                    </div>
                    <div>
                      <button
                        value={pInfo.productDetailsId}
                        onClick={(e) => addReviewHandler(e)}
                        className="border border-solid border-[#d9d9d9] text-[#7a7a7a] h-[25px] w-[70px] xs:h-fit xs:w-fit xs:min-w-[105px] xs:py-1 xs:px-2  rounded-[3px]"
                      >
                        <span className="">리뷰 작성하기</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </CardLayout>
  )
}

export default MyOrder
