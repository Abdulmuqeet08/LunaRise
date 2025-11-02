const fs = require('fs');
const path = require('path');
const { sequelize } = require('models/index.js'); // Ensure Sequelize is correctly configured
const config = require('../../../config/dev.json');

module.exports = class UploadPost {
    constructor(details) {
        this.details = details;
    }

    async get() {
        try {
            const { fileName, userID, filePath } = this.details.entity;
            let storagePath;
            let relativePath;

            // Extract file details dynamically
            const fileSize = fs.statSync(filePath).size;
            const fileType = fileName.split('_')[0]; // Extracts the first part before '_'
            const moduleName = fileType;

            console.log("📝 File Type Detected:", fileType);

            // Determine the correct storage path based on file type
            if (fileType === "Post") {
                storagePath = path.resolve(__dirname, config.postpath);
                relativePath = path.join("assets/profile/post", fileName);
            } 
            else if (fileType === "Profile") {
                storagePath = path.resolve(__dirname, config.profileavatarpath);
                relativePath = path.join("assets/profile/profile_avatar", fileName);
            } 
            else if (fileType === "Banner") {
                storagePath = path.resolve(__dirname, config.bannerpath);
                relativePath = path.join("assets/profile/banner", fileName);
            } 
            else {
                throw new Error("❌ Invalid file type provided.");
            }

            // Ensure the storage directory exists
            if (!fs.existsSync(storagePath)) {
                fs.mkdirSync(storagePath, { recursive: true });
            }

            // ✅ Absolute file path after determining storagePath
            const absoluteFilePath = path.join(storagePath, fileName);

            console.log("🔍 Validating File Path:", absoluteFilePath);
            console.log("📂 File Exists?", fs.existsSync(absoluteFilePath));

            // Validate if the file exists before processing
            if (!fs.existsSync(filePath)) {
                throw new Error(`❌ File not found at ${filePath}`);
            }

            // Save or move the file to the correct location
            fs.copyFileSync(filePath, absoluteFilePath);
            console.log(`✅ File saved successfully: ${absoluteFilePath}`);

            // Step 1: Check if the user exists
            const userExistsQuery = "SELECT 1 FROM p4u_Users WHERE UserID = :userID";
            const userExists = await sequelize.query(userExistsQuery, {
                replacements: { userID },
                type: sequelize.QueryTypes.SELECT,
            });

            if (!userExists.length) {
                throw new Error("❌ UserID does not exist in p4u_Users.");
            }

            let response;
            if (fileType === "Profile" || fileType === "Banner") {
                // ✅ Use MERGE instead of ON DUPLICATE KEY UPDATE for MSSQL
                const upsertQuery = `
                    MERGE INTO p4u_uploads AS target
                    USING (SELECT :fileName AS FileName, :fileType AS FileType, :fileSize AS FileSize, 
                                  :relativePath AS FilePath, :moduleName AS ModuleName, :userID AS UserID) AS source
                    ON target.FileType = source.FileType AND target.UserID = source.UserID
                    WHEN MATCHED THEN 
                        UPDATE SET 
                            FileName = source.FileName,
                            FileSize = source.FileSize,
                            FilePath = source.FilePath,
                            UpdatedAt = CURRENT_TIMESTAMP
                    WHEN NOT MATCHED THEN 
                        INSERT (FileName, FileType, FileSize, FilePath, ModuleName, UserID, CreatedAt, UpdatedAt)
                        VALUES (source.FileName, source.FileType, source.FileSize, source.FilePath, source.ModuleName, source.UserID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `;

                response = await sequelize.query(upsertQuery, {
                    replacements: { fileName, fileType, fileSize, relativePath, moduleName, userID },
                    type: sequelize.QueryTypes.RAW,
                });

                console.log("🔄 Profile/Banner added or updated successfully");
            } else if (fileType === "Post") {
                // ✅ Always insert a new entry for posts
                const insertPostQuery = `
                    INSERT INTO p4u_uploads (FileName, FileType, FileSize, FilePath, ModuleName, UserID, CreatedAt, UpdatedAt)
                    VALUES (:fileName, :fileType, :fileSize, :relativePath, :moduleName, :userID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `;

                response = await sequelize.query(insertPostQuery, {
                    replacements: { fileName, fileType, fileSize, relativePath, moduleName, userID },
                    type: sequelize.QueryTypes.INSERT,
                });

                console.log("✅ New post entry created");
            }

            console.log("📝 SQL Query Raw Response:", response);
            return { success: true };
        } catch (e) {
            console.error("❌ Error in UploadPost:", e.message);
            return { success: false, error: e.message };
        }
    }
};
