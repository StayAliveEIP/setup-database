# Verify that script take a first agument

# Get the first argument as mongodb url
MONGODB_URL=$1

DEFAULT_MONGODB_URL="mongodb://localhost:27017/stayalive"

if [ -z "$1" ]
then
    echo "The local MongoDB URL is not provided, using default URL: $DEFAULT_MONGODB_URL"
    MONGODB_URL=$DEFAULT_MONGODB_URL
fi

echo "Your MongoDB URL is: $MONGODB_URL"

echo "----------------------------------------------"
echo 'Connecting to MongoDB...'
echo "----------------------------------------------"

# Connect to mongosh with MONGODB_URL and use stayalive database

echo "#### Executing script for all collections ####"
for file in ./collections/*.js
do
    echo "Executing script file: $file"
    mongosh $MONGODB_URL --quiet $file
    if (($? != 0)); then
        echo "Error while executing script file: $file"
        exit 1
    fi
done
echo "#### Validation script executed ####"