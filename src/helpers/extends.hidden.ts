import CryptoJS from 'crypto-js';
import { envs } from 'constants/index';
import { BaseQueryApi } from '@reduxjs/toolkit/query';

function generateHMACSignature(message: string, secret: string) {
  return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
}

type PrepareHeadersParams = {
  prepareHeadersArgs: { headers: Headers, api: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'> }
  url: string
};

function prepareHeaders({ prepareHeadersArgs, url }: PrepareHeadersParams) {
  const timestamp = Date.now().toString();

  const tgData = localStorage.getItem('tgData');

  if (tgData !== null) {
    const message = `${tgData}:${url}:${timestamp}`;
    const signature = generateHMACSignature(message, envs.testKey);

    prepareHeadersArgs.headers.set('X-Telegram-Data', tgData);
    prepareHeadersArgs.headers.set('X-Timestamp', timestamp);
    prepareHeadersArgs.headers.set('X-Signature', signature);
  }

  return prepareHeadersArgs.headers;
}

export {
  generateHMACSignature,
  prepareHeaders,
};
