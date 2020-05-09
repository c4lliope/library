import React from "react"
import { observer } from "mobx-react"

import Loading from "./loading"
import Grid from "./grid"
import Record from "./record"

const Home = observer(() => (
    model.records.length > 0
    ? <Grid>
        {model.records.map(record => (
            <Record
            key={record.name}
            record={record}
            onClick={() => model.focus_record(record)}
            />
        ))}
    </Grid>
    : <Loading />
))

export default Home