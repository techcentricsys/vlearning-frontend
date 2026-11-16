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

const sphere = (c1: string, c2: string) => ({
  background: `radial-gradient(circle at 30% 28%, ${c1}, ${c2} 70%)`,
  boxShadow: "inset -10px -14px 24px rgba(0,0,0,0.25), 0 24px 40px -10px rgba(76,29,149,0.5)",
})

function AuthLayout({ showChecklist = true, children }: Props) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(18px) translateX(-12px)} }
      `}</style>

      {/* LEFT: picture */}
      <div
        className="relative hidden md:flex flex-col justify-between text-white p-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/auth-bg.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-900/10 to-violet-950/40" />

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

      {/* RIGHT: 3D scene */}
      <div
        className="relative flex flex-col min-h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #c4b5fd 0%, #a5b4fc 45%, #f0abfc 100%)",
        }}
      >
        {/* dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(76,29,149,0.22) 1.6px, transparent 1.6px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* big glow */}
        <div
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full"
          style={{ background: "rgba(255,255,255,0.35)", filter: "blur(70px)" }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[26rem] h-[26rem] rounded-full"
          style={{ background: "rgba(124,58,237,0.45)", filter: "blur(80px)" }}
        />

        {/* floating 3D spheres */}
        <div
          className="absolute top-[8%] right-[8%] w-24 h-24 rounded-full"
          style={{ ...sphere("#e9d5ff", "#7c3aed"), animation: "floatA 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[10%] right-[6%] w-16 h-16 rounded-full"
          style={{ ...sphere("#fbcfe8", "#c026d3"), animation: "floatB 7s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[40%] left-[3%] w-14 h-14 rounded-full"
          style={{ ...sphere("#c7d2fe", "#4f46e5"), animation: "floatA 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[8%] left-[10%] w-20 h-20 rounded-full"
          style={{ ...sphere("#ddd6fe", "#6d28d9"), animation: "floatB 9s ease-in-out infinite" }}
        />

        <div className="md:hidden relative flex items-center gap-2 px-6 pt-6 text-violet-900">
          <GraduationCap size={30} />
          <span className="text-2xl font-bold">VLEARNING</span>
        </div>

        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-8 py-14">
          <div className="relative w-full max-w-xl" style={{ perspective: "1400px" }}>
            {/* stacked layers */}
            <div
              className="absolute inset-x-5 -bottom-4 h-full rounded-[28px]"
              style={{ background: "rgba(255,255,255,0.55)" }}
            />
            <div
              className="absolute inset-x-10 -bottom-8 h-full rounded-[28px]"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />

            {/* card */}
            <div
              className="relative rounded-[28px] px-8 sm:px-12 pt-16 pb-10 transition-transform duration-500 ease-out hover:[transform:rotateX(2deg)_rotateY(-3deg)_translateY(-4px)]"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(255,255,255,0.9)",
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 50px 90px -25px rgba(46,16,101,0.6), 0 20px 40px -20px rgba(46,16,101,0.5), inset 0 2px 0 rgba(255,255,255,1)",
              }}
            >
              {/* floating logo badge */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl text-white flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #5b21b6)",
                  border: "4px solid #fff",
                  boxShadow: "0 20px 34px -8px rgba(76,29,149,0.7)",
                }}
              >
                <GraduationCap size={40} />
              </div>
              {children}
            </div>
          </div>
        </div>

        <p className="relative px-6 pb-6 text-sm text-violet-900/80 text-center">
          © 2026 VLEARNING • Smart School. Brighter Future.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout