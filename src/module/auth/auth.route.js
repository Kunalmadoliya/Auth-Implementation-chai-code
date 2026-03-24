import { Router } from "express";
import * as controller from "./auth.controller"
import validate from "../../common/middleware/validate.middleware";
import RegisterDto from "./dto/register.dto";
import { register } from "./auth.service";


const router = Router()

router.post("/" , validate(RegisterDto) , controller.register)

export default router