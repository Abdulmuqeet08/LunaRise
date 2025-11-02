
const DeleteEntityById = require('test/data/delete-entity-by-id');
const definations = require('test/data/factory').factory;


const dontBuild = () => new Promise((resolve, reject) => resolve({}));

const idWhenPresent = entity => (entity ? entity.id : null);

const whenPresent = (entity, successArgs) => (entity ? successArgs : []);

const deleteWhenPresent = entity => whenPresent(entity, [new DeleteEntityById([idWhenPresent(entity)])]);

const doNothing = () => [];

const entity = async (name, replace) => new Promise(async (resolve, reject) => {
    let data = await definations.build(name);
    if (replace) {
        data = replace(data);
    }
    resolve(data);
});

const buildEntity = name => entity(name);

const returnObject = args => args;
const CreateSectionQuery = require('resources/sections/queries/create-section-query.js');
const CreateLeaderboardQuery = require('resources/leadboard/queries/create-leaderboard-query.js');
const CreateStudentLeaderboardQuery = require('resources/student-leaderboards/queries/create-student-leaderboard-query.js');
const CreateOptionsQuery = require('resources/question/queries/create-options-query.js');
const CreateActivityDetailQuery = require('resources/activities-detail/queries/create-activity-details-query');
const CreateLeaderboardForActiveClubQuery = require('test/helpers/create-leaderboard-for-activeclub-query');

const CreateQuestionQuery = require('resources/question/queries/create-question-query.js');
const CreateQuizDetailQuery = require('resources/quizzes-detail/queries/create-quiz-detail-query.js');
const CreateClusterQuery = require('resources/clusters/queries/create-cluster-query.js');
const CreateLeaderboardForClusterQuery = require('resources/leadboard/queries/create-leaderboard-for-cluster-query');
const CreateActivityQuery = require('resources/activities/queries/create-activity-query.js');
const CreateQuizQuery = require('resources/quizzes/queries/create-quiz-query.js');
const CompleteQuizQuery = require('resources/quizzes/queries/complete-quiz-query.js');
const CompleteActivityQuery = require('resources/activities/queries/complete-activity-query.js');
const CreateActivityQueryQuery = require('resources/activity-queries/queries/create-activity-query-query.js');
const CreateActivityQueryReplyQuery = require('resources/activity-query-replies/queries/create-activity-query-reply-query.js');
const CreateStudentAnswersQuery = require('resources/quizzes/queries/create-student-answers-query.js');
const CompleteSayHelloActivityQuery = require('resources/sayHelloActivity/queries/complete-say-hello-activity-query.js');
const CompleteStudentActivityAsssessmentQuery = require('resources/activities/queries/complete-student-activity-assessment-query.js');
const InsertToWeeklyWinnerQuery = require('resources/crons/queries/insert-to-weekly-winner-and-runners-up-query');
const UpdateStudentLeaderboardScoreQuery = require('resources/student-leaderboards/queries/update-student-leaderboard-score-query');
const InsertToWeeklyWinnerHistoryQuery = require('resources/crons/queries/insert-to-weekly-winner-and-runners-up-history-query');
const CreateAnnouncementQuery = require('resources/announcements/queries/create-announcement-query.js');
const CreateNudgeQuery = require('resources/students/queries/create-nudge-query');
const CreateFeedQuery = require('resources/activity-feeds/queries/create-feed-query');
const CreateSlamMessageQuery = require('resources/slam-messages/queries/create-slam-message-query.js');
const CreateChallengeQuery = require('resources/challenges/queries/create-challenge-query');
const CreateChallengeInvitationQuery = require('resources/challenges/queries/create-challenge-invitation-query');
const CreateChallengeFeedQuery = require('resources/challenges/queries/create-challenges-feed-query');
const CreateFeedStudentReactionQuery = require('resources/students/queries/create-feed-student-reaction-query');
const CreateConfigurationQuery = require('resources/configurations/queries/create-configuration-query.js');
const CreateStudentFeedbackQuery = require('resources/students/queries/create-student-feedback-query');
const CreateEventQuery = require('resources/events/queries/create-event-query');
const CreateEventGroupQuery = require('resources/events/queries/create-event-group-query');
const CreateEventGroupStudentsQuery = require('resources/events/queries/create-event-group-students-query');
const CreateLeaderboardGroupQuery = require('resources/events/queries/create-leaderboard-group-query');
const CreateLeaderboardGroupStudentsQuery = require('resources/events/queries/create-leaderboard-group-students-query');
const CreateAssignedChallengeQuery = require('resources/challenges/queries/create-assigned-challenge-query');
const CreateActiveGameDetailQuery = require('resources/activeGames/queries/create-active-game-detail-query.js');
const CreateActiveGameQuery = require('resources/activeGames/queries/create-active-game-query.js');
const CompleteActiveGameQuery = require('resources/activeGames/queries/complete-active-game-query');

const section = {
    name: 'section',
    create: section => [
        new CreateSectionQuery(section.id, section)
    ],
    build: () => entity('section'),
    delete: section => [new DeleteEntityById(section.id, 'Section')]
};

const cluster = {
    name: 'cluster',
    create: cluster => [
        new CreateClusterQuery(cluster.id, {
            externalClusterId: cluster.externalClusterId,
            name: cluster.name
        })
    ],
    dependency: [

    ],
    build: () => entity('cluster'),
    delete: cluster => [new DeleteEntityById(cluster.id, 'Cluster')]
};

const leaderboard = {
    name: 'leaderboard',
    create: leaderboard => [
        new CreateLeaderboardQuery(leaderboard.id, leaderboard.section.id, {
            schoolName: leaderboard.section.schoolName,
            class: leaderboard.section.class,
            section: leaderboard.section.section
        })
    ],
    dependency: [
        [leaderboard => leaderboard.section, section]
    ],
    build: () => entity('leaderboard'),
    delete: leaderboard => [new DeleteEntityById(leaderboard.id, 'Leaderboard')]
};


const clusterLeaderboard = {
    name: 'leaderboard',
    create: leaderboard => [
        new CreateLeaderboardForClusterQuery(leaderboard.id, leaderboard.cluster.id, {
            name: leaderboard.cluster.name
        })
    ],
    dependency: [
        [leaderboard => leaderboard.cluster, cluster]
    ],
    build: () => entity('leaderboard'),
    delete: leaderboard => [new DeleteEntityById(leaderboard.id, 'Leaderboard')]
};

const studentleaderboard = {
    name: 'studentleaderboard',
    create: studentleaderboard => [
        new CreateStudentLeaderboardQuery(studentleaderboard.id, studentleaderboard.leaderboard.id, studentleaderboard)
    ],
    dependency: [
        [studentleaderboard => studentleaderboard.leaderboard, leaderboard]
    ],
    build: () => entity('studentleaderboard'),
    delete: studentleaderboard => [new DeleteEntityById(studentleaderboard.id, 'studentleaderboard')]
};

const activityDetail = {
    name: 'activityDetail',
    create: activityDetail => [
        new CreateActivityDetailQuery(activityDetail.id, activityDetail)
    ],
    dependency: [
    ],
    build: () => entity('activityDetail'),
    delete: activityDetail => [new DeleteEntityById(activityDetail.id, 'ActivityDetail')]
};

const question = {
    name: 'question',
    create: question => [
        new CreateQuestionQuery(question.id, question, question.options)
    ],
    dependency: [
        [question => question.activityDetail, activityDetail]
    ],
    build: () => entity('question'),
    delete: question => [new DeleteEntityById(question.id, 'Question')]
};

const option = {
    name: 'option',
    create: option => [
        new CreateOptionsQuery([option.id])
    ],
    dependency: [
    ],
    build: () => entity('options'),
    delete: option => [new DeleteEntityById(option.id, 'QuestionOptions')]
};

const quizDetail = {
    name: 'quizDetail',
    create: quizDetail => [
        new CreateQuizDetailQuery(quizDetail.id, quizDetail)
    ],
    dependency: [
    ],
    build: () => entity('quizDetail'),
    delete: quizDetail => [new DeleteEntityById(quizDetail.id, 'QuizDetail')]
};

const activity = {
    name: 'activity',
    create: activity => [
        new CreateActivityQuery(activity.id, {
            leaderboardId: activity.leaderboard.id,
            activityDetailId: activity.activityDetail.id,
            startDate: activity.startDate,
            endDate: activity.endDate,
            createdById: activity.createdById
        })
    ],
    dependency: [
        [activity => activity.activityDetail, activityDetail],
        [activity => activity.leaderboard, leaderboard]
    ],
    build: () => entity('activity'),
    delete: activity => [new DeleteEntityById(activity.id, 'Activity')]
};

const quiz = {
    name: 'quiz',
    create: quiz => [
        new CreateQuizQuery(quiz.id, {
            leaderboardId: quiz.leaderboard.id,
            quizDetailId: quiz.quizDetail.id,
            startDate: quiz.startDate,
            endDate: quiz.endDate,
            timer: quiz.timer,
            createdById: quiz.createdById
        })
    ],
    dependency: [
        [quiz => quiz.quizDetail, quizDetail],
        [quiz => quiz.leaderboard, leaderboard]
    ],
    build: () => entity('quiz'),
    delete: quiz => [new DeleteEntityById(quiz.id, 'Quiz')]
};

const studentActivity = {
    name: 'studentActivity',
    create: studentActivity => [
        new CompleteActivityQuery(studentActivity.id, {
            activityId: studentActivity.activity.id,
            smId: studentActivity.studentleaderboard.smId,
            points: studentActivity.points
        })
    ],
    dependency: [
        [studentActivity => studentActivity.activity, activity],
        [studentActivity => studentActivity.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentActivity'),
    delete: studentActivity => [new DeleteEntityById(studentActivity.id, 'studentActivity')]
};

const studentActivityAssessment = {
    name: 'studentActivityAssessment',
    create: studentActivityAssessment => [
        new CompleteStudentActivityAsssessmentQuery(studentActivityAssessment.id, {
            activityId: studentActivityAssessment.activity.id,
            smId: studentActivityAssessment.studentleaderboard.smId,
            studentActivityId: studentActivityAssessment.studentActivity.id
        })
    ],
    dependency: [
        [studentActivityAssessment => studentActivityAssessment.activity, activity],
        [studentActivityAssessment => studentActivityAssessment.studentActivity, studentActivity],
        [studentActivityAssessment => studentActivityAssessment.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentActivityAssessment'),
    delete: studentActivityAssessment => [new DeleteEntityById(studentActivityAssessment.id, 'StudentActivityAssessment')]
};


const studentQuiz = {
    name: 'studentQuiz',
    create: studentQuiz => [
        new CompleteQuizQuery(studentQuiz.id, {
            quizId: studentQuiz.quiz.id,
            status: 'Completed',
            smId: studentQuiz.studentleaderboard.smId,
            points: studentQuiz.points
        })
    ],
    dependency: [
        [studentQuiz => studentQuiz.quiz, quiz],
        [studentQuiz => studentQuiz.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentQuiz'),
    delete: studentQuiz => [new DeleteEntityById(studentQuiz.id, 'studentQuiz')]
};

const studentMiscellaenousActivity = {
    name: 'studentMiscellaenousActivity',
    create: miscellaenousActivity => [
        new CompleteSayHelloActivityQuery(miscellaenousActivity.id, miscellaenousActivity.studentleaderboard.smId)
    ],
    dependency: [
        [studentMiscellaenousActivity => studentMiscellaenousActivity.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentMiscellaenousActivity'),
    delete: miscellaenousActivity => [new DeleteEntityById(miscellaenousActivity.id, 'studentMiscellaenousActivity')]
};

const studentAnswer = {
    name: 'studentAnswer',
    create: studentAnswer => [
        new CreateStudentAnswersQuery(studentAnswer.id, studentAnswer)
    ],
    dependency: [
    ],
    build: () => entity('studentAnswer'),
    delete: studentAnswer => [new DeleteEntityById(studentAnswer.id, 'StudentAnswer')]
};

const activityQuery = {
    name: 'activityQuery',
    create: activityQuery => [
        new CreateActivityQueryQuery(activityQuery.id, {
            activityId: activityQuery.activity.id,
            smId: activityQuery.studentleaderboard.smId,
            text: activityQuery.text
        })
    ],
    dependency: [
        [activityQuery => activityQuery.activity, activity],
        [activityQuery => activityQuery.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('activityQuery'),
    delete: activityQuery => [new DeleteEntityById(activityQuery.id, 'ActivityQuery')]
};

const activityQueryReply = {
    name: 'activityQueryReply',
    create: activityQueryReply => [
        new CreateActivityQueryReplyQuery(activityQueryReply.id, {
            activityQueryId: activityQueryReply.activityQuery.id,
            trainerId: activityQueryReply.activityQuery.studentleaderboard.leaderboard.trainerId,
            text: activityQueryReply.text
        })
    ],
    dependency: [
        [activityQueryReply => activityQueryReply.activityQuery, activityQuery]
    ],
    build: () => entity('activityQueryReply'),
    delete: activityQueryReply => [new DeleteEntityById(activityQueryReply.id, 'ActivityQueryReply')]
};

const weeklyWinner = {
    name: 'weeklyWinner',
    create: studentleaderboard => [
        new UpdateStudentLeaderboardScoreQuery(studentleaderboard.smId, 100),
        new InsertToWeeklyWinnerQuery()
    ],
    dependency: [
        [studentleaderboard => studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentleaderboard'),
    delete: weeklyWinner => [new DeleteEntityById(weeklyWinner.id, 'WeeklyWinner')] // call truncate query here
};

const monthlyWinner = {
    name: 'monthlyWinner',
    create: studentleaderboard => [
        new UpdateStudentLeaderboardScoreQuery(studentleaderboard.smId, 100),
        new InsertToWeeklyWinnerQuery()
        // new InsertToWeeklyWinnerHistoryQuery()
    ],
    dependency: [
        [studentleaderboard => studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentleaderboard'),
    delete: monthlyWinner => [new DeleteEntityById(monthlyWinner.id, 'MonthlyWinner')] // call truncate query here
};

const announcement = {
    name: 'announcement',
    create: announcement => [
        new CreateAnnouncementQuery(
            announcement.id, announcement, [
            {
                id: announcement.leaderboards[0].id,
                announcementId: announcement.id,
                leaderboardId: announcement.leaderboard.id
            }
        ]
        )
    ],
    dependency: [
        [announcement => announcement.leaderboard, leaderboard]
    ],
    build: () => entity('announcement'),
    delete: announcement => [new DeleteEntityById(announcement.id, 'Announcement'),
    new DeleteEntityById(announcement.leaderboards[0].id, 'LeaderboardAnnouncement')]
};

const nudge = {
    name: 'nudge',
    create: nudge => [
        new CreateNudgeQuery(nudge.id, {
            createdById: nudge.createdById,
            createdForId: nudge.createdForId
        })
    ],
    dependency: [
    ],
    build: () => entity('nudge'),
    delete: nudge => [new DeleteEntityById(nudge.id, 'Nudge')]
};

const feed = {
    name: 'feed',
    create: feed => [
        new CreateFeedQuery(feed.id, {
            entityId: feed.entityId,
            entityType: feed.entityType,
            createdByName: feed.createdByName,
            text: feed.text,
            leaderboardId: feed.leaderboardId,
            createdById: feed.createdById,
            createdForId: feed.createdForId
        })
    ],
    dependency: [
    ],
    build: () => entity('feed'),
    delete: feed => [new DeleteEntityById(feed.id, 'Feed')]
};
const leaderboardforActiveClubDetails = {
    name: 'leaderboardforActiveClubDetails',
    create: leaderboardforActiveClubDetails => [
        new CreateLeaderboardForActiveClubQuery(leaderboardforActiveClubDetails.id, leaderboardforActiveClubDetails)],
    build: () => entity('leaderboardforActiveClubDetails'),
    delete: leaderboardforActiveClubDetails => [
    ]
};
const feedStudentReaction = {
    name: 'feedStudentReaction',
    create: feedStudentReaction => [
        new CreateFeedStudentReactionQuery(feedStudentReaction.id,
            feedStudentReaction.feed.id, feedStudentReaction.smId, feedStudentReaction.reactionType)
    ],
    dependency: [
        [feedStudentReaction => feedStudentReaction.feed, feed]
    ],
    build: () => entity('feedStudentReaction'),
    delete: feedStudentReaction => [new DeleteEntityById(feedStudentReaction.id, 'FeedStudentReaction')]
};

const slamMessage = {
    name: 'slamMessage',
    create: slamMessage => [
        new CreateSlamMessageQuery(
            slamMessage.id, slamMessage, slamMessage.slamDetails
        )
    ],
    dependency: [
    ],
    build: () => entity('slamMessage'),
    delete: slamMessage => [new DeleteEntityById(slamMessage.id, 'SlamMessage')]
};

const challenge = {
    name: 'challenge',
    create: challenge => [
        new CreateChallengeQuery(
            challenge.id,
            {
                name: challenge.name,
                points: challenge.points,
                standards: challenge.standards,
                description: challenge.description,
                imageUrl: challenge.imageUrl,
                videoUrl: challenge.videoUrl
            },
            challenge.createdById,
            challenge.createdByName
        )
    ],
    dependency: [
    ],
    build: () => entity('challenge'),
    delete: challenge => [new DeleteEntityById(challenge.id, 'Challenge')]
};

const challengeInvitation = {
    name: 'challengeInvitation',
    create: challengeInvitation => [
        new CreateChallengeInvitationQuery([
            {
                id: challengeInvitation.id,
                challengeId: challengeInvitation.challengeId,
                leaderboardId: challengeInvitation.leaderboardId,
                invitationById: challengeInvitation.invitationById,
                invitationToId: challengeInvitation.invitationToId
            }
        ])
    ],
    dependency: [
    ],
    build: () => entity('challengeInvitation'),
    delete: challengeInvitation => [new DeleteEntityById(challengeInvitation.id, 'ChallengeInvitation')]
};

const challengeFeed = {
    name: 'challengeFeed',
    create: challengeFeed => [
        new CreateChallengeFeedQuery([
            {
                id: challengeFeed.id,
                challengeId: challengeFeed.challengeId,
                leaderboardId: challengeFeed.leaderboardId,
                invitationById: challengeFeed.invitationById,
                invitationToId: challengeFeed.invitationToId,
                relationId: challengeFeed.relationId,
                type: challengeFeed.type
            }
        ])
    ],
    dependency: [
    ],
    build: () => entity('challengeFeed'),
    delete: challengeFeed => [new DeleteEntityById(challengeFeed.id, 'ChallengeFeed')]
};

const configuration = {
    name: 'configuration',
    create: configuration => [
        new CreateConfigurationQuery(
            configuration.id, configuration.configurationType,
            configuration.entityType, configuration.value, configuration.createdById
        )
    ],
    dependency: [
    ],
    build: () => entity('configuration'),
    delete: configuration => [new DeleteEntityById(configuration.id, 'Configuration')]
};


const activeGameDetail = {
    name: 'activeGameDetail',
    create: activeGameDetail => [
        new CreateActiveGameDetailQuery(
            activeGameDetail.id,
            {
                name: activeGameDetail.name,
                description: activeGameDetail.description,
                imageUrl: activeGameDetail.imageUrl,
                gameUrl: activeGameDetail.gameUrl,
                createdById: activeGameDetail.createdById,
                createdByName: activeGameDetail.createdByName
            }
        )
    ],
    dependency: [
    ],
    build: () => entity('activeGameDetail'),
    delete: activeGameDetail => [new DeleteEntityById(activeGameDetail.id, 'ActiveGameDetail')]
};

const studentFeedback = {
    name: 'studentFeedback',
    create: studentFeedback => [
        new CreateStudentFeedbackQuery(studentFeedback.id,
            studentFeedback.entityId, studentFeedback.smId, studentFeedback.entityType, studentFeedback.rating)
    ],
    dependency: [
        [studentFeedback => studentFeedback.activity, activity],
        [studentFeedback => studentFeedback.quiz, quiz]
    ],
    build: () => entity('studentFeedback'),
    delete: studentFeedback => [new DeleteEntityById(studentFeedback.id, 'StudentFeedback')]
};

const event = {
    name: 'event',
    create: event => [
        new CreateEventQuery(event.id, {
            name: event.name,
            leaderboardId: event.leaderboard.id,
            numberOfGroups: event.numberOfGroups,
            numberOfStudents: event.numberOfStudents,
            minNoOfStudentsPerGroup: event.minNoOfStudentsPerGroup,
            isEventPointsUpdated: event.isEventPointsUpdated,
            startDate: event.startDate,
            endDate: event.endDate,
            createdById: event.createdById
        })
    ],
    dependency: [
        [event => event.leaderboard, leaderboard]
    ],
    build: () => entity('event'),
    delete: event => [new DeleteEntityById(event.id, 'Event')]
};

const eventGroup = {
    name: 'eventGroup',
    create: eventGroup => [
        new CreateEventGroupQuery(
            [{
                id: eventGroup.id,
                name: eventGroup.name,
                groupColor: eventGroup.groupColor,
                eventId: eventGroup.event.id,
                createdById: eventGroup.event.createdById
            }]
        )
    ],
    dependency: [
        [eventGroup => eventGroup.event, event]
    ],
    build: () => entity('eventGroup'),
    delete: eventGroup => [new DeleteEntityById(eventGroup.id, 'EventGroup')]
};

const eventGroupStudent = {
    name: 'eventGroupStudent',
    create: eventGroupStudent => [
        new CreateEventGroupStudentsQuery(
            [{
                id: eventGroupStudent.id,
                smId: eventGroupStudent.smId,
                eventGroupId: eventGroupStudent.eventGroup.id,
                createdById: eventGroupStudent.eventGroup.event.createdById
            }]
        )
    ],
    dependency: [
        [eventGroupStudent => eventGroupStudent.eventGroup, eventGroup]
    ],
    build: () => entity('eventGroupStudent'),
    delete: eventGroupStudent => [new DeleteEntityById(eventGroupStudent.id, 'EventGroupStudent')]
};

const leaderboardGroup = {
    name: 'leaderboardGroup',
    create: leaderboardGroup => [
        new CreateLeaderboardGroupQuery(
            [{
                id: leaderboardGroup.id,
                name: leaderboardGroup.name,
                groupColor: leaderboardGroup.groupColor,
                leaderboardId: leaderboardGroup.leaderboard.id,
                createdById: leaderboardGroup.leaderboard.trainerId
            }]
        )
    ],
    dependency: [
        [leaderboardGroup => leaderboardGroup.leaderboard, leaderboard]
    ],
    build: () => entity('leaderboardGroup'),
    delete: leaderboardGroup => [new DeleteEntityById(leaderboardGroup.id, 'LeaderboardGroup')]
};

const leaderboardGroupStudent = {
    name: 'leaderboardGroupStudent',
    create: leaderboardGroupStudent => [
        new CreateLeaderboardGroupStudentsQuery(
            [{
                id: leaderboardGroupStudent.id,
                smId: leaderboardGroupStudent.smId,
                leaderboardGroupId: leaderboardGroupStudent.leaderboardGroup.id,
                createdById: leaderboardGroupStudent.leaderboardGroup.leaderboard.trainerId
            }]
        )
    ],
    dependency: [
        [leaderboardGroupStudent => leaderboardGroupStudent.leaderboardGroup, leaderboardGroup]
    ],
    build: () => entity('leaderboardGroupStudent'),
    delete: leaderboardGroupStudent => [new DeleteEntityById(leaderboardGroupStudent.id, 'LeaderboardGroupStudent')]
};
const assignedChallenge = {
    name: 'assignedChallenge',
    create: assignedChallenge => [
        new CreateAssignedChallengeQuery([
            {
                id: assignedChallenge.id,
                challengeId: assignedChallenge.challengeId,
                standard: assignedChallenge.standard
            }
        ])
    ],
    dependency: [
    ],
    build: () => entity('assignedChallenge'),
    delete: assignedChallenge => [new DeleteEntityById(assignedChallenge.id, 'AssignedChallenge')]
};

const activeGame = {
    name: 'activeGame',
    create: activeGame => [
        new CreateActiveGameQuery(activeGame.id, {
            leaderboardId: activeGame.leaderboard.id,
            activeGameDetailId: activeGame.activeGameDetail.id,
            startDate: activeGame.startDate,
            endDate: activeGame.endDate,
            createdById: activeGame.createdById
        })
    ],
    dependency: [
        [activeGame => activeGame.activeGameDetail, activeGameDetail],
        [activeGame => activeGame.leaderboard, leaderboard]
    ],
    build: () => entity('activeGame'),
    delete: activeGame => [new DeleteEntityById(activeGame.id, 'ActiveGame')]
};

const studentActiveGame = {
    name: 'studentActiveGame',
    create: studentActiveGame => [
        new CompleteActiveGameQuery(studentActiveGame.id, {
            activeGameId: studentActiveGame.activeGame.id,
            smId: studentActiveGame.studentleaderboard.smId
        })
    ],
    dependency: [
        [studentActiveGame => studentActiveGame.activeGame, activeGame],
        [studentActiveGame => studentActiveGame.studentleaderboard, studentleaderboard]
    ],
    build: () => entity('studentActiveGame'),
    delete: studentActiveGame => [new DeleteEntityById(studentActiveGame.id, 'StudentActiveGame')]
};

module.exports = {
    buildEntity,
    section,
    leaderboard,
    studentleaderboard,
    option,
    activityDetail,
    question,
    quizDetail,
    cluster,
    clusterLeaderboard,
    activity,
    quiz,
    studentActivity,
    activityQuery,
    activityQueryReply,
    studentQuiz,
    studentAnswer,
    studentMiscellaenousActivity,
    studentActivityAssessment,
    weeklyWinner,
    monthlyWinner,
    announcement,
    leaderboardforActiveClubDetails,
    nudge,
    feed,
    slamMessage,
    challenge,
    challengeInvitation,
    challengeFeed,
    feedStudentReaction,
    studentFeedback,
    event,
    eventGroup,
    eventGroupStudent,
    leaderboardGroup,
    leaderboardGroupStudent,
    configuration,
    assignedChallenge,
    activeGameDetail,
    activeGame,
    studentActiveGame
};
