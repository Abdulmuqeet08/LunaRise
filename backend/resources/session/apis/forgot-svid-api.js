const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult } = require('lib');
const db = require('db/repository');
const GetTrainerToSendMailQuery = require('resources/session/queries/get-trainer-to-send-mail-query');
const NotificationHandler = require('notifications/notification-handler.js');
const R = require('ramda');
const Result = require('folktale/result');
const config = require('config');

const sendMail = async (employees, studentDetails) => {
    const allResult = R.map(employee => NotificationHandler.send({
        context: 'forgotSvid',
        modes: [
            { name: 'email', to: `${employee.es_user_login_name}@${config.email.postFix}` }
        ],
        data: {
            studentName: studentDetails.name,
            studentEmail: studentDetails.email,
            studentPhone: studentDetails.phone,
            schoolName: studentDetails.schoolName,
            section: studentDetails.section,
            grade: studentDetails.grade,
            city: studentDetails.city,
            state: studentDetails.state
        }
    }))(employees);
    await Promise.all(allResult);

    return Result.Ok('sent');
};

async function post(req) {
    const {
        name, email, phone, school, section, grade, city, state
    } = req.body;

    logInfo('Request to forgot svid', {
        name, email, phone, school, section, grade, city, state
    });

    const response = await composeResult(
        employees => sendMail(employees, {
            name,
            email,
            phone,
            schoolName: school.school_name,
            section,
            grade,
            city,
            state
        }),
        () => db.find(new GetTrainerToSendMailQuery(school.school_id))
    )();

    return respond(response, 'Successfully send email!', 'Failed to send email!');
}
Route.withOutSecurity().noAuth().post('/session/forgot-svid', post).bind();

module.exports.post = post;
