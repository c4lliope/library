import { types } from "mobx-state-tree"

import Luxon from "./luxon"
import ShippingCharge from "./shipping_charge"
import Record from "./record"

const Hold = types.model({
    id: types.identifier,
    recordId: types.reference(Record),
    beginsOn: Luxon,
    expiresOn: Luxon,
})

export default Hold