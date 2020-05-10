import React from "react"
import { observer } from "mobx-react"

import Modal from "./modal"
import ProcessRecord from "./process_record"

const FocusedRecord = observer(() => (
    model.focused_record &&
    <Modal
          isOpen
          onBackgroundClick={() => model.focus_record(null)}
        >
            <a href='#' onClick={() => model.focus_record(null)}>close record.</a><br/>

            {model.me && model.focused_record.member.id === model.me.id
             ? <a
                href='#'
                onClick={() => { var id = model.focused_record.id; model.focus_record(null); model.drop_record(id)}}
                >drop record.</a>
            : null
            }

          <ProcessRecord
              originalName={model.focused_record.name}
              originalByline={model.focused_record.byline}
              originalSummary={model.focused_record.summary}
              originalImage={model.focused_record.image}
              buttonText="Change record"
              onProcessRecord={({ name, byline, summary, image }) => {
                  model.change_record(model.focused_record.id, { name, byline, summary, image })
                  model.focus_record(null)
              }}
              />
        </Modal>
))

export default FocusedRecord