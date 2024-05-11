import { express } from "../app"
import { login } from "../controllers/authController"

const router = express.Router()

router.post('/', login)

module.exports = router