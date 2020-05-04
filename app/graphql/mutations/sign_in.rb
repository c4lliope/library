module Mutations
  class SignIn < BaseMutation
    argument :email, String, required: true

    field :token, String, null: true
    field :member, Types::MemberType, null: true

    def resolve(email:)
      member = Member.find_by!(email: email)
      return {} unless member

      token = Base64.encode64(member.email)

      {
        token: token,
        member: member,
      }
    end
  end
end
