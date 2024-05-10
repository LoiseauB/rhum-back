import { express } from "../app"
import { Login } from "../controllers/authController"

const router = express.Router()

router.post('/', Login)

module.exports = router