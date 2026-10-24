# ATELIER — Premium Café POS Client Showcase

A responsive HTML/CSS/JavaScript demo with owner dashboard, cashier POS, kitchen KDS, waiter station, customer QR menu, menu editing, sample orders, illustrative taxes, demo payment settlement and printable demo receipts.

## Quick start

You can now double-click `index.html` to run the local demo without a server. For GitHub deployment or Firebase cloud sync, use HTTPS hosting. Alternatively, serve the directory with a local web server:

```bash
python -m http.server 8080
```

Open `http://localhost:8080/` in a browser. In VS Code, the Live Server extension also works. The five panels are available from the left sidebar. Use the customer menu at `?view=customer&table=5`.

## GitHub Pages deployment

1. Create a GitHub repository (e.g. `atelier-cafe-pos`).
2. Upload **all files from this folder to the repository root** (including `firebase-config.js`).
3. Go to Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
4. Your site will be available at `https://YOUR-USERNAME.github.io/atelier-cafe-pos/` after Pages finishes deploying.
5. Open **Tables & QR** on the deployed site. Each QR links to its corresponding table's customer menu.
6. Print the codes after deployment, not before. For customer-facing production QR cards, prefer generating and storing QR images locally rather than relying on a third-party QR image endpoint.

## Data & synchronization

**Default:** Orders and edits persist via localStorage on the *same browser only*. Separate phones do not share orders. GitHub Pages is static hosting, not a database.

**Optional Firebase Firestore demo sync:**

1. Create a Firebase project at Firebase Console.
2. Enable **Authentication → Sign-in method → Anonymous**.
3. Create a Firestore database.
4. Register a Firebase Web App and copy its public config fields into `firebase-config.js` (`apiKey`, `authDomain`, `projectId`, `appId`).
5. Use an **isolated, fake-data-only demo Firebase project**. The app currently stores a single shared demo document at `cafes/atelier-demo` and uses anonymous authentication. It has no staff accounts or role enforcement. This is not appropriate for real customers, real payments, or sensitive information.
6. For a controlled temporary demo only, use a short-lived Firestore rule that allows authenticated users to read/write **only** the demo document, then disable access after the presentation:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cafes/atelier-demo {
      allow read, write: if request.auth != null;
    }
  }
}
```

**WARNING:** These temporary rules let *any anonymously authenticated visitor* overwrite the shared demo data. They do not secure owner, kitchen, waiter or cashier functions. Do not use this rule or this frontend as a production POS. To go live, add verified staff accounts, role-based authorization in Firestore rules or a server API, validated order pricing, controlled guest checkout, transactional order writes, audit logs, proper GST logic, and payment provider webhooks. Do not collect customer PII or real payments in this demo.

## Photo licensing

Menu imagery is loaded from Unsplash URLs and requires internet. The photos are representative and may not depict the exact product. Replace with licensed photographs of the client's actual dishes before launch.

## Limitations

- Taxes are illustrative, not legal GST calculation.
- The receipt is explicitly labeled DEMO RECEIPT, not a tax invoice.
- Payments are simulated and marked as paid manually.
- No secure role authentication; the sidebar is for client demonstration.
- No real hardware printer integration; browser printing only.
- Cloud demo synchronizes one document and is not concurrency-safe for a busy café.
- QR links identify table number but are not secure table sessions.
