# Jekyll-friendly Ruby with build tools
FROM ruby:3.2

# System deps (for nokogiri, etc.) + node for asset pipelines if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    nodejs \
    libffi-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Non-root user (UID/GID 1000) to match most host setups
RUN groupadd -g 1000 vscode && \
    useradd -m -u 1000 -g vscode vscode

# Workdir
WORKDIR /site
RUN chown -R vscode:vscode /site
USER vscode

# Pre-copy gem specs to leverage Docker layer cache
# (Gemfile.lock is optional—copied if present)
COPY --chown=vscode:vscode Gemfile* /site/

# Install bundler + gems into vendor/bundle (kept in a volume)
RUN gem install connection_pool:2.5.0
RUN gem install bundler:2.3.26
RUN bundle install

# Default: run Jekyll with livereload + reliable file watching
# (Command can be overridden in compose)
CMD ["jekyll", "serve", "-H", "0.0.0.0", "-w"]

