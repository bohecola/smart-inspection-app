import { createContext, useContext } from 'react'

export interface UploaderContextType {
  isDisabled: boolean
  isInvalid: boolean
}

export const UploaderContext = createContext<UploaderContextType>({
  isDisabled: false,
  isInvalid: false,
})

export function useUploaderContext() {
  return useContext<UploaderContextType>(UploaderContext)
}
