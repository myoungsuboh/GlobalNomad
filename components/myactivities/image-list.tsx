import cancleBtn from '@/public/icon/ic_cancle_btn.svg';
import plusIcon from '@/public/icon/ic_plus_icon.svg';
import Image from 'next/image';
import {Controller, useFormContext} from 'react-hook-form';
import {useState, useRef} from 'react';

interface ImageListType {
  maxImages?: number;
  name?: string;
}

export default function ImageList({maxImages = 5, name = 'defaultName'}: ImageListType) {
  const [imageUrls, setImageUrls] = useState<(string | ArrayBuffer)[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: {errors},
    setError,
    clearErrors,
    setValue,
  } = useFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length + selectedFiles.length > maxImages) {
      setError(name, {type: 'manual', message: `최대 ${maxImages}개의 이미지만 선택할 수 있습니다.`});
      return;
    }
    clearErrors(name);

    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);

      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileUrl = reader.result as string;
          if (!imageUrls.includes(fileUrl)) {
            setImageUrls(prevUrls => [...prevUrls, fileUrl]);
          }
        };
        reader.readAsDataURL(file);
      });

      setValue(name, [...selectedFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImageUrls);
  };

  return (
    <div className="flex flex-wrap gap-6">
      {/* 이미지 등록 */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex h-167pxr w-167pxr items-center justify-center rounded-xl border border-dashed border-gray-800 tablet:h-206pxr tablet:w-206pxr pc:h-180pxr pc:w-180pxr"
      >
        <div className="flex flex-col items-center">
          <Image src={plusIcon} alt="이미지등록" width={48} height={48} className="pb-8" />
          <div>이미지 등록</div>
        </div>
      </div>
      {/* 파일 인풋 */}
      <Controller
        name={name}
        control={control}
        rules={{
          required: '필수값입니다',
          validate: {
            maxImages: () => selectedFiles.length <= maxImages || `최대 ${maxImages}개의 이미지만 선택할 수 있습니다.`,
          },
        }}
        render={() => (
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={selectedFiles.length >= maxImages}
            multiple
          />
        )}
      />
      {/* 이미지 미리보기 및 삭제 버튼 */}
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="relative h-167pxr w-167pxr tablet:h-206pxr tablet:w-206pxr pc:h-180pxr pc:w-180pxr">
          <Image src={typeof imageUrl === 'string' ? imageUrl : ''} alt={`이미지 ${index + 1}`} fill className="rounded-3xl" />
          <div className="absolute right-[-16px] top-[-18px] cursor-pointer p-2" onClick={() => handleRemoveImage(index)}>
            <Image src={cancleBtn} width={24} height={24} alt="이미지삭제" />
          </div>
        </div>
      ))}
      {/* 오류 메시지 */}
      {typeof errors[name]?.message === 'string' && <span className="error-message">{errors[name]?.message}</span>}
    </div>
  );
}
