import { resourceLinks } from '@/utils';

export const communityOptions = [
  {
    value: 'x' as const,
    label: (
      <>
        <img src='/community/twitter_icon.svg' className='mr-[10px]' />
        X
      </>
    ),
  },
  {
    value: 'telegram' as const,
    label: (
      <>
        <img src='/community/telegram_icon.svg' className='mr-[10px]' />
        Telegram
      </>
    ),
  },
  {
    value: 'discord' as const,
    label: (
      <>
        <img src='/community/discord_icon.svg' className='mr-[10px]' />
        Discord
      </>
    ),
  },
  {
    value: 'github' as const,
    label: (
      <>
        <img src='/community/github_icon.svg' className='mr-[10px]' />
        Github
      </>
    ),
  },

];

export const userMenuOptions = [
  {
    value: 'profile' as const,
    label: (
      <>
        <img src='/userCenter/profile_icon.svg' className='mr-[10px]' />
        Profile
      </>
    ),
  },
  // {
  //   value: 'setting' as const,
  //   label: (
  //     <>
  //       <img src='/userCenter/setting_icon.svg' className='mr-[10px]' />
  //       Account Settings
  //     </>
  //   ),
  // },
  {
    value: 'logout' as const,
    label: (
      <>
        <img src='/userCenter/logout_icon.svg' className='mr-[10px]' />
        Log out
      </>
    ),
  },
];

export const navList = [
  // {
  //   label: 'Final Run',
  //   value: resourceLinks.final,
  //   final: true,
  // },

  {
    label: 'Requests',
    value: resourceLinks.request,
  },
  {
    label: 'Agent Hub',
    value: resourceLinks.agentHub,
  },
  {
    label: 'Agent Space',
    value: resourceLinks.agentSpace,
  },
  {
    label: 'x402',
    value: resourceLinks.x402,
  },
  // {
  //   label: 'Community',
  //   value: '',
  //   special: true,
  //   children: [
  //     {
  //       label: 'X',
  //       value: resourceLinks.twitter,
  //     },
  //     {
  //       label: 'Telegram',
  //       value: resourceLinks.telegram,
  //     },
  //     {
  //       label: 'Discord',
  //       value: resourceLinks.discord,
  //     },
  //     {
  //       label: 'Github',
  //       value: resourceLinks.github,
  //     },
  //   ]
  // },
];