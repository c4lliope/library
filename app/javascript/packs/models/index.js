import { types } from "mobx-state-tree"
import graphql from "../graphql"

const graph = graphql("/graphql", {
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Authorization": localStorage.getItem("token"),
    },
})

const Member = types.model({
    name: types.string,
    surname: types.maybeNull(types.string),
    email: types.string,
})

const Record = types.model({
    name: types.string,
    summary: types.maybeNull(types.string),
    language: "English (assumed)",
    image_url: types.maybeNull(types.string),
    member: Member,
})

const Model = types.model({
    records: types.array(Record),
    members: types.array(Member),
    me: types.maybeNull(Member),

    photoString: "",
    photoWasTaken: false,
    cameraIsOpen: false,

}).actions(self => ({
    acquire_records: () => {
        graph(`query { records { name summary member { name email }}}`)()
        .then(response => self.claim_records(response.records) )
    },
    claim_records: (records) => self.records = records,

    sign_in: ({ email }) => {
        graph(`mutation ($email: String!) { signIn(email: $email) { token }}`)({ email: email })
        .then((response) => localStorage.setItem("token", response.signIn.token))
        self.acquire_session()
    },

    acquire_session: () => {
        graph(`query { me { name email }}`)()
        .then(response => self.claim_session(response.me))
    },

    claim_session: (me) => {
        self.me = me
    },

    set: (key, value) => { self[key] = value },
}))

export { Member, Record }
export default Model