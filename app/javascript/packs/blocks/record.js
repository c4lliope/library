import React from "react"
import { observer } from "mobx-react"

import Border from "./border"
import Image from "./image"

const Record = observer(({ record, onClick }) => (
    <Border onClick={onClick}>
        {record.name}<br/>
        by {record.byline}

        {record.image
        ? <Image src={record.image} alt={`Image of ${record.name}`} />
        : null
        }
    </Border>
))

export default Record