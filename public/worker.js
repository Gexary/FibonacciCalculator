onmessage = function ({ data }) {
  let result;
  if (Array.isArray(data) && data.length === 2) {
    result = fibonacciRange(data[0], data[1]);
  } else result = fibonacci(data).toString();
  postMessage(result);
};

const memo = {};

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
  if (memo[n] !== undefined) {
    return memo[n];
  }

  const F = [
    [1, 1],
    [1, 0],
  ];
  const resultMatrix = matrixPower(F, n - 1);
  const result = resultMatrix[0][0];
  memo[n] = result;
  return result;
}

function fibonacciRange(start, end) {
  let fibSequence = [];
  let f0 = fibonacci(start);
  let f1 = fibonacci(start + 1);
  fibSequence.push(f0);
  for (let i = start + 1; i <= end; i++) {
    fibSequence.push(f1);
    let nextFib = f0 + f1;
    f0 = f1;
    f1 = nextFib;
    memo[i] = f0;
    memo[i + 1] = f1;
  }
  return fibSequence;
}
