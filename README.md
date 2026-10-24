# ATELIER Café POS — Premium GitHub Pages / Local Edition

This is a **static frontend-only** five-panel client demo. No Golang, PostgreSQL, Firebase, server, login system or online database is required.

## Start locally

Open `index.html` in Chrome, or run a static server (`python -m http.server 8080`). The interface includes Owner, Cashier POS, Kitchen KDS, Waiter, Tables & QR and Customer Menu. Demo data is saved in the browser's localStorage.

## Publish to GitHub Pages

1. Create a GitHub repository, e.g. `atelier-cafe-pos`.
2. Upload all files in this folder **to the repository root**.
3. In repository Settings > Pages, choose Deploy from branch, `main`, `/ (root)`.
4. Open the published URL, such as `https://USERNAME.github.io/atelier-cafe-pos/`.
5. Use Tables & QR to generate table links. Test the QR on your phone. Each table link opens the customer menu, but **orders from a different phone do not reach the kitchen** without a backend.

## Auto-refresh behavior

- Updates to orders/menu are synchronized across open tabs on the **same browser profile and origin**, using `storage` events and `BroadcastChannel`.
- `version.json` is checked every 90 seconds while the page is open. On a new GitHub deployment, users get a **Refresh app** prompt, rather than losing an in-progress cart to a forced reload.
- For a new release, change the version in `version.json` **and** the `release` constant in `sync.js` to the same new value. Deploy both together. Browsers with the old JavaScript detect the changed version.
- GitHub Pages deployments can take a little time; allow for CDN caching.

## Limitations

All data is local to one browser profile; no cross-device sync, no real online ordering, no secure roles or payment gateway. QR links can open the menu on other phones but cannot deliver orders back to another device. Sample menu pricing and illustrative 5% tax are not production GST invoicing. External Unsplash photos and Google Fonts require internet access. Receipts are demo-only. This is for client presentation, not operating a live café.
