export function Logo(props) {
  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 110C20 60 60 20 100 20C140 20 180 60 180 110"
        stroke="#000"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="url(#gradient)"
      />

      <path
        d="M40 110C40 70 70 40 100 40C130 40 160 70 160 110"
        stroke="#000"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />

      <g stroke="#000" stroke-width="3" stroke-linecap="round">
        <line x1="40" y1="110" x2="45" y2="100" />
        <line x1="60" y1="70" x2="65" y2="60" />
        <line x1="100" y1="50" x2="100" y2="40" />
        <line x1="140" y1="70" x2="135" y2="60" />
        <line x1="160" y1="110" x2="155" y2="100" />
      </g>

      <circle cx="100" cy="110" r="5" fill="#000" />
      <line
        x1="100"
        y1="110"
        x2="130"
        y2="80"
        stroke="#000"
        stroke-width="5"
        stroke-linecap="round"
      />

      <defs>
        <linearGradient
          id="gradient"
          x1="20"
          y1="20"
          x2="180"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#4ade80" />
          <stop offset="1" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
