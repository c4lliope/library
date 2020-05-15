# Preview all emails at http://localhost:3000/rails/mailers/hold
class HoldPreview < ActionMailer::Preview
    def mailing_rules
        member = Member.find_or_create_by(name: "Someone", surname: "Cool", address: "123 Main St\nAnyplace, MO 10203")
        record = Record.find_or_create_by(name: "A sample book", member: member)
        hold = Hold.find_or_create_by(record_id: record.id, member_id: member.id)
        hold.update(
            begins_on: Time.current,
            expires_on: 30.days.from_now,
        )
        HoldMailer.with(hold: hold).mailing_rules
    end
end
