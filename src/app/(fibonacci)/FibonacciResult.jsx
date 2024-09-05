import { Button } from "@/components/ui/button";
import { useFibonacciResult, useFibonacciValue } from "@/hooks/fibonacci.context";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useCallback } from "react";

export default function FibonacciResult() {
  const result = useFibonacciResult();
  return typeof result === "string" ? <FibonacciNumber /> : <FibonacciTable />;
}

function FibonacciTable() {
  const result = useFibonacciResult();
  return <p className="text-sm font-mono w-full break-all">{result}</p>;
}

function FibonacciNumber() {
  const result = useFibonacciResult();
  const value = useFibonacciValue();
  return (
    <>
      <div className="mt-8 flex flex-row items-end justify-between">
        <p className="text-sm font-medium w-full text-zinc-600 text-left">Fibonacci({value}) =</p>
        <CopyBtn result={result} />
      </div>
      <p className="text-sm font-mono test w-full break-all border border-zinc-200 rounded-lg bg-zinc-50 p-2 mt-2">{result}</p>
    </>
  );
}

function CopyBtn({ result }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopied = Boolean(copiedText);
  const copyResult = useCallback(() => {
    copyToClipboard(result.toString());
  }, [copyToClipboard, result]);

  return (
    <div className="flex justify-end">
      <Button variant="outline" onClick={copyResult}>
        {hasCopied ? (
          <>
            {"Copied !"}
            <CheckIcon className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            {"Copy to clipboard"}
            <ClipboardIcon className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
