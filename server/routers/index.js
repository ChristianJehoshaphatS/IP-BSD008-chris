const MainController = require("../controllers/mainController");
const UserController = require("../controllers/userController");
const router = require("express").Router();
const authenticate = require("../middlewares/authentication");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google-auth", UserController.Googlelogin);

router.use(authenticate);
router.get("/recipe", MainController.searchRecipe);
router.post("/favorite", MainController.saveRecipe);
router.post("/pocket", MainController.saveGetPocketCredentials);

module.exports = router;
