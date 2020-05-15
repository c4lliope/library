# Preview all emails at http://localhost:3000/rails/mailers/hold
class HoldPreview < ActionMailer::Preview
    def mailing_rules
        hold = build_hold
        HoldMailer.with(hold: hold).mailing_rules
    end

    def landing_rules
        hold = build_hold
        HoldMailer.with(hold: hold).landing_rules
    end

    private

    def build_hold
        member = Member.find_or_create_by(
            email: "someone.cool@example.com",
            name: "Someone",
            surname: "Cool",
            address: "123 Main St\nAnyplace, MO 10203",
        )

        record = Record.find_or_create_by(name: "A sample book", member: member)

        hold = Hold.create_with(
            landing_code: SecureRandom.uuid,
            begins_on: Time.current,
            expires_on: 30.days.from_now,
        ).find_or_create_by(record_id: record.id, member_id: member.id)

        hold
    end
end
