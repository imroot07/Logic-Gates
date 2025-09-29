function getMultiplexerTable(numBits) {
  const numInputs = numBits * 2 + 1;
  const multiplexerTable = [];

  let inputs;
  let inputsA;
  let inputsB;

  for (let i = 0; i < 2 ** numInputs; i++) {
    inputs = Array.from(
      { length: numInputs },
      (_, index) => Math.floor(i / 2 ** index) % 2
    );

    inputsA = inputs.slice(1, numBits + 1);
    inputsB = inputs.slice(numInputs - numBits, numInputs);

    multiplexerTable.push(inputs[0] === 0 ? inputsA : inputsB);
  }

  return multiplexerTable;
}

const multiplexerTable8 = getMultiplexerTable(8);

export { getMultiplexerTable, multiplexerTable8 };
