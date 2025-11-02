const fs = require("fs");
const path = require("path");
const { sequelize } = require("../../../models/index.js");

module.exports = class UploadQuery {
    constructor(details) {
        this.details = details;
    }

    async get() {
        try {
            const { fileName, userID, moduleName, filePath, fileSize, fileType } = this.details.entity;

            console.log("🔄 Processing file:", fileName);
            if (!fileName || !userID || !moduleName || !filePath) {
                throw new Error("Missing required fields: fileName, userID, moduleName, or filePath");
            }

            // *Check if user exists*
            const userExistsQuery = "SELECT 1 FROM p4u_Users WHERE UserID = :userID";
            const userExists = await sequelize.query(userExistsQuery, {
                replacements: { userID },
                type: sequelize.QueryTypes.SELECT,
            });

            if (!userExists.length) {
                throw new Error("UserID does not exist in database.");
            }

            // Define modules that require upsert (Profile & Banner need to replace/update existing ones)
            const upsertModules = ["Profile", "Banner"];

            // Determine query dynamically
            const isUpsert = upsertModules.includes(moduleName);
            const query = isUpsert
                ? `
                    MERGE INTO p4u_uploads AS target
                    USING (SELECT :fileName AS FileName, :fileType AS FileType, :fileSize AS FileSize, 
                                  :filePath AS FilePath, :moduleName AS ModuleName, :userID AS UserID) AS source
                    ON target.ModuleName = source.ModuleName AND target.UserID = source.UserID
                    WHEN MATCHED THEN 
                        UPDATE SET 
                            FileName = source.FileName,
                            FileSize = source.FileSize,
                            FilePath = source.FilePath,
                            UpdatedAt = CURRENT_TIMESTAMP
                    WHEN NOT MATCHED THEN 
                        INSERT (FileName, FileType, FileSize, FilePath, ModuleName, UserID, CreatedAt, UpdatedAt)
                        VALUES (source.FileName, source.FileType, source.FileSize, source.FilePath, source.ModuleName, source.UserID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `
                : `
                    INSERT INTO p4u_uploads (FileName, FileType, FileSize, FilePath, ModuleName, UserID, CreatedAt, UpdatedAt)
                    VALUES (:fileName, :fileType, :fileSize, :filePath, :moduleName, :userID, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `;

            const response = await sequelize.query(query, {
                replacements: { fileName, fileType, fileSize, filePath, moduleName, userID },
                type: isUpsert ? sequelize.QueryTypes.RAW : sequelize.QueryTypes.INSERT,
            });

            console.log(`✅ File ${isUpsert ? "added/updated" : "uploaded"} successfully`);
            console.log("📝 SQL Query Raw Response:", response);

            return { success: true };

        } catch (e) {
            console.error("❌ ERROR in Upload Query:", e.message);
            return { success: false, error: e.message };
        }
    }
};
