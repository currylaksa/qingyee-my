import { describe, it, expect } from 'vitest';
import { resolveAssetPresence, isUsableKey } from './assetPresence';

describe('isUsableKey', () => {
  it('rejects undefined / null / empty', () => {
    expect(isUsableKey(undefined)).toBe(false);
    expect(isUsableKey(null)).toBe(false);
    expect(isUsableKey('')).toBe(false);
    expect(isUsableKey('   ')).toBe(false);
  });

  it('rejects placeholders case/space-insensitively', () => {
    expect(isUsableKey('NA')).toBe(false);
    expect(isUsableKey(' na ')).toBe(false);
    expect(isUsableKey('N/A')).toBe(false);
    expect(isUsableKey('TODO')).toBe(false);
    expect(isUsableKey('your_key_here')).toBe(false);
  });

  it('accepts a real-looking key', () => {
    expect(isUsableKey('abc123-def456')).toBe(true);
  });
});

describe('resolveAssetPresence', () => {
  it('maps cv/headshot existence straight through', () => {
    expect(
      resolveAssetPresence({ cvExists: true, headshotExists: false, formKey: undefined }),
    ).toMatchObject({ hasCv: true, hasHeadshot: false });
  });

  it('all present', () => {
    expect(
      resolveAssetPresence({ cvExists: true, headshotExists: true, formKey: 'real-key' }),
    ).toEqual({ hasCv: true, hasHeadshot: true, hasFormKey: true });
  });

  it('all absent (placeholder key)', () => {
    expect(
      resolveAssetPresence({ cvExists: false, headshotExists: false, formKey: 'NA' }),
    ).toEqual({ hasCv: false, hasHeadshot: false, hasFormKey: false });
  });

  it('hasFormKey false when key missing even if assets exist', () => {
    expect(
      resolveAssetPresence({ cvExists: true, headshotExists: true, formKey: undefined }).hasFormKey,
    ).toBe(false);
  });
});
