import fs from 'mz/fs';

export default async () => {
  const file = await fs.readFile('../test.txt', 'utf-8');
  const fn = new Function('return ' + file);
  const r = fn();
  console.log(`README.md: ${r}`);
  return r;
}
