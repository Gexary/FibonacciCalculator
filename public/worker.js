onmessage = function ({ data }) {
  let result;
  if (Array.isArray(data) && data.length === 2) {
    result = fibonacciRange(data[0], data[1]);
  } else result = fibonacci(data).toString();
  postMessage(result);
};

function multiplyMatrix(a, b) {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]].map(BigInt),
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]].map(BigInt),
  ];
}

function matrixPower(matrix, n) {
  let result = [
    [1, 0],
    [0, 1],
  ];
  while (n > 0) {
    if (n % 2 !== 0) {
      result = multiplyMatrix(result, matrix);
    }
    matrix = multiplyMatrix(matrix, matrix);
    n = Math.floor(n / 2);
  }
  return result;
}

function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const F = [
    [1, 1],
    [1, 0],
  ];
  const result = matrixPower(F, n - 1);
  return result[0][0];
}

function fibonacciRange(start, end) {
  let fibonacciList = [];
  for (let i = start; i <= end; i++) {
    fibonacciList.push(fibonacci(i).toString());
  }
  return fibonacciList;
}

console.log(fibonacciRange(10, 15));
