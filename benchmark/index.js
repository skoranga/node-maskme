'use strict';

const assert = require('assert');
const benchmark = require('benchmark');
const maskme = require('../');

const suite = new benchmark.Suite();

suite.add('maskEmail (object)', () => {
    maskme.maskEmail({ a: 'helloworld.gmail.com' });
});

suite.add('maskEmail (hit)', () => {
    maskme.maskEmail('helloworld@gmail.com');
});

suite.add('maskEmail (miss)', () => {
    maskme.maskEmail('helloworld.gmail.com');
});

suite
    .on('cycle', (event) => {
        console.log(String(event.target));
        if (event.target.error)
            console.error(event.target.error);
    })
    .run();
