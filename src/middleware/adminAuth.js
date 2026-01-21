const adminAuth = (req, res, next) => {
  const { adminId } = req.params;
  const isAdmin = adminId == "123@";
  if (!isAdmin) {
    res.status(401).send("The admin is not authorised");
  } else {
    next();
  }
};

module.exports = { adminAuth };
