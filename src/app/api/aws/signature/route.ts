import { type NextRequest } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand, type GetObjectCommandInput, ChecksumMode } from '@aws-sdk/client-s3';
import { s3Client, bucket, verifyLoginStatus } from '@/app/api';

const getReadSignedUrl = async (hash, fileName?: string) => {
  const params: GetObjectCommandInput = {
    Bucket: bucket,
    Key: hash,
  };
  if (fileName) {
    params.ResponseContentDisposition = `attachment; filename="${fileName}"`;
  }
  const command = new GetObjectCommand(params);

  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 });
};

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = (await req.json()) || {};
    const { hash, fileType, fileName, commandType } = requestBody;
    let signedUrl: any = '';

    if (commandType === 'put') {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: hash,
        ContentType: fileType,
      });

      await verifyLoginStatus(req);
      signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
    } else if (commandType === 'get' && Array.isArray(hash)) {
      signedUrl = {};
      for (const item of hash) {
        signedUrl[item] = await getReadSignedUrl(item);
      }
    } else if (commandType === 'get') {
      signedUrl = await getReadSignedUrl(hash);
    } else if (commandType === 'download') {
      signedUrl = await getReadSignedUrl(hash, fileName);
    }

    return Response.json({ code: 0, data: signedUrl });
  } catch (error: any) {
    return Response.json({ code: 1, text: error.message });
  }
};
