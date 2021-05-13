const mongoose = require('mongoose');

// 1.connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParse: true
});

const conn = mongoose.connection;
conn.on('error', () => console.log('连接数据库失败'));
conn.once('open', async () => {
  // 2.defined Schema - Table
  const Schema = mongoose.Schema({
    category: String,
    name: String
  });

  // 3. complice one Model, it ressponse database Collection
  const Model = mongoose.model('fruit', Schema);
  try {
    // 4.create, create return Promise
    let r = await Model.create({
      category: '温带水果',
      name: '苹果',
      price: 5
    });
    console.log('插入数据: ', r);
    
    // 5. query, find返回Query, 它实现了then和catch, 可以当Promise使用
    // 如果需要返回Promise, 调用期exec()
    // r = await Model.find({ name: '苹果' });
    // console.log('查询结果', r);

    // 6.update, updateOne return Query
    // r = await Model.updateOne({ name: '苹果' }, {
    //   $set: { name: '芒果'}
    // });
    // console.log('更新结果: ', r);

    // 7.delete, deleteOne return Query
    // r = await Model.deleteOne({ name: '苹果' });
    // console.log('删除结果: ', r);

    const blogSchema = mongoose.Schema({
      title: { type: String, require: [true, '标题为必填项'] },   // 定义校验规则
      author: String,
      body: String,
      comments: [{ body: String, date: Date }],                 // 定义对象数据
      date: { type: Date, default: Date.now },                  // 指定默认值
      hidden: Boolean,
      meta: {
        // 定义对象
        votes: Number,
        favs: Number
      }
    });

    // 定义实例方法
    blogSchema.methods.findByAuthor = function(author) {
      return this.model('blog').find({ author: this.author }).exec();
    }

    // static method
    blogSchema.statics.findByAuthor = function(author) {
      return this.model('blog').find({ author }).exec();
    }

    // virtual property
    blogSchema.virtual('commentsCount').get(function() {
      return this.comments.length;
    })

    const BlogModel = mongoose.model('blog', blogSchema);
    await BlogModel.deleteMany({});
    const blog = new BlogModel({
      title: 'nodejs持久化',
      author: 'jerry',
      body: '...',
      comments: [
        {body: 'haha',}
      ]
    });

    r = await blog.save();

    r = await blog.findByAuthor();
    console.log('findByAuthor', r);

    // static method
    r = await BlogModel.findByAuthor('jerry');
    console.log('findByAuthor: ', r);

    // virtual property
    r = await BlogModel.findOne({ author: 'jerry' });
    console.log('blog留言数: ', r.commentsCount);
  }
  catch( err ) {
    console.log(err);
  }
});
