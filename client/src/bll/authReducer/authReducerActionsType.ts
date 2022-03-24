import * as actions from './authReducerActionCreators'

type ActionsType = typeof actions
type ActionCreatorsNamesType = keyof ActionsType
type ActionCreatorType = ActionsType[ActionCreatorsNamesType]
export type AuthReducerActionType = ReturnType<ActionCreatorType>
