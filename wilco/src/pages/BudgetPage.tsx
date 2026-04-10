import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { supabase } from '@/lib/supabase'
import type { BudgetItem, Payment } from '@/types/database'

const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function BudgetPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const [filterCat, setFilterCat] = useState<string | null>(null)

  const { data: items, isLoading } = useQuery({
    queryKey: ['budget', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select('*, payments(*)')
        .eq('event_id', eventId!)
        .order('category')
      if (error) throw error
      return data as (BudgetItem & { payments: Payment[] })[]
    },
    enabled: !!eventId
  })

  const categories = [...new Set(items?.map(i => i.category) ?? [])]
  const filtered = items?.filter(i => !filterCat || i.category === filterCat) ?? []

  const totalEstimated = items?.reduce((s, i) => s + Number(i.estimated), 0) ?? 0
  const totalConfirmed = items?.reduce((s, i) => s + Number(i.confirmed), 0) ?? 0
  const totalPaid = items?.flatMap(i => i.payments)
    .filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0) ?? 0
  const totalLate = items?.flatMap(i => i.payments)
    .filter(p => p.status === 'late').reduce((s, p) => s + Number(p.amount), 0) ?? 0

  const grouped = categories
    .filter(cat => !filterCat || cat === filterCat)
    .map(cat => ({ cat, items: filtered.filter(i => i.category === cat) }))

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Budget</h1>
        <p className="text-wilco-gray50 text-sm mt-1">Orçamento, fornecedores e pagamentos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Previsto',    value: totalEstimated, color: 'text-white' },
          { label: 'Confirmado',  value: totalConfirmed, color: 'text-wilco-orange' },
          { label: 'Pago',        value: totalPaid,      color: 'text-green-400' },
          { label: 'Em Atraso',   value: totalLate,      color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4">
            <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">{label}</p>
            <p className={clsx('text-xl font-bold', color)}>{fmt(value)}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setFilterCat(null)}
          className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            !filterCat ? 'bg-wilco-orange text-white' : 'bg-wilco-gray90 text-wilco-gray20 hover:text-white')}>
          Todas
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCat(filterCat === cat ? null : cat)}
            className={clsx('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              filterCat === cat ? 'bg-wilco-orange text-white' : 'bg-wilco-gray90 text-wilco-gray20 hover:text-white')}>
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-wilco-gray50">Carregando...</div>
      ) : (
        <div className="space-y-4">
          {grouped.map(({ cat, items }) => {
            const catTotal = items.reduce((s, i) => s + Number(i.estimated), 0)
            const catConfirmed = items.reduce((s, i) => s + Number(i.confirmed), 0)
            return (
              <div key={cat} className="card overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-wilco-gray70/30 border-b border-wilco-gray70">
                  <span className="font-semibold text-white text-sm">{cat}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-wilco-gray50">Previsto: <span className="text-white">{fmt(catTotal)}</span></span>
                    <span className="text-wilco-gray50">Confirmado: <span className="text-wilco-orange">{fmt(catConfirmed)}</span></span>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-wilco-gray50 text-xs uppercase tracking-wider border-b border-wilco-gray70/50">
                      <th className="text-left px-4 py-2">Item / Fornecedor</th>
                      <th className="text-left px-4 py-2">Resp.</th>
                      <th className="text-right px-4 py-2">Qtd</th>
                      <th className="text-right px-4 py-2">Previsto</th>
                      <th className="text-right px-4 py-2">Confirmado</th>
                      <th className="text-left px-4 py-2">Pgtos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b border-wilco-gray70/30 hover:bg-wilco-gray90/30">
                        <td className="px-4 py-2.5">
                          <div className="text-white text-sm">{item.item}</div>
                          {item.supplier && <div className="text-wilco-gray50 text-xs">{item.supplier}</div>}
                        </td>
                        <td className="px-4 py-2.5 text-wilco-gray50 text-xs">{item.responsible ?? '—'}</td>
                        <td className="px-4 py-2.5 text-right text-wilco-gray20 text-xs">{item.qty}</td>
                        <td className="px-4 py-2.5 text-right text-white text-xs font-medium">{fmt(Number(item.estimated))}</td>
                        <td className="px-4 py-2.5 text-right text-wilco-orange text-xs font-medium">{fmt(Number(item.confirmed))}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex gap-1">
                            {item.payments.map(p => (
                              <span key={p.id} className={clsx('text-xs px-1.5 py-0.5 rounded border',
                                p.status === 'paid'    ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                p.status === 'late'    ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                'bg-wilco-gray70/50 text-wilco-gray20 border-wilco-gray70')}>
                                {p.installment_num}ª
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
          {grouped.length === 0 && (
            <div className="text-center py-12 text-wilco-gray50">Nenhum item encontrado.</div>
          )}
        </div>
      )}
    </div>
  )
}
