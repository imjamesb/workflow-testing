// Imports
import $ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import { maxSatisfying, valid } from "https://deno.land/x/semver@v1.4.0/mod.ts";
import output from "./.output.ts";

await $.echo`${Deno.env.get("GITHUB_SECRET")}`;
