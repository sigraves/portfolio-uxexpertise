const FourQuadrant = ({ size = 20, className = '' }: { size?: number; className?: string }) => {
  const half = size / 2;
  const gap = size * 0.06;
  const round = size * 0.12;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect x={0} y={0} width={half - gap} height={half - gap} rx={round} fill="#dc2626" />
      <rect x={half + gap} y={0} width={half - gap} height={half - gap} rx={round} fill="#ea580c" />
      <rect x={0} y={half + gap} width={half - gap} height={half - gap} rx={round} fill="#0f766e" />
      <rect x={half + gap} y={half + gap} width={half - gap} height={half - gap} rx={round} fill="#334155" />
    </svg>
  );
};

export default FourQuadrant;
