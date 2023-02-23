function isPrime(num) {
    if (n <= 1)
      return false;
      // Check from 2 to n-1
    for (let i = 2; i < n; i++)
      if (n % i == 0)
        return false;
    return true;
  }
  
  function prime(n) {
    let i = 0;
    let primeCount = 0;
    
    while (primeCount < n) {
      if (isPrime(i)) {
        primeCount++; 
      }
      if (primeCount === n) {
        return i;
      }
      
      i++;
    }
    return 0;
  }
  
  function printSequence(seqFunc, n, elementId) {
    function getSequence(f, m) {
      let str = "";
      for (let i = 0; i < m; i++) {
        str += f(i);
      }
      return str;
    }
    
    document.getElementById(elementId).innerHTML = getSequence(seqFunc, n);
    console.log(getSequence(seqFunc, n));
    
  }
  
  printSequence(prime(), 5, "out1");