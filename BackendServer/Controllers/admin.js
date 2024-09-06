const User = require('../Modals/users');
const Order = require('../Modals/orders');
const Product = require('../Modals/products');
const Rooms = require('../Modals/Room');
const Chats = require('../Modals/chat');
const paging = require('../utilsuport/paging');


exports.Authorization = (req,res,next) => {
   console.log(req.role)
   if(req.role === 'customer'){
      return res.status(401).send('unAuthorization');
   }else{
      res.status(201).send('ok');
   }
}

exports.getDashboard = (req,res,next) => {
   Promise.all([User.find(), Order.find()])
   .then(([user, order]) => {
      res.status(201).json({user: user, order: order})
   })
   .catch(err => console.log(err));
};

exports.getTransaction = async (req,res,next) => {
   const currentPage = req.params.page || 1;
   const perPage = 2;
   try {
       const Data = await Order.find()
      .sort({ createdAt: -1 })
       const transaction = paging(Data, perPage, currentPage)
       res.status(200).json(transaction)
      }
   catch(err) { console.log(err) }  
}

exports.UpdateUser  = (req, res, next) => {
  if(req.role !== "admin") {
    return res.status(403).send(" UN AUTHORIZATION")
  }
   User.findByIdAndUpdate(req.body.id, {role: "staff"})
     .then(() => {
       res.status(200).send('update')
     })
     .catch(err => console.log(err));
 }; 

 exports.getProduct =(req,res,next) => {
   Product.find().then(response => res.status(201).json(response))
   .catch(err => console.log(err));
 }

 exports.getProductTrash = (req,res,next) => {
   Product.findWithDeleted({deleted: true})
   .then(data => res.status(200).json(data))
   .catch(err => console.log(err))
}

exports.EditProduct = (req,res,next) => {
   if(req.role !== "admin"){
      return res.status(403).send('UN AUTHORIZATION')
   }
   const name = req.body.name;
   const long_desc = req.body.long_desc;
   const short_desc = req.body.short_desc;
   const price = req.body.price;
   const count = req.body.count;
   const category = req.body.category;
   const photos = req.body.photos;
   Product.findByIdAndUpdate(req.params.editId, {
    name: name,
    long_desc: long_desc,
    short_desc: short_desc,
    price: price,
    category: category,
    count: count,
    photos: photos
   }).then(response => res.status(203).send('updated!'))
   .catch(err => console.log(err))
}

exports.AddProduct = (req,res,next) => {
  if(req.role !== "admin") {
    return res.status(403).send('UN AUTHORIZATION')
  }
   const name = req.body.name;
   const long_desc = req.body.long_desc;
   const short_desc = req.body.short_desc;
   const price = req.body.price;
   const category = req.body.category;
   const count = req.body.count;
   const photos = req.body.photos
   const product = new Product({
    name: name,
    long_desc: long_desc,
    short_desc: short_desc,
    price: price,
    category: category,
    count: count,
    photos: photos
   })
   product.save()
   .then(response => res.status(201).send('ok'))
   .catch(err => console.log(err))
   
}

exports.forceDeleteProduct = (req, res, next) => {
   Product.findByIdAndDelete(req.body.id)
     .then(() => {
       res.status(200).send('deleted')
     })
     .catch(err => console.log(err));
 };
 exports.DeleteProduct = (req, res, next) => {
  if(req.role !== "admin") {
    return res.status(403).send('UN AUTHORIZATION')
  }
   Product.delete({_id: req.body.id})
     .then(() => {
       res.status(200).send('deleted')
     })
     .catch(err => console.log(err));
 };
 exports.forceDeleteProduct = (req, res, next) => {
  if(req.role !== "admin") {
    return res.status(403).send('UN AUTHORIZATION')
  }
   Product.findByIdAndDelete(req.body.id)
     .then(() => {
       res.status(200).send('deleted')
     })
     .catch(err => console.log(err));
 };

 exports.getEditProduct  = (req, res, next) => {
   
   Product.findById(req.params.editId)
     .then((result) => {
       
       res.status(200).json(result)
     })
     .catch(err => console.log(err));
 };

 exports.ProductRestore = (req,res,next) => {
   Product.restore({_id: req.body.id})
   .then(result => {
     res.status(201).send('restore')
   })
}

exports.status = (req,res,next) => {
  if(req.role !== "admin") {
    return res.status(403).send('UN AUTHORIZATION')
  }
  Order.findByIdAndUpdate(req.params.orderId,{status: req.body.status})
  .then(response => res.status(201).send('ok'))
  .catch(err => console.log(err));
}

exports.countUpdate = (req,res,next) => {
  if(req.role !== "admin") {
    return res.status(403).send('UN AUTHORIZATION')
  }
  console.log(req.body);
  const count = req.body.number
  Product.updateOne({name: req.body.name},{ $inc: { count: - count } })
  .then(response => res.status(201).send('ok'))
  .catch(err => console.log(err));
}

exports.chatRoom = (req,res,next) => {
  Rooms.find()
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => console.log(err))
}
exports.MessContent = (req,res,next) => {
  Chats.find({chatRoom: req.body.room})
  .then(response => res.status(201).json(response))
  .catch(err => console.log(err))
}