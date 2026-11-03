function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {children}
    </svg>
  );
}

export default function SkillIcon({ label }: { label: string }) {
  switch (label) {
    case 'Test & semiconductor':
      return (
        <Svg>
          <circle cx="12" cy="12" r="8" />
          <path d="M8 8h8v8H8zM12 4v16M4 12h16" />
        </Svg>
      );
    case 'Networking':
      return (
        <Svg>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M8 6h8M7 8l4 8M17 8l-4 8" />
        </Svg>
      );
    case 'Security':
      return (
        <Svg>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </Svg>
      );
    case 'Cloud & infrastructure':
      return (
        <Svg>
          <rect x="4" y="4" width="16" height="6" rx="1" />
          <rect x="4" y="14" width="16" height="6" rx="1" />
          <path d="M8 7h.01M8 17h.01" />
        </Svg>
      );
    case 'Automation & scripting':
      return (
        <Svg>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 9l3 3-3 3M13 15h5" />
        </Svg>
      );
    case 'Software & data':
      return (
        <Svg>
          <path d="M9 7l-5 5 5 5M15 7l5 5-5 5M13 5l-2 14" />
        </Svg>
      );
    case 'Applied machine learning':
      return (
        <Svg>
          <path d="M4 18V6M4 18h16" />
          <path d="M7 15l3-4 3 2 4-6" />
          <circle cx="7" cy="15" r="1" />
          <circle cx="10" cy="11" r="1" />
          <circle cx="13" cy="13" r="1" />
          <circle cx="17" cy="7" r="1" />
        </Svg>
      );
    case 'Languages spoken':
      return (
        <Svg>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16" />
        </Svg>
      );
    default:
      return (
        <Svg>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </Svg>
      );
  }
}
