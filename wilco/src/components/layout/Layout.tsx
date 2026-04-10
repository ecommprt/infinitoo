import { Outlet, NavLink, useParams } from 'react-router-dom'
import { LayoutDashboard, Clock, CalendarDays, DollarSign, Radio } from 'lucide-react'
import clsx from 'clsx'

const EVENT_ID = 'a1b2c3d4-0000-0000-0000-000000000001'

const navItems = [
  { label: 'Dashboard',   icon: LayoutDashboard, to: '/dashboard' },
  { label: 'TM',          icon: Clock,           to: `/tm/${EVENT_ID}` },
  { label: 'Cronograma',  icon: CalendarDays,    to: `/cronograma/${EVENT_ID}` },
  { label: 'Budget',      icon: DollarSign,      to: `/budget/${EVENT_ID}` },
]

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-wilco-black">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col bg-wilco-gray90 border-r border-wilco-gray70">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-wilco-gray70">
          <Radio className="text-wilco-orange" size={20} />
          <span className="font-extrabold text-lg tracking-widest text-white uppercase">Wilco</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-wilco-orange text-white'
                    : 'text-wilco-gray20 hover:text-white hover:bg-wilco-gray70'
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-wilco-gray70">
          <p className="text-wilco-gray50 text-xs">Execution, Guaranteed.</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
