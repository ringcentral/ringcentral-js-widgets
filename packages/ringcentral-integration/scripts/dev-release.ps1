yarn run gulp release
Set-Location .\release

if ($(git status -s)) {
  git add --all .
  git commit -m "$(date)"
  git push origin dev-latest -f
}
Set-Location ..
