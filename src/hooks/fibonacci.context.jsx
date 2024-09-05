"use client";

import { createContext, useContext } from "react";
import { useFibonacciWorker } from "../hooks/useFibonacciWorker";

const FibonacciContext = createContext({ result: null, isLoading: false, sendValue: () => {}, value: null });

export const useFibonacciResult = () => {
  const { result } = useContext(FibonacciContext);
  return result;
};

export const useSendValue = () => {
  const { sendValue } = useContext(FibonacciContext);
  return sendValue;
};

export const useIsLoading = () => {
  const { isLoading } = useContext(FibonacciContext);
  return isLoading;
};

export const useFibonacciValue = () => {
  const { value } = useContext(FibonacciContext);
  return value;
};

const FibonacciProvider = ({ children }) => {
  const { result, isLoading, sendValue, value } = useFibonacciWorker();
  return <FibonacciContext.Provider value={{ result, isLoading, sendValue, value }}>{children}</FibonacciContext.Provider>;
};

export default FibonacciProvider;
