FROM node:20-bookworm-slim

WORKDIR /srv/trailmix
COPY api/package.json ./
RUN npm install --omit=dev
COPY api/ ./
RUN mkdir -p uploads

EXPOSE 4000
CMD ["node", "src/server.js"]
