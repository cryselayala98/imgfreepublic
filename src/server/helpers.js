const moment = require('moment');

const helpers = {};

helpers.hallar_cnt_tiempo = (timestamp) => {
    return moment(timestamp).startOf('minute').fromNow();
}


module.exports = helpers;