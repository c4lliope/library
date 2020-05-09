import React from "react"
import { observer } from "mobx-react"

import Border from "./border"
import Image from "./image"

const Record = observer(({ record, onClick }) => (
    <Border onClick={onClick}>
        {record.name}<br/>
        by {record.byline}

        <Image src={
            record.image_url ||
            `http://jpg.cool/${record.name.replace(" ", ".")}.by.${record.byline.replace(" ", ".")}`
            }
            alt={`Image of ${record.name}`}
        />
    </Border>
))

export default Record