'use strict';

var assert = require('assert'),
    maskme = require('../');

describe('email mark', function () {

    it('non-email', function () {
        assert(maskme.maskEmail('helloworld') === 'helloworld');
        assert(maskme.maskEmail('helloworld.gmail.com') === 'helloworld.gmail.com');
    });

    it('just email', function () {
        assert(maskme.maskEmail('helloworld@gmail.com') === 'xxx@xxx.xxx');
    });

    it('email in a string', function () {
        assert(maskme.maskEmail('my email address: helloworld@gmail.com') === 'my email address: xxx@xxx.xxx');
        assert(maskme.maskEmail('contact me @:helloworld%40gmail.com') === 'contact me @:xxx@xxx.xxx');
    });

    it('email in an url', function () {
        assert(maskme.maskEmail('https://www.example.com/helloworld@gmail.com') === 'https://www.example.com/xxx@xxx.xxx');
        assert(maskme.maskEmail('https://www.example.com/helloworld%40gmail.com') === 'https://www.example.com/xxx@xxx.xxx');
    });

    it('email in an object string', function () {
        assert(maskme.maskEmail('{a: "b", email: "helloworld@gmail.com"}') === '{a: "b", email: "xxx@xxx.xxx"}');
        assert(maskme.maskEmail('{name: "helloworld", a: {a: {b: {email: "helloworld@gmail.com"}}}}') === '{name: "helloworld", a: {a: {b: {email: "xxx@xxx.xxx"}}}}');
    });

    it('email in an object', function () {
        assert(maskme.maskEmail({ a: "b", b: { a: { b: { email: "helloworld@gmail.com"}}}}).b.a.b.email === 'xxx@xxx.xxx');
        var emails = maskme.maskEmail({ a: "b", emails: ["helloworld@gmail.com", "example.this@yahoo.com", "i_am_encoded%40email.fr", "a@b.c.d"]}).emails;
        emails.forEach(function(email) {
            assert(email === 'xxx@xxx.xxx');
        });
    });

    it('-ive tests', function () {
        var array = new Array(10240);
        var allA = array.join('a.com ');
        assert(maskme.maskEmail(allA).indexOf('.com') !== -1);
        allA = array.join('a') + '@gmail.com';
        assert(maskme.maskEmail(allA).indexOf('.com') === -1);
        allA = array.join('a!@gmail.com');
        assert(maskme.maskEmail(allA).indexOf('@gmail.com') === -1);
        allA = array.join('helloworld@gmail.com ')
        assert(maskme.maskEmail(allA).indexOf('@gmail.com') === -1);
    });

});
