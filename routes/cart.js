const Cart= require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
  } = require("./verifyToken");
  const router=require("express").Router();

  //ADD CART
  router.post("/",verifyToken,async(req, res)=>{
      const newCart=new Cart(req.body);

      try{
          const saveCart=await newCart.save();
          res.status(200).json(saveCart);
      }catch(err){
          res.status(500).json(err);
      }
  });

 //UPDATE
router.put("/update/:id",verifyTokenAndAuthorization, async (req, res) => {

    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //delete
  router.delete("/delete/:id",verifyTokenAndAuthorization,async(req, res)=>{
    try{
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    }catch(err){
      res.status(500).json(err)
    }
  });

 //GET A USER
  router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
   try{
    const cart=await Cart.findOne({ userId: req.params.userId })
    res.status(200).json(cart);
   }catch(err){
     res.status(500).json(err);
   }
  })

  //GET ALL 
  router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find();

        res.status(200).json(carts)
    }catch (err){
      res.status(500).json(err);
    }
  });


module.exports=router