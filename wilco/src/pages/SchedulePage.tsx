import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import clsx from 'clsx'
import { supabase } from '@/lib/supabase'
import type { ScheduleTask } from '@/types/database'

const CAT_COLORS: Record<string, string> = {
  'Tendas':       'bg-blue-500',
  'Cenografia':   'bg-purple-500',
  'Iluminação':   'bg-yellow-500',
  'Som':          'bg-green-500',
  'Bandas':       'bg-pink-500',
  'Cozinha':      'bg-orange-400',
  'Camarim':      'bg-teal-500',
  'Figurino':     'bg-rose-500',
  'Equipe':       'bg-indigo-500',
  'Restaurantes': 'bg-amber-500',
  'Elétrica':     'bg-cyan-500',
  'Extras':       'bg-gray-400',
}

export default function SchedulePage() {
  const { eventId } = useParams<{ eventId: string }>()
  const qc = useQueryClient()
  const [filterCat, setFilterCat] = useState<string | null>(null)

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['schedule', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule_tasks').select('*').eq('event_id', eventId!).order('start_date')
      if (error) throw error
      return data as ScheduleTask[]
    },
    enabled: !!eventId
  })

  const updatePct = useMutation({
    mutationFn: async ({ id, pct }: { id: string; pct: number }) => {
      const { error } = await supabase
        .from('schedule_tasks').update({ pct_complete: pct }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['schedule', eventId] })
  })

  const categories = [...new Set(tasks?.map(t => t.category) ?? [])]
  const filtered = tasks?.filter(t => !filterCat || t.category === filterCat) ?? []
  const total = filtered.length
  const done = filtered.filter(t => t.pct_complete === 100).length
  const late = filtered.filter(t => new Date(t.end_date) < new Date() && t.pct_complete < 100).length

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Cronograma de Pré-Produção</h1>
        <p className="text-wilco-gray50 text-sm mt-1">
          {total} tarefas · {done} concluídas · <span className="text-red-400">{late} em atraso</span>
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
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
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-wilco-gray70 text-wilco-gray50 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Tarefa</th>
                <th className="text-left px-4 py-3">Categoria</th>
                <th className="text-left px-4 py-3">Responsável</th>
                <th className="text-left px-4 py-3">Início</th>
                <th className="text-left px-4 py-3">Fim</th>
                <th className="text-left px-4 py-3 w-36">Progresso</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task, i) => {
                const isLate = new Date(task.end_date) < new Date() && task.pct_complete < 100
                const isDone = task.pct_complete === 100
                return (
                  <tr key={task.id}
                    className={clsx('border-b border-wilco-gray70/40 hover:bg-wilco-gray90/40 transition-colors',
                      i % 2 === 0 ? '' : 'bg-wilco-gray90/20')}>
                    <td className="px-4 py-3">
                      <span className={clsx('text-sm', isDone ? 'text-wilco-gray50 line-through' : 'text-white')}>
                        {task.title}
                      </span>
                      {isLate && <span className="ml-2 text-xs text-red-400 font-medium">ATRASADO</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx('text-xs px-2 py-0.5 rounded text-white',
                        CAT_COLORS[task.category] ?? 'bg-wilco-gray70')}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-wilco-gray20 text-xs">{task.assignee ?? '—'}</td>
                    <td className="px-4 py-3 text-wilco-gray50 text-xs">
                      {format(parseISO(task.start_date), 'dd/MM', { locale: ptBR })}
                    </td>
                    <td className={clsx('px-4 py-3 text-xs', isLate ? 'text-red-400' : 'text-wilco-gray50')}>
                      {format(parseISO(task.end_date), 'dd/MM', { locale: ptBR })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input type="range" min={0} max={100} step={10}
                          value={task.pct_complete}
                          onChange={e => updatePct.mutate({ id: task.id, pct: Number(e.target.value) })}
                          className="flex-1 accent-wilco-orange h-1.5 cursor-pointer" />
                        <span className="text-wilco-gray50 text-xs w-8 text-right">{task.pct_complete}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-wilco-gray50">Nenhuma tarefa encontrada.</div>
          )}
        </div>
      )}
    </div>
  )
}
