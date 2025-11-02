const { factory } = require('factory-girl');
const moment = require('moment');
const Time = require('lib/time.js');


const loadFactory = async () => {
    factory.define('section', Object, {
        id: factory.chance('guid'),
        channelId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        schoolName: factory.chance('name'),
        class: factory.chance('name'),
        section: factory.chance('name')
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const channelId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.channelId = channelId;
            return model;
        }
    });

    factory.define('leaderboard', Object, {
        id: factory.chance('guid'),
        section: factory.assocAttrs('section'),
        cluster: factory.assocAttrs('cluster'),
        trainerId: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const trainerId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.trainerId = trainerId;
            return model;
        }
    });

    factory.define('studentleaderboard', Object, {
        id: factory.chance('guid'),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboard: factory.assocAttrs('leaderboard'),
        score: 0,
        isActive: true,
        application: factory.chance('name'),
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const smId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.smId = smId;
            return model;
        }
    });

    factory.define('activityDetail', Object, {
        id: factory.chance('guid'),
        sNo: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        name: factory.chance('name'),
        language: 'English',
        kind: factory.chance('name'),
        subCategory: factory.chance('name'),
        text: factory.chance('name'),
        description: factory.chance('name'),
        grade: 'A',
        active: true,
        imageUrl: 'http://imageurl.com',
        points: 0,
        youtubeUrl: 'http://youtube.com'

    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const sNo = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.sNo = sNo;
            return model;
        }
    });

    factory.define('question', Object, {
        id: factory.chance('guid'),
        text: factory.chance('name'),
        category: factory.chance('name'),
        language: factory.chance('name'),
        points: 2,
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        options: [{
            id: factory.chance('guid'),
            text: factory.chance('name'),
            isAnswer: true
        }, {
            id: factory.chance('guid'),
            text: factory.chance('name'),
            isAnswer: false
        }]
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.createdById = createdById;
            return model;
        }
    });

    factory.define('options', Object, {
        id: factory.chance('guid'),
        text: factory.chance('name'),
        isAnswer: true
    });

    factory.define('quizDetail', Object, {
        id: factory.chance('guid'),
        name: factory.chance('name'),
        category: factory.chance('name'),
        language: 'English',
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.createdById = createdById;
            return model;
        }
    });

    factory.define('cluster', Object, {
        id: factory.chance('guid'),
        externalClusterId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        name: factory.chance('name')
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            const externalClusterId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.externalClusterId = externalClusterId;
            return model;
        }
    });
    factory.define('leaderboardforActiveClubDetails', Object, {
        id: factory.chance('integer', { min: 10000, max: 99999 })(),
        name: factory.chance('name'),
        groupType: 'ActiveClubGroup',
        active: '1',
        focusGroup: factory.chance('name'),
        package: factory.chance('name'),
        packageId: factory.chance('integer', { min: 10000, max: 99999 })(),
        focusGroupId: factory.chance('integer', { min: 10000, max: 99999 })(),
    }
    );
    factory.define('activity', Object, {
        id: factory.chance('guid'),
        activityDetail: factory.assocAttrs('activityDetail'),
        leaderboard: factory.assocAttrs('leaderboard'),
        startDate: Time.getCurrentTimeStamp(),
        endDate: Time.addDaysToTimeStamp(3)
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = model.leaderboard.trainerId;
            return model;
        }
    });

    factory.define('quiz', Object, {
        id: factory.chance('guid'),
        quizDetail: factory.assocAttrs('quizDetail'),
        leaderboard: factory.assocAttrs('leaderboard'),
        startDate: Time.getCurrentTimeStamp(),
        endDate: Time.addDaysToTimeStamp(3),
        timer: factory.chance('integer', { min: 5, max: 60 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = model.leaderboard.trainerId;
            return model;
        }
    });

    factory.define('studentActivity', Object, {
        id: factory.chance('guid'),
        activity: factory.assocAttrs('activity'),
        status: 'Completed',
        studentleaderboard: factory.assocAttrs('studentleaderboard'),
        points: 10
    });

    factory.define('studentActivityAssessment', Object, {
        id: factory.chance('guid'),
        activity: factory.assocAttrs('activity'),
        studentleaderboard: factory.assocAttrs('studentleaderboard'),
        points: 10
    });

    factory.define('studentQuiz', Object, {
        id: factory.chance('guid'),
        quiz: factory.assocAttrs('quiz'),
        status: 'Completed',
        studentleaderboard: factory.assocAttrs('studentleaderboard'),
        points: 10
    });

    factory.define('studentMiscellaenousActivity', Object, {
        id: factory.chance('guid'),
        activityType: 'studentMiscellaenousActivity',
        studentleaderboard: factory.assocAttrs('studentleaderboard'),
        points: 10
    });

    factory.define('studentAnswer', Object, {
        id: factory.chance('guid'),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        quizId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        studentQuizId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        questionId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        answerId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        isCorrectAnswer: false
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.smId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.quizId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.studentQuizId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.questionId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.answerId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('activityQuery', Object, {
        id: factory.chance('guid'),
        activity: factory.assocAttrs('activity'),
        studentleaderboard: factory.assocAttrs('studentleaderboard'),
        text: 'My Question for activity'
    });

    factory.define('activityQueryReply', Object, {
        id: factory.chance('guid'),
        activityQuery: factory.assocAttrs('activityQuery'),
        text: 'My Reply for activity query'
    });

    factory.define('weeklyWinner', Object, {
        id: factory.chance('integer', { min: 1000, max: 9999 })(),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboardId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        rank: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        score: 100
    });

    factory.define('monthlyWinner', Object, {
        id: factory.chance('integer', { min: 1000, max: 9999 })(),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboardId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        rank: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        score: 100
    });

    factory.define('announcement', Object, {
        id: factory.chance('guid'),
        text: factory.chance('name'),
        announcementDate: Time.getCurrentTimeStamp(),
        role: 'schoolLeader',
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboards:
            [
                {
                    id: factory.chance('guid'),
                    announcementId: factory.chance('guid'),
                    leaderboardId: factory.chance('guid')
                }
            ]
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });


    factory.define('feed', Object, {
        id: factory.chance('guid'),
        entityId: factory.chance('guid'),
        entityType: 'Quiz',
        createdByName: factory.chance('name'),
        text: 'quiz is created by ',
        leaderboardId: factory.chance('guid'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdForId: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    });

    factory.define('feedStudentReaction', Object, {
        id: factory.chance('guid'),
        feed: factory.assocAttrs('feed'),
        smId: factory.chance('guid'),
        reactionType: 'LIKE'
    });

    factory.define('slamMessage', Object, {
        id: factory.chance('guid'),
        message: factory.chance('name'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        slamDetails:
            [
                {
                    id: factory.chance('guid'),
                    description: factory.chance('name'),
                    imageUrl: 'http://imageurl.com'
                }
            ]
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.createdForId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('nudge', Object, {
        id: factory.chance('guid'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdForId: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.createdForId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('challenge', Object, {
        id: factory.chance('guid'),
        name: factory.chance('name'),
        points: 10,
        standards: [factory.chance('name')],
        description: factory.chance('name'),
        imageUrl: factory.chance('name'),
        videoUrl: factory.chance('name'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdByName: factory.chance('name')
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('challengeInvitation', Object, {
        id: factory.chance('guid'),
        challengeId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboardId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        invitationById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        invitationToId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        challenge: factory.assocAttrs('challenge')
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.challengeId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.leaderboardId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.invitationById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.invitationToId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });
    factory.define('challengeFeed', Object, {
        id: factory.chance('guid'),
        challengeId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        leaderboardId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        invitationById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        invitationToId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        relationId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        type: 'challengeInvited'
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.challengeId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.leaderboardId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.invitationById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.invitationToId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.relationId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('configuration', Object, {
        id: factory.chance('guid'),
        configurationType: 'General',
        entityType: 'Language',
        value: factory.chance('name'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('activeGameDetail', Object, {
        id: factory.chance('guid'),
        name: factory.chance('name'),
        description: factory.chance('name'),
        imageUrl: factory.chance('name'),
        gameUrl: factory.chance('name'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdByName: factory.chance('name'),
        isActive: true
    });

    factory.define('studentFeedback', Object, {
        id: factory.chance('guid'),
        entityId: factory.chance('guid'),
        entityType: 'ACTIVITY',
        rating: factory.chance('integer', { min: 1, max: 5 })().toString(),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.rating = factory.chance('integer', { min: 1, max: 5 })().toString();
            currentModel.smId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('event', Object, {
        id: factory.chance('guid'),
        isActive: true,
        name: factory.chance('name'),
        leaderboard: factory.assocAttrs('leaderboard'),
        startDate: Time.getCurrentTimeStamp(),
        endDate: Time.addDaysToTimeStamp(1),
        numberOfGroups: factory.chance('integer', { min: 1, max: 5 })(),
        numberOfStudents: factory.chance('integer', { min: 10, max: 50 })(),
        minNoOfStudentsPerGroup: factory.chance('integer', { min: 1, max: 10 })(),
        isEventPointsUpdated: false,
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.numberOfGroups = factory.chance('integer', { min: 1, max: 5 })();
            currentModel.numberOfStudents = factory.chance('integer', { min: 10, max: 50 })();
            currentModel.minNoOfStudentsPerGroup = factory.chance('integer', { min: 1, max: 10 })();
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('eventGroup', Object, {
        id: factory.chance('guid'),
        name: factory.chance('name'),
        groupColor: 'Red',
        event: factory.assocAttrs('event'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('eventGroupStudent', Object, {
        id: factory.chance('guid'),
        eventGroup: factory.assocAttrs('eventGroup'),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.smId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('leaderboardGroup', Object, {
        id: factory.chance('guid'),
        name: factory.chance('name'),
        groupColor: 'Red',
        leaderboard: factory.assocAttrs('leaderboard'),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });

    factory.define('leaderboardGroupStudent', Object, {
        id: factory.chance('guid'),
        leaderboardGroup: factory.assocAttrs('leaderboardGroup'),
        smId: factory.chance('integer', { min: 1000, max: 9999 })().toString(),
        createdById: factory.chance('integer', { min: 1000, max: 9999 })().toString()
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            currentModel.smId = factory.chance('integer', { min: 1000, max: 9999 })().toString();
            return model;
        }
    });
    factory.define('activeGame', Object, {
        id: factory.chance('guid'),
        activeGameDetail: factory.assocAttrs('activeGameDetail'),
        leaderboard: factory.assocAttrs('leaderboard'),
        startDate: Time.getCurrentTimeStamp(),
        endDate: Time.addDaysToTimeStamp(3)
    }, {
        afterBuild: (model) => {
            const currentModel = model;
            currentModel.createdById = model.leaderboard.trainerId;
            return model;
        }
    });

    factory.define('assignedChallenge', Object, {
        id: factory.chance('guid'),
        challengeId: factory.chance('guid'),
        standard: factory.chance('name')
    });

    factory.define('studentActiveGame', Object, {
        id: factory.chance('guid'),
        activeGame: factory.assocAttrs('activeGame'),
        studentleaderboard: factory.assocAttrs('studentleaderboard')
    });
};

module.exports.factory = factory;
module.exports.loadFactory = loadFactory;
