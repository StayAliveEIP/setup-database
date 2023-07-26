const COLLECTION_NAME = 'rescuers';

// Create the collection if not exists.
db.getCollection(COLLECTION_NAME).exists() || db.createCollection(COLLECTION_NAME);

const validator = {
    "$jsonSchema": {
        bsonType: "object",
        required: ["_id", "firstname", "lastname", "email", "phone", "password"],
        properties: {
            "_id": {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            "firstname": {
                bsonType: "string",
                description: "must be a string and is required"
            },
            "lastname": {
                bsonType: "string",
                description: "must be a string and is required"
            },
            "email": {
                bsonType: "object",
                required: ["email", "lastCodeSent", "code", "verified"],
                properties: {
                    "email": {
                        bsonType: ["string"],
                        description: "must be a string and is required"
                    },
                    "lastCodeSent": {
                        bsonType: ["date", "null"],
                        description: "must be a date or null"
                    },
                    "code": {
                        bsonType: ["string", "null"],
                        description: "must be a string or null"
                    },
                    "verified": {
                        bsonType: ["bool"],
                        description: "must be a boolean"
                    }
                },
                additionalProperties: false
            },
            "phone": {
                bsonType: "object",
                required: ["phone", "lastCodeSent", "code", "verified"],
                properties: {
                    "phone": {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    "lastCodeSent": {
                        bsonType: ["date", "null"],
                        description: "must be a date or null"
                    },
                    "code": {
                        bsonType: ["string", "null"],
                        description: "must be a string or null"
                    },
                    "verified": {
                        bsonType: "bool",
                        description: "must be a boolean"
                    }
                },
                additionalProperties: false
            },
            "password": {
                bsonType: "object",
                required: ["password", "token", "lastTokenSent", "lastChange"],
                properties: {
                    "password": {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    "lastTokenSent": {
                        bsonType: ["date", "null"],
                        description: "must be a date or null"
                    },
                    "token": {
                        bsonType: ["string", "null"],
                        description: "must be a string or null"
                    },
                    "lastChange": {
                        bsonType: ["date", "null"],
                        description: "must be a date or null"
                    }
                },
                additionalProperties: false
            },
            available : {
                bsonType: "bool",
                description: "must be a boolean"
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
