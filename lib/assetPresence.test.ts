import { describe, it, expect } from 'vitest';
import { resolveAssetPresence } from './assetPresence';

describe('resolveAssetPresence', () => {
  it('maps cv/headshot existence straight through', () => {
    expect(
      resolveAssetPresence({
        cvExists: true,
        cvAiExists: false,
        headshotExists: false,
      }),
    ).toMatchObject({ hasCv: true, hasHeadshot: false });
  });

  it('tracks the secondary AI CV independently of the primary one', () => {
    expect(
      resolveAssetPresence({
        cvExists: true,
        cvAiExists: false,
        headshotExists: false,
      }).hasCvAi,
    ).toBe(false);
    expect(
      resolveAssetPresence({
        cvExists: false,
        cvAiExists: true,
        headshotExists: false,
      }).hasCvAi,
    ).toBe(true);
  });

  it('all present', () => {
    expect(
      resolveAssetPresence({
        cvExists: true,
        cvAiExists: true,
        headshotExists: true,
      }),
    ).toEqual({ hasCv: true, hasCvAi: true, hasHeadshot: true });
  });

  it('all absent', () => {
    expect(
      resolveAssetPresence({
        cvExists: false,
        cvAiExists: false,
        headshotExists: false,
      }),
    ).toEqual({ hasCv: false, hasCvAi: false, hasHeadshot: false });
  });
});
