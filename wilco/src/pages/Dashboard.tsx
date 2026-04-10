import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Clock, CalendarDays, DollarSign, CheckCircle2, AlertCircle, Circle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*').order('start_date')
      if (error) throw error
      return data
    }
  })

  const event = events?.[0]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-wilco-gray50 text-sm font-medium tracking-widest uppercase mb-1">Wilco</p>
        <h1 className="text-3xl font-bold text-white">
          {event?.name ?? 'Carregando...'}
        </h1>
        {event && (
          <p className="text-wilco-gray50 mt-1">
            Cliente: <span className="text-wilco-gray20">{event.client}</span>
            {' · '}
            <span className="text-wilco-gray20">
              {new Date(event.start_date).toLocaleDateString('pt-BR')} →{' '}
              {new Date(event.end_date).toLocaleDateString('pt-BR')}
            </span>
          </p>
        )}
      </div>

      {event && (
        <>
          {/* Quick access cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Link to={`/tm/${event.id}`} className="card p-5 hover:border-wilco-orange transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-wilco-orange/10 flex items-center justify-center group-hover:bg-wilco-orange/20 transition-colors">
                  <Clock size={18} className="text-wilco-orange" />
                </div>
                <span className="text-white font-semibold">TM do Evento</span>
              </div>
              <p className="text-wilco-gray50 text-sm">Tempos e Movimentos por dia. Cada tarefa confirmada é um Wilco.</p>
            </Link>

            <Link to={`/cronograma/${event.id}`} className="card p-5 hover:border-wilco-orange transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-wilco-orange/10 flex items-center justify-center group-hover:bg-wilco-orange/20 transition-colors">
                  <CalendarDays size={18} className="text-wilco-orange" />
                </div>
                <span className="text-white font-semibold">Cronograma</span>
              </div>
              <p className="text-wilco-gray50 text-sm">Pré-produção completa. Tarefas por categoria e responsável.</p>
            </Link>

            <Link to={`/budget/${event.id}`} className="card p-5 hover:border-wilco-orange transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-wilco-orange/10 flex items-center justify-center group-hover:bg-wilco-orange/20 transition-colors">
                  <DollarSign size={18} className="text-wilco-orange" />
                </div>
                <span className="text-white font-semibold">Budget</span>
              </div>
              <p className="text-wilco-gray50 text-sm">Orçamento, fornecedores e controle de pagamentos.</p>
            </Link>
          </div>

          {/* TM days quick nav */}
          <TmDaysPanel eventId={event.id} />
        </>
      )}
    </div>
  )
}

function TmDaysPanel({ eventId }: { eventId: string }) {
  const { data: days } = useQuery({
    queryKey: ['tm_days', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tm_days')
        .select('*, tm_tasks(id, status)')
        .eq('event_id', eventId)
        .order('date')
      if (error) throw error
      return data
    }
  })

  if (!days?.length) return null

  return (
    <div>
      <h2 className="text-wilco-gray50 text-xs font-semibold tracking-widest uppercase mb-3">Dias do Evento</h2>
      <div className="grid grid-cols-3 gap-3">
        {days.map((day: any) => {
          const tasks = day.tm_tasks ?? []
          const wilco = tasks.filter((t: any) => t.status === 'wilco').length
          const total = tasks.length
          const pct = total > 0 ? Math.round((wilco / total) * 100) : 0

          return (
            <Link key={day.id} to={`/tm/${eventId}/${day.id}`}
              className="card p-4 hover:border-wilco-orange transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">{day.label}</span>
                <span className="text-wilco-gray50 text-xs">{day.day_of_week}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-wilco-gray70 rounded-full h-1.5">
                  <div
                    className="bg-wilco-orange h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-wilco-gray50 text-xs">{wilco}/{total}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
