const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema(
  {
    image: {
      type: "string",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
