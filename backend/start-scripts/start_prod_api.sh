export PATH=$PATH:/home/deploy/.nvm/versions/node/v12.13.1/bin
cd $1
NODE_ENV=production
npm install
pm2 start prod.yml