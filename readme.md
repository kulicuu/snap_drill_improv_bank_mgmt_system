


###  Bank account mgmt system

##### specification of assignments
> Write a simple bank accounting system.
> should include the following entities:
> bank, person, account, transfer,
> Write it as a microservice, with option to geth balance of bank, person, and account.  Do transfer between accounts [...]
> and list of all transactions
> You can use memory as storage, no need to use any DB.
> all exposed as http/json API
> Write using TypeScript, ES6 generators, and promises.
> Give one or two examples of tests using Mocha.



#### notes

This is of course a very rough draft.  For this initial phase I avoided the factoring out into modules process, and didn't worry to much about architecture, just implement an API in bank.ts file that implements everything.

I did decide one thing architecturally, which is that it would be best to use a lambda-architecture/immutable data structure for the whole thing.  This so it would be possible to trace history space perfectly, and adds resilience.  However, while I made this decision, for the rough draft I'm just modifying a scratch/mock in-memory mutable data structure called `memory` which holds everything.  Given substantially more time, I could come up with an event-type protocol & reducer functions for the whole gamut of possible transactions and queries.

I started writing some tests, in Mocha.
