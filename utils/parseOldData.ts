const parseOldDataFormat = (text: string) => {
  const lines = text.trim().split('\n');
  const newData: Record<string, Record<string, [number, number]>> = {};
  const monthYear = '02-2025'; // Since this data is for February 2025

  newData[monthYear] = {};

  lines.forEach((line) => {
    const match = line.match(/^(\d{2}) \w+ \w+: ([\d+ ]+)(?:\((Rs\. 2)\))?$/);
    if (!match) return;

    const [, day, amounts] = match;
    const [amt1, amt2 = 0] = amounts.replace(/\(Rs. 2\)/g, '').split(' + ').map(Number);

    newData[monthYear][day] = [amt1, amt2];
  });

  return newData;
};

// Example usage
const oldData = `01 Feb Saturday: 96 + 60(Rs. 2)
02 Feb Sunday: 162
03 Feb Monday: 108 + 72(Rs. 2)
04 Feb Tuesday: 147 + 18(Rs. 2)
05 Feb Wednesday: 138 + 30(Rs. 2)
06 Feb Thursday: 102 + 60(Rs. 2)
07 Feb Friday: 66 + 114(Rs. 2)
08 Feb Saturday: 126 + 36(Rs. 2)
09 Feb Sunday: 87 + 57(Rs. 2)
10 Feb Monday: 144
11 Feb Tuesday: 150
12 Feb Wednesday: 162
13 Feb Thursday: 150
14 Feb Friday: 138 + 24(Rs. 2)
15 Feb Saturday: 48 + 138(Rs. 2)
16 Feb Sunday: 132 + 36(Rs. 2)
17 Feb Monday: 120 + 39(Rs. 2)
18 Feb Tuesday: 123
19 Feb Wednesday: 162
20 Feb Thursday: 162
21 Feb Friday: 123 + 48(Rs. 2)
22 Feb Saturday: 126 + 48(Rs. 2)
23 Feb Sunday: 144
24 Feb Monday: 162
25 Feb Tuesday: 162
26 Feb Wednesday: 144`;

console.log(parseOldDataFormat(oldData));
