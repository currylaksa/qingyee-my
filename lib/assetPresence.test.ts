import { describe, it, expect } from 'vitest';
import { resolveAssetPresence } from './assetPresence';

describe('resolveAssetPresence', () => {
  it('maps cv/headshot existence straight through', () => {
    expect(
      resolveAssetPresence({ cvExists: true, headshotExists: false }),
    ).toEqual({ hasCv: true, hasHeadshot: false });
  });

  it('all present', () => {
    expect(
      resolveAssetPresence({ cvExists: true, headshotExists: true }),
    ).toEqual({ hasCv: true, hasHeadshot: true });
  });

  it('all absent', () => {
    expect(
      resolveAssetPresence({ cvExists: false, headshotExists: false }),
    ).toEqual({ hasCv: false, hasHeadshot: false });
  });
});
