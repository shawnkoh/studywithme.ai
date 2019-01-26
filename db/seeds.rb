# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

GEH1075 = Topic.create(title: "GEH1075", description: "The Sharing Economy (a.k.a. Collaborative Consumption or Peer Economy), describes the development of new business models or platforms, through the coordinated exchanges between individuals, that disrupt traditional markets by redefining industry categories, lowering transaction costs, and maximizing the use of scarce resources. We will explore how sharing economy platforms transform the way we live: how we consume, how we work, and how we trust. Finally, we evaluate the policy responses of governments, to mitigate potential threats to our social compact as a result.", archived: false)

CS1010J = Topic.create(title: "CS1010J", description: "This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing. It is also the first part of a three-part series on introductory programming and problem solving by computing, which also includes CS1020E and CS2010. Topics covered include problem solving by computing, writing pseudo-codes, basic problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for B.Comp.(IS) and B.Comp.(EC) students.", archived: false)
5.times.each do |i|
  GEH1075.questions.create(name: "GEH1075 Question #{i}", answer: "GEH1075 Answer #{i}", difficulty:"Hard", next_revision: Time.now)
  CS1010J.questions.create(name: "CS1010J Question #{i}", answer: "CS1010J Answer #{i}", difficulty:"Easy", next_revision: Time.now)
end