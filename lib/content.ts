/* ============================================================
   Single source of truth for site content (ported from the Astro
   build's src/data/content.ts). Canonical facts: 6 projects,
   26 controls, DIGITEX 2026 = Silver, status = graduand.
   A `null` URL means "not yet supplied" — links to it are hidden
   (see lib/projectLinks.ts — the "no dead links" policy).
   ============================================================ */

export type NavItem = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  stack: string[];
  description: string;
  liveUrl: string | null;
  repoUrl: string | null;
  /** Internal case-study route, when one exists. */
  href?: string;
};

export type Cert = { name: string; org: string; date: string | null; verifyUrl?: string | null };
export type Stat = { label: string; value: string };
export type Link = { label: string; href: string };

export type PersonalInfo = {
  fullName: string;
  initials: string;
  tagline: string;
  brand: string;
  programme: string;
  university: string;
  cgpa: string;
  gradYear: string;
  location: string;
  status: string;
  email: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  whatsappLabel: string;
  identity: string[];
};

export const personalInfo: PersonalInfo = {
  fullName: 'Chan Qing Yee',
  initials: 'QY',
  tagline: 'Network & Security Engineer',
  brand: 'Wilderfarer',
  programme: 'CS (Networks & Security)',
  university: 'Universiti Teknologi Malaysia',
  cgpa: '3.90',
  gradYear: 'UTM 2026',
  location: 'Johor Bahru, Malaysia',
  status: 'Open to Singapore roles',
  email: 'qingyee0219@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chanqingyee',
  github: 'https://github.com/currylaksa',
  whatsapp: 'https://wa.me/60137339035',
  whatsappLabel: '+60 13-733 9035',
  identity: ['Selenophile', 'Dendrophile', 'Hodophile'],
};

/** Primary one-line value prop (brief §3). */
export const valueProp =
  'I design, build, and harden zero-trust systems, end to end.';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const about = {
  bio: [
    'Chan Qing Yee is a Computer Science (Networks & Security) graduand from Universiti Teknologi Malaysia, finishing with a 3.90 CGPA. Her final-year project — SecureExam UTM, a production zero-trust examination platform with 26 mapped security controls and AI behavioural risk scoring — earned Silver at DIGITEX 2026, supervised by Prof. Madya Ts. Dr. Siti Hajar Binti Othman.',
    'Before her final year she interned as a Project Engineer at Huawei Technologies Malaysia, where she shipped 7 internal automation tools that cut repetitive engineering workflows. Based in Johor Bahru, she is targeting network-security engineering roles in Singapore.',
  ],
  details: [
    { label: 'University', value: 'Universiti Teknologi Malaysia (UTM), Faculty of Computing' },
    { label: 'Programme', value: 'CS (Networks & Security)' },
    { label: 'CGPA', value: '3.90' },
    { label: 'Supervisor', value: 'Prof. Madya Ts. Dr. Siti Hajar Binti Othman' },
    { label: 'Location', value: 'Johor Bahru → Singapore' },
  ],
};

export const wilderfarer = {
  pullQuote: 'Not all those who wander are lost.',
  narrative:
    'Off the keyboard, Chan goes by Wilderfarer — a selenophile, dendrophile, and hodophile who treats moonrise, treelines, and travel as the counterweight to deployments. Running is the throughline: a 6:11/km half-marathon pace today, chasing a sub-2:00 finish, with badminton and hiking filling the rest.',
};

export const projects: Project[] = [
  {
    slug: 'secureexam',
    title: 'SecureExam UTM',
    stack: ['Node.js', 'React 19', 'Flask', 'MySQL 8'],
    description:
      'Zero-trust exam platform. JWT MFA, TOTP, RBAC, browser lockdown, Isolation Forest AI scoring. 26 controls, 8,100+ LOC. DIGITEX 2026 Silver.',
    liveUrl: 'https://secureexam-cqy.tech',
    repoUrl: null,
    href: '/projects/secureexam',
  },
  {
    slug: 'networking-labs',
    title: 'Networking lab portfolio',
    stack: ['Packet Tracer', 'pfSense', 'Snort', 'GNS3', 'BGP'],
    description:
      'Network-layer security labs: enterprise simulation (OSPF, VLANs, ACLs), pfSense + Snort IDS, and a BGP peering lab. The network-layer companion to SecureExam.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/networking-labs',
  },
  {
    slug: 'huawei-automation',
    title: 'Huawei automation suite',
    stack: ['Python', 'Automation'],
    description:
      '7 internal automation tools built during a Project Engineer internship at Huawei Malaysia, reducing manual engineering workflows.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'duodrop',
    title: 'DuoDrop',
    stack: ['WebRTC', 'libsodium', 'PWA'],
    description:
      'WebRTC P2P file transfer PWA with libsodium end-to-end encryption. No server persistence — pure peer-to-peer.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'worldcup-2026',
    title: 'World Cup 2026 PWA',
    stack: ['React', 'Streamlit', 'Poisson'],
    description:
      '"Worth Staying Up For" — a Malaysian-timezone match planner for the 48-team 2026 format.',
    liveUrl: null,
    repoUrl: null,
  },
];

export const certs: Cert[] = [
  { name: 'CCNA Routing & Switching', org: 'Cisco', date: null },
  { name: 'CCNA Enterprise', org: 'Cisco', date: null },
  { name: 'DevNet Associate', org: 'Cisco', date: null },
  { name: 'Google Cybersecurity', org: 'Google', date: null },
  { name: 'OCI Associate', org: 'Oracle', date: null },
];

export const education = {
  degree: 'B.Sc. Computer Science (Networks & Security)',
  university: 'Universiti Teknologi Malaysia',
  year: '2026',
  cgpa: '3.90',
};

/** Proof pillars under the hero (brief §3). */
export const pillars: string[] = [
  'Cisco CCNA (R&S, Enterprise, DevNet) + Google Cybersecurity + OCI Associate',
  'Production zero-trust platform — SecureExam, DIGITEX 2026 Silver',
  'Huawei Malaysia internship — 7 network automation tools',
];

export const runningLog: Stat[] = [
  { label: 'HM', value: '6:11/km' },
  { label: '10K', value: '5:43/km' },
  { label: '5K', value: '5:15/km' },
  { label: 'Goal HM', value: '<2:00' },
];

export const findMe: Link[] = [
  { label: 'GitHub', href: personalInfo.github },
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'Email', href: `mailto:${personalInfo.email}` },
  { label: personalInfo.whatsappLabel, href: personalInfo.whatsapp },
];
