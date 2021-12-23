import React, { createContext, useContext, useEffect } from 'react'
import type { LocalStorageOptionsTypes } from '@useweb/use-local-storage'
import startFirebaseEmulators from './handlers/startFirebaseEmulators/startFirebaseEmulators'

export type AuthOptions = {
  testUserEmail: string
  testUserPassword: string
  authEmulatorPort?: number
}

export type DBOptions = {
  dbEmulatorPort?: number
}

type FirebaseConfig = {
  apiKey?: string
  authDomain?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}

type Props = {
  firebaseApp: any
  firebaseConfig: FirebaseConfig
  envIsDev: boolean
  children: any
  db?: any
  dbOptions?: DBOptions
  auth?: any
  authOptions?: AuthOptions
  localStorageOptions?: LocalStorageOptionsTypes
  messaging?: any
  messagingOptions?: any
  analytics?: any
  analyticsOptions?: any
  functions?: any
  functionsOptions?: any
}

type Return = {
  firebaseApp: any
  firebaseConfig: FirebaseConfig
  envIsDev: boolean
  auth: any
  authOptions: any
  db: any
  localStorageOptions: LocalStorageOptionsTypes
  messaging: any
  messagingOptions?: any
  analytics?: any
  analyticsOptions?: any
  functions?: any
  functionsOptions?: any
}

const FirebaseContext = createContext<Return>(null)

export const FirebaseProvider = ({
  firebaseApp,
  firebaseConfig,
  envIsDev,
  auth,
  authOptions,
  db,
  dbOptions,
  children,
  localStorageOptions,
  messaging,
  messagingOptions,
  analytics,
  analyticsOptions,
  functions,
  functionsOptions,
}: Props) => {
  useEffect(() => {
    startFirebaseEmulators({
      auth,
      authOptions,
      db,
      dbOptions,
      functions,
      enable: envIsDev,
    })
  }, [envIsDev])

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
        firebaseConfig,
        envIsDev,
        auth,
        db,
        localStorageOptions,
        messaging,
        messagingOptions,
        analytics,
        analyticsOptions,
        functions,
        functionsOptions,
        authOptions,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

const useFirebase = () => useContext(FirebaseContext)

export default useFirebase
