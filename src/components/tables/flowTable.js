function getFlowTable(numBits) {
  const numInputs = numBits + 1;
  const flowTable = [];

  let inputs;

  for (let i = 0; i < 2 ** numInputs; i++) {
    inputs = Array.from(
      { length: numInputs },
      (_, index) => Math.floor(i / 2 ** index) % 2
    );

    flowTable.push(
      inputs[0] === 0
        ? inputs.slice(1, numInputs)
        : Array.from({ length: numBits }, () => 0)
    );
  }

  return flowTable;
}

export { getFlowTable };
