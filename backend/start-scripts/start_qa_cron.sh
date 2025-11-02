export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v12.13.1/bin
cd /home/praveen/apps/activeclub/qa/api/classes
NODE_ENV=qa
npm install
pm2 start cron-qa.yml
