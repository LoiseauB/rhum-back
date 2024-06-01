import { express } from "../app";
import { deleteUser, findUser, updateUser } from "../controllers/userController";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, findUser);
router.put("/", auth, updateUser);
router.delete("/", auth, deleteUser);

module.exports = router;
