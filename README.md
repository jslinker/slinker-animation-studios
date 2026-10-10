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

## Projects

Project pages live in `_projects` and are published by the Jekyll `projects`
collection. The WWDC pins project keeps its original Squarespace HTML, fluid
grids, inline styles, and responsive layout. Its page stylesheets and project
images are stored locally under `assets/css/wwdc-pins` and
`assets/images/wwdc-pins`. The project self-hosts Libre Baskerville and Almarai (with their OFL licenses)
under `assets/fonts/wwdc-pins`. It has no Squarespace runtime dependencies.
A small local `assets/js/projects.js` renders responsive section curves
and text accents; images use native browser rendering and lazy loading.
The homepage and projects share `_includes/header.html`,
`_includes/footer.html`, and `assets/css/global-chrome.css`.

To preview at root URLs such as `/wwdc-pins/`, run
`bundle exec jekyll serve --baseurl ''`. Restart the server after changing
`_config.yml`, including adding collections.

`I Have to Go Away` uses the same local fonts, base styles, shared decoration
script, and header/footer, with native gallery and button styles.

`Harold the Talking Head` uses the original homepage thumbnail separately from
its header. The decorative 8.54-second header clip is a local 1280×720 H.264 MP4
(about 1 MB), with a local poster and native muted playback. The shared script
respects reduced motion and data-saving preferences and provides a pause/play
control. Film embeds use lazy YouTube privacy-enhanced iframes; there is no
Squarespace player dependency.

The Good Chord Book project lives at `/the-good-chord-book/`. Its original artwork, app icons, App Store badge, and separate homepage thumbnail are self-hosted under `assets/images/the-good-chord-book/`. It shares the local fonts and global header/footer with the other migrated projects and uses a small local script for the original scrolling background in Thousands of Combinations. App Store links, privacy terms, and artwork attribution remain intact.

The Magic: The Gathering Land Station project lives at `/magic-the-gathering-land-station/`, with local images, a native MP4 final-result video, the original five-image gallery, and shared fonts/header/footer. Its new homepage card uses the rendered terrain artwork because the old homepage had no entry.

## History of Animation blog

The two original published stories are in `_posts/`, categorized as `history-of-animation`. Their original `/stories-in-animation/.../` URLs are retained. The homepage shows the latest four stories automatically; the archive at `/stories-in-animation/` lists every story with square thumbnails and a date index generated from published posts. The date index is hidden on smaller screens; each preview links to its article. Homepage previews keep full excerpts and grow to the tallest card in their row. Shared layouts live in `_layouts/blog.html` and `_layouts/blog-post.html`, with local images/fonts and no Squarespace runtime. Each post has separate thumbnail and social sharing image fields. The RSS feed is `/stories-in-animation/feed.xml`.

To add a story, create `_posts/YYYY-MM-DD-slug.html` (or Markdown) with `layout: blog-post`, title, date, author, `categories: [history-of-animation]`, image, social_image, excerpt, and permalink. Add `youtube_id` to display a video above the article title. Article pages use Grand Baron typography, with the author and publication date below the story. Use site-relative local image paths.
