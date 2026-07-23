import { useCallback, useEffect, useState } from 'react'
import type { Patient, PatientInput } from '@/domain/patient/Patient'
import { container } from '@/infrastructure/di/container'

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await container.getPatients.execute()
      setPatients(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar pacientes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = useCallback(
    async (data: PatientInput) => {
      await container.createPatient.execute(data)
      await refresh()
    },
    [refresh],
  )

  const update = useCallback(
    async (id: string, data: PatientInput) => {
      await container.updatePatient.execute(id, data)
      await refresh()
    },
    [refresh],
  )

  const remove = useCallback(
    async (id: string) => {
      await container.deletePatient.execute(id)
      await refresh()
    },
    [refresh],
  )

  return { patients, loading, error, create, update, remove, refresh }
}
