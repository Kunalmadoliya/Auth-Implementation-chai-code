import * as authService from "./auth.service.js"
import ApiResponse from "../../../src/common/utils/api-response"


const register = async ()=>{
    const user = await authService.register(req.body)
     ApiResponse.created(res , "Register Successfully" , user)
}

export {register}