'use client';

import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/service/store/authStore';
import { patchMypage } from '@/service/api/users/patchMypage.api';
import { EditMypageBody } from '@/types/patchMypage.types';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import Modal from '@/components/common/modal/modal';
import { useState } from 'react';

interface IFormInput {
  email: string;
  nickname: string;
  password: string;
  newPassword: string;
}

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { user, updateNickname } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: user ? `${user.email}` : '',
      nickname: user ? `${user.nickname}` : '',
      password: ``,
      newPassword: ``,
    },
  });

  const mypageMutation = useMutation({
    mutationFn: (mypageData: EditMypageBody) => patchMypage(mypageData),
  });

  const onSubmit = async (data: IFormInput) => {
    mypageMutation.mutate(data, {
      onError: () => {
        setModalMessage('마이페이지 저장 중 오류가 발생했습니다.');
        setIsModalOpen(true);
      },
      onSuccess: (data) => {
        updateNickname(data.nickname);
        setModalMessage('마이페이지 정보가 성공적으로 저장되었습니다.');
        setIsModalOpen(true);
      },
    });
  };

  const passwordValue = watch('password');

  return (
    <>
      {isModalOpen && (
        <Modal
          type="big"
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <form
        className="w-[21.875rem] h-[472px] gap-[32px] tablet:w-[40rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <p className="text-[32px] font-[700] leading-[42px] tablet:text-[38.19px] tablet:leading-[38.19px]">
            내 정보
          </p>
          {/* 저장하기 버튼 */}
          <Button
            className={`h-[48px] w-[120px] gap-[4px] rounded-[4px] pb-[8px] pl-[16px] pr-[16px] pt-[8px] text-white ${
              isValid ? 'bg-primary' : 'bg-[#A4A1AA]'
            }`}
            type="submit"
            disabled={!isValid}
          >
            저장하기
          </Button>
        </div>
        <div className="flex flex-col gap-[16px]">
          {/* 닉네임 입력란 */}
          <Controller
            name="nickname"
            control={control}
            rules={{
              required: '필수값입니다.',
              maxLength: {
                value: 10,
                message: '열 자 이하로 작성해 주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                label="닉네임"
                placeholder="닉네임을 입력해 주세요"
                labelClassName="block text-lg pb-2"
                className="h-[3.625rem] w-[21.875rem] tablet:h-[3.625rem] tablet:w-[40rem]"
                value={field.value}
                onChange={field.onChange}
                error={errors.nickname?.message}
              />
            )}
          />
          {/* 이메일 입력란 */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="이메일"
                placeholder="이메일을 입력해 주세요"
                labelClassName="block text-lg pb-2"
                className="h-[3.625rem] w-[21.875rem] tablet:h-[3.625rem] tablet:w-[40rem]"
                value={field.value}
                error={errors.email?.message}
              />
            )}
          />
          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: '필수값입니다.',
              minLength: {
                value: 8,
                message: '8자 이상으로 작성해 주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                labelClassName="block text-lg pb-2"
                className="h-[3.625rem] w-[21.875rem] tablet:h-[3.625rem] tablet:w-[40rem]"
                value={field.value}
                onChange={field.onChange}
                isPassword
                type="password"
                error={errors.password?.message}
              />
            )}
          />
          {/* Confirm Password Input */}
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: '필수값입니다.',
              validate: (value) =>
                value === passwordValue || '비밀번호가 일치하지 않습니다.',
            }}
            render={({ field }) => (
              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                labelClassName="block text-lg pb-2"
                className="h-[3.625rem] w-[21.875rem] tablet:h-[3.625rem] tablet:w-[40rem]"
                value={field.value}
                onChange={field.onChange}
                isPassword
                type="password"
                error={errors.newPassword?.message}
              />
            )}
          />
        </div>
      </form>
    </>
  );
}
