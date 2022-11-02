export interface ColorAndImage {
  color: string
  colorCode: string
  imageUrl: string
}
export interface ProductResponseType {
  productId: number
  series: string
  colorAndImage: ColorAndImage[]
  colorAndImageInfo?: ColorAndImage[]
  graphicDiameter: number[]
  price: number
  discount: number
  isFavorite?: number
  totalCount: number
  name: string
}

export interface ProductPropsType {
  productId: number
  series: string
  colorAndImage: ColorAndImage[]
  colorAndImageInfo?: ColorAndImage[]
  graphicDiameter: number[]
  price: number
  discount: number
  isFavorite?: number
}

export interface ProductDetailResponseType {
  colorCodeList: string[]
  discount: number
  graphicDiameterList: number[]
  isFavorite: number
  mainImageUrl: string
  name: string
  periodList: number[]
  price: number
  productId: number
  series: string
  subMainImageUrlList: string[]
}

export interface CardContainerPropsType {
  data: string
  productLists?: ProductResponseType[]
  fetching?: boolean
  allProductCurrentPage?: number
  setAllProductCurrentPage?: (param: number) => void
  newProductCurrentPage?: number
  setNewProductCurrentPage?: (param: number) => void
  allProductCount?: number
  newProductCount?: number
  currentPost?: ProductResponseType[]
}
