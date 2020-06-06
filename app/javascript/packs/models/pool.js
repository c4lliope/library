import { types } from "mobx-state-tree"
import graph from "../graph"
import { Luxon } from "./index"

const PoolCharge = types.model({
    price: 0,
    pool: "mail",
    paidOn: Luxon,
})

const Pool = types.model({
    pool_charges: types.array(PoolCharge),
    card_nonce: types.maybeNull(types.string),
    card_name: types.maybeNull(types.string),
    donor_price: 0,
}).actions(self => ({
    acquire_charges: (pool) => {
        graph(`query ($pool: String!) { poolCharges (pool: $pool) { price paidOn pool } }`)
        ({ pool: pool })
        .then(response => self.claim("pool_charges", response.poolCharges))
    },

    record_bank_card: ({ nonce, name }) => {
        graph(`query ($nonce: String!, $name: String) { addBankCard (nonce: $nonce, name: $name) { name nonce } }`)
        ({ nonce, name })
        .then(response => {
            localStorage.setItem("card_nonce", response.addBankCard.nonce)
            localStorage.setItem("card_name", response.addBankCard.name)
            self.claim("card_nonce", response.addBankCard.nonce)
            self.claim("card_name", response.addBankCard.name)
        })
    },

    claim: (key, pause) => {
        if(typeof self[key] === "number")
            self[key] = Number(pause)
        else
            self[key] = pause
    },

    pay_donor_price: (pool) => {
        graph(`query ($nonce: String!, $price: Float!, $pool: String!) {
            chargeBankCard(nonce: $nonce, price: $price, pool: $pool) {
                price
            }
        }`)
        ({ price: self.donor_price, pool, nonce: self.card_nonce })
    },
})).views(self => ({
    get pool_sum() { return self.pool_charges.reduce((sum, x) => sum + x.price, 0) },
}))

export default Pool