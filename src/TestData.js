import { faker } from '@faker-js/faker';

export const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode(),
};

export const users = {
    harry: 'Harry Potter',
    ron: 'Ron Weasly',
    albus: 'Albus Dumbledore',
    neville: 'Neville Longbottom',
};

export const currency = {
    dollar: 'Dollar',
    pound: 'Pound',
    rupee: 'Rupee',
};

export const accountOperations = {
    amount: faker.number.int({ max: 100 }),
};

export const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};
