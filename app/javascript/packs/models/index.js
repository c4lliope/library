import { types } from "mobx-state-tree"
import graphql from "../graphql"

const graph = graphql("/graphql", {
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Authorization": localStorage.getItem("token"),
    },
})

const Member = types.model({
    id: types.identifier,
    name: types.string,
    surname: types.maybeNull(types.string),
    email: types.string,
})

const Record = types.model({
    id: types.identifier,
    name: types.string,
    byline: types.maybeNull(types.string),
    summary: types.maybeNull(types.string),
    language: "English (assumed)",
    image: types.maybeNull(types.string),
    member: Member,
}).actions(self => ({
    change_image: (image) => { self.image = image },
}))

const Model = types.model({
    records: types.array(Record),
    members: types.array(Member),
    me: types.maybeNull(Member),

    focused_record: types.maybeNull(types.reference(Record)),
    
    photoString: "",
    cameraIsOpen: false,
    
}).actions(self => ({
    acquire_records: () => {
        graph(`query { records { id name byline summary image member { id name email }}}`)()
        .then(response => self.claim_records(response.records) )
    },
    
    acquire_session: () => {
        graph(`query { me { id name email }}`)()
        .then(response => self.claim_session(response.me))
    },
    
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

    change_record: (id, changes) => {
        graph(`mutation ($id: ID!, $name: String!, $byline: String!, $summary: String, $image: String) {
            changeRecord (id: $id, name: $name, byline: $byline, summary: $summary, image: $image) {
                record { id }
            }
        }`)({ ...changes, id })
        .then(response => self.acquire_records())
    },
    
    claim_record: (record) => self.records.push(record),
    claim_records: (records) => self.records = records,
    claim_session: (me) => self.me = me,
    
    drop_record: (id) => {
        graph(`mutation ($id: ID!) { dropRecord(id: $id) { id }}`)({ id })
        .then(response => response.dropRecord.id ? self.unclaim_record(response.dropRecord.id) : null)
    },

    focus_record: (record) => {
        self.focused_record = record
    },

    set: (key, value) => { self[key] = value },
    
    sign_in: ({ email }) => {
        graph(`mutation ($email: String!) { signIn(email: $email) { token }}`)({ email: email })
        .then((response) => localStorage.setItem("token", response.signIn.token))
        self.acquire_session()
    },

    unclaim_record: (id) => {
        self.records.splice(self.records.indexOf(x => x.id === id), 1)
    }
}))

export { Member, Record }
export default Model