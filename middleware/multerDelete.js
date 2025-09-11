const fs = require("fs");
const path = require("path");

// Helper function to delete files (for CommonJS)
const deleteFile = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    // __dirname is available directly in CommonJS
    const filename = fileUrl.split("/").pop();
    const filePath = path.normalize(path.join(__dirname, "..", "uploads", filename));

    // Check if the file exists asynchronously before deleting
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath); // Asynchronous deletion
      console.log(`✅ Deleted file: ${filename}`);
    } else {
      console.log(`❌ File not found: ${filename}`);
    }
  } catch (err) {
    console.error(`❌ Error deleting file: ${fileUrl}`, err);
  }
};

module.exports = { deleteFile };
