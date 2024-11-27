const router = require("express").Router();
const { signup, login } = require("../controllers/AuthController");
const {logout,fetchCookie}=require("../controllers/cookieControl");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/AuthValidation");
const { getAllListings,addList,showlisting } = require("../controllers/listings");
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/allListings", getAllListings);
router.post("/add",addList);
router.get("/logout",logout);
router.post("/getCookie",fetchCookie);
router.get("/listings/:id",showlisting);
module.exports = router;