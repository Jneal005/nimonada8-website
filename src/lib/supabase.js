import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = {
  // Sign up with email and password
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helper functions
export const db = {
  // Generic CRUD operations
  select: async (table, query = {}) => {
    let queryBuilder = supabase.from(table).select()
    
    if (query.columns) {
      queryBuilder = queryBuilder.select(query.columns)
    }
    if (query.filters) {
      query.filters.forEach(filter => {
        queryBuilder = queryBuilder.filter(filter.column, filter.operator, filter.value)
      })
    }
    if (query.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy.column, { ascending: query.orderBy.ascending })
    }
    if (query.limit) {
      queryBuilder = queryBuilder.limit(query.limit)
    }
    
    const { data, error } = await queryBuilder
    return { data, error }
  },

  insert: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    return { data: result, error }
  },

  update: async (table, data, filters) => {
    let queryBuilder = supabase.from(table).update(data)
    
    if (filters) {
      filters.forEach(filter => {
        queryBuilder = queryBuilder.filter(filter.column, filter.operator, filter.value)
      })
    }
    
    const { data: result, error } = await queryBuilder.select()
    return { data: result, error }
  },

  delete: async (table, filters) => {
    let queryBuilder = supabase.from(table).delete()
    
    if (filters) {
      filters.forEach(filter => {
        queryBuilder = queryBuilder.filter(filter.column, filter.operator, filter.value)
      })
    }
    
    const { data, error } = await queryBuilder
    return { data, error }
  }
}

// Storage helper functions
export const storage = {
  upload: async (bucket, path, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    return { data, error }
  },

  download: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)
    return { data, error }
  },

  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  delete: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])
    return { data, error }
  }
}

export default supabase 