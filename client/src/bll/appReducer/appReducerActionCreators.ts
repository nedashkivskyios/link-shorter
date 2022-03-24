import {LoadingStatusType, SeverityStatusType} from "./appReducer";

export const setLoadingAC = (params: { loading: LoadingStatusType }) => ({
  type: 'DVK/SET-LOADING', loading: params.loading,
} as const)

export const setAppErrorAC = (params: { error: null | string }) => ({
  type: 'DVK/SET-APP-ERROR', error: params.error,
} as const)

export const setSeverityAC = (params: { severity: SeverityStatusType }) => ({
  type: 'DVK/SET-SEVERITY', severity: params.severity,
} as const)

export const setIsOpenSnackbarStatusAC = (params: { isOpen: boolean }) => ({
  type: 'DVK/SET-IS-OPEN-SNACKBAR', isOpenSnackbar: params.isOpen,
} as const)

export const setTokenAC = (params: { token: string }) => ({
  type: 'DVK/SET-TOKEN', token: params.token,
} as const)

export const setUserId = (params: { userId: string }) => ({
  type: 'DVK/SET-USER-ID', userId: params.userId,
} as const)
export const appLogoutAC = () => ({
  type: 'DVK/APP-LOGOUT',
} as const)


