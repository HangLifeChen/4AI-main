import crypto from 'node:crypto';
import { type NextRequest } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { requestDomain, cryptoRawKey } from '@/utils/configs';

export const bucket = 'nebulai-agent-hub';

export const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIARFCORH75G55AK6E4',
    secretAccessKey: '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',
  },
});

export const verifyLoginStatus = async (req: NextRequest) => {
  const headers = new Headers(req.headers);
  const res = await fetch(`${requestDomain}/api/front/get/user/info`, {
    headers: {
      authorization: headers.get('authorization') || '',
    },
    method: 'POST',
    body: '{}',
    credentials: 'include',
  }).catch(() => { });
  const { data } = (await res?.json()) || {};

  if (!data?.id) {
    throw Error('Please log in first');
  }
};

export const aesEncryptGCM = plainText => {
  const hashKey = crypto.createHash('sha256').update(cryptoRawKey).digest();
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', hashKey, nonce);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const result = Buffer.concat([nonce, encrypted, authTag]);

  return result.toString('base64');
};
