import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ljwvruyebttphfusdova.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqd3ZydXllYnR0cGhmdXNkb3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3Njg5MTQsImV4cCI6MjA5NDM0NDkxNH0.OAl7V86TuQYZnaZWEltxiHbUNrVGFG2JrENwwlEmVwY'
)