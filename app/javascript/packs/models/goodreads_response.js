import { types } from "mobx-state-tree"

const GoodreadsResponse = types.model({
    id: types.identifier,
    name: types.string,
    byline: types.string,
    imageAddress: types.string,
})

export default GoodreadsResponse