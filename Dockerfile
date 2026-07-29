FROM node:22-bookworm-slim AS build
WORKDIR /src

# Copia tudo antes do npm ci porque o postinstall (fumadocs-mdx) precisa do source.config.ts
# e do content/ para gerar .source/.
COPY . .

# NEXT_PUBLIC_* e inlinado no bundle em tempo de build, entao o dominio final precisa entrar aqui
# e nao no runtime. Alimenta metadataBase, URL canonica, Open Graph, sitemap.xml e robots.txt.
ARG NEXT_PUBLIC_SITE_URL=https://ajuda.mainstay.com.br
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm ci && npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# `output: 'standalone'` monta o servidor minimo, mas nao copia estaticos nem public/.
COPY --from=build /src/.next/standalone ./
COPY --from=build /src/.next/static ./.next/static
COPY --from=build /src/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
