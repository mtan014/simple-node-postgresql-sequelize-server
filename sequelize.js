const Sequelize = require("sequelize");
const UserModel = require("./models/User");
const BlogModel = require("./models/Blog");
const TagModel = require("./models/Tag");

//const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/test-db-1")
const sequelize = new Sequelize("postgres://localhost:5432/test-db-1");

const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const BlogTag = sequelize.define("blog_tag", {});
const Blog = BlogModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
Tag.belongsToMany(Blog, { through: BlogTag, unique: false });
Blog.belongsTo(User);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Blog,
  Tag
};
