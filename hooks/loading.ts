import { useLoadingStore } from '@/store/loading'

export function useLoading() {
  const show = useLoadingStore(s => s.show)
  const hide = useLoadingStore(s => s.hide)

  const showLoading = (message?: string) => show(message)
  const hideLoading = () => hide()

  return {
    showLoading,
    hideLoading,
  }
}
