import { useParams, Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Circle, Loader2, Radio } from 'lucide-react'
import clsx from 'clsx'
import { supabase } from '@/lib/supabase'
import type { TmDay, TmTask, TaskStatus } from '@/types/database'

export default function TmPage() {
  const { eventId, dayId } = useParams<{ eventId: string; dayId?: string }>()
  const qc = useQueryClient()

  const { data: days, isLoading: loadingDays } = useQuery({
    queryKey: ['tm_days', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tm_days').select('*').eq('event_id', eventId!).order('date')
      if (error) throw error
      return data as TmDay[]
    },
    enabled: !!eventId
  })

  // Se não tem dayId na URL, redireciona para o primeiro dia
  if (!loadingDays && days && days.length > 0 && !dayId) {
    return <Navigate to={`/tm/${eventId}/${days[0].id}`} replace />
  }

  const selectedDay = days?.find(d => d.id === dayId)

  const { data: tasks, isLoading: loadingTasks } = useQuery({
    queryKey: ['tm_tasks', dayId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tm_tasks').select('*').eq('day_id', dayId!).order('created_at')
      if (error) throw error
      return data as TmTask[]
    },
    enabled: !!dayId
  })

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const patch: any = { status }
      if (status === 'wilco') {
        patch.completed_at = new Date().toISOString()
        patch.completed_by = 'Usuário'
      } else {
        patch.completed_at = null
        patch.completed_by = null
      }
      const { error } = await supabase.from('tm_tasks').update(patch).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tm_tasks', dayId] })
      qc.invalidateQueries({ queryKey: ['tm_days', eventId] })
    }
  })

  const nextStatus = (current: TaskStatus): TaskStatus => {
    if (current === 'pending') return 'in_progress'
    if (current === 'in_progress') return 'wilco'
    return 'pending'
  }

  const grouped = groupByTime(tasks ?? [])
  const total = tasks?.length ?? 0
  const wilcoCount = tasks?.filter(t => t.status === 'wilco').length ?? 0
  const inProgressCount = tasks?.filter(t => t.status === 'in_progress').length ?? 0
  const pct = total > 0 ? Math.round((wilcoCount / total) * 100) : 0

  return (
    <div className="flex h-full">
      {/* Sidebar de dias */}
      <div className="w-44 flex-shrink-0 bg-wilco-gray90 border-r border-wilco-gray70 py-4">
        <p className="text-wilco-gray50 text-xs font-semibold tracking-widest uppercase px-4 mb-3">Dias</p>
        {loadingDays ? (
          <div className="px-4 text-wilco-gray50 text-sm">Carregando...</div>
        ) : (
          days?.map(day => (
            <Link key={day.id} to={`/tm/${eventId}/${day.id}`}
              className={clsx(
                'block px-4 py-3 text-sm border-l-2 transition-colors',
                selectedDay?.id === day.id
                  ? 'border-wilco-orange text-white bg-wilco-orange/5 font-semibold'
                  : 'border-transparent text-wilco-gray50 hover:text-wilco-gray20 hover:border-wilco-gray70'
              )}>
              <div className="font-medium">{day.label}</div>
              <div className="text-xs text-wilco-gray50 mt-0.5">{day.day_of_week}</div>
            </Link>
          ))
        )}
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto">
        {/* Header fixo */}
        <div className="sticky top-0 z-10 bg-wilco-black/95 backdrop-blur border-b border-wilco-gray70 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{selectedDay?.label ?? '—'}</h1>
              <p className="text-wilco-gray50 text-sm">{selectedDay?.day_of_week}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{pct}%</div>
                <div className="text-wilco-gray50 text-xs">Wilco</div>
              </div>
              <div className="text-xs text-wilco-gray50 space-y-0.5">
                <div>{wilcoCount} confirmados</div>
                <div>{inProgressCount} em andamento</div>
                <div>{total - wilcoCount - inProgressCount} pendentes</div>
              </div>
              <div className="w-28">
                <div className="bg-wilco-gray70 rounded-full h-2">
                  <div className="bg-wilco-orange h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }} />
                </div>
                <p className="text-wilco-gray50 text-xs mt-1 text-right">{wilcoCount}/{total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de tarefas */}
        <div className="p-6">
          {loadingTasks ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-wilco-orange" size={32} />
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-20 text-wilco-gray50">
              Nenhuma tarefa para este dia.
            </div>
          ) : (
            <div className="space-y-6">
              {grouped.map(({ time, tasks: timeTasks }) => (
                <div key={time}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-wilco-orange font-bold text-sm w-14 flex-shrink-0">{time}</span>
                    <div className="flex-1 h-px bg-wilco-gray70" />
                  </div>
                  <div className="space-y-2 ml-4">
                    {timeTasks.map(task => (
                      <TaskRow key={task.id} task={task}
                        onToggle={() => updateStatus.mutate({ id: task.id, status: nextStatus(task.status) })}
                        isLoading={updateStatus.isPending} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TaskRow({ task, onToggle, isLoading }: {
  task: TmTask; onToggle: () => void; isLoading: boolean
}) {
  return (
    <div className={clsx(
      'flex items-start gap-3 p-3 rounded-lg border transition-all',
      task.status === 'wilco'      ? 'border-wilco-orange/30 bg-wilco-orange/5'
      : task.status === 'in_progress' ? 'border-yellow-500/30 bg-yellow-500/5'
      : 'border-wilco-gray70 bg-wilco-gray90'
    )}>
      <button onClick={onToggle} disabled={isLoading}
        className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110 active:scale-95">
        {task.status === 'wilco'
          ? <CheckCircle2 size={20} className="text-wilco-orange" />
          : task.status === 'in_progress'
          ? <Loader2 size={20} className="text-yellow-400 animate-spin" />
          : <Circle size={20} className="text-wilco-gray50 hover:text-wilco-gray20" />
        }
      </button>

      <div className="flex-1 min-w-0">
        <p className={clsx('text-sm', task.status === 'wilco' ? 'text-wilco-gray50 line-through' : 'text-white')}>
          {task.activity}
        </p>
        {task.obs && <p className="text-wilco-gray50 text-xs mt-1">{task.obs}</p>}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {task.assignee && (
          <span className="text-wilco-gray50 text-xs bg-wilco-gray70 px-2 py-0.5 rounded">
            {task.assignee}
          </span>
        )}
        {task.status === 'wilco' && (
          <span className="badge-wilco flex items-center gap-1">
            <Radio size={10} /> Wilco
          </span>
        )}
        {task.status === 'in_progress' && (
          <span className="badge-progress">Em andamento</span>
        )}
      </div>
    </div>
  )
}

function groupByTime(tasks: TmTask[]): { time: string; tasks: TmTask[] }[] {
  const map = new Map<string, TmTask[]>()
  let current = '—'
  for (const task of tasks) {
    if (task.time) current = task.time
    if (!map.has(current)) map.set(current, [])
    map.get(current)!.push(task)
  }
  return Array.from(map.entries()).map(([time, tasks]) => ({ time, tasks }))
}
