import { describe, it, expect } from 'vitest';
import { trackedLinks } from './content';

describe('trackedLinks', () => {
  it('has unique slugs', () => {
    const slugs = trackedLinks.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses url-safe slugs', () => {
    for (const { slug } of trackedLinks) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('targets internal paths only', () => {
    // An off-site target would turn /r/<slug>/ into an open redirect.
    for (const { target } of trackedLinks) {
      expect(target.startsWith('/')).toBe(true);
      expect(target.startsWith('//')).toBe(false);
    }
  });

  it('documents where each link is published', () => {
    for (const { note } of trackedLinks) {
      expect(note.trim()).not.toBe('');
    }
  });
});
