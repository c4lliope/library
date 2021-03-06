# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Record.destroy_all
Member.destroy_all

john = Member.create!(
  email: "john.doe@example.com",
  name: "John",
  surname: "Doe"
)

jane = Member.create!(
  email: "jane.doe@example.com",
  name: "Jane",
  surname: "Doe"
)

Record.create!(
  [
    {
      name: "Martian Chronicles",
      byline: "Ray Bradbury",
      summary: "Cult book",
      member: john,
      # image_url: "https://upload.wikimedia.org/wikipedia/en/4/45/The-Martian-Chronicles.jpg"
    },
    {
      name: "The Martian",
      byline: "Andy Weir",
      summary: "Novel about an astronaut stranded on Mars trying to survive",
      member: john,
      # image_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Martian_2014.jpg"
    },
    {
      name: "Doom",
      byline: "Unknown",
      summary: "A group of Marines is sent to the red planet via an ancient " \
                   "Martian portal called the Ark to deal with an outbreak of a mutagenic virus",
      member: jane,
      # image_url: "https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg"
    },
    {
      name: "Mars Attacks!",
      byline: "Tim Burton",
      summary: "Earth is invaded by Martians with unbeatable weapons and a cruel sense of humor",
      member: jane,
      # image_url: "https://upload.wikimedia.org/wikipedia/en/b/bd/Mars_attacks_ver1.jpg"
    }
  ]
)