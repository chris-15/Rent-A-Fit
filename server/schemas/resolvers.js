const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
require("dotenv").config()
const cloudinary = require("cloudinary");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if(context.user){
          const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          .populate('products')

          return userData
        }
        throw new AuthenticationError('Not Logged In to see your data')
      },
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('products')
      },
      oneUser: async (parent, {username}) => {
        return User.findOne({username})
        .select('-__v -password')
        .populate('products')
      },
      categories: async () => {
        return await Category.find();
      },
      products: async (parent, { category, name }) => {
        const params = username ? { username} : {};
          if (category) {
          params.category = category;
        }
  
        if (name) {
          params.name = {
            $regex: name
          };
        }
        return  await Product.find(params).sort({ createdAt: -1}).populate('category')
  
        // if (category) {
        //   params.category = category;
        // }
  
        // if (name) {
        //   params.name = {
        //     $regex: name
        //   };
        // }
  
        // return await Product.find(params).populate('category');
      },
      product: async (parent, { _id }) => {
        return await Product.findOne({_id}).populate('category');
      },
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category',
            populate: 'products'
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      addOrder: async (parent, { products }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ products });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateProduct: async (parent, { _id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addReview: async (parent, {productId, reviewBody}, context) => {
        if(context.user){
          const updatedProduct = await Product.findOneAndUpdate(
            {_id: productId},
            {$push: { reviews: { reviewBody, username: context.user.username}}},
            {$new: true, runValidators: true}
          );
          return updatedProduct
        }
      },
      addProduct: async (parent, args, context) => {
        if(context.user){
          const product = await Product.create({...args, username: context.user.username});

          await User.findByIdAndUpdate(
            {
              _id: context.user._id
            },
            {
              $push: { products: product._id},
            },
            {
              new: true
            }
          );

          return product;
        }
        throw new Authentication('You need to be logged in to post a product')
      },

      uploadPhoto: async (_, { photo }) => {
        //initialize cloudinary
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
              });
        /*
        try-catch block for handling actual image upload
        */
              try {
                const result = await cloudinary.v2.uploader.upload(photo, {
        //here i chose to allow only jpg and png upload
                  allowed_formats: ["jpg", "png", "svg"],
        //generates a new id for each uploaded image
                  public_id: "",
        /*creates a folder called "your_folder_name" where images will be stored.
        */
                  folder: "your_folder_name",
                });
              } catch (e) {
        //returns an error message on image upload failure.
                return `Image could not be uploaded:${e.message}`;
              }
        /*returns uploaded photo url if successful `result.url`.
        if we were going to store image name in database,this
        */
        return `Successful-Photo URL: ${result.url}`;
            },
            
    }
  };
  
  module.exports = resolvers;