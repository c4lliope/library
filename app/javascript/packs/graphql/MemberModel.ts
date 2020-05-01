import { Instance } from "mobx-state-tree"
import { MemberModelBase } from "./MemberModel.base"

/* The TypeScript type of an instance of MemberModel */
export interface MemberModelType extends Instance<typeof MemberModel.Type> {}

/* A graphql query fragment builders for MemberModel */
export { selectFromMember, memberModelPrimitives, MemberModelSelector } from "./MemberModel.base"

/**
 * MemberModel
 */
export const MemberModel = MemberModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
