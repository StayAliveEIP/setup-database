# Set the variable
tmpDirPath="mongodb-clone-tmp"

# Verify that script take a first agument
if [ -z "$1" ]
then
    echo "Please provide a mongodb url as a first argument"
    exit 1
fi

# Get the first argument as mongodb url
mongoUrl=$1
# Dump remote database to a local folder
mongodump --uri "$mongoUrl" --out "$tmpDirPath"
echo "Dump completed"
# Restore the database from the folder to localhost
mongorestore --port 27017 "$tmpDirPath"
echo "Restore completed"
rm -rf "$tmpDirPath"