export function orgMark(org: string) {
  switch (org) {
    case 'Cisco':
      return 'CS';
    case 'Google':
      return 'G';
    case 'Oracle':
      return 'OR';
    default:
      return org.slice(0, 2).toUpperCase();
  }
}
