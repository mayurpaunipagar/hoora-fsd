first insert 1million records into your database using the node application

1. go to the database using studio 3t and test below queries

------------------------------------------------------------------------------------
Fetching latest 10 orders for a given user, sorted by creation time

<query answer one>

db.getCollection("users10").find({fullname:"Laura Brown"}).sort({createdAt:-1})
------------------------------------------------------------------------------------
Counting how many times a specific item was ordered across all users

<query answer two>

db.getCollection("users10").aggregate([
  { $unwind: "$items" },
  { $match: { "items.name": "Red Book" } },
  { $count: "totalOrders" }
])

------------------------------------------------------------------------------------
Finding top 5 users with the most total orders

<query answer three>

db.getCollection("users10").aggregate([
  { $group: { _id: "$fullname", totalOrders: { $sum: 1 } } },
  { $sort: { totalOrders: -1 } },
  { $limit: 5 }
])

------------------------------------------------------------------------------------
list indexes you’d create to optimize these queries.

<answer 4>

db.users10.createIndex({ fullname: 1, createdAt: -1 })
db.users10.createIndex({ "items.name": 1 })



