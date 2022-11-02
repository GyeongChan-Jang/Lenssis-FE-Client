import ReactStars from 'react-rating-stars-component'

const MobileReviewCard = ({ review }: any) => {
  return (
    <div className="w-[160px] h-[220px] p-[5px] border-solid border-[1px] border-lenssisLightStroke rounded-[5px] bg-white">
      <div>
        <img
          width="150px"
          height="140px"
          className=" rounded rounded-t-[5px]"
          src={review.reviewImageUrl || review.productImageUrl}
          alt="review-image"
        />
      </div>
      <div className="p-[2px] mt-[2px] w-[150px] h-[45px]">
        <p className="text-[13px] leading-4 font-bold">
          {review.productName} <span className="ml-[1px]">착용</span>
        </p>
        <p className="text-[12px] leading-4 text-[#7F7F7F]">{review.email}</p>
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

export default MobileReviewCard
