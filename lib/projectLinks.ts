/* ============================================================
   projectLinks — "no dead links" policy.
   A link renders only when a real http(s) URL is present;
   null / empty / TODO-sentinel are all treated as absent.
   ============================================================ */

export type ProjectLink = {
  kind: 'live' | 'code';
  label: string;
  href: string;
};

export function isUsableUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const v = url.trim();
  if (v === '') return false;
  if (/^todo\b/i.test(v)) return false; // "TODO: ..." sentinels
  return /^https?:\/\//i.test(v);
}

export function projectLinks(p: {
  liveUrl: string | null | undefined;
  repoUrl: string | null | undefined;
}): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (isUsableUrl(p.liveUrl)) {
    links.push({ kind: 'live', label: 'Live', href: p.liveUrl!.trim() });
  }
  if (isUsableUrl(p.repoUrl)) {
    links.push({ kind: 'code', label: 'Code', href: p.repoUrl!.trim() });
  }
  return links;
}
