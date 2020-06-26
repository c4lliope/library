module Graph
  class BaseObject < GraphQL::Schema::Object
    field_class Graph::BaseField
  end
end
