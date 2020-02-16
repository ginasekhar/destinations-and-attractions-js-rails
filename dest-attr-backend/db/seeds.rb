# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Attraction.destroy_all
Destination.destroy_all


ny = Destination.create({
    name: "New York", 
    country: "United States", 
    language: "English",
    currency: "US Dollar"})

ny.attractions.create(name: "Statue of Liberty", category: "Landmarks", reservations_required: true, cost: 20)
ny.attractions.create(name: "Central Park", category: "Parks and Gardens", reservations_required: false, cost: 0)
ny.attractions.create(name: "Metropolitan Museum of Art", category: "Museums", reservations_required: false, cost: 15)


paris = Destination.create({
    name: "Paris", 
    country: "France", 
    language: "French",
    currency: "Euro"})

paris.attractions.create(name: "Eiffel Tower", category: "Landmarks", reservations_required: true, cost: 20)
paris.attractions.create(name: "Luxembourg Gardens", category: "Parks and Gardens", reservations_required: false, cost: 0)
paris.attractions.create(name: "The Louvre", category: "Museums", reservations_required: false, cost: 15)

rome = Destination.create({
    name: "Rome", 
    country: "Italy", 
    language: "Italian",
    currency: "Euro"})

rome.attractions.create(name: "Colosseum", category: "Historic Landmarks", reservations_required: true, cost: 20)
rome.attractions.create(name: "Botanical Garden of Rome", category: "Parks and Gardens", reservations_required: false, cost: 0)
rome.attractions.create(name: "Museo Nazionale Romano", category: "Museums", reservations_required: false, cost: 15)

p "Created #{Destination.count} destinations"
p "Created #{Attraction.count} attractions"
