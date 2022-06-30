// parse spreadsheet to object
export async function parseBenchmark(benchmark) {
  const accuracyTypes = [];

  benchmark[0].forEach((accuracyType) => {
    if (accuracyType.startsWith("(")) {
      accuracyTypes.push(accuracyType.slice(1, -1));
    }
  });

  const dataset = benchmark.slice(4).map((row) => {
    const rowObject = {};
    row.forEach((column, i) => {
      if (benchmark[0][i].startsWith("(")) {
        rowObject[benchmark[0][i].slice(1, -1)] = column;
      } else {
        rowObject[benchmark[0][i]] = column;
      }
    });
    return rowObject;
  });

  return { dataset, accuracyTypes };
}
