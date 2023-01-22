const { response } = require("express");
const express = require("express");
const app = express();
const port = 5000;
// ========================================>
// =========== Database Connection ========>
// ========================================>
const mySQL = require("mysql");
const connection = mySQL.createConnection({
  host: "localhost",
  database: "DataBase-01",
  user: "root",
  password: "",
});
// ========================================>
app.use(express.json());
app.get("/", (request, response, next) => {
  return response.send("Home Page");
});
// ====================================================>
// =============== User Query =========================>
// ====================================================>
// 01- GET All Users
app.get("/users", (request, response, next) => {
  let listUsers = [];
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      throw err;
    } else {
      //   console.log("Result: " + JSON.stringify(result));
      //   console.log(typeof result);
      listUsers.push(result);
      // console.log(listUsers);
      response.json({ listUsers });
    }
  });
});
// 02- Add User
app.post("/addUser", (request, response, next) => {
  const { id, userName, email, password, age } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log({ result1: result });
        if (result.length == 0) {
          connection.query(
            "INSERT INTO user SET id = ?, name = ?, email = ?, password = ?, age = ?",
            [id, userName, email, password, age],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log({ result2: result });
                console.log("Added Successfully");
                response.send("Added Successfully");
              }
            }
          );
        } else {
          return response.send("User Allready Exist !");
        }
        // console.log("Result: " + JSON.stringify(result));
      }
    });
  });
});
// 03- Update User
app.post("/updateUser", (request, response, next) => {
  const { id, password } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log({ result1: result });
        if (result.length == 0) {
          return response.send("User Not Found !");
        } else {
          connection.query(
            "UPDATE user SET password = ? WHERE id = ?",
            [password, id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log("Updated Successfully");
                response.send("Updated Successfully");
              }
            }
          );
        }
        // console.log("Result: " + JSON.stringify(result));
      }
    });
  });
});
// 04- Delete User
app.post("/deleteUser", (request, response, next) => {
  const { id } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log({ result1: result });
        if (result.length == 0) {
          return response.send("User Not Found !");
        } else {
          connection.query(
            "DELETE From user WHERE id = ?",
            [id],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log("Deleted Successfully");
                response.send("Deleted Successfully");
              }
            }
          );
        }
        // console.log("Result: " + JSON.stringify(result));
      }
    });
  });
});
// 05- Search User Using like , AND
app.get("/searchUser", (request, response, next) => {
  let listUsers = [];
  connection.connect((err) => {
    connection.query(
      "SELECT * From user WHERE name like 'a%' AND age < 30",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log(result);
          listUsers.push(result);
          response.json({ listUsers });
        }
      }
    );
  });
});
// 06- Search User Using IN
app.get("/findUser", (request, response, next) => {
  let listUsers = [];
  connection.connect((err) => {
    connection.query("SELECT * From user WHERE id IN (1,2)", (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log(result);
        listUsers.push(result);
        response.json({ listUsers });
      }
    });
  });
});
// 07- SELECT FROM TWO TABLES
app.get("/twoTables", (request, response, next) => {
  let listUsers = [];
  connection.connect((err) => {
    connection.query("SELECT * From user , product", (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log(result);
        listUsers.push(result);
        response.json({ listUsers });
      }
    });
  });
});
// =======================================================>
// =============== Product Query =========================>
// =======================================================>
// 01- GET All pRODUCTS
app.get("/products", (request, response, next) => {
  let listProducts = [];
  connection.query("SELECT * FROM product", (err, result) => {
    if (err) {
      throw err;
    } else {
      //   console.log("Result: " + JSON.stringify(result));
      //   console.log(typeof result);
      listProducts.push(result);
      // console.log(listProducts);
      response.json({ listProducts });
    }
  });
});
// 02- Add Product
app.post("/addProduct", (request, response, next) => {
  const { pName, pDesription, price, userID } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query(
      "SELECT * FROM product WHERE userID = ?",
      [userID],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log({ result1: result });
          if (result.length == 0) {
            connection.query(
              "INSERT INTO product SET userID = ?, pName = ?, pDesription = ?, price = ?",
              [userID, pName, pDesription, price],
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log({ result2: result });
                  console.log("Added Successfully");
                  response.send("Added Successfully");
                }
              }
            );
          } else {
            return response.send("Product Allready Exist !");
          }
          // console.log("Result: " + JSON.stringify(result));
        }
      }
    );
  });
});
// 03- Update Product
app.post("/updateProduct", (request, response, next) => {
  const { pName, pDesription, price, userID } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query(
      "SELECT * FROM product WHERE userID = ?",
      [userID],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log({ result1: result });
          if (result.length == 0) {
            return response.send("User Not Found !");
          } else {
            connection.query(
              "UPDATE product SET pName = ? WHERE userID = ?",
              [pName, userID],
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log("Updated Successfully");
                  return response.send("Updated Successfully");
                }
              }
            );
          }
          // console.log("Result: " + JSON.stringify(result));
        }
      }
    );
  });
});
// 04- Delete Product
app.post("/deleteProduct", (request, response, next) => {
  const { pName, pDesription, price, userID } = request.body;
  connection.connect((err) => {
    console.log("Connected!");
    connection.query(
      "SELECT * FROM product WHERE userID = ?",
      [userID],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log({ result1: result });
          if (result.length == 0) {
            return response.send("User Not Found !");
          } else {
            connection.query(
              "DELETE From product WHERE userID = ?",
              [userID],
              (err, result) => {
                if (err) {
                  throw err;
                } else {
                  console.log("Deleted Successfully");
                  return response.send("Deleted Successfully");
                }
              }
            );
          }
          // console.log("Result: " + JSON.stringify(result));
        }
      }
    );
  });
});
// 05- Search Product Where Price > 3000
app.get("/findProduct", (request, response, next) => {
  let listProducts = [];
  connection.connect((err) => {
    connection.query(
      "SELECT * From product WHERE price > 3000",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log(result);
          listProducts.push(result);
          return response.json({
            message: "Products Price > 3000",
            listProducts,
          });
        }
      }
    );
  });
});
// To Handle Routing Errors
app.use((request, response, next) => {
  return response.send("Error 404 Page Not Found !");
});
app.listen(port, () => {
  console.log(`Server Is Running......Port   ${port}`);
});
