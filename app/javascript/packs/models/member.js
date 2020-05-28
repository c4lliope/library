import { types } from "mobx-state-tree"

import graph from "../graph"
import ShippingCharge from "./shipping_charge"

const Member = types.model({
    id: types.identifier,
    name: types.maybeNull(types.string),
    surname: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    email: types.string,
    shippingCharges: types.array(ShippingCharge),
    cashHandle: types.maybeNull(types.string),
}).actions(self => ({
    claim: (key, value) => { self[key] = value },

    change: (key, value) => {
        graph(`query ($${key}: String!) {
            changeMe (${key}: $${key}) {
                ${key}
            }
        }`)({ [key]: value, id: self.id })
        .then(response => self.claim(key, response.changeMe[key]))
    },
}))

export default Member