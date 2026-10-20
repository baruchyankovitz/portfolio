This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI chat assistant

The floating chat (`src/components/ChatWidget.tsx`) answers visitors' questions about Baruch through `/api/chat` (`src/app/api/chat/route.ts`), which streams answers from the Claude API.

- `ANTHROPIC_API_KEY` (required): put it in `.env.local` for local development, and in Vercel → Project → Settings → Environment Variables for production.
- `CHAT_MODEL` (optional): defaults to `claude-haiku-5-5` (cheapest). Set `claude-sonnet-5-5` or `claude-opus-5-5` for stronger answers at a higher cost.
- What the bot knows and how it answers lives in `src/lib/chat-prompt.ts`. Project and skill lists come from `src/lib/projects.ts`, so the bot stays in sync with the Projects section.
- Set a monthly spend limit on the Anthropic account. The per-IP limits in the route are kept in memory and are best-effort only.
