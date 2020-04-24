// @ts-nocheck
import * as extensions from "../extensions";
import { lazyGetters } from "@gqless/utils";
import {
  ScalarNode,
  InputNode,
  InputNodeField,
  ArrayNode,
  ObjectNode,
  FieldNode,
  EnumNode,
  Arguments,
  ArgumentsField
} from "gqless";

export const schema = {
  get Boolean() {
    return new ScalarNode({
      name: "Boolean",
      extension: ((extensions as any) || {}).Boolean
    });
  },
  get Float() {
    return new ScalarNode({
      name: "Float",
      extension: ((extensions as any) || {}).Float
    });
  },
  get ID() {
    return new ScalarNode({
      name: "ID",
      extension: ((extensions as any) || {}).ID
    });
  },
  get Int() {
    return new ScalarNode({
      name: "Int",
      extension: ((extensions as any) || {}).Int
    });
  },
  get String() {
    return new ScalarNode({
      name: "String",
      extension: ((extensions as any) || {}).String
    });
  },
  get String_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.String, true);
        },
        get _gt() {
          return new InputNodeField(schema.String, true);
        },
        get _gte() {
          return new InputNodeField(schema.String, true);
        },
        get _ilike() {
          return new InputNodeField(schema.String, true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _like() {
          return new InputNodeField(schema.String, true);
        },
        get _lt() {
          return new InputNodeField(schema.String, true);
        },
        get _lte() {
          return new InputNodeField(schema.String, true);
        },
        get _neq() {
          return new InputNodeField(schema.String, true);
        },
        get _nilike() {
          return new InputNodeField(schema.String, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _nlike() {
          return new InputNodeField(schema.String, true);
        },
        get _nsimilar() {
          return new InputNodeField(schema.String, true);
        },
        get _similar() {
          return new InputNodeField(schema.String, true);
        }
      },
      { name: "String_comparison_exp" }
    );
  },
  get __Directive() {
    return new ObjectNode(
      {
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locations() {
          return new FieldNode(
            new ArrayNode(schema.__DirectiveLocation, false),
            undefined,
            false
          );
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        }
      },
      {
        name: "__Directive",
        extension: ((extensions as any) || {}).__Directive
      }
    );
  },
  get __DirectiveLocation() {
    return new EnumNode({ name: "__DirectiveLocation" });
  },
  get __EnumValue() {
    return new ObjectNode(
      {
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        }
      },
      {
        name: "__EnumValue",
        extension: ((extensions as any) || {}).__EnumValue
      }
    );
  },
  get __Field() {
    return new ObjectNode(
      {
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        }
      },
      { name: "__Field", extension: ((extensions as any) || {}).__Field }
    );
  },
  get __InputValue() {
    return new ObjectNode(
      {
        get defaultValue() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        }
      },
      {
        name: "__InputValue",
        extension: ((extensions as any) || {}).__InputValue
      }
    );
  },
  get __Schema() {
    return new ObjectNode(
      {
        get directives() {
          return new FieldNode(
            new ArrayNode(schema.__Directive, false),
            undefined,
            false
          );
        },
        get mutationType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get queryType() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get subscriptionType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get types() {
          return new FieldNode(
            new ArrayNode(schema.__Type, false),
            undefined,
            false
          );
        }
      },
      { name: "__Schema", extension: ((extensions as any) || {}).__Schema }
    );
  },
  get __Type() {
    return new ObjectNode(
      {
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get enumValues() {
          return new FieldNode(
            new ArrayNode(schema.__EnumValue, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              }
            }),
            true
          );
        },
        get fields() {
          return new FieldNode(
            new ArrayNode(schema.__Field, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              }
            }),
            true
          );
        },
        get inputFields() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, true),
            undefined,
            true
          );
        },
        get interfaces() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get kind() {
          return new FieldNode(schema.__TypeKind, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get ofType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get possibleTypes() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        }
      },
      { name: "__Type", extension: ((extensions as any) || {}).__Type }
    );
  },
  get __TypeKind() {
    return new EnumNode({ name: "__TypeKind" });
  },
  get mutation_root() {
    return new ObjectNode(
      {
        get delete_sessions() {
          return new FieldNode(
            schema.sessions_mutation_response,
            new Arguments(
              {
                get where() {
                  return new ArgumentsField(schema.sessions_bool_exp, false);
                }
              },
              true
            ),
            true
          );
        },
        get delete_users() {
          return new FieldNode(
            schema.users_mutation_response,
            new Arguments(
              {
                get where() {
                  return new ArgumentsField(schema.users_bool_exp, false);
                }
              },
              true
            ),
            true
          );
        },
        get insert_sessions() {
          return new FieldNode(
            schema.sessions_mutation_response,
            new Arguments({
              get objects() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_insert_input, false),
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(schema.sessions_on_conflict, true);
              }
            }),
            true
          );
        },
        get insert_users() {
          return new FieldNode(
            schema.users_mutation_response,
            new Arguments({
              get objects() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_insert_input, false),
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(schema.users_on_conflict, true);
              }
            }),
            true
          );
        },
        get update_sessions() {
          return new FieldNode(
            schema.sessions_mutation_response,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.sessions_set_input, true);
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, false);
              }
            }),
            true
          );
        },
        get update_users() {
          return new FieldNode(
            schema.users_mutation_response,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.users_set_input, true);
              },
              get where() {
                return new ArgumentsField(schema.users_bool_exp, false);
              }
            }),
            true
          );
        }
      },
      {
        name: "mutation_root",
        extension: ((extensions as any) || {}).mutation_root
      }
    );
  },
  get order_by() {
    return new EnumNode({ name: "order_by" });
  },
  get query_root() {
    return new ObjectNode(
      {
        get sessions() {
          return new FieldNode(
            new ArrayNode(schema.sessions, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get sessions_aggregate() {
          return new FieldNode(
            schema.sessions_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get sessions_by_pk() {
          return new FieldNode(
            schema.sessions,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.uuid, false);
                }
              },
              true
            ),
            true
          );
        },
        get users() {
          return new FieldNode(
            new ArrayNode(schema.users, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.users_bool_exp, true);
              }
            }),
            false
          );
        },
        get users_aggregate() {
          return new FieldNode(
            schema.users_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.users_bool_exp, true);
              }
            }),
            false
          );
        },
        get users_by_pk() {
          return new FieldNode(
            schema.users,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.uuid, false);
                }
              },
              true
            ),
            true
          );
        }
      },
      { name: "query_root", extension: ((extensions as any) || {}).query_root }
    );
  },
  get sessions() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
        get id() {
          return new FieldNode(schema.uuid, undefined, false);
        },
        get provider() {
          return new FieldNode(schema.String, undefined, false);
        },
        get token() {
          return new FieldNode(schema.String, undefined, false);
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
        get user() {
          return new FieldNode(schema.users, undefined, false);
        },
        get userId() {
          return new FieldNode(schema.uuid, undefined, false);
        }
      },
      { name: "sessions", extension: ((extensions as any) || {}).sessions }
    );
  },
  get sessions_aggregate() {
    return new ObjectNode(
      {
        get aggregate() {
          return new FieldNode(
            schema.sessions_aggregate_fields,
            undefined,
            true
          );
        },
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.sessions, false),
            undefined,
            false
          );
        }
      },
      {
        name: "sessions_aggregate",
        extension: ((extensions as any) || {}).sessions_aggregate
      }
    );
  },
  get sessions_aggregate_fields() {
    return new ObjectNode(
      {
        get count() {
          return new FieldNode(
            schema.Int,
            new Arguments({
              get columns() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get distinct() {
                return new ArgumentsField(schema.Boolean, true);
              }
            }),
            true
          );
        },
        get max() {
          return new FieldNode(schema.sessions_max_fields, undefined, true);
        },
        get min() {
          return new FieldNode(schema.sessions_min_fields, undefined, true);
        }
      },
      {
        name: "sessions_aggregate_fields",
        extension: ((extensions as any) || {}).sessions_aggregate_fields
      }
    );
  },
  get sessions_aggregate_order_by() {
    return new InputNode(
      {
        get count() {
          return new InputNodeField(schema.order_by, true);
        },
        get max() {
          return new InputNodeField(schema.sessions_max_order_by, true);
        },
        get min() {
          return new InputNodeField(schema.sessions_min_order_by, true);
        }
      },
      { name: "sessions_aggregate_order_by" }
    );
  },
  get sessions_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.sessions_insert_input, false),
            false
          );
        },
        get on_conflict() {
          return new InputNodeField(schema.sessions_on_conflict, true);
        }
      },
      { name: "sessions_arr_rel_insert_input" }
    );
  },
  get sessions_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.sessions_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.sessions_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.sessions_bool_exp, true),
            true
          );
        },
        get createdAt() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.uuid_comparison_exp, true);
        },
        get provider() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get token() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get user() {
          return new InputNodeField(schema.users_bool_exp, true);
        },
        get userId() {
          return new InputNodeField(schema.uuid_comparison_exp, true);
        }
      },
      { name: "sessions_bool_exp" }
    );
  },
  get sessions_constraint() {
    return new EnumNode({ name: "sessions_constraint" });
  },
  get sessions_insert_input() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get id() {
          return new InputNodeField(schema.uuid, true);
        },
        get provider() {
          return new InputNodeField(schema.String, true);
        },
        get token() {
          return new InputNodeField(schema.String, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get user() {
          return new InputNodeField(schema.users_obj_rel_insert_input, true);
        },
        get userId() {
          return new InputNodeField(schema.uuid, true);
        }
      },
      { name: "sessions_insert_input" }
    );
  },
  get sessions_max_fields() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get provider() {
          return new FieldNode(schema.String, undefined, true);
        },
        get token() {
          return new FieldNode(schema.String, undefined, true);
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        }
      },
      {
        name: "sessions_max_fields",
        extension: ((extensions as any) || {}).sessions_max_fields
      }
    );
  },
  get sessions_max_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get provider() {
          return new InputNodeField(schema.order_by, true);
        },
        get token() {
          return new InputNodeField(schema.order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "sessions_max_order_by" }
    );
  },
  get sessions_min_fields() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get provider() {
          return new FieldNode(schema.String, undefined, true);
        },
        get token() {
          return new FieldNode(schema.String, undefined, true);
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        }
      },
      {
        name: "sessions_min_fields",
        extension: ((extensions as any) || {}).sessions_min_fields
      }
    );
  },
  get sessions_min_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get provider() {
          return new InputNodeField(schema.order_by, true);
        },
        get token() {
          return new InputNodeField(schema.order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "sessions_min_order_by" }
    );
  },
  get sessions_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.sessions, false),
            undefined,
            false
          );
        }
      },
      {
        name: "sessions_mutation_response",
        extension: ((extensions as any) || {}).sessions_mutation_response
      }
    );
  },
  get sessions_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.sessions_insert_input, false);
        },
        get on_conflict() {
          return new InputNodeField(schema.sessions_on_conflict, true);
        }
      },
      { name: "sessions_obj_rel_insert_input" }
    );
  },
  get sessions_on_conflict() {
    return new InputNode(
      {
        get constraint() {
          return new InputNodeField(schema.sessions_constraint, false);
        },
        get update_columns() {
          return new InputNodeField(
            new ArrayNode(schema.sessions_update_column, false),
            false
          );
        },
        get where() {
          return new InputNodeField(schema.sessions_bool_exp, true);
        }
      },
      { name: "sessions_on_conflict" }
    );
  },
  get sessions_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get provider() {
          return new InputNodeField(schema.order_by, true);
        },
        get token() {
          return new InputNodeField(schema.order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get user() {
          return new InputNodeField(schema.users_order_by, true);
        },
        get userId() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "sessions_order_by" }
    );
  },
  get sessions_select_column() {
    return new EnumNode({ name: "sessions_select_column" });
  },
  get sessions_set_input() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get id() {
          return new InputNodeField(schema.uuid, true);
        },
        get provider() {
          return new InputNodeField(schema.String, true);
        },
        get token() {
          return new InputNodeField(schema.String, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get userId() {
          return new InputNodeField(schema.uuid, true);
        }
      },
      { name: "sessions_set_input" }
    );
  },
  get sessions_update_column() {
    return new EnumNode({ name: "sessions_update_column" });
  },
  get subscription_root() {
    return new ObjectNode(
      {
        get sessions() {
          return new FieldNode(
            new ArrayNode(schema.sessions, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get sessions_aggregate() {
          return new FieldNode(
            schema.sessions_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get sessions_by_pk() {
          return new FieldNode(
            schema.sessions,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.uuid, false);
                }
              },
              true
            ),
            true
          );
        },
        get users() {
          return new FieldNode(
            new ArrayNode(schema.users, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.users_bool_exp, true);
              }
            }),
            false
          );
        },
        get users_aggregate() {
          return new FieldNode(
            schema.users_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.users_bool_exp, true);
              }
            }),
            false
          );
        },
        get users_by_pk() {
          return new FieldNode(
            schema.users,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.uuid, false);
                }
              },
              true
            ),
            true
          );
        }
      },
      {
        name: "subscription_root",
        extension: ((extensions as any) || {}).subscription_root
      }
    );
  },
  get timestamptz() {
    return new ScalarNode({
      name: "timestamptz",
      extension: ((extensions as any) || {}).timestamptz
    });
  },
  get timestamptz_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _gt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _gte() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _in() {
          return new InputNodeField(
            new ArrayNode(schema.timestamptz, true),
            true
          );
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _lte() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _neq() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _nin() {
          return new InputNodeField(
            new ArrayNode(schema.timestamptz, true),
            true
          );
        }
      },
      { name: "timestamptz_comparison_exp" }
    );
  },
  get users() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
        get email() {
          return new FieldNode(schema.String, undefined, false);
        },
        get firstName() {
          return new FieldNode(schema.String, undefined, false);
        },
        get googleId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get id() {
          return new FieldNode(schema.uuid, undefined, false);
        },
        get lastName() {
          return new FieldNode(schema.String, undefined, false);
        },
        get locale() {
          return new FieldNode(schema.String, undefined, false);
        },
        get picture() {
          return new FieldNode(schema.String, undefined, true);
        },
        get sessions() {
          return new FieldNode(
            new ArrayNode(schema.sessions, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get sessions_aggregate() {
          return new FieldNode(
            schema.sessions_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.sessions_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.sessions_bool_exp, true);
              }
            }),
            false
          );
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, false);
        }
      },
      { name: "users", extension: ((extensions as any) || {}).users }
    );
  },
  get users_aggregate() {
    return new ObjectNode(
      {
        get aggregate() {
          return new FieldNode(schema.users_aggregate_fields, undefined, true);
        },
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.users, false),
            undefined,
            false
          );
        }
      },
      {
        name: "users_aggregate",
        extension: ((extensions as any) || {}).users_aggregate
      }
    );
  },
  get users_aggregate_fields() {
    return new ObjectNode(
      {
        get count() {
          return new FieldNode(
            schema.Int,
            new Arguments({
              get columns() {
                return new ArgumentsField(
                  new ArrayNode(schema.users_select_column, true),
                  true
                );
              },
              get distinct() {
                return new ArgumentsField(schema.Boolean, true);
              }
            }),
            true
          );
        },
        get max() {
          return new FieldNode(schema.users_max_fields, undefined, true);
        },
        get min() {
          return new FieldNode(schema.users_min_fields, undefined, true);
        }
      },
      {
        name: "users_aggregate_fields",
        extension: ((extensions as any) || {}).users_aggregate_fields
      }
    );
  },
  get users_aggregate_order_by() {
    return new InputNode(
      {
        get count() {
          return new InputNodeField(schema.order_by, true);
        },
        get max() {
          return new InputNodeField(schema.users_max_order_by, true);
        },
        get min() {
          return new InputNodeField(schema.users_min_order_by, true);
        }
      },
      { name: "users_aggregate_order_by" }
    );
  },
  get users_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.users_insert_input, false),
            false
          );
        },
        get on_conflict() {
          return new InputNodeField(schema.users_on_conflict, true);
        }
      },
      { name: "users_arr_rel_insert_input" }
    );
  },
  get users_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.users_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.users_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.users_bool_exp, true),
            true
          );
        },
        get createdAt() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get email() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get firstName() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get googleId() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.uuid_comparison_exp, true);
        },
        get lastName() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get locale() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get picture() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get sessions() {
          return new InputNodeField(schema.sessions_bool_exp, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        }
      },
      { name: "users_bool_exp" }
    );
  },
  get users_constraint() {
    return new EnumNode({ name: "users_constraint" });
  },
  get users_insert_input() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get email() {
          return new InputNodeField(schema.String, true);
        },
        get firstName() {
          return new InputNodeField(schema.String, true);
        },
        get googleId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.uuid, true);
        },
        get lastName() {
          return new InputNodeField(schema.String, true);
        },
        get locale() {
          return new InputNodeField(schema.String, true);
        },
        get picture() {
          return new InputNodeField(schema.String, true);
        },
        get sessions() {
          return new InputNodeField(schema.sessions_arr_rel_insert_input, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz, true);
        }
      },
      { name: "users_insert_input" }
    );
  },
  get users_max_fields() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get email() {
          return new FieldNode(schema.String, undefined, true);
        },
        get firstName() {
          return new FieldNode(schema.String, undefined, true);
        },
        get googleId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get lastName() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locale() {
          return new FieldNode(schema.String, undefined, true);
        },
        get picture() {
          return new FieldNode(schema.String, undefined, true);
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        }
      },
      {
        name: "users_max_fields",
        extension: ((extensions as any) || {}).users_max_fields
      }
    );
  },
  get users_max_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get email() {
          return new InputNodeField(schema.order_by, true);
        },
        get firstName() {
          return new InputNodeField(schema.order_by, true);
        },
        get googleId() {
          return new InputNodeField(schema.order_by, true);
        },
        get lastName() {
          return new InputNodeField(schema.order_by, true);
        },
        get locale() {
          return new InputNodeField(schema.order_by, true);
        },
        get picture() {
          return new InputNodeField(schema.order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "users_max_order_by" }
    );
  },
  get users_min_fields() {
    return new ObjectNode(
      {
        get createdAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get email() {
          return new FieldNode(schema.String, undefined, true);
        },
        get firstName() {
          return new FieldNode(schema.String, undefined, true);
        },
        get googleId() {
          return new FieldNode(schema.String, undefined, true);
        },
        get lastName() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locale() {
          return new FieldNode(schema.String, undefined, true);
        },
        get picture() {
          return new FieldNode(schema.String, undefined, true);
        },
        get updatedAt() {
          return new FieldNode(schema.timestamptz, undefined, true);
        }
      },
      {
        name: "users_min_fields",
        extension: ((extensions as any) || {}).users_min_fields
      }
    );
  },
  get users_min_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get email() {
          return new InputNodeField(schema.order_by, true);
        },
        get firstName() {
          return new InputNodeField(schema.order_by, true);
        },
        get googleId() {
          return new InputNodeField(schema.order_by, true);
        },
        get lastName() {
          return new InputNodeField(schema.order_by, true);
        },
        get locale() {
          return new InputNodeField(schema.order_by, true);
        },
        get picture() {
          return new InputNodeField(schema.order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "users_min_order_by" }
    );
  },
  get users_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.users, false),
            undefined,
            false
          );
        }
      },
      {
        name: "users_mutation_response",
        extension: ((extensions as any) || {}).users_mutation_response
      }
    );
  },
  get users_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.users_insert_input, false);
        },
        get on_conflict() {
          return new InputNodeField(schema.users_on_conflict, true);
        }
      },
      { name: "users_obj_rel_insert_input" }
    );
  },
  get users_on_conflict() {
    return new InputNode(
      {
        get constraint() {
          return new InputNodeField(schema.users_constraint, false);
        },
        get update_columns() {
          return new InputNodeField(
            new ArrayNode(schema.users_update_column, false),
            false
          );
        },
        get where() {
          return new InputNodeField(schema.users_bool_exp, true);
        }
      },
      { name: "users_on_conflict" }
    );
  },
  get users_order_by() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.order_by, true);
        },
        get email() {
          return new InputNodeField(schema.order_by, true);
        },
        get firstName() {
          return new InputNodeField(schema.order_by, true);
        },
        get googleId() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get lastName() {
          return new InputNodeField(schema.order_by, true);
        },
        get locale() {
          return new InputNodeField(schema.order_by, true);
        },
        get picture() {
          return new InputNodeField(schema.order_by, true);
        },
        get sessions_aggregate() {
          return new InputNodeField(schema.sessions_aggregate_order_by, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.order_by, true);
        }
      },
      { name: "users_order_by" }
    );
  },
  get users_select_column() {
    return new EnumNode({ name: "users_select_column" });
  },
  get users_set_input() {
    return new InputNode(
      {
        get createdAt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get email() {
          return new InputNodeField(schema.String, true);
        },
        get firstName() {
          return new InputNodeField(schema.String, true);
        },
        get googleId() {
          return new InputNodeField(schema.String, true);
        },
        get id() {
          return new InputNodeField(schema.uuid, true);
        },
        get lastName() {
          return new InputNodeField(schema.String, true);
        },
        get locale() {
          return new InputNodeField(schema.String, true);
        },
        get picture() {
          return new InputNodeField(schema.String, true);
        },
        get updatedAt() {
          return new InputNodeField(schema.timestamptz, true);
        }
      },
      { name: "users_set_input" }
    );
  },
  get users_update_column() {
    return new EnumNode({ name: "users_update_column" });
  },
  get uuid() {
    return new ScalarNode({
      name: "uuid",
      extension: ((extensions as any) || {}).uuid
    });
  },
  get uuid_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.uuid, true);
        },
        get _gt() {
          return new InputNodeField(schema.uuid, true);
        },
        get _gte() {
          return new InputNodeField(schema.uuid, true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.uuid, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.uuid, true);
        },
        get _lte() {
          return new InputNodeField(schema.uuid, true);
        },
        get _neq() {
          return new InputNodeField(schema.uuid, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.uuid, true), true);
        }
      },
      { name: "uuid_comparison_exp" }
    );
  }
};

lazyGetters(schema);
