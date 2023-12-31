export default function BottomCard({ hover }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="226"
      height="45"
      viewBox="0 0 226 45"
      fill="none"
    >
      <path
        d="M0 44.9284C112.83 44.9284 128.706 0 226 0V16.9284C226 32.3924 213.464 44.9284 198 44.9284H0Z"
        fill={hover ? "#CF0A0A" : "#65A30D"}
      />
      <path
        d="M188 22.0001V24.0001H200L194.5 29.5001L195.92 30.9201L203.84 23.0001L195.92 15.0801L194.5 16.5001L200 22.0001H188Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
