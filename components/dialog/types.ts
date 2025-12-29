export interface DialogContextType {
  showDialog: (options: DialogOptions) => Promise<any>
  showConfirmDialog: (options: DialogOptions) => Promise<any>
}

export type DialogType = 'default' | 'confirm' | 'warning' | 'destructive'

export interface DialogBaseOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  showCancelButton?: boolean
  closeOnOverlayClick?: boolean
}

export interface DialogOptions extends DialogBaseOptions {
  type?: DialogType
}

export interface DialogState extends DialogOptions {
  resolve?: (value?: any) => void
  reject?: (reason?: any) => void
}

export type DialogRef = DialogContextType
