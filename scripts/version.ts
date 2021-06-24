console.log(Deno.cwd());
Deno.stdout.write(
  new TextEncoder().encode(await import(Deno.cwd() + "/version.ts")),
);
