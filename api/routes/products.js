const express = require("express");
const Product = require("../models/Products");
const router = express.Router();
const mongoose = require("mongoose");

// get all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.json({ msg: "No Product Found" });

    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ errors: "Server Error" });
  }
});

//get Product by category

router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (products.length === 0)
      return res.json({ msg: "No product found in this Category" });
    return res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ errors: "Server Error" });
  }
});

//find one product by Id

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(401).json({ msg: "Invalid Product Id" });
    const product = await Product.findById(req.params.id);
    if (!product) return res.json({ msg: "No Product Found" });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ errors: "Server Error" });
  }
});

module.exports = router;

// router.post("/", async (req, res) => {

//   try {
//     const totalData = DirectoryData.forEach( async (data) => {
//       const dir = await new Directory({
//         title:data.title,
//         imageUrl:data.imageUrl,
//         linkUrl:data.linkUrl
//       })
//       await dir.save()
//   })
//   return res.json(totalData)

//   } catch (err) {
//     console.log(err.message)
//     return res.status(401).json({errors:'server  error'})
//   }
// });

// router.get("/", async (req, res) => {
//   try {

//     ShopData.forEach( async (data) => {
//       const product = await new Product({
//         title:data.title,
//         image:data.imageUrl,
//         price:parseFloat(data.price),
//         description:"leofsdh fsj kfjfj jhfsk jdshf  jkfhds jfsh kdjsf sj k jsflkl jlkfksj ljs fjskjf skjfkls dfksj akljowiuero kdsjafl ajsoifusid jfkjs aljkdsf fkdssos dkf lkdjsf sdlkfjs kdspoe dksfjl dskljlfs lkdsjfl jsdfjl sdfjjlksf lkjdslkf ",
//         category:data.category
//       })
//       await product.save()
//       return res.send('success')
//     })
//     } catch (err) {
//       console.log(err.message)
//       return res.status(401).json({error:'server error'})
//   }
// });
