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
import Search from "./blocks/search"

import Model from "./models"

var model = window.model = Model.create({})

model.acquire_records()
model.acquire_session()

const Header = styled.div`
background-color: #950cd6;
text-align: right;
color: #fbeed1;
padding: 1rem;
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
font-size: 2em;

@media(min-width: 1000px) {
}
`

const Page = styled.div`
background-color: #efd2d2;

input {
    font-size: 1.6em;
    clear: both;
    margin-bottom: 0.2em;
    border: 1px solid grey;
}

font-size: 36px;
@media(min-width: 1000px) {
    font-size: 16px;
}
`

const Bar = styled(Spacing)`
  display: flex;
  left: 0;
  right: 0;
  justify-content: space-between;
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

            <Spacing space="2rem" overhang="6em" >
                <Bar>
                    <Search/>
                    <AddRecord/>

                    <AlignEnd>
                        <Session/>
                        <AddName/>
                    </AlignEnd>
                </Bar>

                <Home/>
                <FocusedRecord />
            </Spacing>
        </Page>
    </ModalProvider>,
    document.querySelector('#base')
);