git checkout landing
if ($LASTEXITCODE -ne 0) {
    git checkout -b landing
}
git add .
git commit -m "Refine UI layouts, add mobile responsive admin panel, and target lock animations"
git push origin landing
