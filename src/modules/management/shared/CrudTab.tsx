import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { Badge, Button, Card, DataTable, Field, Modal, inputCls, td } from "./ui"

export type FieldDef<T> = {
  key: keyof T & string
  label: string
  type?: "text" | "number" | "date" | "email" | "select" | "textarea"
  options?: readonly string[]
  required?: boolean
  placeholder?: string
  full?: boolean
}

export type ColumnDef<T> = {
  label: string
  render: (row: T) => ReactNode
}

type Props<T extends { id: string }> = {
  title: string
  items: T[]
  fields: FieldDef<T>[]
  columns: ColumnDef<T>[]
  defaults: Omit<T, "id">
  searchKeys: (keyof T & string)[]
  filter?: { key: keyof T & string; options: readonly string[]; label: string }
  onAdd: (item: Omit<T, "id">) => void
  onUpdate: (id: string, patch: Partial<T>) => void
  onRemove?: (id: string) => void
  rowActions?: (row: T) => ReactNode
  toolbarExtra?: ReactNode
  addLabel?: string
  canEdit?: boolean
}

/** Har module ke liye reusable table + search + filter + add/edit/delete form. */
export function CrudTab<T extends { id: string }>({
  title,
  items,
  fields,
  columns,
  defaults,
  searchKeys,
  filter,
  onAdd,
  onUpdate,
  onRemove,
  rowActions,
  toolbarExtra,
  addLabel = "Add New",
  canEdit = true,
}: Props<T>) {
  const [query, setQuery] = useState("")
  const [filterValue, setFilterValue] = useState("All")
  const [editing, setEditing] = useState<T | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<Record<string, unknown>>({})
  const [confirm, setConfirm] = useState<T | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((row) => {
      const text = searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
      const f = !filter || filterValue === "All" || String(row[filter.key]) === filterValue
      return text && f
    })
  }, [items, query, filterValue, searchKeys, filter])

  const openCreate = () => {
    setForm({ ...(defaults as Record<string, unknown>) })
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (row: T) => {
    setForm({ ...(row as Record<string, unknown>) })
    setEditing(row)
    setCreating(true)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean: Record<string, unknown> = { ...form }
    for (const f of fields) {
      if (f.type === "number") clean[f.key] = Number(clean[f.key] ?? 0)
    }
    if (editing) onUpdate(editing.id, clean as Partial<T>)
    else onAdd(clean as Omit<T, "id">)
    setCreating(false)
  }

  return (
    <Card>
      <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          {filter && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              aria-label={filter.label}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none"
            >
              <option value="All">All {filter.label}</option>
              {filter.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
          {toolbarExtra}
        </div>
        {canEdit && (
          <Button onClick={openCreate}>
            <Plus size={16} /> {addLabel}
          </Button>
        )}
      </div>

      <DataTable head={[...columns.map((c) => c.label), "Actions"]} empty={rows.length === 0}>
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50">
            {columns.map((c) => (
              <td key={c.label} className={td}>
                {c.render(row)}
              </td>
            ))}
            <td className={td}>
              <div className="flex items-center gap-1">
                {rowActions?.(row)}
                {canEdit && (
                  <button onClick={() => openEdit(row)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                )}
                {canEdit && onRemove && (
                  <button onClick={() => setConfirm(row)} className="p-2 rounded-lg text-red-500 hover:bg-red-50" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
        Showing {rows.length} of {items.length}
      </div>

      {creating && (
        <Modal title={`${editing ? "Edit" : "Add"} ${title}`} onClose={() => setCreating(false)} wide>
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fields.map((f) => (
                <div key={f.key} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <Field label={f.label + (f.required ? " *" : "")}>
                    {f.type === "select" ? (
                      <select
                        className={inputCls}
                        required={f.required}
                        value={String(form[f.key] ?? "")}
                        onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      >
                        <option value="">Select...</option>
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        className={inputCls}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={String(form[f.key] ?? "")}
                        onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        className={inputCls}
                        type={f.type ?? "text"}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={String(form[f.key] ?? "")}
                        onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Modal>
      )}

      {confirm && (
        <Modal title="Delete record?" onClose={() => setConfirm(null)}>
          <p className="text-sm text-slate-600">
            Ye record hamesha ke liye hat jayega. <Badge tone="red">Undo nahi hoga</Badge>
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onRemove?.(confirm.id)
                setConfirm(null)
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </Card>
  )
}