const router = require("express").Router();
const { signup, login } = require("../controllers/AuthController");
const {logout,fetchCookie}=require("../controllers/cookieControl");
const {
  signupValidation,
  loginValidation,checkOwnerRole
} = require("../middlewares/AuthValidation");
const { getAllListings,addList,showlisting ,deleteListing} = require("../controllers/listings");
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/allListings", getAllListings);
router.post("/add",addList);
router.get("/logout",logout);
router.post("/getCookie",fetchCookie);
router.get("/listings/:id",showlisting);
router.delete("/listings/:id",checkOwnerRole,deleteListing);
module.exports = router;