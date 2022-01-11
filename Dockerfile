# build environment
FROM node:10
COPY ./ /app
WORKDIR /app
RUN yarn install
RUN yarn run build

# production environment
FROM nginx:latest
RUN mkdir /app
COPY --from=0 /app/dist /app
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
