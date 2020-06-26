module Graph
  module BaseInterface
    include GraphQL::Schema::Interface

    field_class Graph::BaseField
  end
end
