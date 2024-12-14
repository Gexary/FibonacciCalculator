"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider.jsx";
import { useEndFibonacciReducer, useIsLoading, useSendValue } from "@/hooks/fibonacci.context";
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
  const [option, setOption] = useState("oneNumber");
  const endReducer = useEndFibonacciReducer();

  const toggleOption = useCallback(
    (value) => {
      setOption(value);
      endReducer();
    },
    [endReducer]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      if (option === "oneNumber") {
        const value = convertToNumber(formData.get("value"));
        if (value !== null) sendValue(value);
      } else {
        const valueMin = convertToNumber(formData.get("valueMin"));
        const valueMax = convertToNumber(formData.get("valueMax"));
        if (valueMin !== null && valueMax !== null) sendValue(valueMin, valueMax);
      }
    },
    [sendValue, option]
  );

  return (
    <form onSubmit={onSubmit}>
      {option === "oneNumber" ? <NumberInput /> : <NumberRangeInput />}
      <div className="flex justify-center gap-2 mt-10">
        <ConfigSelect toggleOption={toggleOption} />
        <CalculateButton />
      </div>
    </form>
  );
}

export function CalculateButton() {
  const isLoading = useIsLoading();
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
      {isLoading ? "Processing..." : "Calculate"}
    </Button>
  );
}

const MIN_VALUE = -100_000_000;
const MAX_VALUE = 100_000_000;
function NumberInput() {
  const [value, setValue] = useState(100);

  const handleChange = (inputValue) => {
    let numericValue = inputValue.replace(/\s+/g, "");
    if (/^-?\d*$/.test(numericValue) && numericValue !== "") {
      const numberValue = Math.max(Math.min(parseInt(numericValue), MAX_VALUE), MIN_VALUE);
      setValue(isNaN(numberValue) ? 0 : numberValue);
    } else setValue(0);
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
  console.log(value);
  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        disabled={value <= -100_000_000}
        type="button"
        onClick={decrease}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <input
          autoComplete="off"
          className="inline-block text-7xl font-bold tracking-tighter text-center outline-none w-full"
          value={formatNumberWithSpaces(value)}
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
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}

function NumberRangeInput() {
  const [range, setRange] = useState([0, 100]);

  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <Input name="valueMin" placeholder="Start" value={range[0]} onChange={(e) => setRange([e.target.value, range[1]])} />
        <Separator orientation="vertical" />
        <Input name="valueMax" placeholder="End" value={range[1]} onChange={(e) => setRange([range[0], e.target.value])} />
      </div>
      <Slider max={500} min={0} step={1} value={range} onValueChange={setRange} />
    </>
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
