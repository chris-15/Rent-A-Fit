const mongoose = require("mongoose");

const { Schema } = mongoose;
const reviewSchema = require('./Review');


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
   type: String,
   required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  reviews: [reviewSchema],
},
{
  toJSON: {
    getters: true
  }
});

productSchema.virtual('reviewCount').get(function(){
  return this.review.length;
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
