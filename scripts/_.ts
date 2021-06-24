// Imports
import $ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import {
  inc,
  maxSatisfying,
  valid,
} from "https://deno.land/x/semver@v1.4.0/mod.ts";

$.verbose = 4;
$.setShell("bash", "-c");

let version!: string | null;

const secret = Deno.env.get("GITHUB_TOKEN");
if (!secret) throw new Error("Missing github token!");

const latest = maxSatisfying(
  [...(await $
    `git ls-remote -t https://x-access-token:\${GITHUB_TOKEN}@github.com/\${GITHUB_REPOSITORY}`
    .stdout()).matchAll(
      /refs\/tags\/([^\n]*)/gi,
    )].map((_) => _[1]).filter((version) => valid(version)),
  ">= 0",
);
if (!latest) {
  version = "0.1.0";
}
if (latest && version !== undefined) {
  const msg = Deno.args[0];
  if (!msg) Deno.exit(0);
  const result = msg.match(/\#(pre|patch|minor|major)/i);
  if (!result) Deno.exit(0);
  const newV = inc(latest!, result[1] as "pre");
  if (!newV) throw new Error("Could increment version!");
  version = newV;
}

if (!version) Deno.exit(0);

await $`
  rm -rf version.ts && echo "export default \"\${NEWTAG}\";" >> version.ts
  git config user.name "\${GITHUB_ACTOR}"
  git config user.email "\${GITHUB_ACTOR}@users.noreply.github.com"
  git add .
  git commit -m "Incremented version to \${NEWTAG}"
  git tag \${NEWTAG}
  git remote set-url origin https://x-access-token:\${GITHUB_TOKEN}@github.com/\${GITHUB_REPOSITORY}
  git push -u origin \${NEWTAG}
`;
