import $ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import { maxSatisfying, valid } from "https://deno.land/x/semver@v1.4.0/mod.ts";
let max = maxSatisfying(
  [...(await $`git ls-remote -t .`.stdout()).matchAll(
    /refs\/tags\/([^\n]*)/gi,
  )].map((_) => _[1]).filter((version) => valid(version)),
  ">= 0",
);
// We set to 0.0.0, because the ci will ugrade to 0.1.0 automatically.
if (!max) max = "0.0.0";
await Deno.stdout.write(new TextEncoder().encode(max));
