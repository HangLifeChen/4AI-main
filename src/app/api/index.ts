import crypto from 'node:crypto';
import { type NextRequest } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { requestDomain, cryptoRawKey } from '@/utils/configs';

export const bucket = 'nebulai-agent-hub';

// ⚠️ AWS 泄露扫描会自动隔离出现在代码里的密钥(AWSCompromisedKeyQuarantineV3),
//    密钥只能放 .env.production(不带 NEXT_PUBLIC_ 前缀,仅服务端可见):
//    AWS_ACCESS_KEY_ID=xxx
//    AWS_SECRET_ACCESS_KEY=xxx
export const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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
