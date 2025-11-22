import { useContext } from 'react'
import { DialogContext } from './DialogProvider'

export function useDialog() {
  return useContext(DialogContext)
}
