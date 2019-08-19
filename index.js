require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./routes/user');
const Posts = require('./routes/post');
const Comment = require('./routes/comment');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

//CONNECT TO OUR MONGODB DATABASE, PASS IN OUR URL (ATLAS) AND URLNEWPARSER (ALWAYS USE)
mongoose.connect(process.env.ATLAS, { useNewUrlParser: true });

//SET THE MONGOOSE CONECTION TO A DB VARIABLE FOR EASIER REFERENCE LATER
const db = mongoose.connection;

//CATCHES ANY ERRORS THAT MIGHT OCCUR IN OUR DATABASE ???
db.on('error', (err) => console.log(err))

//ONLY RUNS ONCE WHEN OUR DATABASE IS CONNECTING
db.once('open', () => console.log(`🦠 Connected to database 🦠`))
app.use(require('./Middleware/headers'));
app.use(express.json());
app.use('/user', Users);
app.use('/post', Posts);
app.use('/comment', Comment);

//////////////////////////////GRAPHQL TEST///////////////////////////////

// Initialize a GraphQL schema
// var schema = buildSchema(`
//   type Query {
//     user(id: Int!): Person
//     users(gender: String): [Person]
//     seasons : [Thing]
//   },
//   type Person {
//     id: Int
//     name: String
//     age: Int
//     gender: String    
//   }, 
//   type Thing {
//       season : Int
//       episodes: [Episodes]
//   }, 
//   type Episodes {
//       name: String
//       cast: [Cast!]!
//   },
//   type Cast {
//       people: String
//   }
// `);

// // Root resolver
// var users = [  // Dummy data
//     {
//         id: 1,
//         name: 'Brian',
//         age: '21',
//         gender: 'M'
//     },
//     {
//         id: 2,
//         name: 'Kim',
//         age: '22',
//         gender: 'F'
//     },
//     {
//         id: 3,
//         name: 'Joseph',
//         age: '23',
//         gender: 'M'
//     },
//     {
//         id: 3,
//         name: 'Faith',
//         age: '23',
//         gender: 'F'
//     },
//     {
//         id: 5,
//         name: 'Joy',
//         age: '25',
//         gender: 'F'
//     }
// ];


// const thing = [
//     {
//         season: 1,
//         episodes: [
//             {
//                 name: "Pilot",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "Where it all went wrong",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "The hicks",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             }
//         ]
//     },
//     {
//         season: 2,
//         episodes: [
//             {
//                 name: "Wow",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "Just seeing if this works",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "The muffins",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             }
//         ]
//     },
//     {
//         season: 3,
//         episodes: [
//             {
//                 name: "Okay",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "Im tired",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             },
//             {
//                 name: "The cookie cake",
//                 cast: ['First Guy', 'Second Guy', 'Third Guy']
//             }
//         ]
//     }
// ]

// var getSeasons = function sea() {
//     return thing.map(x => x)
// }

// var getUser = function (args) { // return a single user based on id
//     var userID = args.id;
//     return users.filter(user => {
//         return user.id == userID
//     })[0];
// }

// var retrieveUsers = function (args) { // Return a list of users. Takes an optional gender parameter
//     if (args.gender) {
//         var gender = args.gender;
//         return users.filter(user => user.gender === gender);
//     } else {
//         return users;
//     }
// }

// var root = {
//     user: getUser,   // Resolver function to return user with specific id
//     users: retrieveUsers,
//     seasons: getSeasons
// };

// Create an express server and a GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//     schema: schema,  // Must be provided
//     rootValue: root,
//     graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
// }));

//////////////////////////////GRAPHQL TEST///////////////////////////////

app.listen(process.env.PORT, () => console.log(`🚀 Server is listening on port ${process.env.PORT} 🚀`))