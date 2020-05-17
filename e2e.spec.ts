import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

const examples: [string, string[], string][] = [
  ["A", ["PLACE 0,0,NORTH", "MOVE", "REPORT"], "0,1,NORTH"],
  ["B", ["PLACE 0,0,NORTH", "LEFT", "REPORT"], "0,0,WEST"],
  ["C", ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"], "3,3,NORTH"],
];

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

for( const [name, inputs, expected] of examples) {
  Deno.test(`Example ${name}`, async() => { 
    await runApp(inputs, expected)
  });
};

async function runApp(inputs: string[], expected: string) {
  const process = Deno.run({
    cmd: ["deno", "run", "index.ts"],
    stdout: "piped",
    stdin: "piped",
  });

  if (process.stdout) {
    
    // First line
    await readLine(process);
    
    for(const input of inputs) {
      await process.stdin?.write(textEncoder.encode(input));
      await readLine(process);
    }

    const result = (await readLine(process)).replace(/\n|\0/g, "");
    assertEquals(result, expected);
    
    process.stdin?.close();
    process.stdout?.close();
    process.close();
  }
};

async function readLine(process: Deno.Process): Promise<string> {
  const encodedLine = new Uint8Array(100);
  await process.stdout?.read(encodedLine);
  return textDecoder.decode(encodedLine);
}
