function checkAdmin(req, res, next) {
  const currentUser = req.authUser;
  if (!currentUser.auth.includes('admin')) {
    return res.status(401).json({
      status: false,
      error: 'Only Admins are allowed'
    });
  }

  next();
}

module.exports = checkAdmin;
