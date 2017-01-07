const expect = require('chai').expect;
const createReservation = require('./handler').createReservation

describe('bookMeetingRoom', () => {
  let params = {
    date: '2017-01-05',
    duration: {
      amount: 30,
      unit: 'min'
    },
    room: 'ni hao',
    time: '15:00:00'
  };

  describe('createReservation', () => {
    it('should create reservation request map with provided properties', () => {
      const expected = {
        title: 'Hey Office Test',
        room: 'ni hao',
        start: '2017-01-05 15:00+08:00',
        end: '2017-01-05 15:30+08:00'
      };
      expect(createReservation(params)).to.eql(expected);
    });
  });
});
