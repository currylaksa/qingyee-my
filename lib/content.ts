/* ============================================================
   Single source of truth for site content (ported from the Astro
   build's src/data/content.ts). Canonical facts: 6 projects,
   26 controls, DIGITEX 2026 = Silver, status = graduand.
   Positioning: AI solutions engineering, with the zero-trust /
   security work as the proof of engineering depth.
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
  /** Internal detail/case-study route, when one exists. */
  href?: string;
  /** Link text for the internal route; defaults to "View →". */
  ctaLabel?: string;
  /** Optional status pill, e.g. "In progress". */
  status?: string;
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
  tagline: 'AI Solutions Engineer',
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
  'I build AI-integrated systems, from architecture to production.';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const about = {
  bio: [
    'Chan Qing Yee is a Computer Science graduand from Universiti Teknologi Malaysia, finishing with a 3.90 CGPA, who builds AI-integrated systems end to end — from model service to production deployment. His final-year project, SecureExam UTM, pairs a Python/Flask machine-learning microservice (Isolation Forest anomaly detection, scoring behaviour in real time) with a full-stack Node and React 19 platform, and earned Silver at DIGITEX 2026 under Prof. Madya Ts. Dr. Siti Hajar Binti Othman.',
    'Before his final year he interned as a Project Engineer at Huawei Technologies Malaysia, where he shipped 5 Python and PowerShell automation tools that cut daily reporting from 15 minutes to 1 — a 93% reduction. His security background is the depth behind the AI work: everything he builds is deployed, hardened, and operated, not left in a notebook. Based in Johor Bahru, he is targeting AI engineering roles in Singapore.',
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
      'Isolation Forest risk-scoring microservice inside a production zero-trust exam platform. 26 controls, 35+ endpoints, 11,700+ LOC. DIGITEX 2026 Silver.',
    liveUrl: 'https://secureexam-cqy.tech',
    repoUrl: 'https://github.com/currylaksa/zero-trust-exam',
    href: '/projects/secureexam',
    ctaLabel: 'Case study →',
  },
  {
    slug: 'huawei-automation',
    title: 'Huawei automation suite',
    stack: ['Python', 'PowerShell', 'Selenium'],
    description:
      '5 sanitized automation tools built during a Project Engineer internship at Huawei Malaysia — cutting daily reporting from 15 minutes to 1, a 93% reduction.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/huawei',
  },
  {
    slug: 'duodrop',
    title: 'DuoDrop',
    stack: ['WebRTC', 'libsodium', 'PWA'],
    description:
      'WebRTC P2P file transfer PWA with libsodium end-to-end encryption. No server persistence — pure peer-to-peer.',
    liveUrl: 'https://duodrop.pages.dev',
    repoUrl: 'https://github.com/currylaksa/duodrop',
  },
  {
    slug: 'worldcup-2026',
    title: 'World Cup 2026 PWA',
    stack: ['React', 'PWA'],
    description:
      '"Worth Staying Up For" — a Malaysian-timezone match planner for the 48-team 2026 format.',
    liveUrl: 'https://3am-club.pages.dev',
    repoUrl: 'https://github.com/currylaksa/3am-club',
  },
  {
    slug: 'macos-menubar',
    title: 'macOS menu-bar utilities',
    stack: ['Swift', 'AppKit', 'Core Graphics'],
    description:
      'Three native, zero-dependency Swift menu-bar apps — a Claude session-usage gauge, a RAM monitor reading the Mach kernel directly, and a procedurally generated pixel hiker.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/macos-menubar',
  },
  {
    slug: 'qrcode-generator',
    title: 'Free QR Code Generator',
    stack: ['Vanilla JS', 'HTML'],
    description:
      'A free QR code generator that runs entirely in the browser — no build step, no frameworks, nothing uploaded or tracked.',
    liveUrl: 'https://currylaksa.github.io/qrcode_generator_free/',
    repoUrl: 'https://github.com/currylaksa/qrcode_generator_free',
  },
];

export const certs: Cert[] = [
  { name: 'OCI 2025 AI Foundations Associate', org: 'Oracle', date: null },
  { name: 'Google Cybersecurity Professional', org: 'Google', date: null },
  { name: 'CCNA: DevNet Associate', org: 'Cisco', date: null },
  {
    name: 'CCNA: Enterprise Networking, Security & Automation',
    org: 'Cisco',
    date: null,
  },
  {
    name: 'CCNA: Switching, Routing & Wireless Essentials',
    org: 'Cisco',
    date: null,
  },
];

export const education = {
  degree: 'B.Sc. Computer Science (Networks & Security)',
  university: 'Universiti Teknologi Malaysia',
  year: 'Jul 2026',
  cgpa: '3.90',
};

/** Competition results (resume §Achievements). */
export type Achievement = { title: string; detail: string; date: string };
export const achievements: Achievement[] = [
  {
    title: 'DIGITEX 2026 Silver Medal',
    detail: 'Grand Finale, Johor Bahru — for SecureExam UTM.',
    date: 'Jun 2026',
  },
  {
    title: 'UTM Hackathon Champion',
    detail: 'DevBoost AI — an emotion-sensing AI onboarding platform.',
    date: '2025',
  },
  {
    title: 'UM Hackathon Finalist',
    detail: 'ZakatGo — a blockchain-integrated automated payment platform.',
    date: '2025',
  },
];

/** Grouped technical skills (resume §Technical Skills). */
export type SkillGroup = { label: string; items: string[] };
export const skillGroups: SkillGroup[] = [
  {
    label: 'AI & machine learning',
    items: [
      'Isolation Forest anomaly detection',
      'Behavioural risk scoring',
      'Applied ML for security monitoring',
    ],
  },
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Swift', 'Java', 'C++', 'SQL'],
  },
  {
    label: 'Frameworks & libraries',
    items: [
      'Node.js',
      'Express',
      'React 19',
      'Vite',
      'Next.js',
      'Flask',
      'Selenium',
      'Pandas',
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: ['DigitalOcean', 'Nginx', 'PM2', 'Linux', 'Git', 'GitHub', 'CI'],
  },
  { label: 'Databases', items: ['MySQL', 'Firebase'] },
  {
    label: 'Languages spoken',
    items: ['Mandarin (native)', 'English (fluent)', 'Malay (fluent)'],
  },
];

/** Proof pillars under the hero (brief §3). */
export type Pillar = { label: string; text: string };
export const pillars: Pillar[] = [
  {
    label: 'machine learning',
    text: 'Isolation Forest risk scorer running in production — Python, Flask',
  },
  {
    label: 'production',
    text: 'Full-stack platform shipped and operated — DIGITEX 2026 Silver',
  },
  {
    label: 'internship',
    text: 'Huawei Malaysia — 5 automation tools, 93% faster daily reporting',
  },
];

/* ------------------------------------------------------------------
   SecureExam — the centerpiece. Shared by the Home teaser/preview and
   the full case study + interactive diagram (Milestone 3).
   ------------------------------------------------------------------ */

export type ZeroTrustLayer = {
  num: string; // "01" — ordered like network hops
  layer: string; // short name
  tag: string; // mono kicker tag, e.g. "authn"
  control: string;
  threats: string[];
};

/** 8 defense-in-depth layers, verbatim from brief §8. */
export const zeroTrustLayers: ZeroTrustLayer[] = [
  {
    num: '01',
    layer: 'Browser lockdown',
    tag: 'client',
    control:
      'Fullscreen lockdown, copy/paste + devtools restrictions, heartbeat tokens rotating through the session.',
    threats: ['Exam cheating', 'Stale-session hijack'],
  },
  {
    num: '02',
    layer: 'TLS 1.3',
    tag: 'transport',
    control: 'End-to-end HTTPS (Let’s Encrypt) + HSTS.',
    threats: ['Eavesdropping', 'Man-in-the-middle'],
  },
  {
    num: '03',
    layer: 'Nginx reverse proxy',
    tag: 'edge',
    control:
      'App fronted behind UFW firewall, fail2ban, rate limiting; Node never publicly exposed.',
    threats: ['Brute force', 'Port scanning', 'Direct app exposure'],
  },
  {
    num: '04',
    layer: 'JWT + TOTP MFA',
    tag: 'authn',
    control: 'Short-lived JWTs + TOTP multi-factor auth.',
    threats: ['Credential stuffing', 'Password reuse'],
  },
  {
    num: '05',
    layer: 'RBAC · 4 roles',
    tag: 'authz',
    control: 'Least privilege across 4 roles and 35+ endpoints.',
    threats: ['Privilege escalation', 'Broken access control (IDOR)'],
  },
  {
    num: '06',
    layer: 'Node + Express',
    tag: 'app',
    control: 'Input validation + secure headers across 25+ mapped controls.',
    threats: ['XSS', 'CSRF', 'Injection'],
  },
  {
    num: '07',
    layer: 'MySQL 8',
    tag: 'data',
    control: 'Least-privilege DB user, parameterized queries, hardened auth.',
    threats: ['SQL injection', 'Data exfiltration'],
  },
  {
    num: '08',
    layer: 'Risk scorer',
    tag: 'detection',
    control:
      'Flask microservice (Control #26), Isolation Forest anomaly model, bound to localhost (127.0.0.1:8001).',
    threats: ['Anomalous exam behaviour'],
  },
];

export const secureexam = {
  title: 'SecureExam UTM',
  award: 'DIGITEX 2026 Silver',
  liveUrl: 'https://secureexam-cqy.tech',
  repoUrl: 'https://github.com/currylaksa/zero-trust-exam',
  demoUrl: 'https://youtu.be/nyrsI8Op4BY',
  role: 'Solo full-stack · FYP under Prof. Madya Ts. Dr. Siti Hajar Othman',
  teaser:
    'A production examination platform built around a machine-learning risk scorer: a Flask microservice runs Isolation Forest anomaly detection over live session behaviour, wired into eight defense-in-depth layers, 35+ endpoints, and 26 mapped security controls — built solo and shipped to DigitalOcean Singapore.',
  glance: [
    { label: 'LOC', value: '11,700+' },
    { label: 'Controls', value: '26' },
    { label: 'Endpoints', value: '35+' },
    { label: 'RBAC roles', value: '4' },
  ] as Stat[],
  stack: ['Node / Express', 'React 19', 'MySQL 8', 'Flask'],
  deployedOn: 'DigitalOcean Singapore',
  layers: zeroTrustLayers,

  threatModel: {
    intro:
      'An online exam platform is a high-value target with two distinct adversaries: students motivated to cheat, and attackers motivated by the credentials and exam data behind the login. SecureExam treats every request as untrusted and defends in depth — no single control is load-bearing.',
    threats: [
      {
        title: 'Exam integrity',
        body: 'Candidates attempting to cheat — leaving the exam window, copy/paste, dev tools, or sharing a live session.',
      },
      {
        title: 'Account takeover',
        body: 'Credential stuffing and password reuse against the login, and hijacking of stale or stolen sessions.',
      },
      {
        title: 'Data theft',
        body: 'Exfiltration of exam content, answers, or personal data through the app, the database, or the transport.',
      },
      {
        title: 'Tampering',
        body: 'Privilege escalation across roles, broken access control (IDOR), and injection against the API and database.',
      },
    ],
  },

  deployment: [
    'Nginx reverse proxy fronts the app — Node is never publicly exposed.',
    'UFW firewall + fail2ban + rate limiting at the edge.',
    'Let’s Encrypt TLS 1.3 with HSTS.',
    'PM2 runs two processes: secureexam-backend (Node) and risk-scorer (Flask) bound to 127.0.0.1:8001.',
    'Least-privilege MySQL user; parameterized queries throughout.',
    'SSH hardening (key-only auth, no root login).',
  ],

  whatsNext: [
    'Move secrets out of env files into a managed vault.',
    'Add automated dependency and container scanning to CI.',
    'Train the risk scorer on labelled data and track precision/recall, not just anomaly scores.',
    'Add an automated IDOR/RBAC test suite over all 35+ endpoints.',
  ],
};

/* ------------------------------------------------------------------
   Huawei internship — sanitized automation portfolio (5 tools).
   Source files are served from public/projects/huawei/.
   ------------------------------------------------------------------ */

export type HuaweiTool = {
  name: string;
  usage: string;
  summary: string;
  highlights: string[];
  skills: string[];
  source: string;
};

export const huawei = {
  role: 'Project Engineer Intern · Huawei Technologies Malaysia',
  intro:
    'During my internship I built and deployed five automation tools using Python, PowerShell, Selenium, and Excel automation — cutting daily reporting from 15 minutes to 1, a 93% reduction, and making site information easier to validate and report. Alongside this I supported delivery coordination for Malaysia’s U Mobile 5G Network Upgrade across 100+ subcontractor teams.',
  impact: [
    { label: 'Tools shipped', value: '5' },
    { label: 'Reporting time', value: '15m → 1m' },
    { label: 'Reduction', value: '93%' },
    { label: 'Teams supported', value: '100+' },
  ] as Stat[],
  note:
    'The scripts here are sanitized: credentials, internal URLs, personal information, customer and subcontractor names, and operational datasets have been removed.',
  securityRelevance: [
    'Secure handling of credentials and internal endpoints — read from environment variables, never stored in source.',
    'Correlation and validation of records across multiple operational data sources.',
    'Detection of missing, duplicate, or anomalous records.',
    'Resilient, fault-tolerant batch processing with audit-friendly results.',
    'Diagnostic logging and evidence collection when automation fails.',
  ],
  tools: [
    {
      name: 'Work Permit Site Extractor',
      usage: 'Shared with teammates',
      summary:
        'Processes weekly work-permit spreadsheets: extracts network-site IDs from multiple columns, normalizes inconsistent delimiters, deduplicates, groups sites by region, maps IDs to names, and outputs formatted Excel reports.',
      highlights: [
        'Parses comma-, slash-, and whitespace-separated site identifiers.',
        'Combines and deduplicates records across multiple workbooks.',
        'Enriches site IDs using a separate mapping workbook.',
      ],
      skills: ['Python', 'openpyxl', 'data validation', 'deduplication'],
      source: '/projects/huawei/work_permit_site_extractor/work_permit_extractor.py',
    },
    {
      name: 'Site Key Status Checker',
      usage: 'Shared with teammates',
      summary:
        'Correlates two Excel data sources to show a network site’s key status, key holder, collection location, responsible handler, and collector details when required.',
      highlights: [
        'Accepts one or many site IDs and correlates across separate datasets.',
        'Enriches key-holder records with collection-location data.',
        'Restricts collector details to relevant status conditions.',
      ],
      skills: ['Python', 'pandas', 'data correlation', 'input validation'],
      source: '/projects/huawei/site_key_status_checker/key_status_checker.py',
    },
    {
      name: 'Multi-Site Clock-In/Out Automation',
      usage: 'Shared with teammates',
      summary:
        'Automates repetitive browser workflows for batches of network sites: logs in with environment-based credentials, validates sites against a work permit, performs clock-in/out, and produces a success/failure summary.',
      highlights: [
        'Selenium explicit waits for reliable browser interaction.',
        'Validates site IDs before acting; continues when individual sites fail.',
        'Keeps credentials and endpoint URLs outside the source code.',
      ],
      skills: ['Python', 'Selenium', 'secure configuration', 'fault tolerance'],
      source: '/projects/huawei/multi_site_clock_automation/site_clock_automation.py',
    },
    {
      name: 'Daily Clock Report Automation',
      usage: 'Personal productivity tool',
      summary:
        'A PowerShell workflow that transforms a raw daily clock report into structured Excel reports — filtering categories, validating distances, building PivotTables, and flagging duplicate records.',
      highlights: [
        'Controls Microsoft Excel through COM automation.',
        'Generates detailed and summary PivotTables.',
        'Highlights duplicate and unmatched records for review.',
      ],
      skills: ['PowerShell', 'Excel COM', 'data cleansing', 'anomaly detection'],
      source: '/projects/huawei/daily_clock_report/clock_report.ps1',
    },
    {
      name: 'Batch Email Request Automation',
      usage: 'Personal productivity tool',
      summary:
        'A Selenium workflow that submits batches of network-related identifiers through an authenticated internal request form, recording failures with diagnostic screenshots.',
      highlights: [
        'Keeps authentication under user control (manual login).',
        'Isolates failures so one record does not stop the batch.',
        'Saves screenshots to support troubleshooting.',
      ],
      skills: ['Python', 'Selenium', 'auth-aware design', 'exception handling'],
      source: '/projects/huawei/batch_email_request/batch_email_request.py',
    },
  ] as HuaweiTool[],
};

/* ------------------------------------------------------------------
   macOS menu-bar utilities — three native, zero-dependency Swift apps.
   ------------------------------------------------------------------ */

export type MenuBarApp = {
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repoUrl: string;
};

export const menuBarApps = {
  intro:
    'Three native macOS menu-bar apps written in plain Swift and AppKit — no Electron, no packages, no Dock icon. Each is a single small binary that does one thing and costs the machine almost nothing.',
  apps: [
    {
      name: 'Claude Usage Bar',
      tagline: 'Session usage at a glance',
      summary:
        'Shows Claude.ai session usage as a ring gauge in the menu bar, with live percentage used and a countdown to reset — so you know whether you can keep going without switching tabs.',
      highlights: [
        'Ring drawn natively in Core Graphics, not text glyphs — monochrome until it matters.',
        'Turns orange at 80% and red at 90%, so colour appears exactly when to worry.',
        '~40–50 MB RAM against 150–300 MB for the equivalent browser tab.',
      ],
      stack: ['Swift', 'AppKit', 'Core Graphics'],
      repoUrl: 'https://github.com/currylaksa/claude-usage-bar-for-mac',
    },
    {
      name: 'RAMBar',
      tagline: 'Memory gauge in ~150 lines',
      summary:
        'A tiny fill gauge and percentage showing memory in use, reading the same numbers Activity Monitor does — straight from the Mach kernel rather than parsing CLI output.',
      highlights: [
        'Reads host_statistics64 directly; “Memory Used” = app + wired + compressed.',
        'Click through for App Memory, Wired, Compressed, and Swap, fetched on open.',
        'Ticks every 30s with a 10s tolerance and skips redrawing when nothing changed.',
      ],
      stack: ['Swift', 'AppKit', 'Mach kernel APIs'],
      repoUrl: 'https://github.com/currylaksa/ramusagebar',
    },
    {
      name: 'wilderfarer-bar',
      tagline: 'A pixel hiker for your deep work',
      summary:
        'A tiny hiker who walks a procedurally generated landscape while you work, sets up camp when you step away, and counts 12 active minutes as one kilometre. The Wilderfarer identity, rendered.',
      highlights: [
        'Terrain seeded from the date — four biomes, one named trail per day.',
        'Nightfall after 19:30; a summit flag at a half-marathon of focused work.',
        '100% local and offline — activity never leaves the machine.',
      ],
      stack: ['Swift', 'AppKit', 'procedural generation'],
      repoUrl: 'https://github.com/currylaksa/wilderfarer-bar',
    },
  ] as MenuBarApp[],
};

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
