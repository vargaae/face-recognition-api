const express = require("express");
const bodyParser = require("body-parser"); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
// const knex = require("knex");
const res = require("express/lib/response");

// TODO: Connecting the server with the Front End:
// const db = knex({
//   // Enter your own database information here based on what you created
//   client: "mysql",
//   connection: {
//     host: "127.0.0.1",
//     port: 3306,
//     user: "vargaae",
//     password: "m2021AngularProfi",
//     database: "smart_brain",
//   },
// });

// TODO: Clean Up this part after testing the SQL Database
// mysql.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

// TODO: Connecting the server with the Front End:
const database = {
  users: [
    {
      id: "123",
      name: "Andras",
      password: 'cookies',
      email: "vargaae@hotmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      password: 'bananas',
      email: "sally@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in')
  }
})
// app.post("/signin", (req, res) => {
//   db.select("email", "hash")
//     .from("login")
//     .where("email", "=", req.body.email)
//     .then((data) => {
//       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//       if (isValid) {
//         return db
//           .select("*")
//           .from("users")
//           .where("email", "=", req.body.email)
//           .then((user) => {
//             res.json(user[0]);
//           })
//           .catch((err) => res.status(400).json("unable to get user"));
//       } else {
//         res.status(400).json("wrong credentials");
//       }
//     })
//     .catch((err) => res.status(400).json("wrong credentials"));
// });

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  // TODO: For connecting and testing the SQL Database
  // db("users")
  //   .returning("*")
  //   .insert({
  //     email: email,
  //     name: name,
  //     password: password,
  //     joined: new Date(),
  //   })
  //   .then(user => {
  //     res.json(user[0]);
  //   })
  //   .catch(err => res.status(400).json('unable to register'))
  database.users.push({
    id: '125',
      email: email,
      name: name,
      password: password,
      entries: 0,
      joined: new Date()
    })
      res.json(database.users[database.users.length-1]);
    })

  
//   const hash = bcrypt.hashSync(password);
//   db.transaction((trx) => {
//     trx
//       .insert({
//         hash: hash,
//         email: email,
//       })
//       .into("login")
//       .returning("email")
//       .then((loginEmail) => {
//         return trx("users")
//           .returning("*")
//           .insert({
//             email: loginEmail[0],
//             name: name,
//             joined: new Date(),
//           })
//           .then((user) => {
//             res.json(user[0]);
//           });
//       })
//       .then(trx.commit)
//       .catch(trx.rollback);
//   }).catch((err) => res.status(400).json("unable to register"));
// });

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
