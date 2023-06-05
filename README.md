RSCs vs PHP (and Rust)
======================

# Running

First run the data server:
  
```bash
% cd data
% binserve
```

This will serve the pokemon data on port 8080. You can use [binserve](https://github.com/mufeedvh/binserve) or any other fast static server.

Then run one of the following:

## NextJS 13.4 App Router

```bash
% cd app-router
% pnpm i
% pnpm build
% pnpm start
```

Serves on: `http://locahost:3001/`

## NextJS 13.4 Pages

```bash
% cd pages
% pnpm i
% pnpm build
% pnpm start
```

Serves on: `http://locahost:3000/`

## PHP

```bash
cd php
./run.sh
```

Serves on: `http://locahost:9000/`

## Rust

```bash
cd rust
cargo run -r
```

Serves on: `http://locahost:8000/`
