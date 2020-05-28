import { types } from "mobx-state-tree"

import graph from "../graph"
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
    claim: (key, value) => { self[key] = value },

    change: (key, value) => {
        graph(`query ($id: ID!, $${key}: String!) {
            changeRecord (id: $id, ${key}: $${key}) {
                record { ${key} }
            }
        }`)({ [key]: value, id: self.id })
        .then(response => self.claim(key, response.changeRecord.record[key]))
    },
}))

export default Record