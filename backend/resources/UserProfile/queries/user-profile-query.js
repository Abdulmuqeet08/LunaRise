const { sequelize } = require('models/index.js');

module.exports = class GetUserProfileQuery {
    constructor(userId) {
        // Ensure userId is assigned correctly
        this.userId = userId && userId.userId ? userId.userId : userId;  
        //console.log('📌 Received userId:', this.userId);
    }

    async get() {
        try {
            if (!this.userId) {
                throw new Error('❌ Invalid userId: Cannot fetch profile');
            }

            //console.log('🔍 Fetching user profile for userId:', this.userId);

            const result = await sequelize.query(`
                  SELECT 
                    up.ProfileID, 
                    COALESCE(up.UserID, img.UserID) AS UserID,  -- Ensure UserID is always retrieved
                    u.UserName, 
                    u.ProfilePicture, 
                    up.Headline, 
                    up.Summary, 
                    up.Skills, 
                    up.Certifications, 
                    up.CreatedAt, 
                    up.UpdatedAt,
                    MAX(CASE WHEN img.ModuleName = 'Profile' THEN img.FilePath END) AS ProfileImagePath,  -- ✅ Profile Image
                    MAX(CASE WHEN img.ModuleName = 'Banner' THEN img.FilePath END) AS ProfileBannerPath  -- ✅ Profile Banner
                FROM dbo.p4u_Users AS u
                LEFT JOIN dbo.p4u_UserProfiles AS up ON up.UserID = u.UserID  -- Allow users without profiles
                LEFT JOIN dbo.p4u_uploads AS img ON u.UserID = img.UserID  -- ✅ Join with images table
                WHERE COALESCE(up.UserID, img.UserID) = :userId  -- Ensure it works when ProfileID is NULL
                GROUP BY 
                    up.ProfileID, COALESCE(up.UserID, img.UserID), u.UserName, u.ProfilePicture, 
                    up.Headline, up.Summary, up.Skills, up.Certifications, 
                    up.CreatedAt, up.UpdatedAt;

            `, {
                replacements: { userId: this.userId }, 
                type: sequelize.QueryTypes.SELECT
            });

            //console.log('✅ Retrieved user profile:', result[0]);
            return result[0];

        } catch (error) {
            console.error('❌ Error fetching user profile:', error);
            throw error;
        }
    }
};
