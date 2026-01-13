export interface UploadResult {
  fileName: string
  ossId: string
  url: string
}

export interface CheckVersionResult {
  id: string
  name: string
  version: string
  status: string
  forcedUpdate: string
  description: string
  tenantId: string
  ossId: string
  ossUrl: string
}
