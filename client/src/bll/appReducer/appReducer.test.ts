import {AppInitialStateType, appReducer, LoadingStatusType, SeverityStatusType} from "./appReducer";
import {
  appLogoutAC,
  setAppErrorAC,
  setIsOpenSnackbarStatusAC,
  setLoadingAC,
  setSeverityAC,
  setTokenAC, setUserId,
} from "./appReducerActionCreators";

let initialState: AppInitialStateType = {} as AppInitialStateType

beforeEach(() => {
  initialState = {
    loading: 'idle',
    error: null,
    severity: 'info',
    isOpenSnackbar: false,
    token: '',
    userId: '',
  }
})

test('Loading should be changed', () => {
  const loading: LoadingStatusType = 'loading'
  const action = setLoadingAC({loading})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('loading')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('')

})

test('AppError should be changed', () => {
  const error: string = 'Some Error occured'
  const action = setAppErrorAC({error})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe('Some Error occured')
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('')

})

test('Severity should be changed', () => {
  const severity: SeverityStatusType = 'success'
  const action = setSeverityAC({severity})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('success')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('')

})

test('IsOpenSnackbarStatus should be changed', () => {
  const isOpenSnackbar: boolean = true
  const action = setIsOpenSnackbarStatusAC({isOpen: isOpenSnackbar})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(true)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('')

})

test('Token should be changed', () => {
  const token: string = 'Some token'
  const action = setTokenAC({token})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('Some token')
  expect(newState.userId).toBe('')

})

test('UserID should be changed', () => {
  const userId: string = 'Some userId'
  const action = setUserId({userId})
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('')
  expect(initialState.userId).toBe('')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('Some userId')

})

test('Logout, token and userId must be cleared', () => {
  const userId: string = 'Some userId'
  initialState = {
    ...initialState,
    token: 'some token',
    userId: 'some userId'
  }
  const action = appLogoutAC()
  const newState = appReducer(initialState, action)

  expect(initialState.loading).toBe('idle')
  expect(initialState.error).toBe(null)
  expect(initialState.severity).toBe('info')
  expect(initialState.isOpenSnackbar).toBe(false)
  expect(initialState.token).toBe('some token')
  expect(initialState.userId).toBe('some userId')

  expect(newState.loading).toBe('idle')
  expect(newState.error).toBe(null)
  expect(newState.severity).toBe('info')
  expect(newState.isOpenSnackbar).toBe(false)
  expect(newState.token).toBe('')
  expect(newState.userId).toBe('')

})
