import { type NextRequest } from 'next/server';
import { HeadObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, bucket, verifyLoginStatus } from '@/app/api';

export const POST = async (req: NextRequest) => {
  try {
    await verifyLoginStatus(req);
    const requestBody = (await req.json()) || {};
    const { hash } = requestBody;
    const commandParams = { Bucket: bucket, Key: hash! };
    const res = await s3Client.send(new HeadObjectCommand(commandParams));

    return Response.json({ code: 0, data: res });
  } catch (error: any) {
    return Response.json({ code: 0, text: error.message });
  }
};
