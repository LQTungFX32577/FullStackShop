const Product = require('../Modals/products');
const User = require('../Modals/users');
const Order = require('../Modals/orders');

const nodemailer =  require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const formatCash = require('../utilsuport/transfer');
const stripe = require('stripe')('sk_test_51PuQOaI3ndHDgrukVSS8fajg0h89UlQe4X9ul3GacAMgNeZW9vXpKRBtp8MsFhi175XUhXrvuveeURlwpGQFNVpl00xJZNzuOv');
const YOUR_DOMAIN = 'https://frontendclient-65646.web.app';

exports.getProducts = (req,res,next) => {
  Product.find()
  .then(result => {
    res.status(201).json(result)
  })
}

exports.addProduct = (req,res,next) => {
    console.log(req.role);
    const cart = req.body.product;
    const userId = req.body.user.userId;
    User.findByIdAndUpdate(userId, {cart: cart})
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => console.log(err)) 
}

exports.getCarts = (req,res,next) => {
  User.findById(req.userId)
  .then(result => res.status(201).json(result))
  .catch(err => res.status(403).send('UnAuthorization'))
}

exports.checkOut = (req,res,next) => {
  const userInfo = req.body.info;
  const cart = req.body.cart;
  const Price = formatCash(req.body.total);
  const photo = cart.filter(data => data.item);
  console.log(userInfo.email);
  
   const order = new Order({
    user: {
      userId: req.userId,
      fullName: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address
    },
    orders: cart,
    totalPrice: req.body.total
   });
   order.save()
   .then(User.findByIdAndUpdate(req.userId,{cart: [], order: [order._id]})
   .then(response => res.status(201).send('ok'))
   .catch(err => console.log(err))) 

   const transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'alobachin@gmail.com',
        pass: 'awjaoywisywzuomh'
    }
  });

  var options = {
    viewEngine : {
        extname: '.handlebars', // handlebars extension
        layoutsDir: 'views/', // location of handlebars templates
        defaultLayout: 'send', // name of main template
        partialsDir: 'views/', // location of your subtemplates aka. header, footer etc
    },
    viewPath: 'views/',
    extName: '.handlebars'
    };
    transporter.use('compile', hbs(options))
   var mainOptions = transporter.sendMail({ // thiết lập đối tượng, nội dung gửi mail
    from: 'mailserver@gmail.com',
    to: userInfo.email,
    subject: 'Test Nodemailer',
    text: 'You has recieved message ',
    template: 'send',
    context: {
      phone: userInfo.phone,
      name: userInfo.name,
      address: userInfo.address,
      userId: req.userId,
      price: Price,
      cart: cart,
      photo: photo
      
    }
    
},function(err, info){
  if (err) {
      console.log(err);
      res.status(500).send('fail!')
  } else {
      console.log('Message sent: ' +  info.response);
      res.status(201).send('success')
  }
})
return mainOptions;
};

exports.getCredit = async(req,res,next) => {
  const email = req.body.email;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const total = req.body.total;
  const cart = req.body.cart;
  const description = cart[0].item.name;
  const order = new Order({
    user: {
      userId: req.userId,
      fullName: name,
      email: email,
      phone: phone,
      address: address
    },
    orders: cart,
    totalPrice: req.body.total
   });
   order.save()
   .then(result => User.findByIdAndUpdate(req.userId,{cart: [], order: order._id}))

  
   const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: name,
            description: description
          },
          unit_amount: total,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/payment_success/${req.userId}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });
  console.log(session.url);
  
  res.status(303).json({url: session.url});
}
