const COLLECTION_NAME = 'documents';

// Create the collection if not exists.
db.getCollection(COLLECTION_NAME).exists() || db.createCollection(COLLECTION_NAME);

const validator = {
    "$jsonSchema": {
        bsonType: "object",
        required: ["_id", "user", "type", "status", "message", "lastUpdate", "binaryFile", "mimeType"],
        properties: {
            "_id": {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            "user": {
                bsonType: "objectId",
                description: "must be a objectId and is required"
            },
            "type": {
                bsonType: "string",
                description: "must be a string and is required"
            },
            "status": {
                bsonType: "string",
                description: "must be a string and is required"
            },
            "message": {
                bsonType: ["string", "null"],
                description: "must be a string or null",
            },
            "lastUpdate": {
                bsonType: "date",
                description: "must be the date of last modification of the status of the document",
            },
            "binaryFile": {
                bsonType: "binData",
                description: "The content of the file is required",
            },
            "mimeType": {
                bsonType: "string",
                description: "The mimetype of the file"
            }
        },
        additionalProperties: false
    }
};

// Insert the validator into the database.
db.runCommand({
    collMod: COLLECTION_NAME,
    validator: validator,
    validationLevel: "strict",
    validationAction: "error"
});
