# Slinker Animation Studios

This repository is the root of the GitHub Pages Jekyll site—there is no nested
project directory.

## Run locally

Use Ruby 3.3 for local development with the GitHub Pages dependency set, then
install the project dependencies:

```sh
bundle install
```

Start the local server:

```sh
bundle exec jekyll serve
```

Then open <http://localhost:4000/slinker-animation-studios/>.

## Publish

In **Settings → Pages**, select **Deploy from a branch**, choose `main`, and
select **/ (root)**. GitHub Pages builds and publishes the site after each push
to `main` using its built-in Jekyll builder. No custom workflow or plugins are
required. The `github-pages` gem keeps local dependencies aligned with Pages.
