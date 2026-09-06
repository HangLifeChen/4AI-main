'use client';

import {
  memo,
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { addToast } from '@heroui/react';
import { request, getWindow, resourceLinks, runCron, requestDomain } from '@/utils';
import { useDisconnect } from '@reown/appkit/react';

import { useSignMessage } from 'wagmi';

const UserContext = createContext({} as UserProviderCtx);

const localUserInfo = JSON.parse(
  getWindow('localStorage')?.getItem('userData') || '{}'
);


export interface UserProviderProps {
  children: ReactNode;
}

export interface UserProviderCtx {
  userInfo: Record<string, any>;
  userInfoLoading: boolean;
  loginStatus: boolean;
  needReFetch: boolean;
  setReFetchFlag: (flag?: boolean) => void;
  authLoginStatus: () => boolean;
  fetchUserInfo: (uid?: string) => Promise<UserProviderCtx['userInfo']>;
  logoutUser: () => Promise<void>;
  updateUser: (userData: UserProviderCtx['userInfo']) => Promise<void>;
  initLoginData: (loginData?: Record<string, any>) => Promise<boolean>;
  walletLoginData: (loginData?: Record<string, any>) => Promise<boolean>;
  backToPage: () => void;
  // wallet
  signWallet: (
    address: string | undefined,
  ) => Promise<void>;
  openInviteTwitter: () => void,
  inviteLink: string,
  inited: boolean,
  getFarmInfo: () => Promise<void>;
  farmInfo: any,
  isWalletConnected: () => void
}


export const UserProvider = memo((props: UserProviderProps) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<Record<string, any>>({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  const signingPromiseRef = useRef<Promise<void> | null>(null);
  const { disconnect } = useDisconnect()
  const [needReFetch, setNeedReFetch] = useState(false);
  const [inited, setInited] = useState(false);
  const [farmInfo, setFarmInfo] = useState<any>();

  const router = useRouter()
  const pathname = usePathname();
  const inviteLink = `${requestDomain}${resourceLinks.final}?invite_by=${userInfo.uid}`;
  const { signMessageAsync } = useSignMessage();


  const openInviteTwitter = useCallback(() => {
    const shareText = `I’m stacking points for the 30% $4AI community airdrop on @4AIbsc. Join me
${inviteLink}
    `;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  }, [inviteLink]);

  const fetchUserInfo = useCallback(async (uid?: string) => {
    setUserInfoLoading(true);
    const res = await request
      .post(
        '/api/front/get/user/info',
        { uid },
        { ignoreVerifyLogin: !uid, ignoreErrorMsg: !uid }
      )
      .catch(() => { });
    const userData = res?.data || {};

    setUserInfoLoading(false);

    if (!uid) {
      const status = !!userData?.uid;

      if (status) {
        localStorage.setItem('signedFlag', "1");
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        localStorage.removeItem('userData');
        localStorage.removeItem('signedFlag');
        await disconnect();
      }
      setInited(true);
      setUserInfo(userData);
      setLoginStatus(status);
    }

    return userData;
  }, []);

  const getFarmInfo = async () => {
    const { code, data } = await request.get('/api/front/get/finaltest/farm')
    if (code == 0) {
      setFarmInfo(data);
    }
  }

  const backToPage = () => {
    const redirectUrl = localStorage.getItem('redirectUrl') || '/';
    // location.href = redirectUrl;
    router.push(redirectUrl)
  };

  const setReFetchFlag = (flag = false) => {
    setNeedReFetch(flag);
  }

  const authLoginStatus = useCallback(() => {
    if (!loginStatus && !userInfoLoading) {
      // setRedirectUrl();
      // router.replace(resourceLinks.login);
      addToast({ title: `Connect your wallet to proceed.`, color: 'warning' });
    }

    return loginStatus;
  }, [loginStatus, userInfoLoading]);


  const initLoginData = async (loginData: any) => {
    if (!loginData) return false;
    const { data, text } = loginData;

    if (data) {
      const redirectUrl = localStorage.getItem('redirectUrl') || '/';

      localStorage.setItem('loginToken', data.token);
      location.href = redirectUrl;
      await fetchUserInfo();
    }

    addToast({ title: text, color: 'success' });

    return !!data?.data;
  };

  const walletLoginData = async (loginData: any) => {
    if (!loginData) return false;
    const { data, text } = loginData;
    let userData: any;
    if (data) {
      localStorage.setItem('loginToken', data.token);
      localStorage.setItem('loginTokenExpiration', (data.token_expire_time * 1000).toString());
      userData = await fetchUserInfo();

      if (['/final-run'].includes(pathname)) {
        setNeedReFetch(true);
      }
    }

    addToast({ title: text, color: 'success' });
    return !!userData?.uid;
  };

  // const loginUser: UserProviderCtx['loginUser'] = useCallback(
  //   async (loginType, params) => {
  //     const res = await request.post(loginUrl[loginType], params);

  //     return await initLoginData(res);
  //   },
  //   []
  // );

  const logoutUser = useCallback(async () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('loginTokenExpiration');
    localStorage.removeItem('userData');
    localStorage.removeItem('signedFlag');

    await disconnect();
    setUserInfo({});
    setLoginStatus(false);
    setUserInfoLoading(false);
    setFarmInfo({});

    // location.reload();
  }, []);

  const updateUser = useCallback(async updateData => {
    const res = await request.post('/api/front/update/user/info', updateData);

    addToast({ title: res?.text, color: 'success' });
    fetchUserInfo();
  }, []);

  const signWallet = useCallback(
    async (address: string | undefined) => {

      if (!address) return;

      if (signingPromiseRef.current) return signingPromiseRef.current;

      signingPromiseRef.current = (async () => {

        try {
          const { data } = await request.post('/api/front/login/wallet', {
            addr: address,
          });
          const nonce = data?.nonce;
          if (!nonce) throw new Error('No nonce from server');

          // const signedMessage = await signMessage(config, {
          //   message: nonce,
          // })
          const signedMessage = await signMessageAsync({ message: nonce })

          const res = await request.post('/api/front/login/auth_wallet', {
            addr: address,
            signature: signedMessage,
            nonce,
          });

          if (res.code === 0) {
            const flag = await walletLoginData(res);
            localStorage.setItem('signedFlag', "1");
          }
        } catch (error: any) {
          // addToast({ title: "User rejected the signature request", color: 'warning' });
          console.log(error)

          const msg = error?.message || error.toString()

          if (msg.includes('User rejected') || msg.includes('denied')) {
            addToast({ title: "User rejected the signature request", color: 'warning' })
            disconnect()
          } else {
            addToast({ title: error.message, color: 'warning' })
          }
          // disconnect()
        } finally {
          signingPromiseRef.current = null;
        }
      })();

      return signingPromiseRef.current;
    },
    [loginStatus, walletLoginData]
  );

  const isWalletConnected = useCallback(() => {
    const signedFlag = localStorage.getItem('signedFlag');
    const isDisconnected = localStorage.getItem('@appkit/connection_status') == 'disconnected';
    if (!signedFlag) {
      return;
    }
    if (isDisconnected) {
      logoutUser();
    }
  }, []);


  useEffect(() => {
    // runCron();
    setUserInfo(localUserInfo);
    fetchUserInfo();
    // getFarmInfo();
  }, []);


  const values: UserProviderCtx = useMemo(
    () => ({
      userInfo,
      userInfoLoading,
      loginStatus,
      needReFetch,
      setReFetchFlag,
      authLoginStatus,
      fetchUserInfo,
      // loginUser,
      logoutUser,
      updateUser,
      initLoginData,
      walletLoginData,
      backToPage,
      signWallet,
      openInviteTwitter,
      inviteLink,
      inited,
      getFarmInfo,
      farmInfo,
      isWalletConnected
    }),
    [
      userInfo,
      userInfoLoading,
      loginStatus,
      needReFetch,
      fetchUserInfo,
      setReFetchFlag,
      authLoginStatus,
      // loginUser,
      logoutUser,
      updateUser,
      initLoginData,
      walletLoginData,
      backToPage,
      signWallet,
      openInviteTwitter,
      inviteLink,
      inited,
      getFarmInfo,
      farmInfo,
      isWalletConnected
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
});


export const useUser = () => useContext(UserContext);