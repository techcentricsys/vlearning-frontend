import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Download, Printer } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge, Button, Card, DataTable, PageHeader, Stat, Tabs, td } from "../../management/shared/ui"
import { money } from "../../management/shared/store"
import {
  CLASSES,
  downloadCsv,
  getClassStats,
  getDefaulters,
  getDepartments,
  getGrades,
  getLowAttendance,
  getMonthStats,
  getSubjectAvg,
  getTopStudents,
} from "../services/reportService"

const TABS = ["Overview", "Students", "Attendance", "Fees", "Academics", "Staff"] as const
type Tab = (typeof TABS)[number]

const C = { indigo: "#4338ca", teal: "#0d9488", orange: "#ea580c", slate: "#94a3b8" }
const PIE = ["#0d9488", "#4338ca", "#0ea5e9", "#f59e0b", "#ea580c", "#dc2626"]

const sum = <T,>(arr: T[], f: (x: T) => number) => arr.reduce((s, x) => s + f(x), 0)
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0)
const lakh = (n: number) => `${(n / 100000).toFixed(1)}L`

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <p className="font-semibold text-slate-900 mb-4">{title}</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function TableCard({
  title,
  head,
  children,
  empty,
  onExport,
}: {
  title: string
  head: string[]
  children: ReactNode
  empty?: boolean
  onExport?: () => void
}) {
  return (
    <Card>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <p className="font-semibold text-slate-900">{title}</p>
        {onExport && (
          <Button variant="ghost" onClick={onExport}>
            <Download size={14} /> Export CSV
          </Button>
        )}
      </div>
      <DataTable head={head} empty={empty}>
        {children}
      </DataTable>
    </Card>
  )
}

export default function ReportsPage() {
  const [tab, setTab] = useState<Tab>("Overview")
  const [cls, setCls] = useState("All")

  const allClasses = useMemo(() => getClassStats(), [])
  const months = useMemo(() => getMonthStats(), [])
  const defaulters = useMemo(() => getDefaulters(), [])
  const lowAtt = useMemo(() => getLowAttendance(), [])
  const top = useMemo(() => getTopStudents(), [])
  const subjects = useMemo(() => getSubjectAvg(), [])
  const grades = useMemo(() => getGrades(), [])
  const depts = useMemo(() => getDepartments(), [])

  const classes = cls === "All" ? allClasses : allClasses.filter((c) => c.className === cls)
  const students = sum(classes, (c) => c.students)
  const billed = sum(classes, (c) => c.feeBilled)
  const collected = sum(classes, (c) => c.feeCollected)
  const avgAttendance = classes.length ? Math.round(sum(classes, (c) => c.attendancePct) / classes.length) : 0
  const staffTotal = sum(depts, (d) => d.headcount)

  const showClassFilter = tab !== "Overview" && tab !== "Staff"

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Students, attendance, fees, academics aur staff ki reports"
        action={
          <Button variant="ghost" onClick={() => window.print()}>
            <Printer size={16} /> Print
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        {showClassFilter && (
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white" aria-label="Class filter">
            <option value="All">All Classes</option>
            {CLASSES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {tab === "Overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Total students" value={sum(allClasses, (c) => c.students).toLocaleString()} />
            <Stat label="Total staff" value={staffTotal} tone="teal" />
            <Stat label="Avg attendance" value={`${Math.round(sum(allClasses, (c) => c.attendancePct) / allClasses.length)}%`} tone="orange" />
            <Stat label="Fee collected" value={`${pct(sum(allClasses, (c) => c.feeCollected), sum(allClasses, (c) => c.feeBilled))}%`} note={`Pending ${money(sum(allClasses, (c) => c.feeBilled - c.feeCollected))}`} tone="red" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartCard title="Monthly fee collection (Rs.)">
              <BarChart data={months}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={lakh} />
                <Tooltip formatter={(v) => money(Number(v))} />
                <Legend />
                <Bar dataKey="collected" name="Collected" fill={C.teal} radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill={C.orange} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartCard>
            <ChartCard title="Attendance trend (%)">
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="attendancePct" name="Attendance %" stroke={C.indigo} strokeWidth={2} dot={false} />
              </LineChart>
            </ChartCard>
            <ChartCard title="Class-wise strength">
              <BarChart data={allClasses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="className" tickFormatter={(v: string) => v.replace("Class ", "C")} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" name="Students" fill={C.indigo} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartCard>
            <ChartCard title="Grade distribution">
              <PieChart>
                <Pie data={grades} dataKey="count" nameKey="grade" innerRadius={50} outerRadius={90} label>
                  {grades.map((g, i) => (
                    <Cell key={g.grade} fill={PIE[i % PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ChartCard>
          </div>
        </div>
      )}

      {tab === "Students" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Students" value={students} />
            <Stat label="Boys" value={sum(classes, (c) => c.boys)} tone="teal" />
            <Stat label="Girls" value={sum(classes, (c) => c.girls)} tone="orange" />
            <Stat label="New admissions (year)" value={sum(months, (m) => m.admissions)} tone="red" />
          </div>
          <ChartCard title="New admissions by month">
            <BarChart data={months}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="admissions" name="Admissions" fill={C.indigo} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
          <TableCard
            title="Class-wise student report"
            head={["Class", "Students", "Boys", "Girls", "Girls %"]}
            empty={classes.length === 0}
            onExport={() => downloadCsv("student-report.csv", classes.map((c) => ({ Class: c.className, Students: c.students, Boys: c.boys, Girls: c.girls })))}
          >
            {classes.map((c) => (
              <tr key={c.className}>
                <td className={td + " font-medium text-slate-900"}>{c.className}</td>
                <td className={td}>{c.students}</td>
                <td className={td}>{c.boys}</td>
                <td className={td}>{c.girls}</td>
                <td className={td}>{pct(c.girls, c.students)}%</td>
              </tr>
            ))}
          </TableCard>
        </div>
      )}

      {tab === "Attendance" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat label="Average attendance" value={`${avgAttendance}%`} tone="teal" />
            <Stat label="Below 75% (students)" value={lowAtt.length} tone="red" />
            <Stat label="Best class" value={[...classes].sort((a, b) => b.attendancePct - a.attendancePct)[0]?.className ?? "-"} />
          </div>
          <ChartCard title="Class-wise attendance (%)">
            <BarChart data={classes}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="className" tickFormatter={(v: string) => v.replace("Class ", "C")} />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Bar dataKey="attendancePct" name="Attendance %" fill={C.teal} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
          <TableCard
            title="Low attendance students"
            head={["Student", "Class", "Absent days", "Attendance"]}
            empty={lowAtt.length === 0}
            onExport={() => downloadCsv("low-attendance.csv", lowAtt.map((l) => ({ Student: l.name, Class: l.className, AbsentDays: l.absentDays, AttendancePct: l.attendancePct })))}
          >
            {lowAtt
              .filter((l) => cls === "All" || l.className === cls)
              .map((l) => (
                <tr key={l.id}>
                  <td className={td + " font-medium text-slate-900"}>{l.name}</td>
                  <td className={td}>{l.className}</td>
                  <td className={td}>{l.absentDays}</td>
                  <td className={td}>
                    <Badge tone="red">{l.attendancePct}%</Badge>
                  </td>
                </tr>
              ))}
          </TableCard>
        </div>
      )}

      {tab === "Fees" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Total billed" value={money(billed)} />
            <Stat label="Collected" value={money(collected)} tone="teal" />
            <Stat label="Pending" value={money(billed - collected)} tone="red" />
            <Stat label="Collection rate" value={`${pct(collected, billed)}%`} tone="orange" />
          </div>
          <ChartCard title="Collected vs pending by class (Rs.)">
            <BarChart data={classes.map((c) => ({ className: c.className, collected: c.feeCollected, pending: c.feeBilled - c.feeCollected }))}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="className" tickFormatter={(v: string) => v.replace("Class ", "C")} />
              <YAxis tickFormatter={lakh} />
              <Tooltip formatter={(v) => money(Number(v))} />
              <Legend />
              <Bar dataKey="collected" name="Collected" stackId="a" fill={C.teal} />
              <Bar dataKey="pending" name="Pending" stackId="a" fill={C.orange} />
            </BarChart>
          </ChartCard>
          <TableCard
            title="Fee defaulters"
            head={["Student", "Class", "Due amount", "Days late"]}
            empty={defaulters.filter((d) => cls === "All" || d.className === cls).length === 0}
            onExport={() => downloadCsv("fee-defaulters.csv", defaulters.map((d) => ({ Student: d.name, Class: d.className, Due: d.due, DaysLate: d.daysLate })))}
          >
            {defaulters
              .filter((d) => cls === "All" || d.className === cls)
              .map((d) => (
                <tr key={d.id}>
                  <td className={td + " font-medium text-slate-900"}>{d.name}</td>
                  <td className={td}>{d.className}</td>
                  <td className={td}>{money(d.due)}</td>
                  <td className={td}>
                    <Badge tone={d.daysLate > 30 ? "red" : "orange"}>{d.daysLate} days</Badge>
                  </td>
                </tr>
              ))}
          </TableCard>
        </div>
      )}

      {tab === "Academics" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat label="Average marks" value={`${classes.length ? Math.round(sum(classes, (c) => c.avgMarks) / classes.length) : 0}%`} />
            <Stat label="Pass percentage" value={`${classes.length ? Math.round(sum(classes, (c) => c.passPct) / classes.length) : 0}%`} tone="teal" />
            <Stat label="Top grade (A+)" value={grades[0].count} tone="orange" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartCard title="Subject-wise average (%)">
              <BarChart data={subjects}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avg" name="Average" fill={C.indigo} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartCard>
            <ChartCard title="Class-wise pass %">
              <BarChart data={classes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="className" tickFormatter={(v: string) => v.replace("Class ", "C")} />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Bar dataKey="passPct" name="Pass %" fill={C.teal} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartCard>
          </div>
          <TableCard
            title="Top performers"
            head={["Rank", "Student", "Class", "Percentage", "Grade"]}
            empty={top.length === 0}
            onExport={() => downloadCsv("top-performers.csv", top.map((t, i) => ({ Rank: i + 1, Student: t.name, Class: t.className, Percentage: t.percentage, Grade: t.grade })))}
          >
            {top
              .filter((t) => cls === "All" || t.className === cls)
              .map((t, i) => (
                <tr key={t.id}>
                  <td className={td}>{i + 1}</td>
                  <td className={td + " font-medium text-slate-900"}>{t.name}</td>
                  <td className={td}>{t.className}</td>
                  <td className={td}>{t.percentage}%</td>
                  <td className={td}>
                    <Badge tone="green">{t.grade}</Badge>
                  </td>
                </tr>
              ))}
          </TableCard>
        </div>
      )}

      {tab === "Staff" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Total staff" value={staffTotal} />
            <Stat label="Avg attendance" value={`${Math.round(sum(depts, (d) => d.attendancePct) / depts.length)}%`} tone="teal" />
            <Stat label="Leaves this month" value={sum(depts, (d) => d.leaves)} tone="orange" />
            <Stat label="Monthly payroll" value={money(sum(depts, (d) => d.payroll))} tone="red" />
          </div>
          <ChartCard title="Headcount by department">
            <BarChart data={depts}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="headcount" name="Staff" fill={C.indigo} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
          <TableCard
            title="Department summary"
            head={["Department", "Headcount", "Attendance", "Leaves", "Payroll"]}
            empty={depts.length === 0}
            onExport={() => downloadCsv("staff-report.csv", depts.map((d) => ({ Department: d.dept, Headcount: d.headcount, AttendancePct: d.attendancePct, Leaves: d.leaves, Payroll: d.payroll })))}
          >
            {depts.map((d) => (
              <tr key={d.dept}>
                <td className={td + " font-medium text-slate-900"}>{d.dept}</td>
                <td className={td}>{d.headcount}</td>
                <td className={td}>
                  <Badge tone={d.attendancePct >= 93 ? "green" : "orange"}>{d.attendancePct}%</Badge>
                </td>
                <td className={td}>{d.leaves}</td>
                <td className={td}>{money(d.payroll)}</td>
              </tr>
            ))}
          </TableCard>
        </div>
      )}
    </div>
  )
}