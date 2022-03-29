export const setAuthMessageAC = (params: { message: string }) =>
  ({
    type: "DVK/SET-AUTH-MESSAGE",
    message: params.message,
  } as const);

export const setAuthErrorsAC = (params: { error: string | null }) =>
  ({
    type: "DVK/SET-AUTH-ERRORS",
    error: params.error,
  } as const);
