# pr-evidence-demo

A tiny notes app used to show [pr-evidence](https://github.com/debrine/pr-evidence) at work.

On `main`, double-clicking Save adds the same note twice. The open pull request fixes that, and its evidence comment was posted by pr-evidence from a real run. The pull request is never merged, so the comment stays visible.

## Run it

```sh
node server.js
```

Then open http://localhost:3000. There is nothing to install. Notes are kept in memory and reset when the server restarts.
