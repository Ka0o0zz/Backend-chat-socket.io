import { createErrorFactory } from "../../../errors/errors";

export enum ERRORS_NAMES_AUTH {
  userAlreadyRegistered = "userAlreadyRegistered",
  userIsNotRegistered = "userIsNotRegistered",
  credentialsNotMatch = "credentialsNotMatch",
  internalServerError = "Internal server error",
}

export const authErrorUserAlreadyRegistered = createErrorFactory(
  ERRORS_NAMES_AUTH.userAlreadyRegistered
);
export const authErrorUserIsNotRegistered = createErrorFactory(
  ERRORS_NAMES_AUTH.userAlreadyRegistered
);

export const authErrorCredentialsNotMatch = createErrorFactory(
  ERRORS_NAMES_AUTH.credentialsNotMatch
);
