import { express } from "../app";
import { addRate, deleteRate, updateRate } from "../controllers/ratingController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, addRate);
router.put("/", auth, updateRate);
router.delete("/", auth, deleteRate);

module.exports = router;
