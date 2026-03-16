FROM node:20-alpine

# สร้างโฟลเดอร์แอป
WORKDIR /app

# copy package
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# expose port
EXPOSE 3000

# run dev (สำหรับ dev)
CMD ["npm", "run", "dev"]
