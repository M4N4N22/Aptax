type MonolithIconName =
  | "api"
  | "terminal"
  | "hub"
  | "bolt"
  | "lock"
  | "verified";

type MonolithIconProps = {
  name: MonolithIconName;
  className?: string;
};

const baseClass = "h-5 w-5";

export function MonolithIcon({ name, className }: MonolithIconProps) {
  const cls = [baseClass, className].filter(Boolean).join(" ");

  switch (name) {
    case "api":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      );
    case "terminal":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 7l4 5-4 5M11 17h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      );
    case "hub":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="10.8" y="10.8" width="2.4" height="2.4" fill="currentColor" />
          <path
            d="M6 6h3v3H6zM15 6h3v3h-3zM6 15h3v3H6zM15 15h3v3h-3zM9 7.5h6M7.5 9v6M16.5 9v6M9 16.5h6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="square"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13.5 3L6 13h5l-1 8 7.5-10h-5L13.5 3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="miter"
          />
        </svg>
      );
    case "lock":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8 10V7a4 4 0 118 0v3M6 10h12v10H6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      );
    case "verified":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 12l3 3 7-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
          />
          <path
            d="M12 3l7 4v10l-7 4-7-4V7l7-4z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
}
