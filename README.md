# El alma de Sevilla

An interactive Spanish learning experience set in the heart of Seville. The project delivers a static site containing the story *El alma de Sevilla*, enriched with activities that help learners practice vocabulary and comprehension.

## Project Structure

- `index.md` – landing page that introduces the story.
- `capitulo-*.html` – ten chapters of the tale, each with integrated exercises.
- `assets/` – shared styles and scripts used by all chapters.
- `_layouts/` – Jekyll layouts for rendering pages.
- `_config.yml` – basic Jekyll configuration.

## Build and Run

The site is built with [Jekyll](https://jekyllrb.com/).

1. **Install prerequisites** (see below).
2. From the project root, install Ruby gems if a Gemfile is present:
   ```bash
   bundle install
   ```
3. Serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```
4. Open `http://localhost:4000` in a browser.

## Features

- Built‑in glossary to review new vocabulary.
- Short quizzes at the end of each chapter.
- Optional audio narration for selected chapters.

## Prerequisites

- Ruby and [Bundler](https://bundler.io/) for building the site.
- A modern web browser with audio support.

## Contributing

Contributions are welcome!

1. Fork the repository and create a new branch for your feature or fix.
2. Make your changes and verify that the site builds:
   ```bash
   bundle exec jekyll build
   ```
3. Submit a pull request describing your changes.

