import * as actions from "./appReducerActionCreators";

type ActionsType = typeof actions;
type ActionCreatorsNamesType = keyof ActionsType;
type ActionCreatorType = ActionsType[ActionCreatorsNamesType];
export type AppReducerActionType = ReturnType<ActionCreatorType>;
