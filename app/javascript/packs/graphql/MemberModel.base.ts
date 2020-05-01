/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * MemberBase
 * auto generated base class for the model MemberModel.
 */
export const MemberModelBase = ModelBase
  .named('Member')
  .props({
    __typename: types.optional(types.literal("Member"), "Member"),
    email: types.union(types.undefined, types.string),
    fullName: types.union(types.undefined, types.string),
    id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class MemberModelSelector extends QueryBuilder {
  get email() { return this.__attr(`email`) }
  get fullName() { return this.__attr(`fullName`) }
  get id() { return this.__attr(`id`) }
}
export function selectFromMember() {
  return new MemberModelSelector()
}

export const memberModelPrimitives = selectFromMember().email.fullName
