function getInverterTable(numBits) {
    const numInputs = numBits + 1;
    const inverterTable = [];

    let inputs;

    for (let i = 0; i < 2 ** numInputs; i++) {
        inputs = Array.from(
            { length: numInputs },
            (_, index) => Math.floor(i / 2 ** index) % 2
        );

        inverterTable.push(
            inputs[0] === 0
                ? inputs.slice(1, numInputs)
                : inputs.slice(1, numInputs).map(value => value === 1 ? 0 : 1)
        );
    }

    return inverterTable;
}

const inverterTable4 = getInverterTable(4);
const inverterTable8 = getInverterTable(8);

export { getInverterTable, inverterTable4, inverterTable8 };
