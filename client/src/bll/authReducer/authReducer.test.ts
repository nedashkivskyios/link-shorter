import { AuthInitialStateType, authReducer } from "./authReducer";
import { setAuthErrorsAC, setAuthMessageAC } from "./authReducerActionCreators";

let startState: AuthInitialStateType;

beforeEach(() => {
  startState = {
    message: "",
    error: null,
  };
});

test("auth message should be changed", () => {
  const message = "message";
  const action = setAuthMessageAC({ message });
  const newState = authReducer(startState, action);

  expect(startState.message).toBe("");
  expect(startState.error).toBe(null);

  expect(newState.message).toBe("message");
  expect(newState.error).toBe(null);
});

test("auth error should be changed", () => {
  const error = "error";
  const action = setAuthErrorsAC({ error });
  const newState = authReducer(startState, action);

  expect(startState.message).toBe("");
  expect(startState.error).toBe(null);

  expect(newState.message).toBe("");
  expect(newState.error).toBe("error");
});
