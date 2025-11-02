const { sequelize } = require('models/index.js');

module.exports = class UpsertUserProfileQuery {
    constructor({ userId, headline, summary, skills, certifications, updatedat }) {
        this.userId = userId;
        this.headline = headline;
        this.summary = summary;
        this.skills = skills;
        this.certifications = certifications;
        this.updatedat = updatedat;
        console.log('Received user profile update data:', this);
    }

    async get() {
        // Execute SQL query using Sequelize raw query
        const result = await sequelize.query(`
            MERGE INTO dbo.p4u_UserProfiles AS target
            USING (SELECT :userId AS UserID) AS source
            ON target.UserID = source.UserID
            WHEN MATCHED THEN 
                UPDATE SET 
                    Headline = COALESCE(NULLIF(:headline, ''), target.Headline),
                    Summary = COALESCE(NULLIF(:summary, ''), target.Summary),
                    Skills = COALESCE(NULLIF(CONCAT(target.Skills, ', ', :skills), ''), target.Skills),
                    Certifications = COALESCE(NULLIF(CONCAT(target.Certifications, ', ', :certifications), ''), target.Certifications),
                    UpdatedAt = GETDATE()
            WHEN NOT MATCHED THEN 
                INSERT (UserID, Headline, Summary, Skills, Certifications, UpdatedAt)
                VALUES (:userId, :headline, :summary, :skills, :certifications, GETDATE());
        `, {
            replacements: {
                userId: this.userId,
                headline: this.headline,
                summary: this.summary,
                skills: this.skills,
                certifications: this.certifications
            },
            type: sequelize.QueryTypes.UPSERT
        });

        console.log('✅ User profile upserted successfully:', result);
        return result;
    }

    // async fetch() {
    //     // Fetch user profile data
    //     const result = await sequelize.query(`
    //         SELECT UserID, Headline, Summary, Skills, Certifications, UpdatedAt 
    //         FROM dbo.p4u_UserProfiles 
    //         WHERE UserID = :userId;
    //     `, {
    //         replacements: { userId: this.userId },
    //         type: sequelize.QueryTypes.SELECT
    //     });

    //     console.log('✅ User profile fetched successfully:', result);
    //     return result;
    // }
};
