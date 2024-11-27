const Joi=require('joi');
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
const checkOwnerRole = (req, res, next) => {
    const { role } = req.cookies; // Assuming the role is stored in cookies
    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
module.exports={
    signupValidation,loginValidation,checkOwnerRole
}