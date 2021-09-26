import { useEffect, useRef, useState } from 'react'

export default function useFetch({
  url: defaultUrl,
  method: defaultMethod = 'get',
  headers: defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  fetchOnMount,
} = {}) {
  const aborController = useRef(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const fetchingRef = useRef(null)

  useEffect(() => {
    if (fetchOnMount && defaultUrl) {
      request()
    }
  }, [])

  useEffect(() => {
    initializeAbortController()
    return () => {
      fetching && abort()
    }
  }, [])

  const request = async (params = {}) => {
    const { current: isFetching } = fetchingRef
    if (isFetching) return null
    setError(null)
    const {
      body = null,
      headers = defaultHeaders,
      mode = 'cors',
      url: dynamicUrl = defaultUrl,
      method = defaultMethod,
      credentials,
    } = params

    try {
      setFetching(true)
      fetchingRef.current = true
      let res = null
      if (method === 'get' || method === 'HEAD') {
        res = await fetch(dynamicUrl, {
          signal: aborController.current?.signal,
          credentials,
          mode,
        })
        res = await res.json()
      } else {
        res = await fetch(dynamicUrl, {
          credentials,
          headers,
          method,
          mode,
          body: JSON.stringify(body),
        })
        res = await res.json()
      }

      if (res.error) throw res.error

      setResponse(res)
      return res
    } catch (error) {
      if (error.name === 'AbortError') {
        setResponse(false)
        return { aborted: true }
      } else {
        setError(error)
        return { error }
      }
    } finally {
      setFetching(false)
      fetchingRef.current = false
    }
  }

  const initializeAbortController = () => {
    aborController.current = abortControllerIsSupported() ? new AbortController() : {}
  }

  const abort = () => {
    if (abortControllerIsSupported() && fetching) {
      aborController.current.abort()
      aborController.current = new AbortController()
    }
  }

  const abortControllerIsSupported = () => 'AbortController' in window

  return { fetching, request, error, response, abort }
}