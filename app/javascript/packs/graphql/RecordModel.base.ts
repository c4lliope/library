/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { MemberModel, MemberModelType } from "./MemberModel"
import { MemberModelSelector } from "./MemberModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  member: MemberModelType;
}

/**
 * RecordBase
 * auto generated base class for the model RecordModel.
 */
export const RecordModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Record')
  .props({
    __typename: types.optional(types.literal("Record"), "Record"),
    id: types.identifier,
    imageUrl: types.union(types.undefined, types.null, types.string),
    language: types.union(types.undefined, types.null, types.string),
    member: types.union(types.undefined, MSTGQLRef(types.late((): any => MemberModel))),
    name: types.union(types.undefined, types.string),
    summary: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class RecordModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get imageUrl() { return this.__attr(`imageUrl`) }
  get language() { return this.__attr(`language`) }
  get name() { return this.__attr(`name`) }
  get summary() { return this.__attr(`summary`) }
  member(builder?: string | MemberModelSelector | ((selector: MemberModelSelector) => MemberModelSelector)) { return this.__child(`member`, MemberModelSelector, builder) }
}
export function selectFromRecord() {
  return new RecordModelSelector()
}

export const recordModelPrimitives = selectFromRecord().imageUrl.language.name.summary
