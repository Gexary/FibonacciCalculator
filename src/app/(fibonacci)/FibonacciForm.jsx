"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsLoading, useSendValue } from "@/hooks/fibonacci.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Calculator, MinusIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

function convertToNumber(value) {
  const numberValue = parseInt(value.replace(/\s+/g, ""), 10);
  if (!isNaN(numberValue)) return numberValue;
  return null;
}

export function FibonacciForm() {
  const sendValue = useSendValue();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const value = convertToNumber(formData.get("value"));
      if (value !== null) sendValue(value);
    },
    [sendValue]
  );

  return (
    <form onSubmit={onSubmit}>
      <NumberInput />
      <div className="flex justify-center gap-2">
        <ConfigSelect toggleOption={console.log} />
        <CalculateButton />
      </div>
    </form>
  );
}

export function CalculateButton() {
  const isLoading = useIsLoading();
  return isLoading ? (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Processing...
    </Button>
  ) : (
    <Button type="submit">
      <Calculator className="mr-2 h-4 w-4" /> Calculate
    </Button>
  );
}

function NumberInput() {
  const [value, setValue] = useState(100);

  const handleChange = (inputValue) => {
    let numericValue = inputValue.replace(/\s+/g, "");
    if (numericValue === "" || /^-?\d*$/.test(numericValue)) {
      let numberValue = parseInt(numericValue, 10);
      if (!isNaN(numberValue) && numberValue < 0) {
        setValue(formatNumberWithSpaces(numericValue));
      } else if (numericValue === "" || (numberValue >= 0 && numericValue !== "00")) {
        setValue(formatNumberWithSpaces(numericValue));
      }
    }
  };

  const formatNumberWithSpaces = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const increase = () => {
    setValue((value) => value + 1);
  };

  const decrease = () => {
    setValue((value) => value - 1);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        disabled={value <= -100_000_000}
        onClick={decrease}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center mb-8">
        <input
          autoComplete="off"
          className="inline-block text-7xl font-bold tracking-tighter text-center outline-none w-full"
          value={value}
          name="value"
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="text-[0.70rem] uppercase text-muted-foreground">Fibonacci(n) for n = ?</div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        disabled={value >= 100_000_000}
        onClick={increase}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}

function ConfigSelect({ toggleOption }) {
  return (
    <Select defaultValue="oneNumber" onValueChange={toggleOption}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="oneNumber">One number</SelectItem>
          <SelectItem value="sequence">Sequence of numbers</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
