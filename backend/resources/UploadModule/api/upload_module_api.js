const Route = require('route');
const { respond, composeResult } = require("lib");
const db = require('db/repository');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../../../models/index.js');
const UploadQuery = require('../query/upload_module_query');
const Storage = require('../query/upload_storage_mapping');

async function Upload(req) {
    try {
        const { userID, fileName, imageData, modulename } = req.body;

        if (!userID || !fileName || !imageData || !modulename) {
            throw new Error("Missing required fields: userID, fileName, imageData, or modulename");
        }

        console.log("📩 Received Upload Request for Module:", modulename);
        console.log("🔄 Processing file:", fileName);

        // **Fetch Storage Path from DB**
        const DBPath = new Storage(modulename);
        const storagePathResult = await DBPath.get(); // ✅ Await `get()`

        console.log("🔍 Query Result:", storagePathResult);

        // **Ensure storagePathResult contains a valid path**
        if (!storagePathResult) {
            throw new Error(`❌ Failed to retrieve storage path for module: ${modulename}`);
        }

        const storagePath = path.resolve(__dirname, '../../src/assets', storagePathResult.trim());
        console.log("📂 Dynamic Storage Path from DB:", storagePath);

        // **Ensure the directory exists**
        if (!fs.existsSync(storagePath)) {
            console.log("📁 Creating missing directory...");
            fs.mkdirSync(storagePath, { recursive: true });
        }

        // **Extract and validate file format**
        const match = imageData.match(/^data:(.*);base64,/);
        if (!match) {
            return respond(Promise.reject(new Error("❌ Invalid file format")), null, 'Invalid file format');
        }

        const mimeType = match[1]; // Extracts 'image/png', 'image/jpeg', etc.
        const base64Data = imageData.split(",")[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // **Generate unique filename using timestamp**
        const fileExtension = mimeType.split("/")[1]; // Extracts 'png', 'jpeg'
        const timestamp = Date.now(); // Unique timestamp
        const newFileName = `${modulename}_${userID}_${timestamp}.${fileExtension}`; // New format
        const savedFilePath = path.join(storagePath, newFileName);
        const fileType = fileExtension; // Stores 'png', 'jpeg'

        console.log("📍 Final Storage Path:", savedFilePath);

        // **Save the file**
        fs.writeFileSync(savedFilePath, buffer);
        console.log(`✅ File saved at: ${savedFilePath}`);

        // **Ensure file exists before continuing**
        if (!fs.existsSync(savedFilePath)) {
            console.error("❌ File not found after save:", savedFilePath);
            return respond(Promise.reject(new Error("File save verification failed")), null, 'File upload failed');
        }

        // **Normalize path for DB storage**
        const normalizedPath = savedFilePath.replace(/\//g, '\\'); // Convert all '/' to '\'
        const assetsIndex = normalizedPath.indexOf('\\assets\\');
        const relativeFilePath = assetsIndex !== -1 ? normalizedPath.substring(assetsIndex + 1) : savedFilePath;
        const finalFilePath = relativeFilePath.startsWith('\\') ? relativeFilePath.substring(1) : relativeFilePath;

        console.log("✅ Final Relative Path for DB:", finalFilePath);

        // **Prepare metadata for DB**
        const fileDetails = {
            entity: {
                userID,
                fileName: newFileName,  // Includes timestamp now
                fileType: mimeType,
                fileSize: buffer.length,
                filePath: finalFilePath, // Stores only 'assets\profile\...'
                moduleName: modulename,
                savedFilePath,
            }
        };

        console.log("📝 Saving metadata to DB:", fileDetails);

        // **Insert into DB**
        const response = await composeResult(() => db.execute(new UploadQuery(fileDetails)))();
        console.log(" SQL Query Raw Response:", response);
        console.log("✅ Database response:", response);

        return respond(response, 'File uploaded successfully', 'File upload failed');

    } catch (error) {
        console.error("❌ Upload Error:", error.message);
        return respond(Promise.reject(new Error(error.message)), null, 'File upload failed');
    }
}

// **Define API Route**
Route.withOutSecurity().noAuth().post('/Uploads', Upload).bind();

module.exports = { Upload };
