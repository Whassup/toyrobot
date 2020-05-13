const decoder = new TextDecoder();

export async function readLine(length: number = 30): Promise<string> {
    const readData = new Uint8Array(length);
    await  Deno.stdin.read(readData);
    return decoder.decode(readData).replace(/\0|\n/g, '');
}