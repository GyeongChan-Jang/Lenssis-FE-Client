import { atom } from 'recoil'

export const CurrentInnerWidth = atom({
  key: 'currentInnerWidth',
  default: window.innerWidth
})
