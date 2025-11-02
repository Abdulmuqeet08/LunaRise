if [ -z "$1" ]
  then
    echo "No argument supplied"
  else
    cd ../backend
   #npm install --force &&
    NODE_ENV=$1 npm run  devServer
    # NODE_ENV=$1 pm2 start index.js --name $1
fi

