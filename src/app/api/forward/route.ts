import { NextRequest } from 'next/server';
import { requestDomain } from '@/utils/configs';

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  const forwardUrl = searchParams.get('forwardUrl');
  const headers = new Headers(req.headers);
  const data = await fetch(`${requestDomain}${forwardUrl}`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  return data;
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const headers = new Headers(req.headers);
  const { forwardUrl } = requestBody;
  const data = await fetch(`${requestDomain}${forwardUrl}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(requestBody),
    credentials: 'include',
  });

  return data;
}
