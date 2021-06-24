import version from "../version.ts";
Deno.stdout.write(new TextEncoder().encode(version));
