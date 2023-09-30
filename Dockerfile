# stage 1
FROM node:latest AS frontend-web
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY ./ /usr/local/app/ 
RUN npm install 
RUN npm run build

# stage 2 
FROM nginx:latest
COPY --from=frontend-web /usr/local/app/dist/web-frontend /usr/share/nginx/html
COPY --from=frontend-web /usr/local/app/.htaccess /usr/share/nginx/html
COPY --from=frontend-web /usr/local/app/robots.txt /usr/share/nginx/html
COPY --from=frontend-web /usr/local/app/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80