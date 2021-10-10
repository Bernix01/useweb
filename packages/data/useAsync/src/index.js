import { useState, useCallback, useEffect } from 'react'
/**
 * @example
 * const promise = useAsync(fetcher)
 *
 * usage example: "useJoiValidator/index.js"
 */
export default function useAsync(
  fetcher = () => null,
  { autoExec, onResult, onError, onLoading } = {},
) {
  const [loading, setLoading] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const exec = useCallback(
    async (payload) => {
      if (loading) return null

      try {
        setLoading(true)
        onLoading && onLoading(true)
        setResult(null)
        setError(null)
        const res = await fetcher(payload)
        setResult(res)
        onResult && onResult(res)
        return res
      } catch (error) {
        setError(error)
        onError && onError(error)
      } finally {
        setLoading(false)
        onLoading && onLoading(false)
      }
    },
    [fetcher],
  )

  useEffect(() => {
    if (autoExec) exec()
  }, [exec, autoExec])

  return { loading, error, result, exec }
}
