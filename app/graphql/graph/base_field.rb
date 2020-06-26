module Graph
  class BaseField < GraphQL::Schema::Field
    argument_class Graph::BaseArgument
  end
end
