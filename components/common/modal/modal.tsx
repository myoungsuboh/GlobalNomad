import Image from 'next/image';
import checkConfirm from '@/public/icon/icon_confirm.svg';
import OverlayContainer from './overlay-container';
import Button from '../button';

interface ModalProps {
  type: 'small' | 'big';
  message: string;
  onClose: () => void;
}

export default function Modal({type, message, onClose}: ModalProps) {
  const modalConfig = {
    small: {
      containerClass:
        'bg-white rounded-xl w-full h-[11.5rem] mx-[2.375rem] p-[0.375rem] pc:w-[18.625rem] tablet:w-[18.625rem] flex flex-col items-center justify-center gap-8',
      content: (
        <>
          <div>
            <div className="relative mb-4 h-24pxr w-24pxr">
              <Image src={checkConfirm} alt="예약 취소 확인 체크" fill className="absolute" />
            </div>
            <p className="text-lg font-regular">{message}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              className={
                'h-38pxr w-80pxr rounded-md border border-nomad-black px-20pxr py-10pxr text-center text-md font-bold leading-none text-nomad-black'
              }
            >
              아니오
            </Button>
            <Button
              onClick={onClose}
              className={'h-38pxr w-80pxr rounded-md bg-nomad-black px-14pxr py-10pxr text-center text-md font-bold leading-none text-white'}
            >
              취소하기
            </Button>
          </div>
        </>
      ),
    },
    big: {
      containerClass:
        'relative bg-white rounded-lg mx-6 w-full h-[13.75rem] pc:w-[33.75rem] pc:h-[15.625rem] tablet:w-[33.75rem] tablet:h-[15.625rem] flex items-center justify-center',
      content: (
        <>
          <p className="mb-43pxr text-lg font-medium tablet:mb-0 tablet:text-2lg pc:mb-0 pc:text-2lg">{message}</p>
          <div className="absolute bottom-7 tablet:bottom-7 tablet:right-7 pc:bottom-7 pc:right-7">
            <Button onClick={onClose} className="big-button">
              확인
            </Button>
          </div>
        </>
      ),
    },
  };

  const config = modalConfig[type];

  return (
    <OverlayContainer onClose={onClose}>
      <div onClick={e => e.stopPropagation()} className={config.containerClass}>
        {config.content}
      </div>
    </OverlayContainer>
  );
}
