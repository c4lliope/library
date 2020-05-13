import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import md5 from "js-md5"

import BaseBorder from "./border"

const Border = styled(BaseBorder)`
background-color: #fbeed1;

border: 4px solid darkgrey;
border-radius: 8px;
`

const Headline = styled.div`
margin-bottom: 1em;
display: flex;
justify-content: space-between;
flex-direction: row;
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

const Profile = styled.img`
border-radius: 50%;
`

const Record = observer(({ record, onClick }) => (
    <Border onClick={onClick}>
        <Headline>
            <div>
                {record.name},
                by {record.byline}
            </div>

            <Profile alt={record.member.name} src={`https://www.gravatar.com/avatar/${md5(record.member.email)}?d=retro&s=50`} />
        </Headline>

        <Span>
            <Image src={
                record.imageAddress ||
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