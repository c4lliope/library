import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import Modal from "./modal"

const Money = observer(() => (
    model.me &&
    <>
        Your money: {model.money}.
        &nbsp;<a href="#" onClick={() => model.claim("claimMoneyModal", true)}>claim your money.</a>

        {model.claimMoneyModal
        ? <Modal onBackgroundClick={() => model.claim("claimMoneyModal", false)}>
            Program Pending: reimburse shipping charges.
        </Modal>
        : null
        }
    </>
))

export default Money