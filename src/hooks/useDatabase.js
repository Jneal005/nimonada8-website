import { useState, useCallback } from 'react'
import { db } from '../lib/supabase'

export const useDatabase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (table, query = {}) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await db.select(table, query)
      if (error) throw error
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const insertData = useCallback(async (table, data) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error } = await db.insert(table, data)
      if (error) throw error
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateData = useCallback(async (table, data, filters) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error } = await db.update(table, data, filters)
      if (error) throw error
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteData = useCallback(async (table, filters) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await db.delete(table, filters)
      if (error) throw error
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    fetchData,
    insertData,
    updateData,
    deleteData
  }
} 