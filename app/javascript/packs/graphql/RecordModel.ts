import { Instance } from "mobx-state-tree"
import { RecordModelBase } from "./RecordModel.base"

/* The TypeScript type of an instance of RecordModel */
export interface RecordModelType extends Instance<typeof RecordModel.Type> {}

/* A graphql query fragment builders for RecordModel */
export { selectFromRecord, recordModelPrimitives, RecordModelSelector } from "./RecordModel.base"

/**
 * RecordModel
 */
export const RecordModel = RecordModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
