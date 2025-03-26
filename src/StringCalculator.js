import React, { useState } from "react";

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const add = (numbers) => {
    if (!numbers) return 0;

    let delimiter = /,|\n/;
    let customDelimiterMatch = numbers.match(/^\/\/(.)\n/);
    if (customDelimiterMatch) {
      delimiter = new RegExp(customDelimiterMatch[1]);
      numbers = numbers.slice(customDelimiterMatch[0].length);
    }

    let numArray = numbers.split(delimiter).map(Number);
    let negatives = numArray.filter((num) => num < 0);
    if (negatives.length)
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);

    return numArray.reduce((sum, num) => sum + num, 0);
  };

  const handleCalculate = () => {
    try {
      setError(null);
      const sum = add(input);
      setResult(sum);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>String Calculator</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default StringCalculator;
