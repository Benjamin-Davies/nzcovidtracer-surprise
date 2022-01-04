import { useMemo } from 'react';
import QRCode from 'qrcode.react';

// Required as btoa does not support unicode
function encodeUnicode(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += '\\u' + ('000' + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return `"${result}"`;
}

function encodeSurprise(emoji) {
  // JSON constructed manually to allow escaping unicode emoji
  const json = `{"data":[${emoji.map(encodeUnicode).join(',')}]}`;
  console.log(json);

  const code = `RECARTDIVOCZN:.${btoa(json)}.`;
  console.log(code);

  return code;
}

export function SurpriseQRCode({ emoji }) {
  const encoded = useMemo(() => encodeSurprise(emoji), [emoji]);

  if (emoji.length === 0) {
    return <p>Please select atleast one emoji.</p>;
  }

  return <QRCode value={encoded} />;
}
