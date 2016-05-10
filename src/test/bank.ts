const c = function(...args:[any]) {console.log.apply(console, arguments);};
import * as _ from 'lodash';

import api from '../bank';
var admin = api();

mock_banks = ['bank_one', 'bank_two', 'bank_three'];
mock_persons = ['person_one', 'person_two', 'person_three'];
mock_account = ['account_one', 'account_two', 'account_three']

describe('make banks', () => {
    it('should make banks', (done) => {
        c('do stuff');
        _.forEach(mock_banks, (name) => {
            admin.create_bank(name)
            .then((res) => {
                c(res);
                c('TODO: make some assertions on the res object.');;
            })
            .error((err) => {
                c(err);
            });
        });
    });
});

describe('add persons to banks', () => {
    it('should add persons to banks', (done) => {
        c('do this stuff');
        _.forEach(mock_persons, (name) => {
            admin.create_person(name, mock_banks[0])
            .then((res) => {
                c(res);
                c('TODO: make assertions on res object');
            })
            .error((err) => {
                c(err);
            })
        })
    })
});

describe('add accounts to persons in banks', () => {
    it('should add accounts', (done) => {
        c('do stuff');
        _.forEach(mock_persons, (person_name) => {
            _.forEach(mock_accounts, (account_name) => {
                admin.create_account(mock_banks[0], )
            });
        });

    });
});

describe('deposit some money into various accounts', () => {
    it('should be able to deposit money to accounts', (done) => {
        c('do stuff');
    });
});

describe('transfer money between accounts', () => {
    it('should be able to transfer money between accounts', (done) => {
        c('do stuff');
    })
})
