import { atom } from 'recoil'
import { ProductResponseType } from '../components/main/types/productTypes'

export interface FilterValue {
  // [index: string]: string | number[] | string[]
  periodState: number[]
  graphicDiameterState: number[]
  colorState: string[]
  seriesState: string[]
  featureState: string[]
}

export interface FilteredProductsTypes {
  productData: ProductResponseType[]
  totalCount: number
}

// 필터링된 옵션들을 저장하는 atom
export const filterOptionState = atom<FilterValue>({
  key: 'filterOptions',
  default: {
    periodState: [],
    graphicDiameterState: [],
    colorState: [],
    seriesState: [],
    featureState: []
  }
})

// 필터링된 상품들을 저장하는 atom
export const filteredProudcts = atom<FilteredProductsTypes>({
  key: 'filteredProudct',
  default: {
    productData: [],
    totalCount: 0
  }
})
