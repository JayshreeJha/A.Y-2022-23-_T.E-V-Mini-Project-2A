FROM nginx:1.19-alpine

RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d
# CMD ["nginx", "-g", "daemon off;"]