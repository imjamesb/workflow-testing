export default function output(data: string) {
  Deno.stdout.writeSync(new TextEncoder().encode(data));
}
