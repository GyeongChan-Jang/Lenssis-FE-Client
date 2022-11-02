import { useEffect, useState } from 'react'

interface PropsType {
  count: number
}

export const ProductMainSkeleton = ({ count }: PropsType) => {
  const arr = new Array(count).fill(1)

  return (
    <>
      {arr &&
        arr.map((_, idx) => (
          <div key={idx} className="w-[160px] h-[235px] md:w-[260px]  md:h-[335px] rounded-md mx-auto mt-20">
            <div className="flex animate-pulse flex-col h-full justify-center">
              <div className="w-full h-[185px] bg-gray-300 rounded-md "></div>
              <div className="flex flex-col space-y-2">
                <div className="flex ">
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 mr-2 rounded-full "></div>
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 mr-2 rounded-full "></div>
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 rounded-full "></div>
                </div>
                <div className="w-[100px] bg-gray-300 h-6  rounded-md "></div>
                <div className="w-[120px] bg-gray-300 h-6  rounded-md "></div>
                <div className="w-[120px] md:w-[200px] bg-gray-300 h-10 rounded-md "></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export const ProductNewSkeleton = ({ count }: PropsType) => {
  const [length, setLength] = useState(8)
  const arr = new Array(length).fill(1)
  useEffect(() => {
    setLength(count)
  }, [count])

  return (
    <>
      {arr &&
        arr.map((_, idx) => (
          <div key={idx} className="w-[160px] h-[235px] md:w-[260px]  md:h-[335px] rounded-md mx-auto mt-20">
            <div className="flex animate-pulse flex-col h-full justify-center">
              <div className="w-full h-[185px] bg-gray-300 rounded-md "></div>
              <div className="flex flex-col space-y-2">
                <div className="flex ">
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 mr-2 rounded-full "></div>
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 mr-2 rounded-full "></div>
                  <div className="w-[20px] h-[20px] bg-gray-300 mt-2 rounded-full "></div>
                </div>
                <div className="w-[100px] bg-gray-300 h-6  rounded-md "></div>
                <div className="w-[120px] bg-gray-300 h-6  rounded-md "></div>
                <div className="w-[120px] md:w-[200px] bg-gray-300 h-10 rounded-md "></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export const RecommendSkeleton = ({ count }: PropsType) => {
  const [length, setLength] = useState(4)
  const arr = new Array(length).fill(1)
  useEffect(() => {
    setLength(count)
  }, [count])

  return (
    <>
      {arr &&
        arr.map((_, idx) => (
          <div
            key={idx}
            className="w-[170px] h-[250px] md:w-[250px] flex md:h-[355px] rounded-md mx-auto mt-10 mb-20"
          >
            <div className="flex animate-pulse flex-col h-full justify-center">
              <div className="w-[150px] h-[210px] md:w-[230px] md:h-[280px] bg-gray-300 rounded-md "></div>
              <div className="flex flex-col space-y-2">
                <div className="w-[120px] md:w-[140px] bg-gray-300 h-6 mt-2 rounded-md "></div>
                <div className="w-[100px] md:w-[120px] bg-gray-300 h-6  rounded-md "></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export const EventSkeleton = ({ count }: PropsType) => {
  const [length, setLength] = useState(4)
  const arr = new Array(length).fill(1)
  useEffect(() => {
    setLength(count)
  }, [count])
  return (
    <>
      {arr &&
        arr.map((_, idx) => (
          <div
            key={idx}
            className="w-[331px] h-[215px] md:w-[480px]   md:h-[330px] rounded-md mx-auto mt-20 grid grid-cols-2 "
          >
            <div className="flex w-[331px] h-[215px] md:w-[480px]  md:h-[330px] mx-auto animate-pulse flex-col justify-center items-center">
              <div className="w-[331px] h-[215px] md:w-[480px] md:h-[226px] bg-gray-300 rounded-t-md "></div>
              <div className="flex flex-col space-y-2">
                <div className="w-[331px]  md:w-[480px] bg-gray-300 h-[80px] md:h-[100px] mt-2 rounded-b-xl "></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export const EventDetailSkeleton = () => {
  return (
    <div>
      <div className="w-[1020px] h-[130px] md:w-[1030px] md:h-[130px] rounded-md mx-auto mt-20 ">
        <div className="flex  animate-pulse items-center border-b-2 pb-2">
          <div className=" md:w-[50px] md:h-[30px] ml-10 mt-4 bg-gray-300 rounded-md "></div>
          <div className=" md:w-[150px] md:h-[30px] ml-40 mt-4 bg-gray-300 rounded-md "></div>
        </div>
        <div className="flex  animate-pulse items-center border-b-2 pb-2">
          <div className=" md:w-[50px] md:h-[30px] ml-10 mt-4 bg-gray-300 rounded-md "></div>
          <div className=" md:w-[150px] md:h-[30px] ml-40 mt-4 bg-gray-300 rounded-md "></div>
        </div>
      </div>
      <div className="flex justify-end md:w-[1030px] mx-auto">
        <div className="md:w-[220px] md:h-[20px] bg-gray-300 rounded-md"></div>
      </div>
      <div className="md:w-[1030px] flex justify-center mx-auto">
        <div className="md:w-[780px] md:h-[1900px] bg-gray-300 rounded-md mt-10"></div>
      </div>
    </div>
  )
}
export const NoticeDetailSkeleton = () => {
  return (
    <div className="w-[1180px] h-[700px] rounded-md mx-auto">
      <div className="flex animate-pulse flex-col">
        <div className="w-[1080px] flex items-center mt-8 ml-12">
          <div className="w-20 bg-gray-300 h-6 rounded-md mr-[100px]"></div>
          <div className="w-[300px] bg-gray-300 h-6 rounded-md mr-[360px] "></div>
        </div>
        <div className="w-[1080px] flex items-center mt-4 ml-12">
          <div className="w-20 bg-gray-300 h-6 rounded-md mr-[100px]"></div>
          <div className="w-[300px] bg-gray-300 h-6 rounded-md mr-[360px] "></div>
        </div>
        <div className="w-[1080px] flex items-center mt-4 ml-12">
          <div className="w-20 bg-gray-300 h-6 rounded-md mr-[100px]"></div>
          <div className="w-[300px] bg-gray-300 h-6 rounded-md mr-[360px] "></div>
        </div>
        <div className="w-[1080px] flex items-center mt-4 ml-12">
          <div className="w-20 bg-gray-300 h-6 rounded-md mr-[100px]"></div>
          <div className="w-[300px] bg-gray-300 h-6 rounded-md mr-[360px] "></div>
        </div>
        <div className="w-[1080px] flex items-center mt-4 ml-12">
          <div className="w-20 bg-gray-300 h-6 rounded-md mr-[100px]"></div>
          <div className="w-[300px] bg-gray-300 h-6 rounded-md mr-[360px] "></div>
        </div>
      </div>
    </div>
  )
}
