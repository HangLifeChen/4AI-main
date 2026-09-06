'use client';
import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Dropdown, Modal, Img } from '@/components/common';
// import { AccountSetting } from '@/components/account-setting';
import { useUser } from '@/stores';
import { useWindow } from '@/hooks';
import { resourceLinks, cn } from '@/utils';
import { navList, userMenuOptions, communityOptions } from './constDatas';
import WalletLogin from '../wallect-connect';
import Link from "next/link";
import './index.scss'
import TrueFocus from '@/components/ui/focus-text';
import ShinyText from '@/components/ui/shiny-text';
import FlipText from '@/components/ui/roll-text';


export const Header = memo(() => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  // const [accountSettingVisible, setAccountSettingVisible] = useState(false);
  const [navMenu, setNavMenu] = useState(navList);
  const { userInfo, logoutUser } = useUser();
  const { isLoad, pathname } = useWindow();
  const router = useRouter();

  const handleScroll = e => {
    if (e.deltaY > 2) {
      setHeaderVisible(false);
    } else if (e.deltaY < -2) {
      setHeaderVisible(true);
    }
  };

  const handleUserMenu = (key: (typeof userMenuOptions)[number]['value']) => {
    const action = {
      profile: () => router.push(resourceLinks.userCenter),
      // setting: () => setAccountSettingVisible(true),
      logout: () => setLogoutVisible(true),
    }[key];

    action?.();
  };

  const handleCommunityMenu = (key: (typeof communityOptions)[number]['value']) => {
    const action = {
      x: () => window.open(resourceLinks.twitter),
      telegram: () => window.open(resourceLinks.telegram),
      discord: () => window.open(resourceLinks.discord),
      github: () => window.open(resourceLinks.github),
    }[key];

    action?.();
  };

  const renderNavItem = item => {
    const { key, label, value } = item;
    const isActive = value && pathname.indexOf(value) === 0;
    // const isCustom = [resourceLinks.openCompute].includes(value);

    return (
      <li key={key || label} className='flex items-center px-[20px] '>
        {isActive && (
          <span className={
            cn(
              'size-[11px] rounded-full bg-primary',
              item.final ? 'mr-3' : 'mr-[6px]',
            )
          }></span>
        )}
        {item.special ? (
          <Button
            type='link'
            color='default'
            href={value}
            className={isActive ? '!text-primary' : 'text-[rgba(255,255,255,0.4)]'}
          >
            {
              <Dropdown options={communityOptions} onAction={handleCommunityMenu as any} >
                <div className="h-12 overflow-hidden group cursor-pointer text-[var(--common-white-four)] hover:text-white">
                  <div className="duration-300 group-hover:-translate-y-12">
                    <div className="h-12 flex items-center justify-center">Community</div>
                    <div className="h-12 flex items-center justify-center">Community</div>
                  </div>
                </div>
              </Dropdown>
            }

          </Button>
        ) : (

          item.final ? (
            <Link href={value} className='h-full flex items-center'>

              <div className=" animate-shake">
                <ShinyText
                  text="Final Run"
                  disabled={false}
                  speed={1.2}
                  className='text-base font-extrabold'
                />
              </div>
            </Link>
          )
            :
            <Button
              type='link'
              color='default'
              href={value}
              className={isActive ? '!text-primary' : 'text-[rgba(255,255,255,0.4)]'}
            >
              {label}
            </Button>
        )}
      </li>
    );
  };

  const renderMenuTree = (treeList, options) => {
    const { isTop, onClose } = options;

    return treeList.map(item => {
      const { key, label, value, children, unfold } = item;
      const hasChildren = !!children?.length;

      return (
        <div key={key || value} className='pl-[20px]'>
          <Button
            className='justify-start text-[rgba(255,255,255,0.8)] mt-[10px] w-full'
            type='link'
            href={value}
            onClick={() => {
              if (hasChildren) {
                item.unfold = !unfold;
                setNavMenu([...navMenu]);
              } else {
                onClose?.();
              }
            }}
          >
            <div
              className={cn(
                'flex w-full items-center',
                isTop ? 'justify-between' : 'justify-start',
              )}
            >
              {label}
              {(hasChildren || isTop) && (
                <img
                  className={cn('size-[14px] duration-300', unfold ? '-rotate-0' : '-rotate-90')}
                  src='/common/nav_unfold.svg'
                />
              )}
            </div>
          </Button>
          <AnimatePresence>
            {unfold && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderMenuTree(children, { ...options, isTop: false })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    });
  };

  const renderMobileMenu = () => {
    return (
      <Drawer
        classNames={{
          closeButton: 'size-[50px] flex justify-center items-center text-[24px]',
        }}
        placement='right'
        isOpen={mobileMenuVisible}
        onOpenChange={setMobileMenuVisible}
      >
        <DrawerContent className=' max-w-[80vw] w-[80vw]'>
          {onClose => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>
                <img className='w-[120px]' src='/home/logo.svg' />
              </DrawerHeader>
              <DrawerBody className=' pl-0'>
                {renderMenuTree(navMenu, { onClose, isTop: true })}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    );
  };

  const renderUserInfo = () => {
    if (!isLoad) return <div className='w-[200px]'></div>;

    return userInfo?.id ? (
      <Dropdown options={userMenuOptions} onAction={handleUserMenu as any}>
        <div className='flex items-center cursor-pointer w-[200px]  justify-end'>
          <span className='lg:block hidden truncate w-0 flex-1 text-right'>{userInfo.name}</span>
          <Img isAws={true} src={userInfo.photo} className='ml-[8px] size-[34px] rounded-full object-cover' />
        </div>
      </Dropdown>
    ) : (
      <>
        <div className='lg:hidden block'>
          <WalletLogin className='w-fit'>
            <div className='rounded-[50px] text-[14px] bg-primary text-black flex items-center justify-center px-2 py-1'>Connect</div>
          </WalletLogin>
        </div>

        <WalletLogin className='w-fit lg:block hidden'>
          <div
            className='bg-primary w-[144px] rounded-[50px] h-[38px] font-bold text-sm text-black overflow-hidden'
          >
            <div className='duration-200 h-full hover:translate-y-[-100%] cursor-pointer'>
              <div className='h-full flex items-center justify-center'>Connect Wallet</div>
              <div className='h-full flex items-center justify-center'>Connect Wallet</div>
            </div>
          </div>
        </WalletLogin>
      </>
    );
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          'lg:w-[1200px] lg:left-[50%] lg:translate-x-[-50%] lg:rounded-full lg:px-[28px] lg:border border-b-1 px-[12px] justify-between w-full border-[rgba(255,255,255,0.1)] duration-500 fixed z-50 flex items-center h-[65px] bg-[#17191A] text-[rgba(255,255,255,0.4)]',
          headerVisible ? 'top-[0] lg:top-[40px]' : '-top-[70px]',
        )}
      >
        <div className='lg:hidden'>
          <img src='/common/mobile_menu.svg' onClick={() => setMobileMenuVisible(true)} />
          {renderMobileMenu()}
        </div>

        <a href='/' className='lg:static lg:translate-x-0 absolute left-[50%] translate-x-[-50%]'>
          <img className='lg:w-[82px] h-9' src='/home/logo.svg' />
        </a>
        <ul className='lg:flex hidden'>{navList.map(renderNavItem)}</ul>
        {renderUserInfo()}
      </div>

      {/* <AccountSetting visible={accountSettingVisible} onVisibleChange={setAccountSettingVisible} /> */}

      <Modal
        visible={logoutVisible}
        title='Log out'
        onVisibleChange={setLogoutVisible}
        onOk={() => {
          logoutUser();
          setLogoutVisible(false);
        }}
      >
        Are you sure you want to log out?
      </Modal>
    </>
  );
});