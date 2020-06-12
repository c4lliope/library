import { types } from "mobx-state-tree"

import graph from "../graph"
import Luxon from "./luxon"

import Pool from "./pool"
import Member from "./member"
import Record from "./record"
import Hold from "./hold"
import GoodreadsResponse from "./goodreads_response"

var delays = {}

const Model = types.model({
    records: types.array(Record),
    members: types.array(Member),
    me: types.maybeNull(Member),
    holds: types.array(Hold),

    displaying_holds: false,
    focused_record: types.maybeNull(types.reference(Record)),
    
    photoString: "",
    cameraIsOpen: false,
    addingName: false,
    session_pending: false,
    display: "card",
    claimMoneyModal: false,

    goodreads_search: types.maybeNull(types.string),
    goodreads_responses: types.array(GoodreadsResponse),

    search: "",
    
}).views(self => ({
    get money() {
        return self.me.shippingCharges.reduce((sum, x) => sum + x.price, 0)
    },
})).actions(self => ({
    add_record: (name, byline, imageAddress) => {
        graph(`query ($name: String, $byline: String, $imageAddress: String) {
            addRecord (name: $name, byline: $byline, imageAddress: $imageAddress) {
                id name byline imageAddress
                member { id name email }
            }
        }`)({ name, byline, imageAddress })
        .then(response => {
            const record = Record.create(response.addRecord.record)
            self.claim_record(record)
            self.focus_record(record)
        })
    },

    acquire_records: () => {
        graph(`query { records { id name byline summary imageAddress member { id name email }}}`)()
        .then(response => self.claim_records(response.records) )
    },

    acquire_session: () => {
        graph(`query { me { id name surname email address cashHandle
            holds { id recordId beginsOn expiresOn }
            shippingCharges { price holdId }
        } }`)()
        .then(response => {
            self.claim_session(response.me)
            response.me && self.claim_holds(response.me.holds)
        })
    },

    change_me: (changes) => {
        graph(`query ($name: String!, $surname: String!, $address: String!) {
            changeMe (name: $name, surname: $surname, address: $address) {
                id name surname email address
            }
        }`)(changes)
        .then(response => self.claim_session(response.changeMe.me))
    },

    change_record: (id, changes) => {
        graph(`query ($id: ID!, $name: String!, $byline: String!, $summary: String) {
            changeRecord (id: $id, name: $name, byline: $byline, summary: $summary {
                id, name, byline, summary
            }
        }`)({ ...changes, id })
        .then(response => self.claim_record(response.changeRecord.record))
    },

    claim_goodreads_responses: (responses) => {
        self.goodreads_responses = responses
    },

    claim_holds: (holds) => {
        self.holds = holds
    },
    
    claim_record: (record) => {
        var index = self.records.indexOf(x => x.id === record.id)

        if(index === -1)
            self.records.push(record)
        else
            self.records.splice(index, 1, record)
    },

    claim_records: (records) => self.records = records,
    claim_session: (me) => self.me = me,

    delay: (key, value, delay, callback) => {
        self.claim(key, value)

        if(delays[key]) clearTimeout(delays[key])
        delays[key] = setTimeout(callback, delay)
    },
    
    drop_record: (id) => {
        if(self.focused_record.id === id)
            self.focus_record(null)

        graph(`query ($id: ID!) { dropRecord(id: $id) }`)({ id })
        .then(response => response.dropRecord.id ? self.unclaim_record(response.dropRecord.id) : null)
    },

    hold_dialogue: (hold) => {

    },

    focus_record: (record) => {
        self.focused_record = record
    },

    flag: (record) => {

    },

    place_hold: (record) => {
        graph(`query ($recordId: ID!) { placeHold(recordId: $recordId) { beginsOn expiresOn } }`)
        ({ recordId: record.id })
        .then(response => {
            self.claim("displaying_holds", true)
            self.acquire_session()
        })
    },

    run_search: () => {
        graph(`query ($search: String) { records(search: $search) {
            id name byline summary member { id name email }
        }}`)
        ({ search: self.search || null })
        .then(response => self.claim_records(response.records) )
    },

    run_goodreads_search: () => {
        graph(`query ($search: String!) { goodreadsSearch (search: $search) {
            id name byline imageAddress
        }}`)
        ({ search: self.goodreads_search })
        .then(response => self.claim_goodreads_responses(response.goodreadsSearch))
    },

    claim: (key, value) => { self[key] = value },
    
    sign_in: ({ email }) => {
        graph(`query ($email: String!) { signIn(email: $email) { email }}`)({ email: email })
        .then((response) => {
            response.signIn.email
            ? self.claim("session_pending", true)
            : null
        })
    },

    unclaim_record: (id) => {
        self.records.splice(self.records.indexOf(x => x.id === id), 1)
    }
}))

export { Member, Record, Pool, Luxon }
export default Model