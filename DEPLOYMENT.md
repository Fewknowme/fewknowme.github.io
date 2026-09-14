# Portfolio deployment

Deploy the redesigned portfolio from branch `v2` using `.github/workflows/deploy.yml`.
GitHub Pages must use **GitHub Actions** (`build_type: workflow`), not the legacy
`gh-pages` branch. That branch contains an older portfolio; publishing a static
file there previously redeployed the old home page.

The workflow uploads `.output/public`. Keep public files in `public/`:

- `/app-ads.txt` contains the existing Google publisher declaration.
- `/patang-pop/privacy.html` preserves the policy URL used by older game builds.

The build verifies these files are copied unchanged into the deployment artifact.

CtxPilot at `https://fewknowme.github.io/ctxpilot/` is a separate project Pages
site, owned by `Fewknowme/ctxpilot` and published from `main:/docs`. Do not copy
or replace that site in this repository. Verify it remains accessible after
portfolio deployments.

Deploy by pushing `v2` or dispatching the workflow on `v2`. After the Pages job
succeeds, verify the portfolio renders the redesigned hero and check all three
public paths above. Avoid the old `npm run deploy` command, which targets
`gh-pages` rather than this workflow.
