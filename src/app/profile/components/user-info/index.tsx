'use client';
import { memo, useEffect, useState } from 'react';
import { addToast, Spinner } from '@heroui/react';
import { Button, Form, Modal, Img } from '@/components/common';
// import { AccountSetting } from '@/components/business';
import { useUser } from '@/stores';
import { FileManage, request } from '@/utils';
// import { EmailLink } from '@/components/business';

export interface UserInfoProps {
  userInfo: Record<string, any>;
  isSelf?: boolean;
}

export const UserInfo = memo((props: UserInfoProps) => {
  const { userInfo = {}, isSelf } = props;
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [photoFile, setPhotoFile] = useState<File>();
  // const [openLink, setOpenLink] = useState(false);
  const { fetchUserInfo } = useUser();

  const handleUpdateUserInfo = async values => {
    // const photo = await FileManage.uploadPinata(photoFile!);

    const photo = await FileManage.uploadAws(photoFile!);
    const res = await request.post('/api/front/update/user/info', { photo, ...values });

    await fetchUserInfo();

    addToast({ title: res?.text, color: 'success' });
    setEditProfileVisible(false);
  };

  const copyMethod = async (text: string) => {
    await navigator.clipboard.writeText(text);
    addToast({ color: 'success', title: 'Copied!' });
  };

  return (
    <>
      <div className='lg:pb-[30px] pb-0 p-[30px] min-h-[200px] border mt-[145px] rounded-[24px] relative z-0 overflow-hidden'>
        {/* <img
          src='/userCenter/grid-bg.svg'
          className=' absolute w-full h-full left-0 top-0 -z-10  object-cover'
        /> */}
        {!userInfo?.id ? (
          <Spinner size='lg' className='w-full mt-[50px]' />
        ) : (
          <>
            <div className='lg:flex-row flex-col flex justify-between '>
              <div className='flex flex-col'>
                <div className='flex'>
                  <Img isAws={true} src={userInfo.photo} className='size-[114px] rounded-full' />
                  <div className='ml-[30px] flex flex-col gap-[15px] justify-center'>
                    <span className='text-2xl max-w-[600px] truncate'>{userInfo?.name}</span>
                    <div className='flex gap-3 items-center'>
                      <div className='px-3 py-[6px] text-[13px] rounded-[8px] bg-[var(--common-white-one)]'>{userInfo.likes_count} Stars</div>

                      <div className='w-[1px] h-[22px] bg-[var(--common-white-two)]'></div>

                      <div
                        className='rounded-[8px] bg-[rgba(255,255,255,0.1)] px-3 py-[6px] flex gap-[6px] items-center cursor-pointer'
                        onClick={() => copyMethod(userInfo.addr)}
                      >
                        <span className='text-[13px] text-[rgba(255,255,255,0.4)]'>{`${userInfo.addr.slice(0, 5)}...${userInfo.addr.slice(-4)}`}</span>
                        <img src="/userCenter/copy.svg" alt="" className='size-4' />
                      </div>

                      {/* {
                        userInfo.email && <div
                          className='rounded-[8px] bg-[var(--common-white-one)] px-3 py-[6px] flex gap-[6px] items-center cursor-pointer'
                          onClick={() => copyMethod(userInfo.email)}
                        >
                          <span className='text-[13px] text-[var(--common-white-four)]'>{userInfo.email}</span>
                          <img src="/leaderboard/copy.svg" alt="" className='size-4' />
                        </div>
                      } */}


                    </div>
                    {/* <div className='flex mt-[30px] leading-[20px] text-[14px] color-[rgba(255,255,255,0.6)]'>
                      <div className=' pr-[20px] mr-[20px]'>
                        <span className=' text-[20px] font-[500] mr-[10px]'>
                          {userInfo.likes_count}
                        </span>
                        <span className='text-[rgba(255,255,255,0.6)]'>Stars</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <p className='text-[14px] text-[rgba(rgba(255,255,255,0.8))] mt-[30px]'>
                  {userInfo.bio}
                </p>
              </div>

              <div className='lg:w-auto lg:items-start  w-full flex justify-between items-center'>
                <div className='flex lg:my-0 my-[20px]'>
                  {userInfo.discord_link && (
                    <a
                      className=' duration-300 group hover:bg-[rgba(255,255,255,0.2)] size-[40px] border rounded-full flex justify-center items-center mr-[12px] border-[rgba(255,255,255,0.2)]'
                      href={userInfo.discord_link}
                    >
                      <img
                        className=' opacity-80 group-hover:opacity-100'
                        src='/userCenter/discord.svg'
                      />
                    </a>
                  )}

                  {userInfo.github_link && (
                    <a
                      className=' duration-300 group hover:bg-[rgba(255,255,255,0.2)] size-[40px] border rounded-full flex justify-center items-center mr-[12px] border-[rgba(255,255,255,0.2)]'
                      href={userInfo.github_link}
                    >
                      <img
                        className=' opacity-80 group-hover:opacity-100'
                        src='/userCenter/github.svg'
                      />
                    </a>
                  )}

                  {userInfo.twitter_link && (
                    <a
                      className='duration-300 group hover:bg-[rgba(255,255,255,0.2)] size-[40px]  border rounded-full flex justify-center items-center border-[rgba(255,255,255,0.2)]'
                      href={userInfo.twitter_link}
                    >
                      <img
                        className=' opacity-80 group-hover:opacity-100'
                        src='/userCenter/twitter.svg'
                      />
                    </a>
                  )}
                </div>
                {isSelf && (
                  <div className=' lg:ml-[20px] lg:mt-0 flex text-[13px]'>
                    <Button
                      onClick={() => setEditProfileVisible(true)}
                      className='lg:flex hidden w-[94px] h-[40px]  mr-[12px]'
                    >
                      <span className='font-bold  text-[13px]'>Edit Profile</span>
                    </Button>
                    {/* <Button
                      onClick={() => setAccountSettingVisible(true)}
                      type='border'
                      className=' w-[94px] h-[40px]'
                    >
                      <span className='font-bold text-[13px]'>Settings</span>
                    </Button> */}
                    {/* {
                      !userInfo.email &&
                      <div
                        className='border border-[var(--common-white-four)] rounded-[48px] px-[15px] py-[10px] cursor-pointer'
                        onClick={() => setOpenLink(true)}
                      >
                        <span className='text-[13px] text-primary'>Link email</span>
                      </div>
                    } */}


                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* <EmailLink openLink={openLink} setOpenLink={setOpenLink} /> */}

      <Modal
        title='Edit Profile'
        cancelBtnProps={{ className: 'hidden' }}
        okBtnProps={{ className: 'hidden' }}
        visible={editProfileVisible}
        onVisibleChange={setEditProfileVisible}
      >
        <div className='flex justify-between items-center'>
          <label htmlFor='upload-profile-photo' className=' cursor-pointer'>
            {photoFile ? (
              <img
                src={URL.createObjectURL(photoFile)}
                className='size-[105px] rounded-full object-cover'
              />
            ) : (
              <Img isAws={true} src={userInfo.photo} className='size-[105px] rounded-full object-cover' />
            )}
          </label>

          <div className='relative'>
            <Button className='w-[94px] h-[30px] relative text-[14px] font-bold'>
              <label htmlFor='upload-profile-photo' className=' cursor-pointer'>
                Change
              </label>
            </Button>
            <input
              id='upload-profile-photo'
              type='file'
              className='absolute w-full h-full left-0 top-0 opacity-0 -z-10'
              onChange={e => setPhotoFile(e.target.files?.[0])}
            />
          </div>
        </div>
        <Form
          submitBtn='Save Changes'
          submitBtnProps={{ className: 'mt-0' }}
          defaultValues={userInfo}
          onSubmit={handleUpdateUserInfo}
          formItems={[
            {
              name: 'name',
              label: 'Username',
              className: '!mt-[30px]',
            },
            {
              name: 'bio',
              label: 'Bio (optional)',
            },
            {
              name: 'github_link',
              label: 'Add Social Links (optional)',
              placeholder: 'Github link',
            },
            {
              name: 'twitter_link',
              placeholder: 'Twitter link',
              className: 'mt-[-30px]',
            },
            {
              name: 'discord_link',
              placeholder: 'Discord link',
              className: 'mt-[-30px]',
            },
          ]}
        />
      </Modal>

      {/* <AccountSetting visible={accountSettingVisible} onVisibleChange={setAccountSettingVisible} /> */}
    </>
  );
});
