const petalSVG = `
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#f9a8d4" d="M16 2c-3 0-6 4-6 9 0 3 2 6 2 6s-5-1-9 3c-2 2-1 6 2 7s6-1 8-2c0 0 1 6 3 6s3-6 3-6c2 1 5 3 8 2s4-5 2-7c-4-4-9-3-9-3s2-3 2-6c0-5-3-9-6-9z"/>
  </svg>
`;

export default function SakuraAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 animate-sakura"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            top: '-50px',
            opacity: 0.9,
          }}
          dangerouslySetInnerHTML={{ __html: petalSVG }}
        />
      ))}
    </div>
  );
}
