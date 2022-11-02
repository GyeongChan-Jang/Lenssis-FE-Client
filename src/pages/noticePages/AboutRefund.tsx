import { useEffect, useState } from 'react'
import { NoticeDetailSkeleton } from '../../components/common/ui/Skeleton'
import Pagination from '../../components/main/common/Pagination'
import { useGetAllNotice } from '../../components/main/hooks/useNotice'
import MobileNotice from '../../components/main/notice/utils/MobileNotice'
import WebNotice from '../../components/main/notice/utils/WebNotice'
import { BoardMainList } from '../../components/main/types/noticeTypes'

function AboutRefund() {
  const [currentPage, setCurrentPage] = useState(1)
  const [boardList, setBoardList] = useState<BoardMainList[]>([])
  const divideCount = 10
  const indexOfEnd = currentPage * divideCount
  const indexOfStart = indexOfEnd - divideCount
  const { data, isFetching } = useGetAllNotice(2)
  useEffect(() => {
    if (data) {
      setBoardList(data?.boardMainList?.slice(indexOfStart, indexOfEnd))
    }
  }, [data, currentPage])

  return (
    <>
      {isFetching ? (
        <NoticeDetailSkeleton />
      ) : data && data?.totalCount === 0 ? (
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
            allCount={data.totalCount || 1}
            divide={divideCount}
          />
        )}
      </div>
    </>
  )
}

export default AboutRefund
