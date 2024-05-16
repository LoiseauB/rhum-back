import { express } from "../app";
import { deleteCommentAdmin } from "../controllers/commentController";
import { createUser, deleteUserAdmin, getAllUser, updateUserAdmin } from "../controllers/userController";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.get("/users", auth, isAdmin, getAllUser)
router.post("/users", auth, isAdmin, createUser)
router.put("/users", auth, isAdmin, updateUserAdmin)
router.delete("/users", auth, isAdmin, deleteUserAdmin)

router.delete("/comments", auth, isAdmin, deleteCommentAdmin)

module.exports = router;