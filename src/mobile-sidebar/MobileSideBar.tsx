import { useCallback, useEffect } from 'react'
import { BsX } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { useUser } from '../components/auth/hooks/useUser'
import RightArrow from '../components/common/ui/RightArrow'
import { clearStoredToken } from '../components/local-storage/userStorage'
import { sideBarState } from '../store/sideBarToggle'

const MobileSideBar = () => {
  const { user } = useUser()
  const [isShow, setIsShow] = useRecoilState(sideBarState)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const sideBarToggleHandler = useCallback(() => {
    setIsShow(false)
  }, [])
  const pageChangeHandler = useCallback(() => {
    setIsShow(false)
  }, [])
  const scrollHandler = useCallback((x: number) => {
    navigate('/')
    setTimeout(() => {
      window.scrollTo(0, x)
    }, 0)
    setIsShow(false)
  }, [])

  const signoutHandler = useCallback(() => {
    setIsShow(false)
    clearStoredToken()
    location.href = '/'
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="z-[9999] text-black sticky bg-white w-full h-screen top-0 xs:hidden">
      <div className="bg-lenssisSky h-fit pt-4 pb-2 text-white">
        <div className="flex items-center justify-between pl-2">
          {user ? (
            <button
              className="border-2 border-solid border-white rounded-[5px] py-1 font-semibold"
              onClick={signoutHandler}
            >
              ログアウト
            </button>
          ) : (
            <button className="border-2 border-solid border-white rounded-[5px] py-1 font-semibold">
              <Link onClick={pageChangeHandler} to="signin">
                ログイン
              </Link>
            </button>
          )}
          <button onClick={sideBarToggleHandler}>
            <BsX size={50} color="#ffffff" />
          </button>
        </div>
        <div className="mt-8 pl-2 h-[66px] flex flex-col items-start justify-end">
          {!user && (
            <Link onClick={pageChangeHandler} to="/nonmember">
              非会員 注文照会 {'>'}
            </Link>
          )}
          {!user && (
            <p className="mt-[10px]">
              <span className="font-bold text-2xl">Lenssisへ ようこそ。</span>
            </p>
          )}
          {user && (
            <p className="mt-[10px]">
              <span className="font-bold text-2xl">{user?.name}&nbsp;</span>
              <span className="text-sm font-normal">さん、こんにちは。</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-around mt-4 border-y border-solid border-white h-20 font-bold">
          <div className="flex flex-col items-center justify-center w-full border-r border-solid border-white h-full gap-y-2">
            <p className="w-full text-center">ポイント</p>
            {user && (
              <p>
                <span>350</span>&nbsp;<span>P</span>
              </p>
            )}
            {!user && <p>-</p>}
          </div>
          <div className="flex flex-col items-center justify-center w-full border-r border-solid border-white h-full gap-y-2">
            <p className="w-full text-center">配送照会</p>
            {user && (
              <p>
                <span>1</span>
              </p>
            )}
            {!user && (
              <p>
                <span>-</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-y-2">
            <p className="w-full text-center">クーポン</p>
            {user && <p>2</p>}
            {!user && <p>-</p>}
          </div>
        </div>
        <ul className="flex items-center justify-between mt-4 font-bold">
          <li className="flex items-center justify-center w-full">
            <Link
              onClick={pageChangeHandler}
              to="/notice"
              className="flex flex-col items-center font-bold gap-[5px]"
            >
              <img className="w-[30px] h-[30px]" src="/assets/ringbell.png" alt="ringbell" />
              <p className="h-6 text-sm">公知事項</p>
            </Link>
          </li>
          <li className="flex items-center justify-center w-full">
            <Link
              onClick={pageChangeHandler}
              to="/favorite"
              className="flex flex-col items-center font-bold gap-[5px]"
            >
              <img className="w-[30px] h-[30px]" src="/assets/heart.png" alt="heart" />
              <p className="h-6 text-sm">お気に入り</p>
            </Link>
          </li>
          <li className="flex items-center justify-center w-full">
            <Link
              onClick={pageChangeHandler}
              to="/cart"
              className="flex flex-col items-center font-bold gap-[5px]"
            >
              <img className="w-[30px] h-[30px]" src="/assets/shoppingcart.png" alt="" />
              <p className="h-6 text-sm">カート</p>
            </Link>
          </li>
          <li className="flex items-center justify-center w-full">
            <Link
              onClick={pageChangeHandler}
              to="/mypage"
              className="flex flex-col items-center font-bold gap-[5px]"
            >
              <img className="w-[30px] h-[30px]" src="/assets/person.png" alt="" />
              <p className="h-6 text-sm">マイページ</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='bg-[#F4F6F8] h-full pt-8 text-lenssisDark text-base font-["SUIT"] font-semibold relative'>
        <ul className="flex flex-col gap-y-2 font-bold">
          <li
            className="pl-2 pr-4 pb-2 border-b border-solid border-lenssisStroke w-full flex justify-between text-lenssisDark"
            onClick={() => scrollHandler(530)}
          >
            <span>Best</span>
            <RightArrow />
          </li>
          <li
            className="pl-2 pr-4 pb-2 border-b border-solid border-lenssisStroke w-full flex justify-between text-lenssisDark"
            onClick={() => scrollHandler(2500)}
          >
            <span>New</span>
            <RightArrow />
          </li>
          <li
            className="pl-2 pr-4 pb-2 border-b border-solid border-lenssisStroke w-full flex justify-between text-lenssisDark"
            onClick={() => scrollHandler(4543)}
          >
            <span>Recommend</span>
            <RightArrow />
          </li>
          <li className="pl-2 pr-4 pb-2 border-b border-solid border-lenssisStroke w-full  text-lenssisDark">
            <Link onClick={pageChangeHandler} className="flex justify-between" to="/event">
              <span>Event</span>
              <RightArrow />
            </Link>
          </li>
          <li className="pl-2 pr-4 pb-2 w-full  text-lenssisDark">
            <Link onClick={pageChangeHandler} className="flex justify-between" to="review">
              <span>Review</span>
              <RightArrow />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobileSideBar
