import { cn } from "@/lib/utils"

export function Mockup({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "relative rounded-[2rem] border-8 border-slate-900/10 bg-slate-950/5 p-1 shadow-2xl",
      className
    )}>
      <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-background">
        {children}
      </div>
    </div>
  )
}
