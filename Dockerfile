FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY config.js /usr/share/nginx/html/config.js
EXPOSE 8080
CMD sed -i 's/listen  80/listen  8080/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
