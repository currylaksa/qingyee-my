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
    'Chan Qing Yee is a Computer Science (Networks & Security) graduand from Universiti Teknologi Malaysia, finishing with a 3.90 CGPA. His final-year project — SecureExam UTM, a production zero-trust examination platform with 26 mapped security controls and AI behavioural risk scoring — earned Silver at DIGITEX 2026, supervised by Prof. Madya Ts. Dr. Siti Hajar Binti Othman.',
    'Before his final year he interned as a Project Engineer at Huawei Technologies Malaysia, where he shipped 5 internal automation tools that cut repetitive engineering workflows. Based in Johor Bahru, he is targeting network-security engineering roles in Singapore.',
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
    repoUrl: 'https://github.com/currylaksa/zero-trust-exam',
    href: '/projects/secureexam',
    ctaLabel: 'Case study →',
  },
  {
    slug: 'huawei-automation',
    title: 'Huawei automation suite',
    stack: ['Python', 'PowerShell', 'Selenium'],
    description:
      '5 sanitized automation tools built during a Project Engineer internship at Huawei Malaysia — parsing, correlating, and validating network-site records, with secure credential handling.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/huawei',
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
    status: 'In progress',
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
export type Pillar = { label: string; text: string };
export const pillars: Pillar[] = [
  {
    label: 'certifications',
    text: 'Cisco CCNA (R&S, Enterprise, DevNet) + Google Cybersecurity + OCI Associate',
  },
  {
    label: 'production',
    text: 'Zero-trust platform shipped — SecureExam, DIGITEX 2026 Silver',
  },
  {
    label: 'internship',
    text: 'Huawei Malaysia — built 5 network automation tools',
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
    'A production zero-trust examination platform: eight defense-in-depth layers from browser lockdown to an Isolation-Forest risk scorer, with MFA, RBAC, and 26 mapped security controls — built solo and shipped to DigitalOcean Singapore.',
  glance: [
    { label: 'LOC', value: '8,100+' },
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
    'During my internship I built five automation tools using Python, PowerShell, Selenium, and Excel automation — cutting repetitive operational work and making network-site information easier to validate and report.',
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
   Networking lab portfolio — in progress. The network-layer companion
   to SecureExam. Topologies/screenshots land here as labs complete.
   ------------------------------------------------------------------ */

export type NetworkingLab = {
  name: string;
  tool: string;
  description: string;
  status: 'In progress' | 'Planned';
};

export const networkingLabs = {
  status: 'In progress',
  intro:
    'The network-layer companion to SecureExam’s application-layer zero trust — together they make the case for full-stack, defense-in-depth security. These labs are being built now; topologies and screenshots will be added here as each is completed.',
  labs: [
    {
      name: 'Enterprise network simulation',
      tool: 'Cisco Packet Tracer',
      description:
        'A multi-site enterprise topology with OSPF routing, VLAN segmentation, and ACLs enforcing least-privilege traffic between segments.',
      status: 'In progress',
    },
    {
      name: 'pfSense + Snort IDS',
      tool: 'GNS3',
      description:
        'A perimeter firewall with Snort intrusion detection — the network-layer companion to SecureExam’s application-layer controls.',
      status: 'Planned',
    },
    {
      name: 'BGP peering lab',
      tool: 'GNS3',
      description:
        'eBGP peering and route policy between autonomous systems, exploring path selection and basic route hardening.',
      status: 'Planned',
    },
  ] as NetworkingLab[],
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
