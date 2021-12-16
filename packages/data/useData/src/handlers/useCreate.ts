import useAsync from '@useweb/use-async'
import arrayDB from '@useweb/array-db'
import type { AddTypes } from '@useweb/array-db'

import type { HandlerPayloadType } from '..'

type Creator = {
  createdItem: object
  latestData: object[]
}

type ExecProps = {
  value: object
}

export type CreateOptions = {
  creator?: (data: Creator) => any
  onCreate?: (result: any) => void
  onCreateError?: (error: any) => void
  onCreateLoading?: (loading: boolean) => void
  insertMethod?: AddTypes['insertMethod']
}

export default function useCreate(
  { updateData, data: allData = [] }: HandlerPayloadType,
  {
    creator = () => null,
    onCreate = () => null,
    onCreateError = () => null,
    onCreateLoading = () => null,
    insertMethod,
  }: CreateOptions = {},
) {
  const fetcher = async ({ value: createdItem }: ExecProps): Promise<Creator> => {
    const latestData = arrayDB.add(allData, { data: createdItem, insertMethod })
    const returnData = { createdItem, latestData }

    await creator(returnData)

    return returnData
  }

  const create = useAsync(fetcher, {
    onResult: (result) => {
      updateData(result.latestData)
      onCreate(result)
    },
    onError: (error) => {
      onCreateError(error)
    },
    onLoading: (loading) => {
      onCreateLoading(loading)
    },
  })

  // Need this to add types to exec
  const exec = (props: ExecProps) => {
    create.exec(props)
  }

  return { ...create, exec }
}