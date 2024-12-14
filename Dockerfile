## docker file 

FROM  node:20.18.1 AS build

WORKDIR /app

#install ANGULAR
RUN npm install

##coppy 

COPY . .

RUN npm run build --prod

FROM nginx:stable-alpine

COPY --from=build /app/dist/QUAYTHUONG/usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]