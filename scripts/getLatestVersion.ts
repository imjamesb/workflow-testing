// Imports
import $ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import {
  maxSatisfying as maxSatisfying,
  valid as valid,
} from "https://deno.land/x/semver@v1.4.0/mod.ts";
import output from "./.output.ts";

const secret = Deno.env.get("GITHUB_TOKEN");
if (!secret) throw new Error("Missing github token!");

const latest = maxSatisfying(
  [...(await $`git ls-remote -t .`.stdout()).matchAll(
    /refs\/tags\/([^\n]*)/gi,
  )].map((_) => _[1]).filter((version) => valid(version)),
  ">= 0",
);
if (!latest) {
  output("0.0.0");
  Deno.exit(0);
}

output(latest);
