import { types } from "mobx-state-tree"
import graph from "../graph"
import { Luxon } from "./index"

const PoolCharge = types.model({
    price: 0,
    donorHandle: types.string,
    pool: "mail",
    paidOn: Luxon,
})

const Pool = types.model({
    pool_charges: types.array(PoolCharge),
}).actions(self => ({
    acquire_charges: (pool) => {
        graph(`query ($pool: String!) { poolCharges (pool: $pool) { donorHandle price paidOn pool } }`)
        ({ pool: pool })
        .then(response => self.claim("pool_charges", response.poolCharges))
    },

    add_bank_card: ({ nonce }) => {
        graph(`query ($nonce: String!) { addBankCard (nonce: $nonce) { nonce } }`)
        ({ nonce })
        .then(response => { console.log(response.data.nonce); debugger; })
    },

    claim: (key, pause) => {
        self[key] = pause
    }
})).views(self => ({
    get pool_sum() { return self.pool_charges.reduce((sum, x) => sum + x.price, 0) },
}))

export default Pool