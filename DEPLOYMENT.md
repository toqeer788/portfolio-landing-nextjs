# 🚀 Руководство по деплою

Этот документ содержит подробные инструкции по развертыванию Portfolio Landing Page на различных платформах.

## 📋 Предварительные требования

- Node.js 18+
- npm 9+
- Git

## 🔧 Локальная сборка

```bash
# Клонирование репозитория
git clone https://github.com/FrankFMY/portfolio-landing-nextjs.git
cd portfolio-landing-nextjs

# Установка зависимостей
npm install

# Сборка для продакшена
npm run build

# Запуск продакшен сервера
npm start
```

## 🌐 Платформы для деплоя

### 1. Vercel (Рекомендуется)

Vercel - это платформа, созданная разработчиками Next.js, обеспечивающая оптимальную производительность.

#### Автоматический деплой через GitHub

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `portfolio-landing-nextjs`
5. Настройки по умолчанию подходят для Next.js
6. Нажмите "Deploy"

#### Ручной деплой через CLI

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин в Vercel
vercel login

# Деплой
vercel --prod
```

#### Переменные окружения (если нужны)

```bash
# В настройках проекта на Vercel
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 2. Netlify

Netlify предоставляет автоматический деплой из Git с отличной производительностью.

#### Настройка

1. Перейдите на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий
3. Настройки сборки:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18

#### Файл конфигурации (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Railway

Railway - современная платформа для деплоя с простой настройкой.

#### Настройка

1. Перейдите на [railway.app](https://railway.app)
2. Подключите GitHub репозиторий
3. Railway автоматически определит Next.js проект
4. Нажмите "Deploy"

### 4. DigitalOcean App Platform

DigitalOcean предоставляет масштабируемый хостинг для приложений.

#### Настройка

1. Перейдите в [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Создайте новое приложение
3. Подключите GitHub репозиторий
4. Выберите Node.js как runtime
5. Настройте переменные окружения при необходимости

### 5. AWS Amplify

AWS Amplify предоставляет полную экосистему для веб-приложений.

#### Настройка

1. Перейдите в [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Нажмите "New app" → "Host web app"
3. Подключите GitHub репозиторий
4. Настройки сборки:
   - **Build command:** `npm run build`
   - **Output directory:** `.next`

## 🔒 Переменные окружения

Создайте файл `.env.local` для локальной разработки:

```env
# Опционально - для аналитики
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Для контактной формы (если используется внешний сервис)
CONTACT_EMAIL=your-email@example.com
```

## 📊 Мониторинг производительности

### Vercel Analytics

```bash
# Установка
npm install @vercel/analytics

# Использование в layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```bash
# Установка
npm install @next/third-parties

# Использование в layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

## 🧪 Тестирование после деплоя

После деплоя обязательно проверьте:

1. **Функциональность:**

   ```bash
   npm run test:e2e
   ```

2. **Производительность:**
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse)
   - [PageSpeed Insights](https://pagespeed.web.dev/)

3. **SEO:**
   - Проверьте sitemap: `your-domain.com/sitemap.xml`
   - Проверьте robots.txt: `your-domain.com/robots.txt`

## 🔄 CI/CD Pipeline

### GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Устранение неполадок

### Частые проблемы

1. **Ошибка сборки:**

   ```bash
   # Очистите кэш
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Проблемы с изображениями:**
   - Убедитесь, что изображения находятся в папке `public/`
   - Используйте Next.js Image компонент для оптимизации

3. **Проблемы с API роутами:**
   - Проверьте, что API роуты находятся в `src/app/api/`
   - Убедитесь в правильности обработки CORS

### Логи и отладка

```bash
# Локальная отладка
npm run dev

# Продакшен отладка
NODE_ENV=production npm start

# Анализ бандла
npm run analyze
```

## 📈 Оптимизация

### Изображения

```bash
# Оптимизация изображений
npm install sharp

# Использование в next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/webp', 'image/avif'],
  },
});
```

### Кэширование

```bash
# Настройка кэширования в next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 📞 Поддержка

Если у вас возникли проблемы с деплоем:

1. Проверьте логи в консоли платформы деплоя
2. Убедитесь, что все зависимости установлены
3. Проверьте переменные окружения
4. Обратитесь к документации платформы

---

**Удачного деплоя! 🚀**
