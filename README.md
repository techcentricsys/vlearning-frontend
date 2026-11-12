# VLearnings Frontend

## Run locally

```bash
npm install
npm run dev
```

Vite is configured to bind to `localhost` only. The terminal will show:

```text
VITE v8.x.x ready

➜ Local:   http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
```

To intentionally expose the dev server to your local network, run `npm run dev -- --host`.

## Interactive preview features

- Sidebar collapse/expand with responsive content offsets.
- Topbar search, academic year selector, notifications, help and profile actions open dialogs.
- Dashboard report, student, attendance, fee, teacher, event, calendar, audit and refresh controls open interactive preview dialogs.
- Dialog forms demonstrate UI interactions only; they do not persist data because no backend API is connected.
