# Next.js + Supabase + Stripe RFQ Starter

1) `npm i`
2) Copy `.env.example` to `.env.local` and fill values
3) Run SQL in `/db/schema.sql` in Supabase
4) `npm run dev`

APIs: `/api/rfqs/list`, `/api/rfqs/ingest`, `/api/prime/unlock`, `/api/wallet/balance`, `/api/reveal-rules`, `/api/stripe/checkout`, `/api/stripe/webhook`.

## Auth (Clerk)
- Add env vars: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Create Sign-in/Sign-up URLs in Clerk dashboard (optional)
- Protected routes via `middleware.ts` (RFQ pages + APIs)

## Stripe Credits
- On `checkout.session.completed`, webhook adds **60 credits** to `wallet_credits` for the authenticated user.
- You can tune amount per plan by checking `session.items` or `priceId`.

