import ReactStars from 'react-rating-stars-component'

const MainReviewCard = ({ review }: any) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/errorImage.png'
  }
  return (
    <div
      key={review.content}
      className=" p-[10px] rounded-[10px] border-lenssisLightStroke border-solid border-[1px]"
    >
      <div>
        <img
          width={230}
          height={210}
          className=" rounded rounded-t-[5px]"
          src={review.reviewImageUrl || review.productImageUrl}
          onError={(e) => handleImgError(e)}
        />
      </div>
      <div className="p-2 w-[230px] h-[60px] mb-2">
        <p className="text-[14px]">
          {review.productName} <span className="ml-[2px]">착용</span>
        </p>
        <p className="text-[#7F7F7F] text-[12px]">{review.email}</p>
        <ReactStars
          count={5}
          size={18}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          color="#efefef"
          activeColor="#ffd700"
          value={review.rating}
          edit={false}
        />
      </div>
    </div>
  )
}

export default MainReviewCard
