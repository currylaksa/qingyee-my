import { describe, it, expect } from 'vitest';
import { projectLinks, isUsableUrl } from './projectLinks';

describe('isUsableUrl', () => {
  it('rejects null / undefined / empty / whitespace', () => {
    expect(isUsableUrl(null)).toBe(false);
    expect(isUsableUrl(undefined)).toBe(false);
    expect(isUsableUrl('')).toBe(false);
    expect(isUsableUrl('   ')).toBe(false);
  });
  it('rejects TODO sentinels', () => {
    expect(isUsableUrl('TODO: GitHub repo URL')).toBe(false);
    expect(isUsableUrl('todo live demo')).toBe(false);
  });
  it('rejects non-http strings', () => {
    expect(isUsableUrl('internal / not public')).toBe(false);
    expect(isUsableUrl('github.com/x')).toBe(false); // no scheme
  });
  it('accepts http(s) URLs', () => {
    expect(isUsableUrl('https://secureexam-cqy.tech')).toBe(true);
    expect(isUsableUrl('  http://example.com  ')).toBe(true);
  });
});

describe('projectLinks', () => {
  it('both URLs present -> live + code', () => {
    const r = projectLinks({ liveUrl: 'https://a.com', repoUrl: 'https://github.com/x' });
    expect(r.map((l) => l.kind)).toEqual(['live', 'code']);
  });
  it('live only', () => {
    const r = projectLinks({ liveUrl: 'https://a.com', repoUrl: null });
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ kind: 'live', href: 'https://a.com' });
  });
  it('repo only', () => {
    const r = projectLinks({ liveUrl: 'TODO: url', repoUrl: 'https://github.com/x' });
    expect(r).toHaveLength(1);
    expect(r[0].kind).toBe('code');
  });
  it('both absent / TODO -> no links', () => {
    expect(projectLinks({ liveUrl: null, repoUrl: 'TODO: repo' })).toEqual([]);
  });
  it('trims href whitespace', () => {
    expect(projectLinks({ liveUrl: '  https://a.com  ', repoUrl: null })[0].href).toBe('https://a.com');
  });
});
