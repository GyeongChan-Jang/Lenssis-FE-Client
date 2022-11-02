import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../auth/hooks/useUser'
import useSearch from './hooks/useSearch'

interface NavSearchProps {
  searchValue: string
  searchValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const NavSearch = ({ searchValueHandler, searchValue }: NavSearchProps) => {
  const { searchLens } = useSearch()
  const { user } = useUser()
  const navigate = useNavigate()
  const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchValue.trim()) {
      alert('검색어를 입력해주세요')
      return
    }

    searchLens({ keyword: searchValue, memberId: user?.memberId })
    navigate('/searchresult', { state: searchValue })
  }

  return (
    <form
      onSubmit={searchSubmitHandler}
      className="flex items-center relative rounded-3xl border border-solid border-white w-1/3 max-w-[300px] min-w-[300px]"
    >
      <input
        className="w-full h-8 pl-4 outline-none bg-[#73A4CA] placeholder-white placeholder:text-sm rounded-full"
        type="text"
        placeholder="퍼스널 진단"
        onChange={searchValueHandler}
      />
      <button className="bg-white w-8 absolute z-10 rounded-full flex items-center -right-[1px]">
        <img className="w-full" src="/assets/search.svg" alt="search-icon" />
      </button>
    </form>
  )
}

export default NavSearch
