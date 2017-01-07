'use strict';

const moment = require('moment-timezone');

module.exports.rooms = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.createReservation = (params) => {
  const title = 'Hey Office Test';
  const room = params.room;
  const startMoment = moment(`${params.date} ${params.time}+08:00`).tz('Asia/Singapore');
  const start = startMoment.format("YYYY-MM-DD HH:mmZ");
  const duration = moment.duration(params.duration.amount, params.duration.unit[0]);
  const end = startMoment.add(duration).format("YYYY-MM-DD HH:mmZ");

  return {
    title: title,
    room: room,
    start: start,
    end: end
  };
};
