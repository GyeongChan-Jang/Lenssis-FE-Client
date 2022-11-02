import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { CurrentInnerWidth } from '../../store/currentInnerWidth'

import { ColorAndImage, ProductPropsType } from '../main/types/productTypes'
import CartIcon from './CartIcon'
import CartAndHeart from './CartIcon'
import FavoriteIcon from './FavoriteIcon'
import Img from './Img'
import { SubtractIcon } from './util/Icon'
interface PropsType extends ProductPropsType {
  idx: number
  isNew?: boolean
  needsRank?: boolean
}

const Card: React.FC<PropsType> = ({
  idx,
  series,
  price,
  discount,
  colorAndImage,
  graphicDiameter,
  isNew,
  productId,
  isFavorite,
  needsRank
}) => {
  const windowWidth = useRecoilValue(CurrentInnerWidth)
  const navigate = useNavigate()
  const [viewImg, setViewImg] = useState<string>(colorAndImage[0]?.imageUrl)

  const changeImageHandler = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    setViewImg(colorAndImage[idx]?.imageUrl)
  }

  return (
    <>
      <div className={`relative w-[160px] md:w-[260px] my-[10px] mx-auto`}>
        {needsRank && idx < 3 ? (
          <>
            <span className="absolute top-[1px] left-[4px] md:left-2 xl:w-4 xl:h-4 z-[9]">
              {windowWidth < 1020 ? (
                <>
                  <span className="absolute top-[4px] left-[6px] md:top-[3px] text-white text-[10px] font-bold  xl:font-bold ">
                    {idx + 1}
                  </span>
                  <SubtractIcon width={20} height={30} color="#1B304A" />
                </>
              ) : (
                <>
                  <span className="absolute top-[4px] left-[10px] text-white text-[14px] lg:font-bold  xl:font-bold ">
                    {idx + 1}
                  </span>
                  <SubtractIcon width={32} height={42} color="#1B304A" />
                </>
              )}
            </span>
          </>
        ) : (
          <></>
        )}
        <span className="relative">
          <Img
            onClick={() => navigate(`/product/${productId}`)}
            src={viewImg}
            alt="プロダクトイメージ"
            className=" bg-origin-content cursor-pointer rounded-md w-[160px] h-[160px] md:w-[260px] md:h-[255px] mx-auto"
          />
          {isNew && (
            <span className="absolute bottom-0 right-0">
              <svg
                width={`${windowWidth > 720 ? 50 : 40}`}
                height={`${windowWidth > 720 ? 50 : 40}`}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 0L29.8658 6.8406L37.5 3.34937L38.2936 11.7064L46.6506 12.5L43.1594 20.1342L50 25L43.1594 29.8658L46.6506 37.5L38.2936 38.2936L37.5 46.6506L29.8658 43.1594L25 50L20.1342 43.1594L12.5 46.6506L11.7064 38.2936L3.34937 37.5L6.8406 29.8658L0 25L6.8406 20.1342L3.34937 12.5L11.7064 11.7064L12.5 3.34937L20.1342 6.8406L25 0Z"
                  fill="#FFDF5D"
                />
                <path
                  d="M18.6213 20.2727V29H16.8315L13.3585 23.9631H13.3031V29H11.1937V20.2727H13.0091L16.4437 25.3011H16.5162V20.2727H18.6213ZM19.9476 29V20.2727H26.0328V21.9858H22.057V23.7756H25.7218V25.4929H22.057V27.2869H26.0328V29H19.9476ZM29.4462 29L26.9064 20.2727H29.2374L30.5542 25.9915H30.6266L32.1309 20.2727H34.0314L35.5357 26.0043H35.6081L36.9292 20.2727H39.2559L36.7203 29H34.6877L33.1152 23.7074H33.0471L31.4746 29H29.4462Z"
                  fill="white"
                />
              </svg>
            </span>
          )}
        </span>
        <div className="flex flex-col ">
          <div className="flex items-center">
            {colorAndImage.slice(0, 4).map((eachColor: ColorAndImage, idx: number) => (
              <div
                key={idx}
                className={`cursor-pointer w-[15px] my-[10px] h-[15px] hover:w-[20px] hover:h-[20px] mr-[10px] hover:mr-[10px] md:w-[20px] md:h-[20px] md:hover:w-[25px] md:hover:h-[25px]  ${
                  colorAndImage.length === 1 ? 'hover:my-[7.5px] ' : 'hover:my-[5px]'
                }  md:mr-[15px] rounded-full  `}
                style={{ backgroundColor: `${eachColor.colorCode}` }}
                onMouseEnter={(e) => {
                  changeImageHandler(e, idx)
                }}
                data-tip={eachColor.colorCode && eachColor.colorCode}
                data-for={eachColor.colorCode && eachColor.colorCode}
              ></div>
            ))}
          </div>
          <span className="hidden xs:flex absolute top-[265px] right-1 justify-center items-center  ">
            <CartIcon productId={productId} isFavorite={isFavorite} />
            <FavoriteIcon productId={productId} isFavorite={isFavorite} />
          </span>
          <span className="xs:hidden flex absolute top-[170px] right-1">
            <CartIcon productId={productId} isFavorite={isFavorite} />
            <FavoriteIcon productId={productId} isFavorite={isFavorite} />
          </span>
          <div className=" text-[14px] md:text-[18px] font-[600]">{series}</div>
          <div className="flex justify-start items-center my-[5px]">
            <div className="mr-2 md:mr-4 font-[700] text-[14px] text-lenssisDeepGray md:text-[16px]">
              {Number(price * (1 - discount / 100))
                .toLocaleString()
                .slice(0, 5)}
              円
            </div>
            <div className="text-lenssisGray line-through font-[700] text-[12px] md:text-[14px]">
              {Number(price).toLocaleString()}円
            </div>
          </div>
          <div className="flex justify-start mt-[5px] w-full overflow-hidden flex-wrap">
            {graphicDiameter?.map((item: number, idx: number) => (
              <div
                key={`${item}-${idx}`}
                className="text-[10px] md:text-[14px] border-[1px] border-solid border-lenssisBadge text-lenssisBadge rounded-md  py-[2px] px-[6px] md:px-[12px] my-1 mr-[5px]"
              >
                {item.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
