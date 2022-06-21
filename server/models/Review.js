const { Schema } = require('mongoose');

const reviewSchema = new Schema(
    {
        reviewBody: {
          type: String,
          required: true,
          maxlength: 280
        },
        username: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
        }
      },
      {
        toJSON: {
          getters: true
        }
      }
);

module.exports = reviewSchema;
