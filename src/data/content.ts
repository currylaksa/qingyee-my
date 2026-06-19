/* ============================================================
   Single source of truth for site content.
   Canonical facts (CONTEXT.md): 6 projects, 26 controls,
   DIGITEX 2026 = Silver, status = graduand.
   A `null` URL means "not yet supplied" — links to it are hidden
   (see the projectLinks policy, issue 04).
   ============================================================ */

export type NavItem = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  icon: string; // Tabler icon name
  stack: string[];
  description: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export type Cert = { icon: string; name: string; org: string; date: string | null };
export type Stat = { label: string; value: string };
export type ExperienceRow = {
  year: string;
  role: string;
  org: string;
  description: string;
};
export type SkillTag = { label: string; variant: 'filled' | 'outline' };
export type Link = { label: string; href: string; icon: string };

export type PersonalInfo = {
  fullName: string;
  initials: string;
  eyebrow: string;
  tagline: string;
  brand: string;
  programme: string;
  university: string;
  cgpa: string;
  gradYear: string;
  location: string;
  status: string; // top-bar "Currently:" line
  email: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  whatsappLabel: string;
  identity: string[]; // selenophile etc.
};

export const personalInfo: PersonalInfo = {
  fullName: 'Chan Qing Yee',
  initials: 'QY',
  eyebrow: 'The Portfolio of',
  tagline: 'Wilderfarer — Builder — Security Engineer',
  brand: 'Wilderfarer',
  programme: 'CS (Networks & Security)',
  university: 'Universiti Teknologi Malaysia',
  cgpa: '3.90',
  gradYear: 'UTM 2026',
  location: 'Johor Bahru, Malaysia',
  status: 'Open to Singapore Roles',
  email: 'qingyee0219@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chanqingyee',
  github: 'https://github.com/currylaksa',
  whatsapp: 'https://wa.me/60137339035',
  whatsappLabel: 'WhatsApp / +60 13-733 9035',
  identity: ['Selenophile', 'Dendrophile', 'Hodophile'],
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Wilderfarer', href: '#wilderfarer' },
  { label: 'Contact', href: '#contact' },
];

export const ticker: string =
  '★ DIGITEX 2026 Silver Medal — SecureExam UTM • Zero-Trust Platform Live at secureexam-cqy.tech • CCNA • DevNet Associate • OCI Associate • Google Cybersecurity • Seeking Singapore opportunities • github.com/currylaksa ★';

export const projects: Project[] = [
  {
    slug: 'secureexam',
    title: 'SecureExam UTM',
    icon: 'shield',
    stack: ['Node.js', 'React 19', 'Flask', 'MySQL'],
    description:
      'Zero-Trust exam platform. JWT MFA, TOTP, RBAC, browser lockdown, Isolation Forest AI scoring. 26 controls, 8,100+ LOC. DIGITEX 2026 Silver.',
    liveUrl: 'https://secureexam-cqy.tech',
    repoUrl: null,
  },
  {
    slug: 'duodrop',
    title: 'DuoDrop',
    icon: 'transfer',
    stack: ['WebRTC', 'libsodium', 'PWA'],
    description:
      'WebRTC P2P file transfer PWA with libsodium E2E encryption. No server persistence — pure peer-to-peer.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'huawei-automation',
    title: 'Huawei Automation Suite',
    icon: 'robot',
    stack: ['Python', 'Automation'],
    description:
      '7 internal automation tools built at Huawei Malaysia, reducing manual engineering workflows.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'worldcup-2026',
    title: 'World Cup 2026 PWA',
    icon: 'world',
    stack: ['React', 'Streamlit', 'Poisson'],
    description:
      'Malaysian-timezone match planner + Dixon-Coles Poisson predictor for the 48-team 2026 format.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'vibeui-hotmealbar',
    title: 'VibeUI — Hot Meal Bar',
    icon: 'tools-kitchen-2',
    stack: ['React', 'Vite', 'Tailwind'],
    description:
      'Hot Meal Bar restaurant site built for the VibeUI Challenge 2026.',
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: 'raspberry-pi-iot',
    title: 'Raspberry Pi IoT Lab',
    icon: 'cpu',
    stack: ['MongoDB Atlas', 'GPIO', 'Python'],
    description:
      'Emergency/control board architecture with sensor-driven LED state management and cloud data logging.',
    liveUrl: null,
    repoUrl: null,
  },
];

export const certs: Cert[] = [
  { icon: 'network', name: 'CCNA R&S', org: 'Cisco', date: null },
  { icon: 'code', name: 'DevNet Associate', org: 'Cisco', date: null },
  { icon: 'cloud', name: 'OCI Associate', org: 'Oracle', date: null },
  { icon: 'shield-check', name: 'Cybersecurity', org: 'Google', date: null },
];

export const byTheNumbers: Stat[] = [
  { label: 'LOC', value: '8,100+' },
  { label: 'Controls', value: '26' },
  { label: 'Projects', value: '6' },
  { label: 'Certs', value: '4' },
  { label: 'HM Target', value: '<2:00' },
];

export const runningLog: Stat[] = [
  { label: 'HM', value: '6:11/km' },
  { label: '10K', value: '5:43/km' },
  { label: '5K', value: '5:15/km' },
  { label: 'VDOT', value: '~42' },
  { label: 'Goal HM', value: '<2:00' },
];

export const stack: SkillTag[] = [
  { label: 'Node.js', variant: 'filled' },
  { label: 'React', variant: 'filled' },
  { label: 'MySQL', variant: 'filled' },
  { label: 'Python', variant: 'filled' },
  { label: 'Nginx', variant: 'filled' },
  { label: 'OCI', variant: 'filled' },
  { label: 'CCNA', variant: 'outline' },
  { label: 'Flask', variant: 'outline' },
  { label: 'JWT', variant: 'outline' },
];

export const findMe: Link[] = [
  { label: 'GitHub', href: personalInfo.github, icon: 'brand-github' },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: 'brand-linkedin' },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: 'mail' },
  { label: personalInfo.whatsappLabel, href: personalInfo.whatsapp, icon: 'brand-whatsapp' },
];

export const experience: ExperienceRow[] = [
  {
    year: '2024',
    role: 'Project Engineer Intern',
    org: 'Huawei Technologies Malaysia',
    description:
      'Delivered 7 automation tools, streamlining internal project engineering operations.',
  },
  {
    year: '2022–25',
    role: 'FYP — SecureExam UTM',
    org: 'UTM — Dr. Siti Hajar Bt Othman',
    description:
      'End-to-end build and production deploy. Zero-Trust, 26 controls, ~8,100 LOC, AI risk scoring.',
  },
];
