'use strict';

var utilis = require('core-util-is'),
    querystring = require('querystring'),
    stringify = require('json-stringify-safe');

var EmailPattern = RegExp(/[-a-z0-9~!$%^&_+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@[a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.((\w*)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):[0-9]{1,5})/ig);

function maskEmail(data) {
    var datastr = data,
        isObject = false,
        mightHaveReplaced = false;

    if (utilis.isObject(data)) {
        datastr = stringify(data);
        isObject = true;
    }

    //only run regex if dataString contains @ or %40 (encoded @)
    if (utilis.isString(datastr) && (datastr.indexOf('@') !== -1 || datastr.indexOf('%40') !== -1)) {
        datastr = querystring.unescape(datastr);
        datastr = datastr.replace(EmailPattern, 'xxx@xxx.xxx');
        mightHaveReplaced = true;
    }

    if (isObject) {
        if (mightHaveReplaced) {
            datastr = parseJSON(datastr);
        } else {
            datastr = data;
        }

    }

    return datastr;
}

function parseJSON(value) {
    var obj;
    try {
        obj = JSON.parse(value);
    } catch (e) {
        //No op
    }
    return obj;
}


module.exports = maskEmail;
