"use client";

import FibonacciProvider, { useFibonacciResult } from "../hooks/fibonacci.context";
import { FibonacciForm } from "./(fibonacci)/FibonacciForm";
import FibonacciResult from "./(fibonacci)/FibonacciResult";

export default function Home() {
  return (
    <main className="w-[720px] text-center rounded-xl border bg-card text-card-foreground shadow p-16 text-zinc-800">
      <h1 className="text-4xl font-extrabold mb-3 text-zinc-800">Fibonacci Calculator</h1>
      <p className="mb-8 text-zinc-600 text-base">
        Practical tool to determine the term of a Fibonacci suite according to its index.
      </p>
      <FibonacciProvider>
        <FibonacciApp />
      </FibonacciProvider>
    </main>
  );
}

function FibonacciApp() {
  const result = useFibonacciResult();
  return (
    <>
      <FibonacciForm />
      {result && <FibonacciResult />}
    </>
  );
}
