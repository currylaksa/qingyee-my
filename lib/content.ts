/* ============================================================
   Single source of truth for site content (ported from the Astro
   build's src/data/content.ts). Canonical facts: 7 projects,
   26 controls, DIGITEX 2026 = Silver, status = graduand.
   Positioning: network & security engineering, with the applied-ML
   and full-stack work as the secondary story (automation depth).
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
  'I design, secure, and operate networks — from routing and segmentation to production zero-trust.';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const about = {
  bio: [
    'Chan Qing Yee is a Computer Science (Computer Network and Security) graduand from Universiti Teknologi Malaysia, finishing with a 3.90 CGPA, who deploys and secures networks end to end. He has completed the Cisco CCNA curriculum across Switching, Routing and Wireless Essentials; Enterprise Networking, Security and Automation; and DevNet Associate — and applied it on a team project designing a segmented enterprise network with VLANs, inter-VLAN routing, OSPF, DHCP, ACL filtering, and VPN tunnelling.',
    'He interned as a Project Engineer at Huawei Technologies Malaysia on the U Mobile 5G Network Upgrade (RAN and Microwave), coordinating daily deployment across 100+ subcontractor teams and overseeing 1,000+ site acceptance deliverables — while shipping 5 Python and PowerShell automation tools that cut daily reporting from 15 minutes to 1, a 93% reduction. His final-year project, SecureExam UTM, took that further into production: a 26-control zero-trust layer on a hardened DigitalOcean Singapore host, which earned Silver at DIGITEX 2026 under Prof. Madya Ts. Dr. Siti Hajar Binti Othman. Based in Johor Bahru, he is targeting network and security engineering roles in Singapore.',
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
    stack: ['Zero Trust', 'Nginx', 'TLS 1.3', 'Node.js'],
    description:
      'Production zero-trust platform: 26 mapped controls over 35+ endpoints, per-request IP binding, JWT stage-machine MFA, and an Nginx/UFW/fail2ban edge. DIGITEX 2026 Silver.',
    liveUrl: 'https://secureexam-cqy.tech',
    repoUrl: 'https://github.com/currylaksa/zero-trust-exam',
    href: '/projects/secureexam',
    ctaLabel: 'Case study →',
  },
  {
    slug: 'huawei-automation',
    title: 'U Mobile 5G network upgrade',
    stack: ['5G RAN', 'Microwave', 'Python', 'PowerShell'],
    description:
      'Project Engineer internship on Huawei’s U Mobile 5G upgrade — deployment coordination across 100+ subcontractor teams and 1,000+ site acceptance deliverables, plus 5 automation tools cutting daily reporting by 93%.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/huawei',
  },
  {
    slug: 'sunray-network',
    title: 'Enterprise network design',
    stack: ['OSPF', 'VLANs', 'ACLs', 'IPsec VPN'],
    description:
      'A network design for a Malaysian SME, built and verified in Cisco Packet Tracer: 8 routers over 7 departmental segments, OSPF area 0, VLAN-segmented staff floors, relayed DHCP, an IPsec remote-access VPN, and ACLs that keep remote workers out of Finance.',
    liveUrl: null,
    repoUrl: null,
    href: '/projects/sunray',
    ctaLabel: 'Case study →',
    status: 'Coursework',
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
  {
    name: 'CCNA: Switching, Routing & Wireless Essentials',
    org: 'Cisco',
    date: null,
  },
  {
    name: 'CCNA: Enterprise Networking, Security & Automation',
    org: 'Cisco',
    date: null,
  },
  { name: 'CCNA: DevNet Associate', org: 'Cisco', date: null },
  { name: 'Google Cybersecurity Professional', org: 'Google', date: null },
  { name: 'OCI 2025 AI Foundations Associate', org: 'Oracle', date: null },
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
    label: 'Networking',
    items: [
      'OSPF',
      'VLANs',
      'Inter-VLAN routing',
      'DHCP',
      'TCP/IP',
      'Subnetting & IP addressing',
      'Cisco Packet Tracer',
      'Wireshark',
      '5G RAN & Microwave',
    ],
  },
  {
    label: 'Security',
    items: [
      'Zero-Trust architecture',
      'Access Control Lists (ACLs)',
      'Firewalls',
      'VPN',
      'TLS/SSL',
      'JWT + MFA',
      'RBAC',
      'Protocol analysis',
    ],
  },
  {
    label: 'Cloud & infrastructure',
    items: [
      'Oracle Cloud (OCI)',
      'DigitalOcean',
      'Linux',
      'Nginx',
      'PM2',
      'SSH hardening',
      'Git',
      'GitHub',
      'CI',
    ],
  },
  {
    label: 'Automation & scripting',
    items: ['Python', 'PowerShell', 'Selenium', 'Pandas'],
  },
  {
    label: 'Software & data',
    items: [
      'Node.js',
      'Express',
      'React 19',
      'Next.js',
      'Vite',
      'Flask',
      'MySQL',
      'Firebase',
      'SQL',
      'JavaScript',
      'TypeScript',
      'Swift',
      'Java',
      'C++',
    ],
  },
  {
    label: 'Applied machine learning',
    items: [
      'Isolation Forest anomaly detection',
      'Behavioural risk scoring',
      'ML for security monitoring',
    ],
  },
  {
    label: 'Languages spoken',
    items: ['Mandarin (native)', 'English (fluent)', 'Malay (fluent)'],
  },
];

/** Proof pillars under the hero (brief §3). */
export type Pillar = { label: string; text: string };
export const pillars: Pillar[] = [
  {
    label: 'carrier networks',
    text: 'Huawei Malaysia — U Mobile 5G RAN & Microwave upgrade, 100+ teams',
  },
  {
    label: 'routing & segmentation',
    text: 'Full Cisco CCNA curriculum — OSPF, VLANs, ACLs, VPN, DHCP',
  },
  {
    label: 'production security',
    text: 'Zero-trust platform shipped and operated — DIGITEX 2026 Silver',
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
    'A production examination platform where every request is treated as untrusted: eight defense-in-depth layers spanning TLS 1.3, an Nginx/UFW/fail2ban edge, per-request IP binding, JWT stage-machine MFA, and least-privilege RBAC — 26 mapped controls over 35+ endpoints, built solo and operated on a hardened DigitalOcean Singapore host.',
  glance: [
    { label: 'LOC', value: '11,700+' },
    { label: 'Controls', value: '26' },
    { label: 'Endpoints', value: '35+' },
    { label: 'RBAC roles', value: '4' },
  ] as Stat[],
  stack: ['Nginx', 'TLS 1.3', 'Node / Express', 'MySQL 8', 'Flask'],
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
    'I coordinated daily deployment operations for Malaysia’s U Mobile 5G Network Upgrade (RAN and Microwave) across Northern and Southern Malaysia — tracking 100+ subcontractor teams, resolving operational bottlenecks between Huawei, subcontractors, and the client, and managing the official site handover of 1,000+ acceptance deliverables including UAT and Launch Completion Reports. To keep that pace, I built and deployed five automation tools in Python, PowerShell, Selenium, and Excel automation, cutting daily reporting from 15 minutes to 1 — a 93% reduction.',
  impact: [
    { label: 'Teams tracked', value: '100+' },
    { label: 'Site deliverables', value: '1,000+' },
    { label: 'Tools shipped', value: '5' },
    { label: 'Reporting time', value: '15m → 1m' },
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
   Sunray enterprise network — SECR 3242 Internetworking Technology
   coursework. A 4-person team project; the company is the case-study
   subject, NOT a client. Source report lives in docs/reference/ and is
   deliberately never served: it carries teammates' personal details and
   lab credentials. Nothing secret from it appears below.
   ------------------------------------------------------------------ */

export type NetworkSegment = {
  name: string;
  subnet: string;
  gateway: string;
  purpose: string;
};

export type DesignDecision = {
  title: string;
  tag: string;
  body: string;
  details: string[];
};

export type ConnectivityCheck = {
  source: string;
  destination: string;
  result: 'pass' | 'blocked';
  note: string;
};

export const sunray = {
  title: 'Enterprise network design',
  subject: 'Sunray Construction & Interior Sdn Bhd',
  course: 'SECR 3242 Internetworking Technology · UTM, Semester 1 2024/25',
  role: 'University coursework · 4-person team project',
  teaser:
    'A comprehensive network design for a Malaysian SME, built and verified in Cisco Packet Tracer: 8 routers across 7 departmental segments, OSPF as the interior routing protocol, VLAN-segmented staff floors, a DHCP-relayed address plan, an IPsec remote-access VPN, and ACLs that keep remote workers out of Finance and the Executive Office.',
  glance: [
    { label: 'Routers', value: '8' },
    { label: 'Segments', value: '7' },
    { label: 'DHCP pools', value: '8' },
    { label: 'VLANs', value: '2' },
  ] as Stat[],
  stack: ['Cisco Packet Tracer', 'OSPF', 'VLANs', 'ACLs', 'IPsec VPN', 'DHCP'],

  brief:
    'The brief was to act as a network consulting team for a Malaysian SME and deliver a secure, scalable design covering core and edge routing, Layer 2 segmentation, wireless and remote access, and a defensible security posture. The company — a construction and interior design firm with departments that hold very different sensitivities — was the case-study subject rather than a real client.',

  segments: [
    {
      name: 'Staff Room 1',
      subnet: '192.168.0.0/28',
      gateway: '192.168.0.1',
      purpose:
        'General employee floor on VLAN 10. A /28 caps it at 16 addresses — sized to the room rather than handed a wasteful /24.',
    },
    {
      name: 'Staff Room 2',
      subnet: '192.168.0.16/28',
      gateway: '192.168.0.17',
      purpose:
        'Second employee floor on VLAN 20, isolated from VLAN 10 at Layer 2 and routed only through the core.',
    },
    {
      name: 'Finance',
      subnet: '192.168.1.0/24',
      gateway: '192.168.1.1',
      purpose:
        'Financial records. The most restricted segment — guarded by a standard ACL applied outbound on the core.',
    },
    {
      name: 'IT Department',
      subnet: '192.168.2.0/24',
      gateway: '192.168.2.1',
      purpose: 'Network operations and vulnerability management for the estate.',
    },
    {
      name: 'Server Room',
      subnet: '192.168.3.0/24',
      gateway: '192.168.3.1',
      purpose:
        'Hosts the DHCP and DNS server at 192.168.3.2 that every other segment relays to.',
    },
    {
      name: 'Executive Office',
      subnet: '192.168.4.0/24',
      gateway: '192.168.4.1',
      purpose:
        'CEO, Director, and Manager. Sensitive enough to be an explicit ACL destination alongside Finance.',
    },
    {
      name: 'Remote Access',
      subnet: '192.168.5.0/24',
      gateway: '192.168.5.1',
      purpose:
        'Work-from-home laptops over IPsec VPN, plus 802.11ac/b/g/n wireless clients on site.',
    },
  ] as NetworkSegment[],

  transitNote:
    'Router-to-router links are carved out of 192.168.6.0/24 as /30s — two usable addresses per point-to-point link, no waste.',

  decisions: [
    {
      title: 'OSPF everywhere inside, static at the edge',
      tag: 'routing',
      body:
        'A single OSPF process (area 0) runs across all seven internal routers so paths are learned dynamically and survive a link failure. The Internet router is deliberately excluded and reached by static routes instead.',
      details: [
        'Keeping the edge out of OSPF means internal topology is never advertised to an external device.',
        'The core originates a default route into the domain, so every internal router learns one way out.',
        'Each department sits behind its own router, distributing forwarding load rather than concentrating it.',
      ],
    },
    {
      title: 'VLAN segmentation with router-on-a-stick',
      tag: 'layer 2',
      body:
        'The two staff rooms are separate broadcast domains — VLAN 10 and VLAN 20 — trunked to the core switch and routed by subinterfaces on the main router.',
      details: [
        'Access ports pinned to their VLAN in access mode so they cannot negotiate a trunk.',
        'Trunk links restricted with an explicit allowed-VLAN list rather than passing every VLAN.',
        'Inter-VLAN routing on tagged subinterfaces, each owning its /28 gateway.',
        'PVST keeps the switched core loop-free.',
      ],
    },
    {
      title: 'Centralised DHCP with relay agents',
      tag: 'addressing',
      body:
        'One DHCP server in the Server Room serves eight named pools — one per segment — with every remote router configured as a relay agent so broadcasts reach it across routed boundaries.',
      details: [
        'A helper address on each department-facing interface forwards DHCP to 192.168.3.2.',
        'Pool masks are sized per segment: /24 for the large departments, /28 for the staff rooms.',
        'DNS is handed out uniformly across all pools for consistent name resolution.',
      ],
    },
    {
      title: 'IPsec remote-access VPN',
      tag: 'remote access',
      body:
        'Work-from-home staff terminate an IPsec tunnel on the main router, authenticated per user and assigned an address from a dedicated VPN pool.',
      details: [
        'ISAKMP policy negotiating AES-256 with Diffie-Hellman group 5 and a 3600-second rekey lifetime.',
        'ESP transform set pairing AES encryption with SHA integrity, so tampering is detected as well as prevented.',
        'A dynamic crypto map with reverse-route injection adds each client’s route as it connects.',
        'Clients draw from a dedicated pool, which is what makes them addressable — and therefore filterable — as a group.',
      ],
    },
    {
      title: 'ACLs that assume the remote user is untrusted',
      tag: 'access control',
      body:
        'Two complementary ACLs enforce least privilege: one stops VPN clients reaching the sensitive departments, the other allows only known sources into Finance.',
      details: [
        'An extended ACL on the remote-access router denies the VPN pool to both the Finance and Executive Office subnets, then permits everything else.',
        'A standard ACL applied outbound on the core permits only the Server Room, Executive Office, transit links, and the Internet block into Finance — everything else falls to the implicit deny.',
        'Remote users keep access to general resources; only the sensitive segments are withheld.',
      ],
    },
    {
      title: 'Firewall between the estate and the Internet',
      tag: 'perimeter',
      body:
        'A dedicated firewall separates the internal network from the Internet segment, with asymmetric rules in each direction.',
      details: [
        'Outbound: internal hosts may reach the Internet server freely.',
        'Inbound: only the Internet server itself is permitted in — every other external host is refused.',
        'Static routing across the firewall, since the edge intentionally sits outside OSPF.',
      ],
    },
  ] as DesignDecision[],

  verification: {
    intro:
      'Every segment pair was ping-tested from end to end. The interesting result is the one that fails: a VPN laptop cannot reach Finance, while an Executive Office host on the same destination succeeds — which is exactly what the ACLs were written to do. A design is only proven when the denials are demonstrated, not just the reachability.',
    checks: [
      {
        source: 'VPN laptop',
        destination: 'Executive Office',
        result: 'pass',
        note: 'Reachable — the remote user still gets general access.',
      },
      {
        source: 'VPN laptop',
        destination: 'Server Room',
        result: 'pass',
        note: 'Reachable across the OSPF domain.',
      },
      {
        source: 'VPN laptop',
        destination: 'Staff Rooms 1 & 2',
        result: 'pass',
        note: 'Inter-VLAN routing works from off-site.',
      },
      {
        source: 'VPN laptop',
        destination: 'Internet',
        result: 'pass',
        note: 'Egress through the firewall succeeds.',
      },
      {
        source: 'VPN laptop',
        destination: 'Finance',
        result: 'blocked',
        note: 'Denied by design — host unreachable, returned by the ACL on the remote-access router.',
      },
      {
        source: 'Executive Office',
        destination: 'Finance',
        result: 'pass',
        note: 'Permitted by the Finance ACL — proving the block is source-specific, not a broken route.',
      },
    ] as ConnectivityCheck[],
  },

  whatsNext: [
    'Replace the pre-shared VPN group key with certificate-based authentication.',
    'Move the flat area 0 into multiple OSPF areas with summarisation as the site grows.',
    'Add switchport port-security and DHCP snooping to the access layer.',
    'Log ACL denies to a syslog collector so blocked attempts are visible, not silent.',
  ],
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

/** Same channels as `findMe`, carrying the readable value the contact page
    shows under each label so a visitor can copy it without clicking. */
export const contactChannels: (Link & { value: string })[] = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/chanqingyee', href: personalInfo.linkedin },
  { label: 'WhatsApp', value: personalInfo.whatsappLabel, href: personalInfo.whatsapp },
  { label: 'GitHub', value: 'github.com/currylaksa', href: personalInfo.github },
];

export const contactFacts: Stat[] = [
  { label: 'Time zone', value: 'GMT+8 — same as Singapore' },
  { label: 'Typical reply', value: 'Within one business day' },
  { label: 'Based in', value: 'Johor Bahru → Singapore' },
  { label: 'Best channel', value: 'Email or LinkedIn' },
];
