import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CurrentInnerWidth } from '../../store/currentInnerWidth'
import { ItemDetail, MainCartModalState } from '../../store/mainCart'
import { useUser } from '../auth/hooks/useUser'
import { getProductDetails } from '../ProductDetail/hooks/useProductDetails'
import useToast from './toast/hooks/useToast'

interface PropsType {
  productId: number
  isFavorite?: number
}

function CartIcon({ productId, isFavorite }: PropsType) {
  const windowWidth = useRecoilValue(CurrentInnerWidth)

  const setIsCartModalOpen = useSetRecoilState(MainCartModalState)

  const { user } = useUser()
  const navigate = useNavigate()
  const { fireToast } = useToast()
  const setDetail = useSetRecoilState(ItemDetail)

  const { mutate } = useMutation(() => getProductDetails(user ? user?.memberId : 0, productId), {
    onSuccess: (data) => {
      setDetail(data.data)
    }
  })

  const ClickCart = () => {
    if (!user) {
      fireToast({
        id: 'failedClickHeart',
        message: '로그인을 해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'warning'
      })
      navigate('/signin')
      return
    }
    mutate()
    setTimeout(() => {
      setIsCartModalOpen((prev) => !prev)
    }, 100)
  }

  return (
    <div>
      {windowWidth > 440 && (
        <div className={`mr-2 cursor-pointer hover:animate-click relative`} onClick={ClickCart}>
          <svg
            width={`${windowWidth < 440 ? 20 : 28}`}
            height={`${windowWidth < 440 ? 20 : 28}`}
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.38952 3.5352L2.76904 1H1"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.39007 14.9518C6.04992 14.9518 6.58483 14.3843 6.58483 13.6842C6.58483 12.9841 6.04992 12.4166 5.39007 12.4166C4.73023 12.4166 4.19531 12.9841 4.19531 13.6842C4.19531 14.3843 4.73023 14.9518 5.39007 14.9518Z"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5669 3.53467L17.4814 9.45013H4.71823L3.38672 3.53467"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.1948 14.9439C16.8546 14.9439 17.3895 14.3764 17.3895 13.6763C17.3895 12.9762 16.8546 12.4087 16.1948 12.4087C15.5349 12.4087 15 12.9762 15 13.6763C15 14.3764 15.5349 14.9439 16.1948 14.9439Z"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.1976 12.4079L5.38948 12.4163L3.39062 3.53467"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default CartIcon
