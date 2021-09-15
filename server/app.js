// const express = require('express');
// const app = express();
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');

const data = require('./MOCK_DATA.json');

const typeDefs = gql`
  type User {
    _id: String
    id: Int
    first_name: String
    last_name: String
    email: String
    gender: String
    ip_address: String
  }

  type Query {
    getUserByEmail(email: String): User
  }
`;


const resolvers = {
  Query: {
    getUserByEmail: async (parents, args) => { 
      console.log(args);
      let user = await User.findOne({ email: args.email });
      console.log(user);
      return user;
    }
  }
}
const User = require('./db');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/carrustask');
  console.log('Connected to database');
  // User.insertMany(data, (err) => console.log(err));
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log('Graphql server started', url));

// app.post('/:mail', (req, res) => {
//   const mail = req.params.mail;
//   const user = new User({
//     username: mail,
//     email: `${mail}@gmail.com`,
//   })

//   user.save(() => console.log('user saved'));
//   res.send('successfully created user');
// })

// app.get('/:mail', async (req, res) => {
//   const mail = req.params.mail;
//   const query = await User.find({ username: mail })
//   console.log(mail, query);
// });

// app.listen(3000, () => {
//   console.log('server started');
// })
