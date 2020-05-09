import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import BaseBorder from "./border"

const Border = styled(BaseBorder)`
background-color: #fbeed1;
`

const Headline = styled.div`
margin-bottom: 1em
`

const Image = styled.img`
border: 1px solid grey;
width: 100%;
`

const Summary = styled.div`
`

const Span = styled.div`
display: grid;
grid-template-columns: 40% 1fr;
grid-column-gap: 1em;
`

const Record = observer(({ record, onClick }) => (
    <Border onClick={onClick}>
        <Headline>
            {record.name},
            by {record.byline}<br/>
        </Headline>

        <Span>
            <Image src={
                record.image_url ||
                `http://jpg.cool/${record.name.replace(" ", ".")}.by.${record.byline.replace(" ", ".")}`
            }
            alt={`Image of ${record.name}`}
            />

            <Summary>
                {record.summary}
            </Summary>
        </Span>
    </Border>
))

export default Record