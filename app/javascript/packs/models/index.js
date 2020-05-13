import { types } from "mobx-state-tree"
import { DateTime } from "luxon"
import graph from "../graph"

var delays = {}

window.DateTime = DateTime
const LuxonDate = types.custom({
    fromSnapshot: (value) => DateTime.fromISO(value),
    toSnapshot: (value) => value.toISODate(),
    isTargetType: (value) => value.isLuxonDateTime,
    getValidationMessage: (value) => { let d = DateTime.fromISO(value); return d.invalid && d.invalid.explanation },
})

const GoodreadsResponse = types.model({
    id: types.identifier,
    name: types.string,
    byline: types.string,
    imageAddress: types.string,
})

const Member = types.model({
    id: types.identifier,
    name: types.maybeNull(types.string),
    surname: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    email: types.string,
})

const Record = types.model({
    id: types.identifier,
    name: types.maybeNull(types.string),
    byline: types.maybeNull(types.string),
    summary: types.maybeNull(types.string),
    imageAddress: types.maybeNull(types.string),
    language: "English",
    member: Member,
}).actions(self => ({
    set: (key, value) => { self[key] = value },

    change: (key, value) => {
        graph(`mutation ($id: ID!, $${key}: String!) {
            changeRecord (id: $id, ${key}: $${key}) {
                record { ${key} }
            }
        }`)({ [key]: value, id: self.id })
        .then(response => self.set(key, response.changeRecord.record[key]))
    },
}))

const Hold = types.model({
    id: types.identifier,
    record: types.reference(Record),
    beginsOn: LuxonDate,
    expiresOn: LuxonDate,
})

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

    goodreads_search: types.maybeNull(types.string),
    goodreads_responses: types.array(GoodreadsResponse),

    search: "",
    
}).actions(self => ({
    add_record: (name, byline, imageAddress) => {
        graph(`mutation ($name: String, $byline: String, $imageAddress: String) {
            addRecord (name: $name, byline: $byline, imageAddress: $imageAddress) {
                record {
                    id name byline imageAddress
                    member { id name email }
                }
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
        graph(`query { me { id name surname email address
            holds { id record beginsOn expiresOn }
        } }`)()
        .then(response => {
            self.claim_session(response.me)
            self.claim_holds(response.me.holds)
        })
    },

    change_me: (changes) => {
        graph(`mutation ($name: String!, $surname: String!, $address: String!) {
            changeMe (name: $name, surname: $surname, address: $address) {
                me { id name surname email address }
            }
        }`)(changes)
        .then(response => self.claim_session(response.changeMe.me))
    },

    change_record: (id, changes) => {
        graph(`mutation ($id: ID!, $name: String!, $byline: String!, $summary: String) {
            changeRecord (id: $id, name: $name, byline: $byline, summary: $summary {
                record { id, name, byline, summary }
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
        self.set(key, value)

        if(delays[key]) clearTimeout(delays[key])
        delays[key] = setTimeout(callback, delay)
    },
    
    drop_record: (id) => {
        if(self.focused_record.id === id)
            self.focus_record(null)

        graph(`mutation ($id: ID!) { dropRecord(id: $id) { id }}`)({ id })
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
        graph(`mutation ($recordId: ID!) { placeHold(recordId: $recordId) { hold { beginsOn expiresOn } } }`)
        ({ recordId: record.id })
        .then(response => {
            self.set("displaying_holds", true)
            self.acquire_session()
        })
    },

    run_search: () => {
        graph(`query ($search: String) { records(search: $search) { id name byline summary member { id name email }}}`)
        ({ search: self.search || null })
        .then(response => self.claim_records(response.records) )
    },

    run_goodreads_search: () => {
        graph(`query ($search: String!) { goodreadsSearch (search: $search) { id name byline imageAddress }}`)
        ({ search: self.goodreads_search })
        .then(response => self.claim_goodreads_responses(response.goodreadsSearch))
    },

    set: (key, value) => { self[key] = value },
    
    sign_in: ({ email }) => {
        graph(`mutation ($email: String!) { signIn(email: $email) { code }}`)({ email: email })
        .then((response) => {
            response.signIn.code
            ? self.set("session_pending", true)
            : null
        })
    },

    unclaim_record: (id) => {
        self.records.splice(self.records.indexOf(x => x.id === id), 1)
    }
}))

export { Member, Record }
export default Model