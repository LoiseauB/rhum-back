import { express } from "../app";
import { register } from "../controllers/registerController";

const router = express.Router();

router.post("/", register);

module.exports = router;
