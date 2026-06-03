export function SensaliLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className="text-3xl font-bold tracking-[0.3em] text-gold">SENSALI</h1>
      <p className="text-[10px] tracking-[0.25em] text-gold/80 mt-1">REAL ESTATE INTELLIGENCE</p>
    </div>
  )
}

export function SensaliLogoSmall({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h1 className="text-xl font-bold tracking-[0.2em] text-gold">SENSALI</h1>
      <p className="text-[8px] tracking-[0.15em] text-gold/80 mt-0.5">REAL ESTATE INTELLIGENCE</p>
    </div>
  )
}
