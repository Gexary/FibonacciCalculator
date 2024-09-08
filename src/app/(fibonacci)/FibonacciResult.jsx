import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  const [min] = useFibonacciValue();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full my-16"
    >
      <CarouselContent className="-mt-1 h-[200px] w-full">
        {result.map((value, index) => (
          <CarouselItem key={index} className="w-full p-0 basis-0 mb-4">
            <CardContent className="w-full p-0">
              <p className="text-sm font-medium w-full text-zinc-600 text-left">Fibonacci({min + index}) =</p>
              <span className="text-sm font-mono test w-full break-all border border-zinc-200 rounded-lg bg-zinc-50 p-2 mt-2 text-left">
                {value}
              </span>
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
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
      <p className="text-sm font-mono test w-full break-all border border-zinc-200 rounded-lg bg-zinc-50 p-2 mt-2 text-left">
        {result}
      </p>
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
