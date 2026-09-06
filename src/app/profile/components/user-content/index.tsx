'use client';
import { memo, useState, useMemo, type Key } from 'react';
import { Tabs, Tab } from '@heroui/react';
import CommentList from '@/components/comment/comment-list';
import RequestsList from '@/components/list-card/requests';
import AgentList from '@/components/list-card/agent';

export interface UserContentProps {
  isSelf?: boolean;
  userInfo: Record<string, any>;
}

export const UserContent = memo((props: UserContentProps) => {
  const { isSelf, userInfo } = props;
  const [activeKey, setActiveKey] = useState<Key>('Agents');
  const [countData, setCountData] = useState({});
  const tabsOptions = [
    {
      title: 'Agents',
      contentConfig: {
        Component: AgentList,
        props: {
          api: {
            list: '/api/front/get/repositories/list',
            detail: '/api/front/get/repositories',
            like: '/api/front/like/repositories',
            unlike: '/api/front/unlike/repositories',
          },
          params: { create_by: userInfo?.uid },
        },
      },
    },
    {
      title: 'Stared Agents',
      contentConfig: {
        Component: AgentList,
        props: {
          api: {
            list: '/api/front/get/repositories/my/like_list',
            detail: '/api/front/get/repositories',
            like: '/api/front/like/repositories',
            unlike: '/api/front/unlike/repositories',
          },
        },
      },
    },
    {
      title: 'Commented Agents',
      contentConfig: {
        Component: CommentList,
        props: { api: '/api/front/get/repositories/my/comment_list' },
      },
    },
    {
      title: 'Requests',
      contentConfig: {
        Component: RequestsList,
        props: { api: '/api/front/get/request/list', params: { create_by: userInfo?.uid } },
      },
    },
    {
      title: 'Liked Requests',
      contentConfig: {
        Component: RequestsList,
        props: { api: '/api/front/get/request/my/like_list' },
      },
    },
    {
      title: 'Commented Requests',
      contentConfig: {
        Component: CommentList,
        props: { api: '/api/front/get/request/my/comment_list' },
      },
    },
  ]
    .filter(item => {
      return isSelf ? true : ['Agents', 'Requests'].includes(item.title);
    })
    .map(item => {
      const { title, contentConfig } = item;
      const { Component }: any = contentConfig;

      return {
        ...item,
        content: (
          <Component
            {...contentConfig.props}
            onChange={data => {
              setCountData(oldState => ({ ...oldState, [title]: data.count }));
            }}
          />
        ),
      };
    });

  const userInfoTabs = useMemo(() => (userInfo?.uid ? tabsOptions : []), [userInfo]);

  return (
    <div className='mt-[30px]'>
      <Tabs
        aria-label='Tabs colors'
        radius='full'
        size='lg'
        color='primary'
        classNames={{
          tabList: 'p-[8px] bg-transparent border ',
          tabContent: 'font-[500] text-[15px] group-data-[selected=true]:text-primary',
          tab: ' px-[18px] py-[10px]',
          cursor: 'bg-[rgba(39,230,255,0.15)] border border-primary',
          base: 'w-full',
        }}
        onSelectionChange={setActiveKey}
      >
        {userInfoTabs.map(item => {
          const { title } = item;
          return <Tab key={title} title={`${title} ${countData[title] || 0}`}></Tab>;
        })}
      </Tabs>

      {userInfoTabs.map(item => {
        const { content, title } = item;
        return (
          <div
            key={title}
            className='mt-[10px]'
            style={{
              display: activeKey === title ? 'block' : 'none',
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
});
