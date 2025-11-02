# React Rest Countries

A lightweight React app that displays countries with search and details, enriched with live weather and currency exchange info.

## Features
- Search countries by name (client-side, case-insensitive).
- Country grid shows flag, name, and capital(s).
- Country details page (/country/:name):
  - Country data from REST Countries (e.g., name, coat of arms).
  - Current weather via Open-Meteo (temperature, day/night, precipitation probability).
  - EUR → local currency exchange rate via ExchangeRate-API.
- Animated UI cards and detail hero.
- Loading states with spinner.
- Tailwind + DaisyUI for styling/components.

## Main tech stack
- React 19, React DOM 19
- React Router 7
- Vite 7 (with @vitejs/plugin-react)
- Axios for HTTP
- Tailwind CSS 4 + DaisyUI 5
- Framer Motion 12 for animations

## Animations
- Staggered card reveal on the country grid using Framer Motion:
  - initial `{ opacity: 0, y: 20 }` → animate `{ opacity: 1, y: 0 }`
  - per-card delay: `index * 0.04`
- Detail page “hero” content fades and slides in:
  - transitions use `duration: 0.5` with `ease: "easeOut"`

## APIs and endpoints used
- REST Countries (v3.1)
  - `GET https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3`
  - `GET https://restcountries.com/v3.1/name/{name}?fullText=true`
- Open‑Meteo (current weather by coordinates)
  - `GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,is_day,precipitation_probability`
- ExchangeRate‑API (EUR → local currency)
  - `GET https://v6.exchangerate-api.com/v6/{API_KEY}/pair/EUR/{CURRENCY}/1`
