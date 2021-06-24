// Imports
import _$ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import {
  maxSatisfying as _maxSatisfying,
  valid as _valid,
} from "https://deno.land/x/semver@v1.4.0/mod.ts";
import output from "./.output.ts";

const secret = Deno.env.get("GITHUB_TOKEN");
if (!secret) throw new Error("Missing github token!");

output("Going great!");
