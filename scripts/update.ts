import $ from "https://deno.land/x/cash@0.1.0-alpha.13/mod.ts";
import { inc } from "https://deno.land/x/semver@v1.4.0/mod.ts";
console.log(Deno.env.toObject());
console.log(Deno.args);

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
