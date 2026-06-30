import { useReducer } from "react";
import { isAxiosError, type AxiosResponse } from "axios";

const IDLE = "idle";
const PENDING = "pending";
const RESULT = "result";
const ERROR = "error";

interface IdleOrPendingState {
  readonly loading: boolean;
  readonly status: null;
  readonly data: null;
}

interface ResultState<T> {
  readonly loading: false;
  readonly status: number;
  readonly data: T;
}

interface ErrorState {
  readonly loading: false;
  readonly status: number;
  readonly data: null;
}

type State<T> = IdleOrPendingState | ResultState<T> | ErrorState;

interface IdleOrPendingAction {
  readonly type: typeof IDLE | typeof PENDING;
}

interface ResultAction<T> {
  readonly type: typeof RESULT;
  readonly response: AxiosResponse<T>;
}

interface ErrorAction {
  readonly type: typeof ERROR;
  readonly error: unknown;
}

type Action<T> = IdleOrPendingAction | ResultAction<T> | ErrorAction;

const fetchReducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case IDLE:
      return { loading: false, status: null, data: null };
    case PENDING:
      return { loading: true, status: null, data: null };
    case RESULT: {
      const { response } = action;
      const { status, data } = response;
      return { loading: false, status, data };
    }
    case ERROR: {
      const { error } = action;
      const status = (isAxiosError(error) && error.response)
        ? error.response.status
        : 500;
      return { loading: false, status, data: null };
    }
    default:
      return state;
  }
};

const initialState: State<unknown> = { loading: false, status: null, data: null };

const useFetch = <T,>() => useReducer<State<T>, [action: Action<T>]>(fetchReducer, initialState);

export default useFetch;
