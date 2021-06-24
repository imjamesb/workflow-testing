import { inc } from "https://deno.land/x/semver@v1.4.0/mod.ts";

let [version, message] = Deno.args;
if (version === "0.0.0") {
  version = "0.1.0";
} else if (message.includes("#pre")) {
  version = inc(version, "pre")!;
} else if (message.includes("#patch")) {
  version = inc(version, "patch")!;
} else if (message.includes("#minor")) {
  version = inc(version, "minor")!;
} else if (message.includes("#major")) {
  version = inc(version, "major")!;
} else {
  console.error("error: no new tag");
  Deno.exit(1);
}

Deno.stdout.write(new TextEncoder().encode(version));
