git clone https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/$GITHUB_REPOSITORY .repository
cd .repository
git checkout $GITHUB_REF
SCRIPTS="https://raw.githubusercontent.com/ihack2712/workflow-testing/1241729ebfcc0e3d912382332b9b00d9b28d4db4/scripts"
OLD_VERSION=$(deno run -A $SCRIPTS/version.ts)
rm -rf version.ts && echo "export default \"$(deno run -A $SCRIPTS/update.ts "$(deno run -A $SCRIPTS/latest.ts)" "${{ github.event.head_commit.message }}")\";" >> version.ts
NEW_VERSION=$(deno run -A $SCRIPTS/version.ts)
echo $NEW_VERSION $OLD_VERSION
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .
git commit -m "Incremented version to '$NEW_VERSION'."
git tag $NEW_VERSION
git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/$GITHUB_REPOSITORY
git push -fu origin $NEW_VERSION
