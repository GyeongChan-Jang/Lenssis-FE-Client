interface PropsType {
  price: number
  discount: number
  name: string
}
function RecommendCard({ price, discount, name }: PropsType) {
  return (
    <div>
      <div className="w-[160px] h-[40px] flex flex-col  ml-2 relative">
        <div className=" text-[14px] font-[600] md:text-[16px]">{name}</div>
        <div className="flex justify-start items-center pb-2 font-semibold">
          <div className="mr-2 md:mr-4 font-bold">{`${Number(price * (1 - discount / 100))
            .toLocaleString()
            .slice(0, 5)}円`}</div>
          <div className="text-[#7A7A7A] line-through text-[12px] ">{`${Number(
            price
          ).toLocaleString()}円`}</div>
        </div>
      </div>
    </div>
  )
}

export default RecommendCard
