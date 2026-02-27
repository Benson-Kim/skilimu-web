export function LogoIcon() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="w-10 h-10 border-2 border-electric rounded-[10px] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,160,0.4)]">
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
          <path
            d="M8 10 L18 6 L28 10 L28 22 L18 28 L8 22 Z"
            stroke="#00E5A0"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M18 6 L18 28"
            stroke="#00E5A0"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M8 10 L28 10"
            stroke="#00E5A0"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle cx="18" cy="17" r="3" fill="#00E5A0" />
          <circle cx="12" cy="13.5" r="1.5" fill="#00E5A0" opacity="0.5" />
          <circle cx="24" cy="13.5" r="1.5" fill="#00E5A0" opacity="0.5" />
        </svg>
      </div>
      <span className="font-main text-[22px] font-bold tracking-[-0.8px] text-stark-white">
        Skili<span className="text-electric">mu</span>
      </span>
    </div>
  );
}
