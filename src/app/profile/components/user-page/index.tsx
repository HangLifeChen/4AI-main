'use client';
import { useEffect, useState, memo } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@/stores';
import { UserInfo } from '../user-info';
import { UserContent } from '../user-content';

export const UserPage = memo(() => {
  const [userInfo, setUserInfo] = useState({});
  const { uid } = useParams();
  const { fetchUserInfo, userInfo: currentUserInfo } = useUser();
  const isSelf = uid === currentUserInfo?.uid || !uid;

  const initUserInfo = () => {
    if (isSelf) {
      setUserInfo(currentUserInfo);
    } else {
      fetchUserInfo(uid as string).then(setUserInfo);
    }
  };

  useEffect(() => {
    initUserInfo();
  }, [currentUserInfo]);

  return (
    <div className='xl:w-[1200px] w-full min-h-screen  mx-auto px-[12px]'>
      <UserInfo isSelf={isSelf} userInfo={userInfo} />
      <UserContent isSelf={isSelf} userInfo={userInfo} />
    </div>
  );
});
