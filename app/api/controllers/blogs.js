const blogModel = require("../models/blogs");
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    blogModel.findById(req.params.blogId, function (err, blogInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "blog found!!!",
          data: { blogs: blogInfo },
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let blogsList = [];
    blogModel.find({}, function (err, blogs) {
      if (err) {
        next(err);
      } else {
        for (let blog of blogs) {
          blogsList.push({
            id: blog._id,
            name: blog.name,
            released_on: blog.released_on,
          });
        }
        res.json({
          status: "success",
          message: "blogs list found!!!",
          data: { blogs: blogsList },
        });
      }
    });
  },
  updateById: function (req, res, next) {
    blogModel.findByIdAndUpdate(
      req.params.blogId,
      { name: req.body.name },
      function (err, blogInfo) {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "blog updated successfully!!!",
            data: null,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    blogModel.findByIdAndRemove(req.params.blogId, function (err, blogInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "blog deleted successfully!!!",
          data: null,
        });
      }
    });
  },
  create: function (req, res, next) {
    blogModel.create(
      { title: req.body.title, body: req.body.body, image: req.body.image },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "blog added successfully!!!",
            data: null,
          });
      }
    );
  },
};
