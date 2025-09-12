const fs = require("fs");
const path = require("path");

const UPLOADS_FOLDER = "/root/drug_Ecom-/uploads";

const deleteFile = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    const filename = fileUrl.split("/").pop();
    const filePath = path.join(UPLOADS_FOLDER, filename);

    // Check if file exists, then delete
    await fs.promises.access(filePath);
    await fs.promises.unlink(filePath);
    console.log(`✅ Deleted file: ${filename}`);
  } catch (err) {
    console.log(`❌ File not found or error deleting: ${fileUrl}`);
  }
};

module.exports = { deleteFile };
