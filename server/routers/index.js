const MainController = require("../controllers/mainController");
const UserController = require("../controllers/userController");
const router = require("express").Router();
const authenticate = require("../middlewares/authentication");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google-auth", UserController.Googlelogin);

router.use(authenticate);
router.get("/recipe", MainController.searchRecipe);
router.get("/favorite", MainController.getRecipe);

router.post("/favorite", MainController.saveRecipe);
router.get("/favorite/:id", MainController.getRecipeDetail);
router.post("/pocketCode", MainController.getPocketCode);
router.post("/pocketAuthorize", MainController.authorizePocket);

router.post("/pocket", MainController.saveGetPocketCredentials);

module.exports = router;
