import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Clock, CalendarDays, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const EVENT_ID = 'a1b2c3d4-0000-0000-0000-000000000001'

export default function Dashboard() {
  const { data: event, isLoading } = useQuery({
    queryKey: ['event', EVENT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events').select('*').eq('id', EVENT_ID).single()
      if (error) throw error
      return data
    }
  })

  const { data: days } = useQuery({
    queryKey: ['tm_days', EVENT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tm_days')
        .select('*, tm_tasks(id, status)')
        .eq('event_id', EVENT_ID)
        .order('date')
      if (error) throw error
      return data
    }
  })

  const { data: scheduleStats } = useQuery({
    queryKey: ['schedule_stats', EVENT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule_tasks').select('pct_complete').eq('event_id', EVENT_ID)
      if (error) throw error
      return data
    }
  })

  const { data: budgetStats } = useQuery({
    queryKey: ['budget_stats', EVENT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items').select('estimated, confirmed').eq('event_id', EVENT_ID)
      if (error) throw error
      return data
    }
  })

  const scheduleTotal = scheduleStats?.length ?? 0
  const scheduleDone = scheduleStats?.filter(t => t.pct_complete === 100).length ?? 0
  const budgetEstimated = budgetStats?.reduce((s, i) => s + Number(i.estimated), 0) ?? 0
  const budgetConfirmed = budgetStats?.reduce((s, i) => s + Number(i.confirmed), 0) ?? 0
  const allTasks = days?.flatMap((d: any) => d.tm_tasks ?? []) ?? []
  const wilcoCount = allTasks.filter((t: any) => t.status === 'wilco').length

  if (isLoading) return (
    <div className="flex items-center justify-center h-full py-32">
      <div className="text-wilco-gray50">Carregando...</div>
    </div>
  )

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-wilco-gray50 text-xs font-semibold tracking-widest uppercase mb-1">Wilco</p>
        <h1 className="text-3xl font-bold text-white">{event?.name}</h1>
        <p className="text-wilco-gray50 mt-1">
          Cliente: <span className="text-wilco-gray20">{event?.client}</span>
          {' · '}
          <span className="text-wilco-gray20">
            {event?.start_date && new Date(event.start_date + 'T12:00:00').toLocaleDateString('pt-BR')}
            {' → '}
            {event?.end_date && new Date(event.end_date + 'T12:00:00').toLocaleDateString('pt-BR')}
          </span>
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">TM — Confirmados</p>
          <p className="text-2xl font-bold text-white">
            {wilcoCount}<span className="text-wilco-gray50 text-sm font-normal">/{allTasks.length}</span>
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">tarefas com Wilco</p>
        </div>
        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">Cronograma</p>
          <p className="text-2xl font-bold text-white">
            {scheduleDone}<span className="text-wilco-gray50 text-sm font-normal">/{scheduleTotal}</span>
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">tarefas concluídas</p>
        </div>
        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">Budget confirmado</p>
          <p className="text-2xl font-bold text-wilco-orange">
            {budgetConfirmed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">
            de {budgetEstimated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} previsto
          </p>
        </div>
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { to: `/tm/${EVENT_ID}`, Icon: Clock, label: 'TM do Evento', desc: 'Tempos e Movimentos por dia. Cada confirmação é um Wilco.' },
          { to: `/cronograma/${EVENT_ID}`, Icon: CalendarDays, label: 'Cronograma', desc: 'Pré-produção completa. Tarefas por categoria e responsável.' },
          { to: `/budget/${EVENT_ID}`, Icon: DollarSign, label: 'Budget', desc: 'Orçamento, fornecedores e controle de pagamentos.' },
        ].map(({ to, Icon, label, desc }) => (
          <Link key={to} to={to} className="card p-5 hover:border-wilco-orange transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-wilco-orange/10 flex items-center justify-center group-hover:bg-wilco-orange/20 transition-colors">
                <Icon size={18} className="text-wilco-orange" />
              </div>
              <span className="text-white font-semibold">{label}</span>
            </div>
            <p className="text-wilco-gray50 text-sm">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Dias do TM */}
      {days && days.length > 0 && (
        <div>
          <h2 className="text-wilco-gray50 text-xs font-semibold tracking-widest uppercase mb-3">
            Dias do Evento
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {days.map((day: any) => {
              const tasks = day.tm_tasks ?? []
              const wilco = tasks.filter((t: any) => t.status === 'wilco').length
              const total = tasks.length
              const pct = total > 0 ? Math.round((wilco / total) * 100) : 0
              return (
                <Link key={day.id} to={`/tm/${EVENT_ID}/${day.id}`}
                  className="card p-4 hover:border-wilco-orange transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-semibold text-sm">{day.label}</span>
                    <span className="text-wilco-gray50 text-xs">{day.day_of_week}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-wilco-gray70 rounded-full h-1.5">
                      <div className="bg-wilco-orange h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-wilco-gray50 text-xs w-10 text-right">{wilco}/{total}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
