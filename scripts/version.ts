Deno.stdout.write(
  new TextEncoder().encode(
    (await import("file://" + Deno.cwd() + "/version.ts")).default,
  ),
);
