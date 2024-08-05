const userController = require('../controllers/userControl');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/logout", userController.logout)
router.delete("/delete-account", auth, userController.deleteAccount)
router.put("/update-account", auth, userController.updateProfile)
router.get("/refresh-token", userController.refreshToken)
router.get("/user-profile", auth, userController.getProfile)
router.get("/user-info", auth, userController.getInfo)

module.exports = router;