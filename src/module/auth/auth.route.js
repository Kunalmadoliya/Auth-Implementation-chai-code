import {Router} from "express";
import * as controller from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import RegisterDto from "./dto/register.dto";
import {authenticated} from "./auth.middleware";
import LoginDto from "./dto/login.dto";

const router = Router();

router.post("/", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/logout", authenticated, controller.logout);
router.get("/getMe", authenticated , controller.getMe);

export default router;
