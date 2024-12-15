const Joi=require('joi');
const { jwtDecode } = require('jwt-decode');
const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
        role: Joi.string().valid('owner', 'customer').required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    next();
}
const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
    });
    const {error}=schema.validate(req.body);
    if(error)
        {
        return res.status(400).json({message:"Bad request",error});
    }
    next();
}
const checkOwnerRole = async (req, res, next) => {

    const tokenn=req.cookies.token; // Assuming the role is stored in cookies
    const decoded=jwtDecode(tokenn);
    const role=decoded.role;
    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
module.exports={
    signupValidation,loginValidation,checkOwnerRole
}