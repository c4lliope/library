import { types } from "mobx-state-tree"

import Hold from "./hold"

const ShippingCharge = types.model({
    price: types.number,
    holdId: types.reference(types.late(() => Hold)),
})

export default ShippingCharge