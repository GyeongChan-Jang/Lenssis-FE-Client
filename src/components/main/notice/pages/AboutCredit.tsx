import { useEffect, useState } from 'react'
import { NoticeDetailSkeleton } from '../../../common/ui/Skeleton'
import Pagination from '../../common/Pagination'
import { useGetAllNotice } from '../../hooks/useNotice'
import { BoardMainList } from '../../types/noticeTypes'
import MobileNotice from '../utils/MobileNotice'
import WebNotice from '../utils/WebNotice'

function AboutCredit() {
  const [currentPage, setCurrentPage] = useState(1)
  const [boardList, setBoardList] = useState<BoardMainList[]>([])
  const divideCount = 10
  const indexOfEnd = currentPage * divideCount
  const indexOfStart = indexOfEnd - divideCount
  const { data, isFetching } = useGetAllNotice(3)
  useEffect(() => {
    if (data) {
      setBoardList(data?.boardMainList?.slice(indexOfStart, indexOfEnd))
    }
  }, [data, currentPage])
  return (
    <>
      {isFetching ? (
        <NoticeDetailSkeleton />
      ) : data?.totalCount ? (
        <div className="text-center text-[24px] mt-10 text-lenssisDark">등록된 내용이 없습니다</div>
      ) : (
        boardList.map((item: BoardMainList) => (
          <div key={item.boardId}>
            <WebNotice id={item.boardId} title={item.boardTitle} />
            <MobileNotice id={item.boardId} title={item.boardTitle} createdAt={item.createdAt} />
          </div>
        ))
      )}
      <div className="flex justify-center items-center relative">
        {data && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            allCount={data.totalCount}
            divide={divideCount}
          />
        )}
      </div>
    </>
  )
}

export default AboutCredit
