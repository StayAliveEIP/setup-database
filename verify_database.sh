# Get the first argument as mongodb url
MONGODB_URL=$1

if [ -z "$1" ]
then
    echo "The local MongoDB URL is not provided, using default URL: mongodb://localhost:27017/stayalive"
    MONGODB_URL="mongodb://localhost:27017/stayalive"
fi

echo "Your MongoDB URL is: $MONGODB_URL"

echo "----------------------------------------------"
echo 'Connecting to MongoDB...'
echo "----------------------------------------------"

mongosh $MONGODB_URL verifyDatabase.js --quiet