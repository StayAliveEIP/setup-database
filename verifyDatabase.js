/*
 $      Check candidates collection.
 */
const verifyDatabase = (collectionName) => {
    try {
        const result = db.getCollectionInfos({name: collectionName});
        if (result.length === 0) {
            console.error("[ERROR] The collection '" + collectionName + "' does not exist");
            return;
        }
        if (!result[0].options.validator) {
            console.error("[ERROR] The collection '" + collectionName + "' has no validator");
            return;
        }
        const valides = db[collectionName].validate();
        if (valides.nNonCompliantDocuments) {
            console.error("️[ERROR] " + valides.nNonCompliantDocuments + " invalid " + collectionName + "(s) found");
        } else {
            console.log("️[OK] " + collectionName + " collection is valid");
        }
    } catch (err) {
        console.error("[ERROR] " + err.message)
    }
}

const collections = ["drivingSchools", "availabilities", "centers", "departments", "thresholdsInformation",
    "thresholdsReached", "exams", "examsFound", "examsBooked", "candidates"];

for (let i = 0; i < collections.length; i++) {
    const collectionName = collections[i];
    verifyDatabase(collectionName);
}