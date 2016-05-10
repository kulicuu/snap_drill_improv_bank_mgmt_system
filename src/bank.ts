

const c = function(...args:[any]) {console.log.apply(console, arguments);};
import * as _ from 'lodash';
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');

// mutable
var memory = {
    banks: {
        persons: {
            // accounts: {},
        }
    },
    transfers: {}
};

//
var lambda_arch_memory = [];
var lam = lambda_arch_memory;


const bank_factory = function (name) {
    // here we can spec the interface
    return {
        name: name
    }
};

const person_factory = function (name) {
    return {
        name: name
        // et cetera
    }
};

const account_factory = function (name: string) {
    let id = uuid.v4();
    return {
        name: name,
        id: id,
        balance: 0
    }
}
// ...




const bank_api = function () {

    const create_bank = function (name: string, cb: any) {
        let id = uuid.v4();
        // mutable arch strategy
        memory.banks[name] = {
            id: id
            capital: 0,
            accounts: [],
            transfers: []
        };
        // lambda architecture strategy
        lam.push({
            event_type: 'create_bank',
            id: id,
            bank_name: name
        });
        cb(null, {
            status: 'OK',
            bank_id: id,
            bank_name: name
        });
    };

    const read_bank = function (name: string, cb: any) {
        let bank = memory.banks[name];
        return bank;
    };

    // update
    const update_bank_capital = function (name: string, amount: number, cb: any) {
        memory.banks[name].capital += amount;
        cb(null, {
            status: 'OK',
            new_capital_amount: memory.banks[name].capital;
        });
    };

    // delete
    const delete_bank = function (name: string, cb: any) {
        delete memory.banks[name];  // not!! a viable real world implementation
    }

    // ........... person
    const create_person = function (person_name: string, bank_name: string, cb: any) {
        // TODO use person factory instead of adhoc
        let id = uuid.v4();
        memory.banks[bank_name].persons[person_name] = {
            name: person_name,
            id: id,
            accounts: {}
        };
    };

    const create_account = function (bank_name: string, person_name: string, account_name: string , cb: any) {
        let id = uuid.v4();
        let new_account = account_factory(account_name)
        memory.banks[bank_name].persons[person_name].accounts[account_name] = new_account ;
        cb(null, {
            status: 'OK',
            account: new_account
        });
    };

    const read_account = function (bank_name: string, person_name: string, account_name: string, cb: any) {
        let account = memory.banks[bank_name].persons[person_name].accounts[account_name];
        // normally this would be some kind of async operation so we use callbacks
        cb(null, account);
    };

    const update_account = function (bank_name: string, person_name: string, account_name: string, update_obj: update_object_interface, cb: any) {
        let account = memory.banks[bank_name].persons[person_name].accounts[account_name];
        _.forEach(update_obj, (key, value) => {
            // do stuff
            // for example
            if (key === 'deposit_money') {
                account.balance += value;
            }
            if (key === 'widthrawal_money') {
                account.balance -= value;
            }
        });
        cb(null, {
            status: 'OK',
            updated_account: updated_account
        });
    };

    const make_transfer = function (arq: transfer_interface_object, cb: transfer_cb_function_type) {
        let {sending_bank_name, receiving_bank_name, sending_person_name, receiving_person_name, sending_account_name, receiving_account_name, transfer_amount } = arq;
        let sending_account = memory.banks[sending_bank_name].persons[sending_person_name].accounts[sending_account_name];
        let receiving_account = memory.banks[receiving_bank_name].persons[receiving_persons_name].accounts[receiving_accounts_name];
        sending_account.balance -= transfer_amount;
        receiving_account.balance += transfer_amount;
        cb(null, {
            updated_sending_account: sending_account,
            updated_receiving_account: receiving_account;
        });
    };

    return {
        create_bank: create_bank,
        read_bank: read_bank,
        update_bank: update_bank,
        delete_bank: delete_bank,

        create_person: create_person,
        create_account: create_account,
        read_account: read_account,
        update_account: update_account,

        make_transfer: make_transfer
    }
};

export default function (message: any) {
    return Promise.promisifyAll(bank_api());
};
