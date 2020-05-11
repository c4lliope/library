import { types } from "mobx-state-tree"
import graph from "../graph"

const Member = types.model({
    id: types.identifier,
    name: types.maybeNull(types.string),
    surname: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    email: types.string,
})

const Record = types.model({
    id: types.identifier,
    name: types.string,
    byline: types.maybeNull(types.string),
    summary: types.maybeNull(types.string),
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
    member: Member,
    record: types.reference(Record),
    begins_on: types.Date,
    expires_on: types.Date,
})

const Model = types.model({
    records: types.array(Record),
    members: types.array(Member),
    me: types.maybeNull(Member),

    focused_record: types.maybeNull(types.reference(Record)),
    
    photoString: "",
    cameraIsOpen: false,
    addingName: false,
    addingRecord: false,
    session_pending: false,

    search: "",
    
}).actions(self => ({
    add_record: (name, byline, summary) => {
        graph(`mutation ($name: String!, $summary: String, $byline: String!) {
            addRecord(name: $name, summary: $summary, byline: $byline) {
                record {
                    id name summary byline
                    member { id name email }
                }
            }
        }`)({ name, byline, summary })
        .then(response => self.claim_record(response.addRecord.record))
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
    
    claim_record: (record) => {
        var index = self.records.indexOf(x => x.id === record.id)

        if(index != -1)
            self.records.splice(index, 1, record)
        else
            self.records.push(record)
    },

    claim_records: (records) => self.records = records,
    claim_session: (me) => self.me = me,
    
    drop_record: (id) => {
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
        .then(response => self.hold_dialogue(response.placeHold.hold))
    },

    run_search: () => {
        graph(`query ($search: String) { records(search: $search) { id name byline summary member { id name email }}}`)
        ({ search: self.search })
        .then(response => self.claim_records(response.records) )
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