import CryptoJS from 'crypto-js';
import { envs } from 'constants/index';

function generateHMACSignature(message: string, secret: string) {
  return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
}

function prepareHeaders(headers: Headers) {
  const timestamp = Date.now().toString();

  const tgData = localStorage.getItem('tgData');

  if (tgData !== null) {
    const message = `${tgData}:${timestamp}`;
    const signature = generateHMACSignature(message, envs.secret);

    headers.set('X-Telegram-Data', tgData);
    headers.set('X-Timestamp', timestamp);
    headers.set('X-Signature', signature);
  }

  return headers;
}

export {
  generateHMACSignature,
  prepareHeaders,
};
