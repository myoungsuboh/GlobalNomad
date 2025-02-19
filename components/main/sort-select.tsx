import Image from 'next/image';
import {useState} from 'react';
import {ActivitiesBody} from '@/types/activities';
import arrowDown from '@/public/icon/icon_arrow_down.svg';

interface CustomSelectProps {
  selectedSort: ActivitiesBody['sort'] | undefined;
  onSelectedSort: (value: ActivitiesBody['sort'] | undefined) => void;
}

export default function SortSelect({selectedSort, onSelectedSort}: CustomSelectProps) {
  const options = [
    {value: 'price_asc', label: '가격 낮은 순'},
    {value: 'price_desc', label: '가격 높은 순'},
  ];
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(option => option.value === selectedSort)?.label || '가격';

  const handleSelect = (value: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest' | undefined) => {
    onSelectedSort(value);
    setIsOpen(true);
  };

  return (
    <div
      onClick={() => setIsOpen(prev => !prev)}
      className="relative h-41pxr w-90pxr min-w-[90px] cursor-pointer rounded-2xl border border-nomad-black bg-white px-2 py-2 dark:border-stone-600 dark:bg-stone-900/10 tablet:h-53pxr tablet:w-123pxr tablet:px-5 tablet:py-4 pc:w-127pxr"
    >
      <div className="flex items-center justify-center gap-1 rounded-md tablet:justify-between">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-md font-medium text-green-100 dark:text-gray-50 tablet:text-2lg">
          {selectedLabel}
        </span>
        <div className="relative h-4 w-4 flex-shrink-0">
          <Image src={arrowDown} alt="Arrow Down" className="absolute" fill />
        </div>
      </div>

      {isOpen && (
        <ul className="no-scrollbar absolute right-1pxr z-10 mt-4 w-[90px] rounded-md border border-gray-200 bg-none shadow-sidenavi-box dark:border-slate-600 tablet:w-[120px] pc:w-127pxr">
          {options.map(option => (
            <li
              key={option.value}
              className="no-scrollbar w-[90px] border-collapse cursor-pointer border-t border-gray-200 px-5pxr py-18pxr text-md font-medium text-gray-800 hover:bg-green-50 hover:text-nomad-black dark:border-stone-500 dark:bg-stone-800 dark:text-gray-300 dark:hover:text-gray-50 tablet:w-[120px] tablet:text-2lg pc:w-127pxr"
              onClick={() => handleSelect(option.value as 'price_asc' | 'price_desc' | 'most_reviewed' | 'latest')}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
