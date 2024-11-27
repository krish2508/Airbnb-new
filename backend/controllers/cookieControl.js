const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.cookie("role", "", { maxAge: 0 });
  res.cookie("loggedinuser", "", { maxAge: 0 });
  return res.json({ message: "del successfully" });
};
const fetchCookie = async (req, res) => {
  const dataToFind = req.body.item;
  const cookieData = req.cookies[dataToFind];
  if (cookieData) {
    return res.status(200).json({ value: cookieData });
  } else {
    return res.status(404).json({ message: "Cookie not found" });
  }
};
module.exports = { logout, fetchCookie };
