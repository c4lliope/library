module Graph
  class BaseInputObject < GraphQL::Schema::InputObject
    argument_class Graph::BaseArgument
  end
end
