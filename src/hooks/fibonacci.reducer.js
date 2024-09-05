const SET_VALUE = "SET_VALUE";
const SET_RESULT = "SET_RESULT";
const END_REDUCER = "END_REDUCER";

export const endReducer = () => ({
  type: END_REDUCER,
});

export const setResult = (result) => ({
  type: SET_RESULT,
  payload: result,
});

export const setValue = (value) => ({
  type: SET_VALUE,
  payload: value,
});

export default function fibonacciReducer(state, action) {
  switch (action.type) {
    case SET_VALUE:
      return { ...state, value: action.payload, isLoading: true, result: null };
    case SET_RESULT:
      return { ...state, result: action.payload, isLoading: false };
    case END_REDUCER:
      return { ...state, isLoading: false, result: null, value: null };
    default:
      return state;
  }
}
