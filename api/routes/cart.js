const express = require("express");

const auth = require("../middlewares/authMiddleware");
const Product = require("../models/Products");
const User = require("../models/User");

const router = express.Router();

// add to cart

router.put("/add/:productid", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productid);
    const user = await User.findById(req.user.id);
    const arrayOfId = user.cart.map((value) => value.productId);
    if (arrayOfId.includes(req.params.productid)) {
      const index = arrayOfId.indexOf(req.params.productid);
      user.cart[index].quantity += parseInt(1);
      await user.save();
      return res.status(200).json(user.cart);
    }
    user.cart.unshift({ productId: product.id, quantity: 1 });
    user.save();
    return res.status(200).json(user.cart);
  } catch (err) {
    console.log(err.message);
    return res.json({ errors: "server Error" });
  }
});

//remove from cart

router.delete("/delete/:productid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const removeIndex = user.cart
      .map((value) => value.id)
      .indexOf(req.params.productid);

    user.cart.splice(removeIndex, 1);
    await user.save();
    return res.status(200).json(user.cart);
  } catch (err) {
    console.log(err.message);
    return res.json({ errors: "server Error" });
  }
});

//remove quantity from cart

router.delete("/delete/quantity/:productid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const index = user.cart
      .map((value) => value.productId)
      .indexOf(req.params.productid);
    if (index >= 0) {
      if (user.cart[index].quantity >= 2) {
        user.cart[index].quantity -= 1;
        user.save();
        return res.status(200).json(user.cart);
    }}
    user.cart.splice(index, 1);
    user.save();
    return res.status(200).json(user.cart);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ errors: "server error" });
  }
});


module.exports = router;
