const { faker } = require('@faker-js/faker');

module.exports = {
    person: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode(),
    },

    users: {
        harry: 'Harry Potter',
        ron: 'Ron Weasly',
        albus: 'Albus Dumbledore',
        neville: 'Neville Longbottom',
    },

    currency: {
        dollar: 'Dollar',
        pound: 'Pound',
        rupee: 'Rupee',
    },

    accountOperations: {
        amount: faker.number.int({ max: 100 }),
    },

    options: {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    },

};
