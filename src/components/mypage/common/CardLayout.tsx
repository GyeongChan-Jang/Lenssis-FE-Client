import React from 'react'

interface CardLayoutProps {
  title: string
  children: React.ReactNode
}

const CardLayout = ({ title, children }: CardLayoutProps) => {
  return (
    <div className='font-["SUIT"]'>
      <h3 className="hidden xs:block font-bold text-[22px] text-[#1B304A] pb-2 border-b-4 border-solid border-[#abc8df]">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default CardLayout
