export interface ApiResponse<T> {
  success: boolean
  error: string | undefined
  data: T | undefined
}
