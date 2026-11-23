import type { ReactNode } from "react"
import { X } from "lucide-react"

export const inputCls =
  "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
}

export function Stat({ label, value, note, tone = "indigo" }: { label: string; value: ReactNode; note?: string; tone?: "indigo" | "teal" | "orange" | "red" }) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-700",
    teal: "bg-teal-50 text-teal-700",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`w-2.5 h-2.5 rounded-full ${tones[tone].split(" ")[0]} ring-4 ring-offset-0 ring-transparent`} />
      </div>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {note && <p className="mt-1 text-xs text-slate-400">{note}</p>}
    </Card>
  )
}

const badgeTones: Record<string, string> = {
  green: "bg-teal-100 text-teal-800",
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-indigo-100 text-indigo-700",
  gray: "bg-slate-100 text-slate-600",
}

export function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: "green" | "red" | "orange" | "blue" | "gray" }) {
  return <span className={`text-xs font-semibold rounded-full px-2.5 py-1 whitespace-nowrap ${badgeTones[tone]}`}>{children}</span>
}

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "ghost" | "danger"
  type?: "button" | "submit"
  disabled?: boolean
}) {
  const styles = {
    primary: "text-white bg-indigo-700 hover:bg-indigo-800",
    ghost: "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50",
    danger: "text-red-600 bg-white border border-red-200 hover:bg-red-50",
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export function Tabs<T extends string>({ tabs, active, onChange }: { tabs: readonly T[]; active: T; onChange: (t: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl w-fit max-w-full overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition ${
            active === t ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      {label}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  )
}

export function Empty({ text }: { text: string }) {
  return <div className="px-6 py-10 text-center text-sm text-slate-500">{text}</div>
}

export function DataTable({ head, children, empty }: { head: string[]; children: ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
      {empty && <Empty text="No records found." />}
    </div>
  )
}

export const td = "px-5 py-3.5 text-slate-700 whitespace-nowrap"