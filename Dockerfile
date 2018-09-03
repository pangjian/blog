FROM node:6.10.3-slim
RUN apt-get update \
    && apt-get install -y nginx && npm i -g hexo-cli
WORKDIR /blog
COPY . /blog/
EXPOSE 80
RUN  npm install \
     && hexo g \
     && cp -r public/* /var/www/html \
     && rm -rf /blog
CMD ["nginx","-g","daemon off;"]
