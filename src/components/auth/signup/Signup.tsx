import React,{useState} from 'react';
import { useDaumPostcodePopup} from 'react-daum-postcode'
import { Link, useLocation } from 'react-router-dom';
import Input from '../../common/Input';
import { RegisterType } from '../types/userTypes';
import Recaptcha from './Recaptcha';
  /** 필수 입력정보
   * 이름 / 우편번호 / 기본 주소 / 상세 주소 / 전화번호 / 이메일 주소 / 생일 / 비밀번호 / 자동 등록 방지
   *  */ 



  
const Signup = () => {
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const {pathname} = useLocation();
  console.log(location);

  const [formValue,setFormValue] = useState<RegisterType>({
    name: '',
    readname: '',
    postNumber:'',
    phone: '',
    email: '',
    birthday: '',
    password: '',
    recommandCode: '',
    postCode: 0,
    address: '',
  })
  
    const handleComplete = (data:any) => {
      let fullAddress = data.address;
      let extraAddress = '';

      if(data.addressType === 'R') {
        if(data.bname !== '') {
          extraAddress = data.bname;
        }
        if(data.buildingName) {
          extraAddress += extraAddress !== '' ? `,${data.buildingName} ` : `${data.buildingName}`;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      setFormValue(prev => ({
        ...prev,
        postCode: data.zonecode,
        address: fullAddress
      }))
      
      
    }

  const addressPopupHandler = () => {
    open({onComplete: handleComplete})
  }
  return (
    <div className='w-full h-[1446px] bg-[#F4F6F8] text-base '>
      <h3 className='text-[#1B304A] font-bold text-[22px] text-center w-full pt-[160px]'>회원가입</h3>
    <div className=' absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[15%] w-3/5 h-fit bg-white rounded-lg p-10'>
    
    <div className=''>
    <h4 className='font-bold'>고객정보</h4>
    <Input type="text" type2='text' double={true} label="이름" isRequired={true} flexDirection="horizontal" placeholder='성' placeholder2='이름' inputWidth='[400px]' inputHeight='10' />
    <Input type="text" type2='text' double={true} label="이름 읽는 법" isRequired={true} flexDirection="horizontal" placeholder='세이' placeholder2='메이' inputWidth='[400px]' inputHeight='10'/>
    
    {/* 컴포넌트로 빼기 */}
    <div className='flex flex-col gap-4 w-full'>
      <label className=''>우편번호</label>
      <div className='flex justify-start items-center gap-2'>
      <input type="text" className='grow h-10 border border-solid border-gray-200 rounded-md max-w-[400px]' />
      <div className='grow'>
    <button className='w-40 h-11 bg-[#3e6d87] rounded-md text-white font-bold border-none cursor-pointer' onClick={addressPopupHandler}>우편 번호 검색</button>
    </div>
    </div>
    </div>

    <Input type="text" type2='text' double={true} label="주소" isRequired={false} flexDirection='vertical' placeholder='기본 주소' placeholder2='상세 주소' inputWidth='[400px]' inputHeight='10'/>
    <Input type='number' double={false} label="전화번호" isRequired={false} flexDirection="horizontal" placeholder='예시:1111222223333' inputWidth='[400px]' inputHeight='10'/>
    <div className='relative pb-6'>
    <Input type="email" double={false} label="e-mail" isRequired={true} flexDirection="horizontal" placeholder='info@lenssis.jp' inputWidth='[400px]' inputHeight='10'/>
    <div className='absolute flex items-center left-0 bottom-4 gap-1'>
      <svg className='mx-auto' width={20} height={20} xmlns="http://www.w3.org/2000/svg"><image href="/assets/smallInfo.svg" /></svg>
      <span className='text-gray-400 text-xs'>메일 주소가 로그인 아이디입니다.</span>
      </div>
    </div>
    {/* 컴포넌트로 빼기 */}
    <div className='flex flex-col'>
      <label><span className="block py-1">생년월일</span></label>
      <div className='flex items-center gap-x-4'>
        <label className=''>
        <input type="number" className='h-10 border border-solid border-gray-200 rounded-md min-w-[80px] max-w-[120px]' min={1900} /> 
        <span className=' ml-2'>년</span>
        </label>
        <label className=''>
        <input type="number" className='h-10 border border-solid border-gray-200 rounded-md min-w-[80px] max-w-[120px]' min={1} max={13} /> 
        <span className=' ml-2'>월</span>
        </label>
        <label className=''>
        <input type="number" className='h-10 border border-solid border-gray-200 rounded-md min-w-[80px] max-w-[120px]' min={1} max={31} /> 
        <span className=' ml-2'>일</span>
        </label>
      </div>
    </div>


   <Input type="text" type2="text" double={true} label="비밀번호" isRequired={true} flexDirection="vertical" placeholder='반각 영숫자 기호 8, 32문자' placeholder2='확인을 위해 다시 한번 입력하세요' inputWidth='[400px]' inputHeight='10' />
   
    {pathname === '/signup' && <Recaptcha />}
    </div>
    <div className='flex w-full items-center mt-8 h-[45px] gap-4'>
      <Link to="/" className='rounded-md flex-1 h-full text-[#3e6d87] bg-white border-[#3e6d87] border-solid border box-border font-bold cursor-pointer flex justify-center items-center'><span className='text-[14px] font-bold'>취소</span></Link>
      <button className='rounded-md flex-1 h-full bg-[#3e6d87] text-white border-transparent box-border font-bold cursor-pointer'>회원 가입</button>
    </div>
    </div>
    </div>
  )
};

export default Signup;