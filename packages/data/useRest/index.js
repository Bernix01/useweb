import useFirebaseFunctions from '../../utils/cloud/functions/firebase/useFirebaseFunctions'

export default function useRest(path, { autoExec, restFunctionName = 'rest' } = {}) {
  const [state, setState] = useState(null)
  const cFunction = useFirebaseFunctions(restFunctionName)

  const exec = () => {
    const payload = { path }
    cFunction.exec(payload)
  }

  useEffect(() => {
    setState(cFunction.res)
  }, [cFunction.res])

  useEffect(() => {
    autoExec && exec()
  }, [autoExec])

  return {
    state,
    loading: cFunction.loading,
    result: cFunction.result,
    error: cFunction.error,
    exec,
  }
}
