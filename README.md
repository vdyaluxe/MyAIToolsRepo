Commit Changes to GitHub
git status

Stage Changes
git add .

Commit Changes
git commit -m "Describe your changes here"

Push to main Branch
git push origin main

Verify on GitHub:

Build:
rmdir /s /q dist
ng build --configuration production --base-href "/blog-generate/"

Deploy:
ngh --dir=dist/blog-generation/browser --repo=https://github.com/vdyaluxe/blog-generate.git

