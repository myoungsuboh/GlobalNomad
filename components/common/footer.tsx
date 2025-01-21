import Image from 'next/image';
import React from 'react';
import icFacebook from '@/public/icon/ic_facebook.svg';
import icTwitter from '@/public/icon/ic_twitter.svg';
import icYoutube from '@/public/icon/ic_youtube.svg';
import icInstagram from '@/public/icon/ic_instagram.svg';

const socialLinks = [
  {
    href: 'https://www.facebook.com',
    src: icFacebook,
    alt: '페이스북이동',
  },
  {
    href: 'https://www.twitter.com',
    src: icTwitter,
    alt: '트위터이동',
  },
  {
    href: 'https://www.youtube.com',
    src: icYoutube,
    alt: '유튜브이동',
  },
  {
    href: 'https://www.instagram.com',
    src: icInstagram,
    alt: '인스타그램이동',
  },
];

const footerLinks = [
  {key: 1, label: 'Privacy Policy ', href: '#'},
  {key: 2, label: 'FAQ', href: '#'},
];

export default function Footer() {
  return (
    <footer className="h-160pxr bg-nomad-black mt-10" style={{fontFamily: 'Arial'}}>
      <div className="flex flex-wrap items-center justify-between px-10 pt-7 pc:max-w-[1200px]">
        <div className="pt-4 font-normal text-[#676767]">@codeit - 2025</div>
        <div className="flex gap-8 pt-4 text-lg font-normal text-[#676767]">
          <ul className="flex gap-8">
            {footerLinks.map(({key, label, href}) => (
              <li key={key}>
                <a href={href} className="hover:text-blue-500">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 pt-4 tablet:mt-0 tablet:w-auto">
          {socialLinks.map(({href, src, alt}) => {
            return (
              <div key={alt}>
                <a key={href} target="_blank" rel="noopener noreferrer" href={href}>
                  <Image src={src} width={16} style={{width: '100%', height: 'auto'}} alt={alt} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
