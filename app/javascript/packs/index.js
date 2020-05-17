// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React, { useRef } from 'react'
import { render } from 'react-dom'
import { observer } from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import styled from "styled-components"
import { ModalProvider } from 'styled-react-modal'

import AddName from "./blocks/add_name"
import AddRecord from "./blocks/add_record"
import FocusedRecord from "./blocks/focused_record"
import Home from "./blocks/home"
import Session from "./blocks/session"
import Holds from "./blocks/holds"
import Search from "./blocks/search"
import Links from "./blocks/links"
import Border from "./blocks/border"
import Money from "./blocks/money"
import Header, { Spacing } from "./blocks/header"

import Model from "./models"

var model = window.model = Model.create({})

model.acquire_records()
model.acquire_session()
// model.delay("goodreads_search", "political order and political decay", 1000, () => model.run_goodreads_search())

const Page = styled.div`
background-color: #f7e8bf;

font-family: 'DM Mono', monospace;

input {
    font-size: 1.2em;
    margin-bottom: 0.2em;
}

font-size: 36px;
@media(min-width: 1000px) {
    font-size: 16px;
}
`

const Bar = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1rem;
`

const AlignEnd = styled.div`
text-align: end;
`

render(
    <ModalProvider>
        <Page>
            <Header/>

            <Spacing space="2rem" overhang="4em" >
                <Bar>
                    <Links/>

                    <AlignEnd>
                        <Search/>
                        <Session/>
                        <AddName/>
                        <AddRecord/>
                        <Holds/>
                        <Money/>
                    </AlignEnd>
                </Bar>

                <Home/>
                <FocusedRecord />
            </Spacing>
        </Page>
    </ModalProvider>,
    document.querySelector('#base')
);