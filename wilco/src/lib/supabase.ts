import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error(
    '[Wilco] Variáveis de ambiente não encontradas.\n' +
    'Certifique-se de que VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY ' +
    'estão configuradas no Vercel (Settings → Environment Variables).'
  )
}

export const supabase = createClient(
  url ?? '',
  key ?? ''
)
