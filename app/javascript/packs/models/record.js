import { types } from "mobx-state-tree"

import Member from "./member"

const Record = types.model({
    id: types.identifier,
    name: types.maybeNull(types.string),
    byline: types.maybeNull(types.string),
    summary: types.maybeNull(types.string),
    imageAddress: types.maybeNull(types.string),
    language: "English",
    member: types.late(() => Member),
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

export default Record