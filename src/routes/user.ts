import { express } from "../app";
import { findUser, updateUser } from "../controllers/userController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, findUser);
router.put("/", auth, updateUser);

module.exports = router;
