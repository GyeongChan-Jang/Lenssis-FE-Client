import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { NoticePageTitle } from '../../../../constants/NoticeTitles'

interface Title {
  title: string
  value: string
}

function NoticePageTab() {
  const [isOpen, setIsOpen] = useState(false)
  const [optionName, setOptionName] = useState('필독 공지사항')
  const navigate = useNavigate()

  const changeViewOption = () => {
    setIsOpen((prev: boolean) => !prev)
  }
  const selectOptionHandler = (title: string) => {
    setOptionName(title)
    setIsOpen((prev) => (prev = false))
  }

  useEffect(() => {
    if (!location.pathname.includes('notice') && location.pathname !== optionName) {
      navigate('/')
    }
    // if (!location.pathname.includes('notice') && location.pathname !== optionName) {
    //   navigate('/notice/mustread')
    // }
  }, [])

  return (
    <>
      {' '}
      <div className="hidden xs:flex xs:justify-center xs:border-b-2 xs:border-solid xs:border-gray-100 ">
        {NoticePageTitle.map((title: Title, index: number) => (
          <NavLink
            key={index}
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #9AD0F6' : 'none'
              // padding: isActive ? '0 10px' : 'none'
            })}
            to={title.value}
            className="xl:w-[200px] md:w-[150px] sm:w-[100px] text-center py-4"
          >
            {title.title}
          </NavLink>
        ))}
      </div>
      <div className="block xs:hidden border-b-[1px] border-solid border-lenssisGray py-4">
        <div className="block xs:hidden relative">
          <div className=" h-6 flex justify-end">
            <button className="w-32 flex items-center " onClick={changeViewOption}>
              <div className="mr-4 font-[800] text-[16px] grow">{optionName}</div>
              <img width={8} src="/assets/arrowtobottom.png" alt="" />
            </button>
          </div>

          {isOpen && (
            <ul className="absolute top-[36px] right-[2px] py-4 flex flex-col items-start w-[160px] rounded-md shadow-[0_0_6px] shadow-gray-400/80 bg-[#fff]  z-[9]">
              {NoticePageTitle.map((title: Title, index: number) => (
                <li
                  className="w-[90%] mx-auto border-b-[1px] border-solid border-lenssisGray py-2"
                  onClick={(e) => selectOptionHandler(title.title)}
                >
                  <NavLink
                    key={index}
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? 'black' : '#5a5a5a'
                    })}
                    to={title.value}
                    className="ml-4 text-lenssisGray"
                  >
                    {title.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default NoticePageTab
