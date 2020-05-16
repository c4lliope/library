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
import Money from "./blocks/money"

import Model from "./models"
import { acquire_records, acquire_session } from "./graph"

var model = window.model = Model.create({})

model.acquire_records()
model.acquire_session()
// model.delay("goodreads_search", "political order and political decay", 1000, () => model.run_goodreads_search())

const Header = styled.div`
background-color: #950cd6;
text-align: right;
color: #fbeed1;
padding: 0.5rem;
position: fixed;
top: 0;
left: 0;
right: 0;
box-shadow: 0px 6px 6px 0px #b16893;
font-family: 'Carter One', sans-serif;
`

const Spacing = styled.div`
padding: ${p => p.space || "1rem"};
${p => p.overhang
? `padding-top: ${p.overhang};`
: null
}
`

const Heading = styled.div`
font-size: 1.6em;

@media(min-width: 1000px) {
}
`

const Page = styled.div`
background-color: #f7e8bf;

font-family: 'DM Mono', monospace;

input {
    font-size: 1.6em;
    clear: both;
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
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
`

const AlignEnd = styled.div`
text-align: end;
`

render(
    <ModalProvider>
        <Page>
            <Header>
                <Heading>...our shared library。</Heading>
            </Header>

            <Spacing space="2rem" overhang="4em" >
                <Bar>
                    <Search/>

                    <AlignEnd>
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