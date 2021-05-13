const crypto = require('crypto');
module.exports.createToken = token => {
  const ary = token.split('.');
  if ( ary.length !== 3 ) {
    return;
  }

  return {
    getExp: () => {
      return Math.floor(new Date('2020-06-12T02:51:12.000Z').getTime() / 1000) + 60 * 60;
    },

    verify: key => {
      const hmac = crypto.createHmac('SHA256', key).update(ary[0]+ '.' +  ary[1]).digest('base64');
      return hmac === ary[2] + '=';
    }
  }
}