import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import Loading from "./loading"
import Record from "./record"

const CardLay = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-column-gap: 1rem;
grid-row-gap: 1rem;

@media(min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
}
`

const GridLay = styled.div`
display: flex;
flex-direction: column;
border: 2px solid black;
border-radius: 4px;
`

const GridBar = styled.div`
display: grid;
grid-template-columns: 80px 2fr 1fr 4fr;
grid-column-gap: 1rem;
padding: 0.5rem;
border-bottom: 2px solid black;
`

const Image = styled.img`
border: 1px solid grey;
width: 100%;
`

const Home = observer(() => (
    model.records.length > 0
    ? (
        model.display === "grid"
        ? <>
        <a href="#" onClick={() => model.set("display", "card")}>Display as cards.</a>
        <GridLay>
            {model.records.map(record => (
                <GridBar
                key={record.name}
                onClick={() => model.focus_record(record)}
                >
                    <Image src={
                        record.imageAddress ||
                        `http://jpg.cool/${record.name.replace(" ", ".")}.by.${record.byline.replace(" ", ".")}`
                    }
                    alt={`Image of ${record.name}`}
                    />

                    <span>{record.name}</span>
                    <span>by {record.byline}</span>
                    <span>{record.summary}</span>
                </GridBar>
                ))}
        </GridLay>
        </>
        : <>
        <a href="#" onClick={() => model.set("display", "grid")}>Display as grid.</a>
        <CardLay>
            {model.records.map(record => (
                <Record
                key={record.name}
                record={record}
                onClick={() => model.focus_record(record)}
                />
            ))}
        </CardLay>
        </>
    )
    : <Loading />
))

export default Home