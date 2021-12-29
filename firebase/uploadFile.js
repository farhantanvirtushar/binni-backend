const storageRef = require("./firabaseinit.js");
const { v4: uuidv4 } = require("uuid");

async function uploadFile(path, filename) {
  try {
    const storage = await storageRef.upload(path, {
      public: true,
      destination: `/uploads/coverimages/${filename}`,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    });

    return storage[0].metadata.mediaLink;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");

    throw error;
  }
}

module.exports = uploadFile;
