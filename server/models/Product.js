const { Schema, model }= require("mongoose");
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
    required: true
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

const result = productSchema.index({ name: 'text', description: 'text'})
console.log("THISRESULT " + result)

productSchema.virtual('reviewCount').get(function(){
  return this.review.length;
})

const Product = model("Product", productSchema);

module.exports = Product;
