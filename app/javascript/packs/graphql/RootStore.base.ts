/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { RecordModel, RecordModelType } from "./RecordModel"
import { recordModelPrimitives, RecordModelSelector } from "./RecordModel.base"
import { MemberModel, MemberModelType } from "./MemberModel"
import { memberModelPrimitives, MemberModelSelector } from "./MemberModel.base"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  records: ObservableMap<string, RecordModelType>,
  members: ObservableMap<string, MemberModelType>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Record', () => RecordModel], ['Member', () => MemberModel]], ['Record', 'Member'], "js"))
  .props({
    records: types.optional(types.map(types.late((): any => RecordModel)), {}),
    members: types.optional(types.map(types.late((): any => MemberModel)), {})
  })
  .actions(self => ({
    // Library records.
    queryRecords(variables?: {  }, resultSelector: string | ((qb: RecordModelSelector) => RecordModelSelector) = recordModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ records: RecordModelType[]}>(`query records { records {
        ${typeof resultSelector === "function" ? resultSelector(new RecordModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  })))
