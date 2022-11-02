import React from 'react'

// Interface
interface PropsType {
  onClick?: () => void
  src: string
  alt: string
  className?: string
  style?: {}
}

const Img = ({ onClick, src, alt, className, style }: PropsType) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/errorImage.png'
  }

  const [isLoading, setIsLoading] = React.useState<boolean>(false) // 실제 화면에 보여지고 있는지 여부를 확인

  // ref
  const imgRef = React.useRef<HTMLImageElement>(null) // 이미지 태그 요소
  const observer = React.useRef<IntersectionObserver>() // IntersectionObserver 변수

  // useEffect
  React.useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver) // 인스턴스 생성
    imgRef.current && observer.current.observe(imgRef.current) // 이미지 태그 관찰 시작
  }, [])

  // IntersectionObserver 설정
  const intersectionOberserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰되고 있는 entry가 보여지게 된 다면
        io.unobserve(entry.target) // 관찰 종료
        setIsLoading(true) // 로딩 체크
      }
    })
  }

  return (
    <img
      ref={imgRef}
      onClick={onClick}
      src={isLoading.toString() && src}
      onError={(e) => handleImgError(e)}
      alt={alt}
      className={className}
      style={style}
    />
  )
}

export default Img
