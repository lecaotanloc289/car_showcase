## Config global.css
NINJAR_API_KEY=XWpzINer8p9z3K3tacz+Lg==gNN4zEBzskchmsmD
When migrate from tailwindcss v3 to tailwindcss v4, we need to change something: 
First, import font family from Google Font
```
@import url("Your url font family")
@import "tailwindcss"
```

Second, convert tailwind.config.js into global.css, tailwindcss v4 do not use tailwind.config.js file
```
theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
```
To 
```

@theme {
  --font-sans: "Manrope", sans-serif;

  --color-black-100: #2b2c35;

  --color-primary-blue: #2b59ff;
  --color-primary-blue-100: #f5f8ff;

  --color-secondary-orange: #f79761;

  --color-light-white: rgba(59, 60, 152, 0.03);
  --color-light-white-100: rgba(59, 60, 152, 0.02);

  --color-grey: #747a88;

  --bg-hero: url("/hero-bg.png");
  --bg-pattern: url("/pattern.png");
}
@utility bg-img-hero {
  background-image: var(--bg-hero);
}

@utility bg-img-pattern {
  background-image: var(--bg-pattern);
} 
```
After that, ignore class `ring-opacity-5` and change class `ring-black` become `ring-black/5`
We are done! Config tailwindcss v4 completely!

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
