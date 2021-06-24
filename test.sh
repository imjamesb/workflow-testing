SCRIPTS="https://raw.githubusercontent.com/ihack2712/workflow-testing/main/scripts"
OLD_VERSION=$(deno run -A $SCRIPTS/version.ts)
rm -rf version.ts && echo "export default \"$(deno run -A $SCRIPTS/update.ts "$(deno run -A $SCRIPTS/latest.ts)" "#patch")\";" >> version.ts
NEW_VERSION=$(deno run -A $SCRIPTS/version.ts)
echo $NEW_VERSION $OLD_VERSION
