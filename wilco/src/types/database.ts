export type TaskStatus = 'pending' | 'in_progress' | 'wilco'
export type UserRole = 'admin' | 'client' | 'supplier'
export type PaymentStatus = 'pending' | 'paid' | 'late'

export interface Event {
  id: string
  name: string
  client: string
  start_date: string
  end_date: string
  status: string
  org_id: string
  created_at: string
}

export interface TmDay {
  id: string
  event_id: string
  date: string
  label: string
  day_of_week: string
}

export interface TmTask {
  id: string
  day_id: string
  time: string | null
  activity: string
  assignee: string | null
  status: TaskStatus
  obs: string | null
  completed_at: string | null
  completed_by: string | null
  created_at: string
}

export interface BudgetItem {
  id: string
  event_id: string
  category: string
  item: string
  supplier: string | null
  responsible: string | null
  qty: number
  unit_price: number
  estimated: number
  confirmed: number
  contract_url: string | null
}

export interface Payment {
  id: string
  budget_item_id: string
  installment_num: number
  due_date: string | null
  amount: number
  status: PaymentStatus
  payment_method: string | null
}

export interface ScheduleTask {
  id: string
  event_id: string
  category: string
  title: string
  assignee: string | null
  start_date: string
  end_date: string
  pct_complete: number
  status: string
}
