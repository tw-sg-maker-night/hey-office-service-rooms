'use strict';

const moment = require('moment-timezone');
const aws = require('aws-sdk');

module.exports.rooms = (event, context, callback) => {
  const params = event.result.parameters;
  const reservation = this.createReservation(params)

  const lambda = new aws.Lambda({
    region: 'ap-southeast-1'
  });

  lambda.invoke({
    FunctionName: 'hey-office-meetings-dev-create',
    Payload: JSON.stringify({body: JSON.stringify(reservation)})
  }, (err, data) => {
    let message = 'Unable to reserve the room, please try again.';
    if (!err) {
      const responsePayload = JSON.parse(data.Payload);
      const result = JSON.parse(responsePayload.body);
      message = result.message;
    }

    const response = {
      statusCode: 200,
      body: { message: message }
    };

    callback(null, response);
  });
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
