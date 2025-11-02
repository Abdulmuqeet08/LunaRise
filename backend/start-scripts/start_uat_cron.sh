export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v12.13.1/bin
cd /home/praveen/apps/activeclub/uat/api/classes
NODE_ENV=uat
npm install
pm2 start cron-uat.yml
