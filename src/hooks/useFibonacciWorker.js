import { useCallback, useEffect, useReducer, useRef } from "react";
import fibonacciReducer, { endReducer, setResult, setValue } from "./fibonacci.reducer";

export const useFibonacciReducer = () => {
  const [state, dispatch] = useReducer(fibonacciReducer, {
    value: null,
    result: null,
    isLoading: false,
  });
  return {
    result: state.result,
    isLoading: state.isLoading,
    value: state.value,
    setResult: useCallback((result) => dispatch(setResult(result)), [dispatch]),
    setValue: useCallback((value) => dispatch(setValue(value)), [dispatch]),
    endReducer: useCallback(() => dispatch(endReducer()), [dispatch]),
  };
};

export const useFibonacciWorker = () => {
  const { result, isLoading, setResult, setValue, value, endReducer } = useFibonacciReducer();
  const worker = useRef(null);

  useEffect(() => {
    worker.current = new Worker("worker.js");
    worker.current.onmessage = function (event) {
      setResult(event.data);
    };
    return () => {
      worker.current.terminate();
      endReducer();
    };
  }, [endReducer, setResult]);

  const sendValue = (value) => {
    if (worker.current && !isLoading) {
      worker.current.postMessage(value);
      setValue(value);
    }
  };

  return { result, isLoading, sendValue, value };
};
