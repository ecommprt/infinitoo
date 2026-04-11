import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Clock, CalendarDays, DollarSign, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const EVENT_ID = 'a1b2c3d4-0000-0000-0000-000000000001'

// Tipo mínimo — só colunas que usamos
interface EventRow {
  id: string
  name: string
  client: string
  start_date: string
  end_date: string
}

interface DayRow {
  id: string
  label: string
  day_of_week: string
  tm_tasks: { id: string; status: string }[]
}

export default function Dashboard() {
  // ── Evento ────────────────────────────────────────────────────
  const { data: event, isLoading: loadingEvent, error: eventError } = useQuery({
    queryKey: ['event', EVENT_ID],
    queryFn: async (): Promise<EventRow | null> => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('id, name, client, start_date, end_date')
          .eq('id', EVENT_ID)
          .maybeSingle()   // nunca lança PGRST116

        if (error) {
          console.error('[Wilco] Erro ao buscar evento:', error.message, error.details ?? '')
          return null
        }
        return data
      } catch (err) {
        console.error('[Wilco] Falha inesperada em /events:', err)
        return null
      }
    }
  })

  // ── Dias do TM com contagem de tarefas ────────────────────────
  const { data: days, isLoading: loadingDays } = useQuery({
    queryKey: ['tm_days', EVENT_ID],
    queryFn: async (): Promise<DayRow[]> => {
      try {
        const { data, error } = await supabase
          .from('tm_days')
          .select('id, label, day_of_week, tm_tasks(id, status)')
          .eq('event_id', EVENT_ID)
          .order('date')

        if (error) {
          console.error('[Wilco] Erro ao buscar dias TM:', error.message, error.details ?? '')
          return []
        }
        return (data ?? []) as DayRow[]
      } catch (err) {
        console.error('[Wilco] Falha inesperada em /tm_days:', err)
        return []
      }
    }
  })

  // ── Stats do cronograma ───────────────────────────────────────
  const { data: scheduleStats } = useQuery({
    queryKey: ['schedule_stats', EVENT_ID],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('schedule_tasks')
          .select('pct_complete')
          .eq('event_id', EVENT_ID)

        if (error) {
          console.error('[Wilco] Erro ao buscar cronograma:', error.message, error.details ?? '')
          return []
        }
        return data ?? []
      } catch (err) {
        console.error('[Wilco] Falha inesperada em /schedule_tasks:', err)
        return []
      }
    }
  })

  // ── Stats do budget ───────────────────────────────────────────
  const { data: budgetStats } = useQuery({
    queryKey: ['budget_stats', EVENT_ID],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('budget_items')
          .select('estimated, confirmed')
          .eq('event_id', EVENT_ID)

        if (error) {
          console.error('[Wilco] Erro ao buscar budget:', error.message, error.details ?? '')
          return []
        }
        return data ?? []
      } catch (err) {
        console.error('[Wilco] Falha inesperada em /budget_items:', err)
        return []
      }
    }
  })

  // ── Cálculos ─────────────────────────────────────────────────
  const allTasks = days?.flatMap(d => d.tm_tasks ?? []) ?? []
  const wilcoCount = allTasks.filter(t => t.status === 'wilco').length
  const scheduleTotal = scheduleStats?.length ?? 0
  const scheduleDone = scheduleStats?.filter(t => t.pct_complete === 100).length ?? 0
  const budgetEstimated = budgetStats?.reduce((s, i) => s + Number(i.estimated), 0) ?? 0
  const budgetConfirmed = budgetStats?.reduce((s, i) => s + Number(i.confirmed), 0) ?? 0

  const fmtDate = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('pt-BR')

  const fmtCurrency = (n: number) =>
    n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  // ── Loading global ────────────────────────────────────────────
  if (loadingEvent || loadingDays) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Loader2 className="animate-spin text-wilco-orange" size={36} />
        <p className="text-wilco-gray50 text-sm">Carregando evento...</p>
      </div>
    )
  }

  // ── Evento não encontrado (null) ──────────────────────────────
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-wilco-gray20 text-lg font-semibold">Nenhum evento encontrado</p>
        <p className="text-wilco-gray50 text-sm max-w-sm text-center">
          Verifique se o banco de dados foi populado corretamente e se as
          variáveis de ambiente estão configuradas no Vercel.
        </p>
        {eventError && (
          <p className="text-red-400 text-xs font-mono bg-wilco-gray90 px-3 py-2 rounded">
            {String(eventError)}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-wilco-gray50 text-xs font-semibold tracking-widest uppercase mb-1">
          Wilco
        </p>
        <h1 className="text-3xl font-bold text-white">{event.name}</h1>
        <p className="text-wilco-gray50 mt-1">
          Cliente: <span className="text-wilco-gray20">{event.client}</span>
          {' · '}
          <span className="text-wilco-gray20">
            {fmtDate(event.start_date)} → {fmtDate(event.end_date)}
          </span>
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">
            TM — Confirmados
          </p>
          <p className="text-2xl font-bold text-white">
            {wilcoCount}
            <span className="text-wilco-gray50 text-sm font-normal">/{allTasks.length}</span>
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">tarefas com Wilco</p>
        </div>

        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">
            Cronograma
          </p>
          <p className="text-2xl font-bold text-white">
            {scheduleDone}
            <span className="text-wilco-gray50 text-sm font-normal">/{scheduleTotal}</span>
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">tarefas concluídas</p>
        </div>

        <div className="card p-4">
          <p className="text-wilco-gray50 text-xs uppercase tracking-wider mb-1">
            Budget confirmado
          </p>
          <p className="text-2xl font-bold text-wilco-orange">
            {fmtCurrency(budgetConfirmed)}
          </p>
          <p className="text-wilco-gray50 text-xs mt-1">
            de {fmtCurrency(budgetEstimated)} previsto
          </p>
        </div>
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { to: `/tm/${EVENT_ID}`,          Icon: Clock,        label: 'TM do Evento',  desc: 'Tempos e Movimentos por dia. Cada confirmação é um Wilco.' },
          { to: `/cronograma/${EVENT_ID}`,   Icon: CalendarDays, label: 'Cronograma',    desc: 'Pré-produção completa. Tarefas por categoria e responsável.' },
          { to: `/budget/${EVENT_ID}`,       Icon: DollarSign,   label: 'Budget',        desc: 'Orçamento, fornecedores e controle de pagamentos.' },
        ].map(({ to, Icon, label, desc }) => (
          <Link key={to} to={to}
            className="card p-5 hover:border-wilco-orange transition-colors group">
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
            {days.map(day => {
              const tasks = day.tm_tasks ?? []
              const wilco = tasks.filter(t => t.status === 'wilco').length
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
                    <span className="text-wilco-gray50 text-xs w-10 text-right">
                      {wilco}/{total}
                    </span>
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
