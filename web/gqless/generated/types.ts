import * as extensions from "../extensions";
import {
  TypeData,
  ScalarType,
  FieldsType,
  EnumType,
  FieldsTypeArg
} from "gqless";

type Extension<TName extends string> = TName extends keyof typeof extensions
  ? typeof extensions[TName]
  : any;

/**
 * @name Boolean
 * @type SCALAR
 */
type t_Boolean<T extends boolean = boolean> = ScalarType<
  T,
  Extension<"Boolean">
>;

/**
 * @name Float
 * @type SCALAR
 */
type t_Float<T extends number = number> = ScalarType<T, Extension<"Float">>;

/**
 * @name ID
 * @type SCALAR
 */
type t_ID<T extends string = string> = ScalarType<T, Extension<"ID">>;

/**
 * @name Int
 * @type SCALAR
 */
type t_Int<T extends number = number> = ScalarType<T, Extension<"Int">>;

/**
 * @name String
 * @type SCALAR
 */
type t_String<T extends string = string> = ScalarType<T, Extension<"String">>;

/**
 * @name String_comparison_exp
 * @type INPUT_OBJECT
 */
export type String_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
};

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<"__Directive">;
    args: t___InputValue[];
    description?: t_String | null;
    locations: t___DirectiveLocation[];
    name: t_String;
  },
  Extension<"__Directive">
>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
type t___DirectiveLocation = EnumType<
  | "ARGUMENT_DEFINITION"
  | "ENUM"
  | "ENUM_VALUE"
  | "FIELD"
  | "FIELD_DEFINITION"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "INPUT_FIELD_DEFINITION"
  | "INPUT_OBJECT"
  | "INTERFACE"
  | "MUTATION"
  | "OBJECT"
  | "QUERY"
  | "SCALAR"
  | "SCHEMA"
  | "SUBSCRIPTION"
  | "UNION"
>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
type t___EnumValue = FieldsType<
  {
    __typename: t_String<"__EnumValue">;
    deprecationReason?: t_String | null;
    description?: t_String | null;
    isDeprecated: t_Boolean;
    name: t_String;
  },
  Extension<"__EnumValue">
>;

/**
 * @name __Field
 * @type OBJECT
 */
type t___Field = FieldsType<
  {
    __typename: t_String<"__Field">;
    args: t___InputValue[];
    deprecationReason?: t_String | null;
    description?: t_String | null;
    isDeprecated: t_Boolean;
    name: t_String;
    type: t___Type;
  },
  Extension<"__Field">
>;

/**
 * @name __InputValue
 * @type OBJECT
 */
type t___InputValue = FieldsType<
  {
    __typename: t_String<"__InputValue">;
    defaultValue?: t_String | null;
    description?: t_String | null;
    name: t_String;
    type: t___Type;
  },
  Extension<"__InputValue">
>;

/**
 * @name __Schema
 * @type OBJECT
 */
type t___Schema = FieldsType<
  {
    __typename: t_String<"__Schema">;
    directives: t___Directive[];
    mutationType?: t___Type | null;
    queryType: t___Type;
    subscriptionType?: t___Type | null;
    types: t___Type[];
  },
  Extension<"__Schema">
>;

/**
 * @name __Type
 * @type OBJECT
 */
type t___Type = FieldsType<
  {
    __typename: t_String<"__Type">;
    description?: t_String | null;
    enumValues?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    fields?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    inputFields?: t___InputValue[] | null;
    interfaces?: t___Type[] | null;
    kind: t___TypeKind;
    name?: t_String | null;
    ofType?: t___Type | null;
    possibleTypes?: t___Type[] | null;
  },
  Extension<"__Type">
>;

/**
 * @name __TypeKind
 * @type ENUM
 */
type t___TypeKind = EnumType<
  | "ENUM"
  | "INPUT_OBJECT"
  | "INTERFACE"
  | "LIST"
  | "NON_NULL"
  | "OBJECT"
  | "SCALAR"
  | "UNION"
>;

/**
 * @name mutation_root
 * @type OBJECT
 */
type t_mutation_root = FieldsType<
  {
    __typename: t_String<"mutation_root">;

    /**
     * delete data from the table: "sessions"
     */
    delete_sessions?: FieldsTypeArg<
      { where: sessions_bool_exp },
      t_sessions_mutation_response | null
    >;

    /**
     * delete data from the table: "users"
     */
    delete_users?: FieldsTypeArg<
      { where: users_bool_exp },
      t_users_mutation_response | null
    >;

    /**
     * insert data into the table: "sessions"
     */
    insert_sessions?: FieldsTypeArg<
      {
        objects: sessions_insert_input[];
        on_conflict?: sessions_on_conflict | null;
      },
      t_sessions_mutation_response | null
    >;

    /**
     * insert data into the table: "users"
     */
    insert_users?: FieldsTypeArg<
      { objects: users_insert_input[]; on_conflict?: users_on_conflict | null },
      t_users_mutation_response | null
    >;

    /**
     * update data of the table: "sessions"
     */
    update_sessions?: FieldsTypeArg<
      { _set?: sessions_set_input | null; where: sessions_bool_exp },
      t_sessions_mutation_response | null
    >;

    /**
     * update data of the table: "users"
     */
    update_users?: FieldsTypeArg<
      { _set?: users_set_input | null; where: users_bool_exp },
      t_users_mutation_response | null
    >;
  },
  Extension<"mutation_root">
>;

/**
 * @name order_by
 * @type ENUM
 */
type t_order_by = EnumType<
  | "asc"
  | "asc_nulls_first"
  | "asc_nulls_last"
  | "desc"
  | "desc_nulls_first"
  | "desc_nulls_last"
>;

/**
 * @name query_root
 * @type OBJECT
 */
type t_query_root = FieldsType<
  {
    __typename: t_String<"query_root">;

    /**
     * fetch data from the table: "sessions"
     */
    sessions: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions[]
    >;

    /**
     * fetch aggregated fields from the table: "sessions"
     */
    sessions_aggregate: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions_aggregate
    >;

    /**
     * fetch data from the table: "sessions" using primary key columns
     */
    sessions_by_pk?: FieldsTypeArg<{ id: any }, t_sessions | null>;

    /**
     * fetch data from the table: "users"
     */
    users: FieldsTypeArg<
      {
        distinct_on?: users_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: users_order_by[] | null;
        where?: users_bool_exp | null;
      },
      t_users[]
    >;

    /**
     * fetch aggregated fields from the table: "users"
     */
    users_aggregate: FieldsTypeArg<
      {
        distinct_on?: users_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: users_order_by[] | null;
        where?: users_bool_exp | null;
      },
      t_users_aggregate
    >;

    /**
     * fetch data from the table: "users" using primary key columns
     */
    users_by_pk?: FieldsTypeArg<{ id: any }, t_users | null>;
  },
  Extension<"query_root">
>;

/**
 * @name sessions
 * @type OBJECT
 */
type t_sessions = FieldsType<
  {
    __typename: t_String<"sessions">;
    createdAt: t_timestamptz;
    id: t_uuid;
    provider: t_String;
    token: t_String;
    updatedAt: t_timestamptz;

    /**
     * An object relationship
     */
    user: t_users;
    userId: t_uuid;
  },
  Extension<"sessions">
>;

/**
 * @name sessions_aggregate
 * @type OBJECT
 */
type t_sessions_aggregate = FieldsType<
  {
    __typename: t_String<"sessions_aggregate">;
    aggregate?: t_sessions_aggregate_fields | null;
    nodes: t_sessions[];
  },
  Extension<"sessions_aggregate">
>;

/**
 * @name sessions_aggregate_fields
 * @type OBJECT
 */
type t_sessions_aggregate_fields = FieldsType<
  {
    __typename: t_String<"sessions_aggregate_fields">;
    count?: FieldsTypeArg<
      { columns?: sessions_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max?: t_sessions_max_fields | null;
    min?: t_sessions_min_fields | null;
  },
  Extension<"sessions_aggregate_fields">
>;

/**
 * @name sessions_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type sessions_aggregate_order_by = {
  count?: order_by | null;
  max?: sessions_max_order_by | null;
  min?: sessions_min_order_by | null;
};

/**
 * @name sessions_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type sessions_arr_rel_insert_input = {
  data: sessions_insert_input[];
  on_conflict?: sessions_on_conflict | null;
};

/**
 * @name sessions_bool_exp
 * @type INPUT_OBJECT
 */
export type sessions_bool_exp = {
  _and?: (sessions_bool_exp | null)[] | null;
  _not?: sessions_bool_exp | null;
  _or?: (sessions_bool_exp | null)[] | null;
  createdAt?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  provider?: String_comparison_exp | null;
  token?: String_comparison_exp | null;
  updatedAt?: timestamptz_comparison_exp | null;
  user?: users_bool_exp | null;
  userId?: uuid_comparison_exp | null;
};

/**
 * @name sessions_constraint
 * @type ENUM
 */
type t_sessions_constraint = EnumType<"sessions_pkey">;

/**
 * @name sessions_insert_input
 * @type INPUT_OBJECT
 */
export type sessions_insert_input = {
  createdAt?: any | null;
  id?: any | null;
  provider?: string | null;
  token?: string | null;
  updatedAt?: any | null;
  user?: users_obj_rel_insert_input | null;
  userId?: any | null;
};

/**
 * @name sessions_max_fields
 * @type OBJECT
 */
type t_sessions_max_fields = FieldsType<
  {
    __typename: t_String<"sessions_max_fields">;
    createdAt?: t_timestamptz | null;
    provider?: t_String | null;
    token?: t_String | null;
    updatedAt?: t_timestamptz | null;
  },
  Extension<"sessions_max_fields">
>;

/**
 * @name sessions_max_order_by
 * @type INPUT_OBJECT
 */
export type sessions_max_order_by = {
  createdAt?: order_by | null;
  provider?: order_by | null;
  token?: order_by | null;
  updatedAt?: order_by | null;
};

/**
 * @name sessions_min_fields
 * @type OBJECT
 */
type t_sessions_min_fields = FieldsType<
  {
    __typename: t_String<"sessions_min_fields">;
    createdAt?: t_timestamptz | null;
    provider?: t_String | null;
    token?: t_String | null;
    updatedAt?: t_timestamptz | null;
  },
  Extension<"sessions_min_fields">
>;

/**
 * @name sessions_min_order_by
 * @type INPUT_OBJECT
 */
export type sessions_min_order_by = {
  createdAt?: order_by | null;
  provider?: order_by | null;
  token?: order_by | null;
  updatedAt?: order_by | null;
};

/**
 * @name sessions_mutation_response
 * @type OBJECT
 */
type t_sessions_mutation_response = FieldsType<
  {
    __typename: t_String<"sessions_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_sessions[];
  },
  Extension<"sessions_mutation_response">
>;

/**
 * @name sessions_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type sessions_obj_rel_insert_input = {
  data: sessions_insert_input;
  on_conflict?: sessions_on_conflict | null;
};

/**
 * @name sessions_on_conflict
 * @type INPUT_OBJECT
 */
export type sessions_on_conflict = {
  constraint: sessions_constraint;
  update_columns: sessions_update_column[];
  where?: sessions_bool_exp | null;
};

/**
 * @name sessions_order_by
 * @type INPUT_OBJECT
 */
export type sessions_order_by = {
  createdAt?: order_by | null;
  id?: order_by | null;
  provider?: order_by | null;
  token?: order_by | null;
  updatedAt?: order_by | null;
  user?: users_order_by | null;
  userId?: order_by | null;
};

/**
 * @name sessions_select_column
 * @type ENUM
 */
type t_sessions_select_column = EnumType<
  "createdAt" | "id" | "provider" | "token" | "updatedAt" | "userId"
>;

/**
 * @name sessions_set_input
 * @type INPUT_OBJECT
 */
export type sessions_set_input = {
  createdAt?: any | null;
  id?: any | null;
  provider?: string | null;
  token?: string | null;
  updatedAt?: any | null;
  userId?: any | null;
};

/**
 * @name sessions_update_column
 * @type ENUM
 */
type t_sessions_update_column = EnumType<
  "createdAt" | "id" | "provider" | "token" | "updatedAt" | "userId"
>;

/**
 * @name subscription_root
 * @type OBJECT
 */
type t_subscription_root = FieldsType<
  {
    __typename: t_String<"subscription_root">;

    /**
     * fetch data from the table: "sessions"
     */
    sessions: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions[]
    >;

    /**
     * fetch aggregated fields from the table: "sessions"
     */
    sessions_aggregate: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions_aggregate
    >;

    /**
     * fetch data from the table: "sessions" using primary key columns
     */
    sessions_by_pk?: FieldsTypeArg<{ id: any }, t_sessions | null>;

    /**
     * fetch data from the table: "users"
     */
    users: FieldsTypeArg<
      {
        distinct_on?: users_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: users_order_by[] | null;
        where?: users_bool_exp | null;
      },
      t_users[]
    >;

    /**
     * fetch aggregated fields from the table: "users"
     */
    users_aggregate: FieldsTypeArg<
      {
        distinct_on?: users_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: users_order_by[] | null;
        where?: users_bool_exp | null;
      },
      t_users_aggregate
    >;

    /**
     * fetch data from the table: "users" using primary key columns
     */
    users_by_pk?: FieldsTypeArg<{ id: any }, t_users | null>;
  },
  Extension<"subscription_root">
>;

/**
 * @name timestamptz
 * @type SCALAR
 */
type t_timestamptz<T extends any = any> = ScalarType<
  T,
  Extension<"timestamptz">
>;

/**
 * @name timestamptz_comparison_exp
 * @type INPUT_OBJECT
 */
export type timestamptz_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
};

/**
 * @name users
 * @type OBJECT
 */
type t_users = FieldsType<
  {
    __typename: t_String<"users">;
    createdAt: t_timestamptz;
    email: t_String;
    firstName: t_String;
    googleId?: t_String | null;
    id: t_uuid;
    lastName: t_String;
    locale: t_String;
    picture?: t_String | null;

    /**
     * An array relationship
     */
    sessions: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions[]
    >;

    /**
     * An aggregated array relationship
     */
    sessions_aggregate: FieldsTypeArg<
      {
        distinct_on?: sessions_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: sessions_order_by[] | null;
        where?: sessions_bool_exp | null;
      },
      t_sessions_aggregate
    >;
    updatedAt: t_timestamptz;
  },
  Extension<"users">
>;

/**
 * @name users_aggregate
 * @type OBJECT
 */
type t_users_aggregate = FieldsType<
  {
    __typename: t_String<"users_aggregate">;
    aggregate?: t_users_aggregate_fields | null;
    nodes: t_users[];
  },
  Extension<"users_aggregate">
>;

/**
 * @name users_aggregate_fields
 * @type OBJECT
 */
type t_users_aggregate_fields = FieldsType<
  {
    __typename: t_String<"users_aggregate_fields">;
    count?: FieldsTypeArg<
      { columns?: users_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max?: t_users_max_fields | null;
    min?: t_users_min_fields | null;
  },
  Extension<"users_aggregate_fields">
>;

/**
 * @name users_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type users_aggregate_order_by = {
  count?: order_by | null;
  max?: users_max_order_by | null;
  min?: users_min_order_by | null;
};

/**
 * @name users_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type users_arr_rel_insert_input = {
  data: users_insert_input[];
  on_conflict?: users_on_conflict | null;
};

/**
 * @name users_bool_exp
 * @type INPUT_OBJECT
 */
export type users_bool_exp = {
  _and?: (users_bool_exp | null)[] | null;
  _not?: users_bool_exp | null;
  _or?: (users_bool_exp | null)[] | null;
  createdAt?: timestamptz_comparison_exp | null;
  email?: String_comparison_exp | null;
  firstName?: String_comparison_exp | null;
  googleId?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  lastName?: String_comparison_exp | null;
  locale?: String_comparison_exp | null;
  picture?: String_comparison_exp | null;
  sessions?: sessions_bool_exp | null;
  updatedAt?: timestamptz_comparison_exp | null;
};

/**
 * @name users_constraint
 * @type ENUM
 */
type t_users_constraint = EnumType<
  "users_email_key" | "users_googleId_key" | "users_pkey"
>;

/**
 * @name users_insert_input
 * @type INPUT_OBJECT
 */
export type users_insert_input = {
  createdAt?: any | null;
  email?: string | null;
  firstName?: string | null;
  googleId?: string | null;
  id?: any | null;
  lastName?: string | null;
  locale?: string | null;
  picture?: string | null;
  sessions?: sessions_arr_rel_insert_input | null;
  updatedAt?: any | null;
};

/**
 * @name users_max_fields
 * @type OBJECT
 */
type t_users_max_fields = FieldsType<
  {
    __typename: t_String<"users_max_fields">;
    createdAt?: t_timestamptz | null;
    email?: t_String | null;
    firstName?: t_String | null;
    googleId?: t_String | null;
    lastName?: t_String | null;
    locale?: t_String | null;
    picture?: t_String | null;
    updatedAt?: t_timestamptz | null;
  },
  Extension<"users_max_fields">
>;

/**
 * @name users_max_order_by
 * @type INPUT_OBJECT
 */
export type users_max_order_by = {
  createdAt?: order_by | null;
  email?: order_by | null;
  firstName?: order_by | null;
  googleId?: order_by | null;
  lastName?: order_by | null;
  locale?: order_by | null;
  picture?: order_by | null;
  updatedAt?: order_by | null;
};

/**
 * @name users_min_fields
 * @type OBJECT
 */
type t_users_min_fields = FieldsType<
  {
    __typename: t_String<"users_min_fields">;
    createdAt?: t_timestamptz | null;
    email?: t_String | null;
    firstName?: t_String | null;
    googleId?: t_String | null;
    lastName?: t_String | null;
    locale?: t_String | null;
    picture?: t_String | null;
    updatedAt?: t_timestamptz | null;
  },
  Extension<"users_min_fields">
>;

/**
 * @name users_min_order_by
 * @type INPUT_OBJECT
 */
export type users_min_order_by = {
  createdAt?: order_by | null;
  email?: order_by | null;
  firstName?: order_by | null;
  googleId?: order_by | null;
  lastName?: order_by | null;
  locale?: order_by | null;
  picture?: order_by | null;
  updatedAt?: order_by | null;
};

/**
 * @name users_mutation_response
 * @type OBJECT
 */
type t_users_mutation_response = FieldsType<
  {
    __typename: t_String<"users_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_users[];
  },
  Extension<"users_mutation_response">
>;

/**
 * @name users_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type users_obj_rel_insert_input = {
  data: users_insert_input;
  on_conflict?: users_on_conflict | null;
};

/**
 * @name users_on_conflict
 * @type INPUT_OBJECT
 */
export type users_on_conflict = {
  constraint: users_constraint;
  update_columns: users_update_column[];
  where?: users_bool_exp | null;
};

/**
 * @name users_order_by
 * @type INPUT_OBJECT
 */
export type users_order_by = {
  createdAt?: order_by | null;
  email?: order_by | null;
  firstName?: order_by | null;
  googleId?: order_by | null;
  id?: order_by | null;
  lastName?: order_by | null;
  locale?: order_by | null;
  picture?: order_by | null;
  sessions_aggregate?: sessions_aggregate_order_by | null;
  updatedAt?: order_by | null;
};

/**
 * @name users_select_column
 * @type ENUM
 */
type t_users_select_column = EnumType<
  | "createdAt"
  | "email"
  | "firstName"
  | "googleId"
  | "id"
  | "lastName"
  | "locale"
  | "picture"
  | "updatedAt"
>;

/**
 * @name users_set_input
 * @type INPUT_OBJECT
 */
export type users_set_input = {
  createdAt?: any | null;
  email?: string | null;
  firstName?: string | null;
  googleId?: string | null;
  id?: any | null;
  lastName?: string | null;
  locale?: string | null;
  picture?: string | null;
  updatedAt?: any | null;
};

/**
 * @name users_update_column
 * @type ENUM
 */
type t_users_update_column = EnumType<
  | "createdAt"
  | "email"
  | "firstName"
  | "googleId"
  | "id"
  | "lastName"
  | "locale"
  | "picture"
  | "updatedAt"
>;

/**
 * @name uuid
 * @type SCALAR
 */
type t_uuid<T extends any = any> = ScalarType<T, Extension<"uuid">>;

/**
 * @name uuid_comparison_exp
 * @type INPUT_OBJECT
 */
export type uuid_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
};

/**
 * @name Boolean
 * @type SCALAR
 */
export type Boolean = TypeData<t_Boolean>;

/**
 * @name Float
 * @type SCALAR
 */
export type Float = TypeData<t_Float>;

/**
 * @name ID
 * @type SCALAR
 */
export type ID = TypeData<t_ID>;

/**
 * @name Int
 * @type SCALAR
 */
export type Int = TypeData<t_Int>;

/**
 * @name String
 * @type SCALAR
 */
export type String = TypeData<t_String>;

/**
 * @name __Directive
 * @type OBJECT
 */
export type __Directive = TypeData<t___Directive>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
export enum __DirectiveLocation {
  ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
  ENUM = "ENUM",
  ENUM_VALUE = "ENUM_VALUE",
  FIELD = "FIELD",
  FIELD_DEFINITION = "FIELD_DEFINITION",
  FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD = "FRAGMENT_SPREAD",
  INLINE_FRAGMENT = "INLINE_FRAGMENT",
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION",
  INPUT_OBJECT = "INPUT_OBJECT",
  INTERFACE = "INTERFACE",
  MUTATION = "MUTATION",
  OBJECT = "OBJECT",
  QUERY = "QUERY",
  SCALAR = "SCALAR",
  SCHEMA = "SCHEMA",
  SUBSCRIPTION = "SUBSCRIPTION",
  UNION = "UNION"
}

/**
 * @name __EnumValue
 * @type OBJECT
 */
export type __EnumValue = TypeData<t___EnumValue>;

/**
 * @name __Field
 * @type OBJECT
 */
export type __Field = TypeData<t___Field>;

/**
 * @name __InputValue
 * @type OBJECT
 */
export type __InputValue = TypeData<t___InputValue>;

/**
 * @name __Schema
 * @type OBJECT
 */
export type __Schema = TypeData<t___Schema>;

/**
 * @name __Type
 * @type OBJECT
 */
export type __Type = TypeData<t___Type>;

/**
 * @name __TypeKind
 * @type ENUM
 */
export enum __TypeKind {
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  INTERFACE = "INTERFACE",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
  OBJECT = "OBJECT",
  SCALAR = "SCALAR",
  UNION = "UNION"
}

/**
 * @name mutation_root
 * @type OBJECT
 */
export type mutation_root = TypeData<t_mutation_root>;

/**
 * @name order_by
 * @type ENUM
 */
export enum order_by {
  asc = "asc",
  asc_nulls_first = "asc_nulls_first",
  asc_nulls_last = "asc_nulls_last",
  desc = "desc",
  desc_nulls_first = "desc_nulls_first",
  desc_nulls_last = "desc_nulls_last"
}

/**
 * @name query_root
 * @type OBJECT
 */
export type query_root = TypeData<t_query_root>;

/**
 * @name sessions
 * @type OBJECT
 */
export type sessions = TypeData<t_sessions>;

/**
 * @name sessions_aggregate
 * @type OBJECT
 */
export type sessions_aggregate = TypeData<t_sessions_aggregate>;

/**
 * @name sessions_aggregate_fields
 * @type OBJECT
 */
export type sessions_aggregate_fields = TypeData<t_sessions_aggregate_fields>;

/**
 * @name sessions_constraint
 * @type ENUM
 */
export enum sessions_constraint {
  sessions_pkey = "sessions_pkey"
}

/**
 * @name sessions_max_fields
 * @type OBJECT
 */
export type sessions_max_fields = TypeData<t_sessions_max_fields>;

/**
 * @name sessions_min_fields
 * @type OBJECT
 */
export type sessions_min_fields = TypeData<t_sessions_min_fields>;

/**
 * @name sessions_mutation_response
 * @type OBJECT
 */
export type sessions_mutation_response = TypeData<t_sessions_mutation_response>;

/**
 * @name sessions_select_column
 * @type ENUM
 */
export enum sessions_select_column {
  createdAt = "createdAt",
  id = "id",
  provider = "provider",
  token = "token",
  updatedAt = "updatedAt",
  userId = "userId"
}

/**
 * @name sessions_update_column
 * @type ENUM
 */
export enum sessions_update_column {
  createdAt = "createdAt",
  id = "id",
  provider = "provider",
  token = "token",
  updatedAt = "updatedAt",
  userId = "userId"
}

/**
 * @name subscription_root
 * @type OBJECT
 */
export type subscription_root = TypeData<t_subscription_root>;

/**
 * @name timestamptz
 * @type SCALAR
 */
export type timestamptz = TypeData<t_timestamptz>;

/**
 * @name users
 * @type OBJECT
 */
export type users = TypeData<t_users>;

/**
 * @name users_aggregate
 * @type OBJECT
 */
export type users_aggregate = TypeData<t_users_aggregate>;

/**
 * @name users_aggregate_fields
 * @type OBJECT
 */
export type users_aggregate_fields = TypeData<t_users_aggregate_fields>;

/**
 * @name users_constraint
 * @type ENUM
 */
export enum users_constraint {
  users_email_key = "users_email_key",
  users_googleId_key = "users_googleId_key",
  users_pkey = "users_pkey"
}

/**
 * @name users_max_fields
 * @type OBJECT
 */
export type users_max_fields = TypeData<t_users_max_fields>;

/**
 * @name users_min_fields
 * @type OBJECT
 */
export type users_min_fields = TypeData<t_users_min_fields>;

/**
 * @name users_mutation_response
 * @type OBJECT
 */
export type users_mutation_response = TypeData<t_users_mutation_response>;

/**
 * @name users_select_column
 * @type ENUM
 */
export enum users_select_column {
  createdAt = "createdAt",
  email = "email",
  firstName = "firstName",
  googleId = "googleId",
  id = "id",
  lastName = "lastName",
  locale = "locale",
  picture = "picture",
  updatedAt = "updatedAt"
}

/**
 * @name users_update_column
 * @type ENUM
 */
export enum users_update_column {
  createdAt = "createdAt",
  email = "email",
  firstName = "firstName",
  googleId = "googleId",
  id = "id",
  lastName = "lastName",
  locale = "locale",
  picture = "picture",
  updatedAt = "updatedAt"
}

/**
 * @name uuid
 * @type SCALAR
 */
export type uuid = TypeData<t_uuid>;
