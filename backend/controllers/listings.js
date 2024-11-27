const Listing = require('../models/listing');
const getAllListings = async (req, res) => {
    try {
        const alllistings = await Listing.find();
        res.json(alllistings);    
    } catch (error) {
        console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
};
const addList= async (req,res)=>{
    try {
        let listing = new Listing(req.body);
    await listing.save();
    res.json({
        success:true,
        message:"successfully added the bnb to the list"
    })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const showlisting=async(req,res)=>{
    try{
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.json({success:true,data:list});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' ,success:false});
    }
}
const deleteListing=async(req,res)=>{
    try {
        
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.json({success:true,message:"deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Deletion not success' ,success:false});
    }

}
module.exports={getAllListings,addList,showlisting,deleteListing};