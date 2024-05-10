import { express } from "../app";
import { Register } from "../controllers/registerController";

const router = express.Router();

router.post("/", Register);

module.exports = router;
