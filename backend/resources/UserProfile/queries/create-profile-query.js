// const { sequelize } = require('models/index.js');

// module.exports = class CreateUserProfileQuery {
//     constructor({ userId, headline, summary, skills, certifications }) {
//         this.UserId = userId;
//         this.Headline = headline;
//         this.Summary = summary;
//         this.Skills = skills;
//         this.Certifications = certifications;
//         console.log('Received user profile data:', this);
//     }

//     async get() {
//         return sequelize.query(`
//             MERGE INTO dbo.p4u_UserProfiles AS target
//             USING (SELECT :UserId AS UserID) AS source
//             ON target.UserID = source.UserID
//             WHEN MATCHED THEN
//                 UPDATE SET 
//                     Headline = :Headline,
//                     Summary = :Summary,
//                     Skills = :Skills,
//                     Certifications = :Certifications,
//                     UpdatedAt = GETDATE()
//             WHEN NOT MATCHED THEN
//                 INSERT (UserID, Headline, Summary, Skills, Certifications, CreatedAt, UpdatedAt)
//                 VALUES (:UserId, :Headline, :Summary, :Skills, :Certifications, GETDATE(), GETDATE());
//         `, {
//             replacements: {
//                 userId: this.UserId,
//                 headline: this.Headline,
//                 summary: this.Summary,
//                 skills: this.Skills,
//                 certifications: this.Certifications
//             },
//             type: sequelize.QueryTypes.INSERT
//         });
//     }
// };

const { sequelize } = require('models/index.js');
module.exports = class CreateUserProfileQuery {
    constructor({ userId, Headline, Summary, Skills, Certifications }) {
        this.userId = userId;
        this.headline = Headline  // Assign values from frontend request
        this.summary = Summary 
        this.skills = Skills 
        this.certifications = Certifications 
        console.log('Received user profile data:', this);
    }

    async get() {
        console.log('Executing query with replacements:', {
            userId: this.userId,
            headline: this.headline,
            summary: this.summary,
            skills: this.skills,
            certifications: this.certifications
        });

        return sequelize.query(`
            MERGE INTO dbo.p4u_UserProfiles AS target
            USING (SELECT :userId AS UserID) AS source
            ON target.UserID = source.UserID
            WHEN MATCHED THEN
                UPDATE SET 
                    Headline = :headline,
                    Summary = :summary,
                    Skills = :skills,
                    Certifications = :certifications,
                    UpdatedAt = GETDATE()
            WHEN NOT MATCHED THEN
                INSERT (UserID, Headline, Summary, Skills, Certifications, CreatedAt, UpdatedAt)
                VALUES (:userId, :headline, :summary, :skills, :certifications, GETDATE(), GETDATE());
        `, {
            replacements: {
                userId: this.userId,
                headline: this.headline,
                summary: this.summary,
                skills: this.skills,
                certifications: this.certifications
            },
            type: sequelize.QueryTypes.INSERT
        });
    }
};
