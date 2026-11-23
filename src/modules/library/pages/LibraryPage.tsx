import { useMemo, useState } from "react"
import { BookOpen, RotateCcw, Undo2, Wallet } from "lucide-react"
import { Badge, Button, Card, DataTable, Field, PageHeader, Stat, Tabs, inputCls, td } from "../../management/shared/ui"
import { CrudTab } from "../../management/shared/CrudTab"
import type { FieldDef } from "../../management/shared/CrudTab"
import { money, today } from "../../management/shared/store"
import { useLibrary } from "../services/libraryService"
import { FINE_PER_DAY, MAX_RENEWALS, MEMBER_TYPES, POLICY } from "../types/libraryTypes"
import type { Book, BookCategory, LibraryMember } from "../types/libraryTypes"

const TABS = ["Overview", "Catalog", "Issue & Return", "Fines", "Members", "Categories", "Reports"] as const
type Tab = (typeof TABS)[number]

export default function LibraryPage({ initialTab = "Overview" }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab)
  const lib = useLibrary()
  const { cat, bk, mem, iss, active } = lib

  const overdue = active.filter((i) => lib.liveFine(i) > 0)
  const totalCopies = bk.items.reduce((s, b) => s + b.copies - b.lost, 0)
  const unpaidFines = iss.items.filter((i) => lib.liveFine(i) > 0 && !i.finePaid && i.status === "Returned")

  const bookFields: FieldDef<Book>[] = [
    { key: "title", label: "Title", required: true, full: true },
    { key: "author", label: "Author", required: true },
    { key: "isbn", label: "ISBN" },
    { key: "barcode", label: "Barcode", required: true, placeholder: "LIB-0007" },
    { key: "rfid", label: "RFID Tag" },
    { key: "category", label: "Category", type: "select", options: cat.items.map((c) => c.name), required: true },
    { key: "publisher", label: "Publisher" },
    { key: "year", label: "Year" },
    { key: "shelf", label: "Shelf / Rack" },
    { key: "copies", label: "Total Copies", type: "number", required: true },
    { key: "lost", label: "Lost / Damaged", type: "number" },
    { key: "price", label: "Price (Rs.)", type: "number" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Library Management" subtitle="Catalog, issue/return, fines aur reports" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Book titles" value={bk.items.length} note={`${totalCopies} total copies`} />
            <Stat label="Currently issued" value={active.length} tone="teal" />
            <Stat label="Overdue" value={overdue.length} tone="red" note={`Fine Rs. ${FINE_PER_DAY}/day`} />
            <Stat label="Pending fines" value={money(unpaidFines.reduce((s, i) => s + i.fine, 0) + overdue.reduce((s, i) => s + lib.liveFine(i), 0))} tone="orange" />
          </div>
          <Card>
            <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">Overdue books</div>
            <DataTable head={["Book", "Member", "Due date", "Days late", "Fine"]} empty={overdue.length === 0}>
              {overdue.map((i) => (
                <tr key={i.id}>
                  <td className={td + " font-medium text-slate-900"}>{lib.bookTitle(i.bookId)}</td>
                  <td className={td}>{lib.memberName(i.memberId)}</td>
                  <td className={td}>{i.dueDate}</td>
                  <td className={td}>{lib.liveFine(i) / FINE_PER_DAY}</td>
                  <td className={td}>
                    <Badge tone="red">{money(lib.liveFine(i))}</Badge>
                  </td>
                </tr>
              ))}
            </DataTable>
          </Card>
        </div>
      )}

      {tab === "Catalog" && (
        <CrudTab<Book>
          title="Books"
          addLabel="Add Book"
          items={bk.items}
          fields={bookFields}
          defaults={{ barcode: "", rfid: "", title: "", author: "", isbn: "", category: "", publisher: "", year: "", copies: 1, lost: 0, shelf: "", price: 0 }}
          searchKeys={["title", "author", "isbn", "barcode", "rfid"]}
          filter={{ key: "category", options: cat.items.map((c) => c.name), label: "Categories" }}
          columns={[
            { label: "Title", render: (b) => <div><p className="font-medium text-slate-900">{b.title}</p><p className="text-xs text-slate-400">{b.author}</p></div> },
            { label: "Barcode", render: (b) => b.barcode },
            { label: "Category", render: (b) => <Badge tone="blue">{b.category}</Badge> },
            { label: "Shelf", render: (b) => b.shelf },
            { label: "Available", render: (b) => { const a = lib.availableOf(b.id); return <Badge tone={a > 0 ? "green" : "red"}>{a} / {b.copies - b.lost}</Badge> } },
          ]}
          onAdd={(b) => bk.add(b)}
          onUpdate={bk.update}
          onRemove={(id) => {
            if (active.some((i) => i.bookId === id)) return window.alert("Ye book issue hai, abhi delete nahi ho sakti.")
            bk.remove(id)
          }}
        />
      )}

      {tab === "Issue & Return" && <IssueReturn lib={lib} />}

      {tab === "Fines" && (
        <Card>
          <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">Fine records</div>
          <DataTable
            head={["Book", "Member", "Due", "Returned", "Fine", "Status", "Action"]}
            empty={iss.items.filter((i) => lib.liveFine(i) > 0).length === 0}
          >
            {iss.items.filter((i) => lib.liveFine(i) > 0).map((i) => (
              <tr key={i.id}>
                <td className={td + " font-medium text-slate-900"}>{lib.bookTitle(i.bookId)}</td>
                <td className={td}>{lib.memberName(i.memberId)}</td>
                <td className={td}>{i.dueDate}</td>
                <td className={td}>{i.returnDate || "Not returned"}</td>
                <td className={td}>{money(lib.liveFine(i))}</td>
                <td className={td}>
                  {i.status === "Issued" ? <Badge tone="orange">Accruing</Badge> : i.finePaid ? <Badge tone="green">Paid</Badge> : <Badge tone="red">Unpaid</Badge>}
                </td>
                <td className={td}>
                  {i.status === "Returned" && !i.finePaid && (
                    <Button onClick={() => lib.payFine(i.id)}>
                      <Wallet size={14} /> Collect
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        </Card>
      )}

      {tab === "Members" && (
        <CrudTab<LibraryMember>
          title="Members"
          addLabel="Add Member"
          items={mem.items}
          fields={[
            { key: "code", label: "ID / Roll No", required: true },
            { key: "name", label: "Name", required: true },
            { key: "type", label: "Type", type: "select", options: MEMBER_TYPES, required: true },
            { key: "classOrDept", label: "Class / Department" },
            { key: "status", label: "Status", type: "select", options: ["Active", "Blocked"], required: true },
          ]}
          defaults={{ code: "", name: "", type: "Student", classOrDept: "", status: "Active" }}
          searchKeys={["name", "code", "classOrDept"]}
          filter={{ key: "type", options: MEMBER_TYPES, label: "Types" }}
          columns={[
            { label: "Code", render: (m) => m.code },
            { label: "Name", render: (m) => <span className="font-medium text-slate-900">{m.name}</span> },
            { label: "Type", render: (m) => m.type },
            { label: "Class / Dept", render: (m) => m.classOrDept },
            { label: "Borrowed", render: (m) => `${active.filter((i) => i.memberId === m.id).length} / ${POLICY[m.type].maxBooks}` },
            { label: "Status", render: (m) => <Badge tone={m.status === "Active" ? "green" : "red"}>{m.status}</Badge> },
          ]}
          onAdd={(m) => mem.add(m)}
          onUpdate={mem.update}
          onRemove={mem.remove}
        />
      )}

      {tab === "Categories" && (
        <CrudTab<BookCategory>
          title="Categories"
          addLabel="Add Category"
          items={cat.items}
          fields={[
            { key: "name", label: "Name", required: true },
            { key: "description", label: "Description", type: "textarea" },
          ]}
          defaults={{ name: "", description: "" }}
          searchKeys={["name", "description"]}
          columns={[
            { label: "Name", render: (c) => <span className="font-medium text-slate-900">{c.name}</span> },
            { label: "Description", render: (c) => c.description },
            { label: "Books", render: (c) => bk.items.filter((b) => b.category === c.name).length },
          ]}
          onAdd={(c) => cat.add(c)}
          onUpdate={cat.update}
          onRemove={(id) => {
            const c = cat.items.find((x) => x.id === id)
            if (c && bk.items.some((b) => b.category === c.name)) return window.alert("Is category mein books hain, pehle unhe move karein.")
            cat.remove(id)
          }}
        />
      )}

      {tab === "Reports" && <Reports lib={lib} />}
    </div>
  )
}

type Lib = ReturnType<typeof useLibrary>

function IssueReturn({ lib }: { lib: Lib }) {
  const [memberId, setMemberId] = useState("")
  const [bookId, setBookId] = useState("")
  const [scan, setScan] = useState("")
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [show, setShow] = useState<"Issued" | "Returned">("Issued")

  const onScan = (v: string) => {
    setScan(v)
    const hit = lib.bk.items.find((b) => b.barcode.toLowerCase() === v.trim().toLowerCase() || b.rfid.toLowerCase() === v.trim().toLowerCase())
    if (hit) setBookId(hit.id)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const r = lib.issueBook(bookId, memberId)
    setMsg({ ok: r.ok, text: r.message })
    if (r.ok) {
      setBookId("")
      setScan("")
    }
  }

  const rows = lib.iss.items.filter((i) => i.status === show)

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <Field label="Member">
            <select className={inputCls} value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
              <option value="">Select...</option>
              {lib.mem.items.map((m) => (
                <option key={m.id} value={m.id}>{m.name} ({m.code})</option>
              ))}
            </select>
          </Field>
          <Field label="Scan barcode / RFID">
            <input className={inputCls} value={scan} onChange={(e) => onScan(e.target.value)} placeholder="LIB-0001" />
          </Field>
          <Field label="Book">
            <select className={inputCls} value={bookId} onChange={(e) => setBookId(e.target.value)} required>
              <option value="">Select...</option>
              {lib.bk.items.map((b) => (
                <option key={b.id} value={b.id}>{b.title} ({lib.availableOf(b.id)} left)</option>
              ))}
            </select>
          </Field>
          <Button type="submit">
            <BookOpen size={16} /> Issue Book
          </Button>
        </form>
        {msg && (
          <p className={`mt-3 text-sm rounded-lg px-3 py-2 ${msg.ok ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600"}`}>{msg.text}</p>
        )}
        <p className="mt-3 text-xs text-slate-400">
          Rules: Student 3 books/14 din, Teacher 5 books/30 din, Staff 3 books/21 din. Fine Rs. {FINE_PER_DAY}/din. Max {MAX_RENEWALS} renewals.
        </p>
      </Card>

      <Tabs tabs={["Issued", "Returned"] as const} active={show} onChange={setShow} />
      <Card>
        <DataTable head={["Book", "Member", "Issued", "Due", show === "Returned" ? "Returned" : "Status", "Renewals", "Action"]} empty={rows.length === 0}>
          {rows.map((i) => {
            const late = i.status === "Issued" && i.dueDate < today()
            return (
              <tr key={i.id} className="hover:bg-slate-50">
                <td className={td + " font-medium text-slate-900"}>{lib.bookTitle(i.bookId)}</td>
                <td className={td}>{lib.memberName(i.memberId)}</td>
                <td className={td}>{i.issueDate}</td>
                <td className={td}>{i.dueDate}</td>
                <td className={td}>{show === "Returned" ? i.returnDate : <Badge tone={late ? "red" : "green"}>{late ? "Overdue" : "On time"}</Badge>}</td>
                <td className={td}>{i.renewals}</td>
                <td className={td}>
                  {i.status === "Issued" ? (
                    <div className="flex gap-2">
                      <Button onClick={() => lib.returnBook(i.id)}>
                        <Undo2 size={14} /> Return
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const r = lib.renewBook(i.id)
                          setMsg({ ok: r.ok, text: r.message })
                        }}
                      >
                        <RotateCcw size={14} /> Renew
                      </Button>
                    </div>
                  ) : i.fine > 0 ? (
                    <Badge tone={i.finePaid ? "green" : "red"}>{i.finePaid ? "Fine paid" : `Fine ${money(i.fine)}`}</Badge>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
              </tr>
            )
          })}
        </DataTable>
      </Card>
    </div>
  )
}

function Reports({ lib }: { lib: Lib }) {
  const popular = useMemo(() => {
    const count = new Map<string, number>()
    lib.iss.items.forEach((i) => count.set(i.bookId, (count.get(i.bookId) ?? 0) + 1))
    return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [lib.iss.items])

  const byCategory = lib.cat.items.map((c) => {
    const ids = lib.bk.items.filter((b) => b.category === c.name).map((b) => b.id)
    return { name: c.name, issues: lib.iss.items.filter((i) => ids.includes(i.bookId)).length }
  })
  const maxCat = Math.max(1, ...byCategory.map((c) => c.issues))
  const collected = lib.iss.items.filter((i) => i.finePaid && i.fine > 0).reduce((s, i) => s + i.fine, 0)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total transactions" value={lib.iss.items.length} />
        <Stat label="Fine collected" value={money(collected)} tone="teal" />
        <Stat label="Lost / damaged copies" value={lib.bk.items.reduce((s, b) => s + b.lost, 0)} tone="red" />
        <Stat label="Inventory value" value={money(lib.bk.items.reduce((s, b) => s + b.price * b.copies, 0))} tone="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">Most issued books</div>
          <DataTable head={["Book", "Times issued"]} empty={popular.length === 0}>
            {popular.map(([id, n]) => (
              <tr key={id}>
                <td className={td}>{lib.bookTitle(id)}</td>
                <td className={td}>{n}</td>
              </tr>
            ))}
          </DataTable>
        </Card>

        <Card className="p-5">
          <p className="font-semibold text-slate-900 mb-4">Usage by category</p>
          <div className="space-y-3">
            {byCategory.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>{c.name}</span>
                  <span>{c.issues}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(c.issues / maxCat) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">Inventory & availability</div>
        <DataTable head={["Book", "Category", "Shelf", "Total", "Issued", "Available", "Lost"]} empty={lib.bk.items.length === 0}>
          {lib.bk.items.map((b) => (
            <tr key={b.id}>
              <td className={td + " font-medium text-slate-900"}>{b.title}</td>
              <td className={td}>{b.category}</td>
              <td className={td}>{b.shelf}</td>
              <td className={td}>{b.copies}</td>
              <td className={td}>{lib.active.filter((i) => i.bookId === b.id).length}</td>
              <td className={td}>{lib.availableOf(b.id)}</td>
              <td className={td}>{b.lost}</td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </div>
  )
}