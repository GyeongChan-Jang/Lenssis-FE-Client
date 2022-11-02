import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { selectedNameState } from '../../../store/review'
import { axiosInstance, getJWTToken } from '../../axiosinstance'
import useToast from '../../common/toast/hooks/useToast'
import { getStoredToken } from '../../local-storage/userStorage'
import { ReviewInfo, ReviewUpdateInfo } from '../../main/types/reviewInfoTypes'
import { queryKeys } from '../../react-query/queryKeys'

const getReviewItems = async () => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/myReply',
    method: 'GET',
    headers: getJWTToken(token)
  })
  return data?.data?.data
}

const getAllReview = async (productId: number) => {
  const data = await axiosInstance({
    url: '/reply/inProductDetails',
    method: 'GET',
    params: {
      page: 1,
      productId: productId,
      size: 10
    }
  })
  return data
}

const getForProudctId = async () => {
  const data = await axiosInstance({
    url: '/reply/forProductId',
    method: 'GET'
  })
  return data
}

const addReviewItems = async (reviewInfo: ReviewInfo) => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/add',
    method: 'POST',
    headers: getJWTToken(token),
    data: {
      content: reviewInfo.content,
      productDetailsId: reviewInfo.productDetailsId,
      memberId: reviewInfo.memberId,
      rating: reviewInfo.rating,
      replyImageUrl: reviewInfo.replyImageUrl,
      orderId: reviewInfo.orderId
    }
  })
  return data
}

const updateReviewItems = async (reviewInfo: ReviewUpdateInfo) => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/update',
    method: 'PUT',
    headers: getJWTToken(token),
    data: {
      content: reviewInfo.content,
      rating: reviewInfo.rating,
      imageUrl: reviewInfo.imageUrl,
      replyId: reviewInfo.replyId
    }
  })
  console.log(data)
  return data
}

const getReviewByName = async (productName: string) => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/replyListByName',
    method: 'GET',
    headers: getJWTToken(token),
    params: {
      page: 1,
      productName,
      size: 10
    }
  })
  return data
}

const deleteReviewItems = async (replyId: number) => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/delete',
    method: 'POST',
    headers: getJWTToken(token),
    data: {
      replyId
    }
  })
  return data
}

const getAllReviewItems = async () => {
  const token = getStoredToken()
  const data = await axiosInstance({
    url: '/reply/allReply',
    method: 'GET',
    params: {
      page: 1,
      size: 10
    }
  })
  return data
}

export const useReview = () => {
  const { data: reviewItems } = useQuery(queryKeys.review, () => getReviewItems(), {})
  return { reviewItems }
}

export const useGetAllreview = (productId: number) => {
  const { data } = useQuery(queryKeys.allReview, () => getAllReview(productId), {
    enabled: !!productId
  })
  return data?.data?.data
}

export const useGetReviewByName = () => {
  const setSelectedName = useSetRecoilState(selectedNameState)
  const { data: reviews, mutate: GetReviewByNameMutate } = useMutation(
    (productName: string) => getReviewByName(productName),
    {
      onSuccess: (reviews) => {
        setSelectedName(reviews.data.data)
        console.log('성공')
      },
      onError: (error) => {
        console.log(error, 'review를 불러오지 못했습니다!')
      }
    }
  )
  return { reviews, GetReviewByNameMutate }
}

export const useGetForProductId = () => {
  const { data: forProductId } = useQuery(queryKeys.forProductId, () => getForProudctId(), {
    refetchOnWindowFocus: false
  })
  return { forProductId }
}

export const useAddReview = () => {
  const queryClient = useQueryClient()
  const { fireToast } = useToast()
  const { mutate: addReviewMutate } = useMutation((reviewInfo: ReviewInfo) => addReviewItems(reviewInfo), {
    onError: () => {
      console.log('리뷰 등록 실패')
      fireToast({
        id: 'addReviewFailed',
        message: '리뷰 등록에 실패하였습니다. 이미 리뷰를 등록하셨는지 확인해주세요.',
        type: 'failed',
        position: 'top',
        timer: 2000
      })
    },
    onSuccess: () => {
      console.log('리뷰 등록 성공')
      fireToast({
        id: 'addReviewCompleted',
        message: '리뷰가 등록되었습니다.',
        type: 'complete',
        position: 'top',
        timer: 2000
      })
      queryClient.invalidateQueries(queryKeys.review)
    }
  })
  return addReviewMutate
}

export const useUpdateReview = () => {
  const queryClient = useQueryClient()
  const { fireToast } = useToast()
  const { mutate: updateReviewMutate } = useMutation(
    (reviewInfo: ReviewUpdateInfo) => updateReviewItems(reviewInfo),
    {
      onError: () => {
        console.log('리뷰 수정 실패')
        fireToast({
          id: 'updateReviewFailed',
          message: '리뷰 수정에 실패하였습니다.',
          type: 'failed',
          position: 'top',
          timer: 2000
        })
      },
      onSuccess: () => {
        console.log('리뷰 수정 성공')
        fireToast({
          id: 'updateReviewCompleted',
          message: '리뷰가 수정되었습니다.',
          type: 'complete',
          position: 'top',
          timer: 2000
        })
        queryClient.invalidateQueries(queryKeys.review)
      }
    }
  )
  return updateReviewMutate
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  const { fireToast } = useToast()
  const { mutate: deleteReviewMutate } = useMutation((replyId: number) => deleteReviewItems(replyId), {
    onError: () => {
      console.log('리뷰 삭제 실패')
      fireToast({
        id: 'deleteReviewFailed',
        message: '리뷰 삭제에 실패하였습니다.',
        type: 'failed',
        position: 'top',
        timer: 2000
      })
    },
    onSuccess: () => {
      console.log('리뷰 삭제 성공')
      fireToast({
        id: 'deleteReviewCompleted',
        message: '리뷰가 삭제되었습니다.',
        type: 'complete',
        position: 'top',
        timer: 2000
      })
      queryClient.invalidateQueries(queryKeys.review)
    }
  })
  return deleteReviewMutate
}

export const useGetAllReview = () => {
  const { data } = useQuery(queryKeys.allReview, () => getAllReviewItems(), {})
  return data?.data?.data
}
