const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;



require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      if (req.body.remember == true) {
        time_exp = "7d";
      }
      else time_exp = "1d";
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: time_exp,
      });
      var decoded = jwt.decode(token);
      //let time = "" + new Date(decoded.exp * 1000);
      let time = new Date(decoded.exp * 1000);
      //let str = time.substring(0, 10);
      console.log("checkbox Remember me: ", new Date(decoded.exp * 1000));
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

router.get(
  "/foo",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({ message: "Foo" });
  }
);

//<img src="pic_trulli.jpg" alt="Italian Trulli">

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//<img className='test' src='/image/add_image.png' />

let shops ={
    list: [
        {
            "id": "160157", "name": " DYE", "description": "GOT7 - Mimi Album [DYE] (Random Ver)", "price": "660-3,150",
            "quantity": 10 , "imageUrl": "https://cf.shopee.co.th/file/173e6913306201aa96d9f2f796e575fc "
        },
        {
            "id": "160158", "name": "Call My Name", "description": " GOT7 - Mini Album 'Call My Name (Random Cover)'", "price": "600",
            "quantity": 10, "imageUrl": "https://s.isanook.com/jo/0/rp/r/w700/ya0xa0m1w0/aHR0cDovL2ltYWdlLmpvb3guY29tL0pPT1hjb3Zlci8wL2EzOTIyZGYyOGZiNGE5YTIvMTAwMC5qcGc=.jpg "
        },
        {
            "id": "160159", "name": "Light Stick", "description": " GOT7 Bird Light รุ่นที่ 2 ", "price": "1,660 ",
            "quantity":  15, "imageUrl": "https://img.priceza.com/img1/7077/1517/7077-20210620100135-80133515339090282.jpg "
        }
    ],
};


let income = 0;

router
  .route("/shops")
  .get((req, res) => {
    res.send(shops);
  })
  .post((req, res) => {
    console.log(req.body);
    let newShop = {};
    //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
    newShop.id = shops.list.length ? shops.list[shops.list.length - 1].id + 1 : 1;
    newShop.name = req.body.name;
    newShop.description = req.body.description;
    newShop.price = req.body.price;
    newShop.quantity = req.body.quantity;
    newShop.imageUrl = req.body.imageUrl;
    shops = { list: [...shops.list, newShop] };
    res.json(shops);
  });

router
  .route("/shops/:shopid")
  .get((req, res) => {
    let id = shops.list.findIndex((item) => +item.id == +req.params.shopid)
    //console.log("id",id)
    res.json(shops.list[id]);
  })
  .put((req, res) => {
    let id = shops.list.findIndex((item) => item.id == +req.params.shopid);
    shops.list[id].name = req.body.name;
    shops.list[id].description = req.body.description;
    shops.list[id].price = req.body.price;
    shops.list[id].quantity = req.body.quantity;
    shops.list[id].imageUrl = req.body.imageUrl;

    res.json(shops.list);
  })
  .delete((req, res) => {
    shops.list = shops.list.filter((item) => +item.id !== +req.params.shopid);
    res.json(shops.list);
  });
/*  
  router.route("/income")
  .get((req,res) => {
    console.log("sss")
    res.json(income)
  });
*/
router.route("/purchase/:shopId")
  .post((req, res) => {
    let id = shops.list.findIndex((item) => +item.id == +req.params.shopId)
    if (id == -1) {
      res.json({ message: "Student not found" })
    }
    else {
      income = shops.list[id].price;
      console.log(income)
      shops.list = shops.list.filter((item) => +item.id !== +req.params.shopId);
      res.json(shops.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));

  //name  description price quantity  imageUrl 
