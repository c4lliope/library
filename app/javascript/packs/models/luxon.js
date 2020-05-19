import { types } from "mobx-state-tree"
import { DateTime } from "luxon"

const Luxon = types.custom({
    fromSnapshot: (value) => DateTime.fromISO(value),
    toSnapshot: (value) => value.toISODate(),
    isTargetType: (value) => value.isLuxonDateTime,
    getValidationMessage: (value) => { let d = DateTime.fromISO(value); return d.invalid && d.invalid.explanation },
})

export default Luxon