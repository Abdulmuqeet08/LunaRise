export PATH=$PATH:/home/praveen/.nvm/versions/node/v12.13.1/bin
cd $1
NODE_ENV=qa
npm install
pm2 start qa.yml