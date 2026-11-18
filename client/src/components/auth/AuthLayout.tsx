import type { ReactNode } from "react"
import { GraduationCap, CircleCheck } from "lucide-react"

const checklist = [
  "Manage Students & Staff",
  "Track Attendance",
  "View Results & Reports",
  "Get Connected",
]

type Props = {
  image?: string
  showChecklist?: boolean
  children: ReactNode
}

function AuthLayout({ showChecklist = true, children }: Props) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT: picture */}
      <div
        className="relative hidden md:flex flex-col justify-between text-white p-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/auth-bg.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-transparent to-violet-950/10" />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center">
            <GraduationCap size={26} />
          </div>
          <span className="text-3xl font-bold tracking-wide drop-shadow">VLEARNING</span>
        </div>

        <div className="relative">
          <p className="text-5xl font-bold leading-tight drop-shadow-lg">
            Smart School.
            <br />
            Brighter Future.
          </p>
          {showChecklist && (
            <ul className="mt-6 grid grid-cols-2 gap-3 max-w-lg">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base font-medium bg-white/15 border border-white/25 backdrop-blur rounded-xl px-3 py-3"
                >
                  <CircleCheck size={20} className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RIGHT: sharp picture + 3D card */}
      <div className="relative flex flex-col min-h-screen overflow-hidden bg-violet-900">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/auth-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(139,92,246,0.35) 0%, rgba(167,139,250,0.20) 45%, rgba(76,29,149,0.40) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(120deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 2px, transparent 2px, transparent 40px)",
          }}
        />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-[28px] border-white/10" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border-[24px] border-white/10" />
        <div className="absolute top-1/2 right-6 w-6 h-6 rounded-full bg-white/30" />
        <div className="absolute bottom-1/3 left-8 w-4 h-4 rounded-full bg-violet-200/50" />

        <div className="md:hidden relative flex items-center gap-2 px-6 pt-6 text-white">
          <GraduationCap size={30} />
          <span className="text-2xl font-bold">VLEARNING</span>
        </div>

        <div className="relative flex-1 flex items-center justify-center px-3 sm:px-4 py-14">
          <div className="relative w-full max-w-5xl" style={{ perspective: "1400px" }}>
            <div
              className="absolute inset-x-5 -bottom-4 h-full rounded-[28px]"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
            <div
              className="absolute inset-x-10 -bottom-8 h-full rounded-[28px]"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />

            <div
              className="relative rounded-[28px] px-8 sm:px-20 pt-24 pb-16 transition-transform duration-500 ease-out hover:[transform:rotateX(2deg)_rotateY(-3deg)_translateY(-4px)]"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(255,255,255,0.9)",
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 50px 90px -25px rgba(0,0,0,0.6), 0 20px 40px -20px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,1)",
              }}
            >
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl text-white flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #5b21b6)",
                  border: "4px solid #fff",
                  boxShadow: "0 20px 34px -8px rgba(76,29,149,0.7)",
                }}
              >
                <GraduationCap size={48} />
              </div>
              <div className="w-full max-w-2xl mx-auto">{children}</div>
            </div>
          </div>
        </div>

        <p className="relative px-6 pb-6 text-sm text-white/80 text-center">
          © 2026 VLEARNING • Smart School. Brighter Future.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout