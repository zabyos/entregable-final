import {Router} from "express"
import {CartModel} from "../models/carts.model.js"

const router = Router()

router.post("/",async(req,res)=>{

const cart = await CartModel.create({products:[]})

res.json(cart)

})

router.get("/:cid",async(req,res)=>{

const cart = await CartModel
.findById(req.params.cid)
.populate("products.product")

res.json(cart)

})

router.post("/:cid/products/:pid",async(req,res)=>{

const cart = await CartModel.findById(req.params.cid)

const product = cart.products.find(
p => p.product.toString() === req.params.pid
)

if(product){
product.quantity++
}else{
cart.products.push({
product:req.params.pid,
quantity:1
})
}

await cart.save()

res.json(cart)

})

router.delete("/:cid/products/:pid",async(req,res)=>{

const cart = await CartModel.findById(req.params.cid)

cart.products = cart.products.filter(
p => p.product.toString() !== req.params.pid
)

await cart.save()

res.json(cart)

})

router.put("/:cid", async (req,res)=>{

try{

const cart = await CartModel.findByIdAndUpdate(
req.params.cid,
{products:req.body.products},
{new:true}
)

res.json(cart)

}catch(error){

res.status(500).json({error:"Error actualizando carrito"})

}

})

router.put("/:cid/products/:pid", async (req,res)=>{

try{

const cart = await CartModel.findById(req.params.cid)

const product = cart.products.find(
p => p.product.toString() === req.params.pid
)

if(!product){
return res.status(404).json({error:"Producto no encontrado"})
}

product.quantity = req.body.quantity

await cart.save()

res.json(cart)

}catch(error){

res.status(500).json({error:"Error actualizando cantidad"})

}

})

router.delete("/:cid", async (req,res)=>{

try{

const cart = await CartModel.findById(req.params.cid)

cart.products = []

await cart.save()

res.json({message:"Carrito vaciado"})

}catch(error){

res.status(500).json({error:"Error vaciando carrito"})

}

})
export default router