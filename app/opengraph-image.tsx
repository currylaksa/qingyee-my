import { renderOgCard, OG_SIZE, OG_ALT, OG_CONTENT_TYPE } from '@/lib/ogCard';

// Required for metadata routes under output: 'export'.
export const dynamic = 'force-static';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard();
}
