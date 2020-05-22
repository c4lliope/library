import { types } from "mobx-state-tree"

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
    set: (key, value) => { self[key] = value },

    change: (key, value) => {
        graph(`mutation ($${key}: String!) {
            changeMe (${key}: $${key}) {
                me { ${key} }
            }
        }`)({ [key]: value, id: self.id })
        .then(response => self.set(key, response.changeMe.me[key]))
    },
}))

export default Member