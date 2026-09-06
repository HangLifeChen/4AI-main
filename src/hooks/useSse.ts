import { useState, useEffect } from 'react';
import { IAgentCard } from '@/types/agent-types';
import { IRequestCard } from '@/types/request-types';

export enum EventType {
  REQUEST = 'new_request',
  REQUEST_REPLY = 'new_request_reply',
  REPOSITORY = 'new_repository',
  REPOSITORY_DOWNLOAD = 'new_repository_download',
}

interface IDataType {
  new_request: IRequestCard;
  new_request_reply: IRequestCard;
  new_repository: IAgentCard;
  new_repository_download: IAgentCard;
}

const useSSE = (url = `${process.env.NEXT_PUBLIC_REQUEST_DOMAIN}/api/common/stream`) => {

  const [identifier, setIdentifier] = useState<string>("");
  const [eventData, setEventData] = useState<IDataType>();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  useEffect(() => {
    let eventSource: EventSource;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      eventSource = new EventSource(url);

      const handlers = {
        // new_request: (data: IRequestCard) => setEventData({...eventData,new_request: data }),
        new_request: (data: IRequestCard) => setEventData(prev => ({ ...prev, new_request: data }) as IDataType),
        new_request_reply: (data: IRequestCard) => setEventData(prev => ({ ...prev, new_request_reply: data }) as IDataType),
        new_repository: (data: IAgentCard) => setEventData(prev => ({ ...prev, new_repository: data }) as IDataType),
        new_repository_download: (data: IAgentCard) => setEventData(prev => ({ ...prev, new_repository_download: data }) as IDataType),
      };

      Object.entries(handlers).forEach(([eventName, handler]) => {
        eventSource.addEventListener(eventName, (event) => {
          handler(JSON.parse(event.data));
          setIdentifier(eventName);
        });
      });

      eventSource.onopen = () => {
        setRetryCount(0);
      };

      eventSource.onerror = () => {
        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          if (retryCount < maxRetries) {
            const delay = Math.min(2 ** retryCount * 1000, 30000);
            reconnectTimer = setTimeout(() => {
              setRetryCount(c => c + 1);
              connect();
            }, delay);
          }
        }
      };
    };

    connect();

    return () => {
      if (eventSource) eventSource.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [url, retryCount]);

  return { ...eventData, identifier };
};

export default useSSE;