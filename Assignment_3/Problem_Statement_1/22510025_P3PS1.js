function isPrime(number) {
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false;

  for (let i = 5; i * i <= number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function countPrimes(numbers) {
  return numbers.reduce((count, number) => {
    if (isPrime(number)) {
      return count + 1;
    }
    return count;
  }, 0);
}

function calculatePrimes() {
  const input = document.getElementById("numbersInput").value;
  const numbersArray = input.split(",").map(Number);
  const result = countPrimes(numbersArray);
  document.getElementById(
    "result"
  ).textContent = `Count of prime numbers: ${result}`;
}
