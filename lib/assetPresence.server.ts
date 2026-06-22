/* Build-time reader: checks the real filesystem + env at static-export time,
   then defers the decision to the pure resolver. Not unit-tested (it's the
   I/O boundary). Import only from Server Components. */
import fs from 'node:fs';
import path from 'node:path';
import { resolveAssetPresence, type AssetPresence } from './assetPresence';

export function getAssetPresence(): AssetPresence {
  const pub = path.resolve(process.cwd(), 'public');
  return resolveAssetPresence({
    cvExists: fs.existsSync(path.join(pub, 'cv.pdf')),
    headshotExists: fs.existsSync(path.join(pub, 'headshot.jpg')),
    formKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
  });
}
