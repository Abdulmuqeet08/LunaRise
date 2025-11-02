export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v12.13.1/bin
cd /home/deploy/apps/activeclub/prod/api/classes
NODE_ENV=production
npm install
pm2 start cron-prod.yml
