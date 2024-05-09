import { express } from "../app"

const router = express.Router()
const authController = require('../controllers/authController')

router.post('/', authController.login)

module.exports = router