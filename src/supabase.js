import { createClient } from '@supabase/supabase-js'
import store from './store'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey) 

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
  if (event == 'SIGNED_IN'){
    store.commit('setUser',session.user);
  } else if (event == 'SIGNED_OUT'){
    store.commit('setUser',null);
  }

})

export default supabase;