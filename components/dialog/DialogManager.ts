import type { DialogOptions, DialogRef } from './types'

let dialogRef: DialogRef

const msg = 'DialogProvider not mounted yet'

export function setDialogRef(ref: DialogRef) {
  dialogRef = ref
}

export const DialogManager = {
  showDialog: (options: DialogOptions) => {
    if (!dialogRef) {
      console.warn(msg)
      return Promise.reject()
    }
    return dialogRef.showDialog(options)
  },
  showConfirmDialog: (options: DialogOptions) => {
    if (!dialogRef) {
      console.warn(msg)
      return Promise.reject()
    }
    return dialogRef.showConfirmDialog(options)
  },
}
