import Airtable from 'airtable'

import useAsync from '../../useAsync'

import getSingle from './handlers/getSingle'
import getMultiple from './handlers/getMultiple'
import create from './handlers/create'
import update from './handlers/update'
import remove from './handlers/remove'

export default function useAirtable(
  baseId,
  table,
  { method = 'select', data: initialData, apiKey, onSubmitSuccess = () => null } = {},
) {
  const fetchNextPageRef = useRef(null)
  const airtableApiKey = process.env.AIRTABLE_API_KEY || apiKey
  const base = new Airtable({ apiKey: airtableApiKey }).base(baseId)(table)

  const fetcher = (data = initialData) =>
    new Promise(async (resolve, reject) => {
      let mutlipleData = ''
      try {
        let response = null
        switch (method) {
          case 'getPage':
            mutlipleData = await getMultiple({ base, data })
            response = mutlipleData.records
            fetchNextPageRef.current = mutlipleData.fetchNextPageFunction
            break
          case 'find':
            response = await getSingle({ base, data })
            break
          case 'create':
            response = await create({ base, data })
            break
          case 'update':
            response = await update({ base, data })
            break
          case 'delete':
            response = await remove({ base, data })
            break
          default:
            break
        }
        onSubmitSuccess(response)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })

  const dataHook = useAsync(fetcher)

  const fetchNextPage = () => {
    fetchNextPageRef.current()
  }

  return { ...dataHook, fetchNextPage }
}
