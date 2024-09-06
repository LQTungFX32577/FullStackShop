const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer =  require('nodemailer')
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Order = require('../Modals/orders');
const User = require('../Modals/users');

exports.signup = async (req, res, next) => {
    let status = 'customer';
    try {
        const userData = req.body;
        const errors = validationResult(req);
        const hashPassword = await bcrypt.hash(userData.password, 12);
        if(userData.status === '130399'){
             status = 'admin';
        }else if(userData.status === '123456'){
            status = 'staff';
        }

        if (!errors.isEmpty()) {
          console.log("error:", errors);
          return res.status(500).send(errors)
        }
  
      const user = new User({
        email: userData.email,
        password: hashPassword,
        fullName: userData.name,
        phone: userData.phone,
        role:  status,
        cart: {items: []},
        order: []
      });
      const result = await user.save();
      res.status(200).json({ message: 'User created!', userId: result._id, });
    } catch (err) {
      return next(new Error(err));
    }
  };

exports.login = async (req,res,next) => {
  console.log(req.role);
  
  try {
    const userData = req.body;
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const user = await User.findOne({ email: userData.email }).select('email fullName _id password role');
        if(user) {
            const isRightPassword = await bcrypt.compare(userData.password, user.password);
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
                role: user.role
              },
               process.env.JWT_Secret,
              { expiresIn: '1d' }
            );
            if(isRightPassword) {
                res.status(201).send({userId: user._id, name: user.fullName, role: user.role,token: token});
            }else {
                res.status(500).send('email or password is incorrect!')
            }
        }
        else {
            res.status(500).send('email or password is incorrect!')
        }
    }
  }
  catch(error) {
      return next(new Error(error));
  }
};  

exports.sendMail = (req,res,next) => {
 const transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'alobachin@gmail.com',
        pass: 'awjaoywisywzuomh'
    }
});
var mainOptions = transporter.sendMail({ // thiết lập đối tượng, nội dung gửi mail
    from: 'mailserver@gmail.com',
    to: req.body.mail,
    subject: 'Test Nodemailer',
    text: 'You has recieved message ',
    html: `<h1>${req.body.data}</h1>`,
    
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
}

exports.getHistory = (req,res,next) => {
  Order.find()
  .then(response => res.status(201).json(response))
  .catch(err => console.log(err))
}

exports.getHistoryDetail = (req,res,next) => {
  Order.findById(req.params.detail)
  .then(response => res.status(201).json(response))
  .catch(err => console.log(err))
}

exports.getBill = (req,res,next) => {
   User.findById(req.params.userId)
   .then(response => res.status(201).json(response))
   .catch(err => console.log(err))
} 

exports.getInovation = (req,res,next) => {
  
   Order.findById(req.params.userId)
   .then(order => {
  //   if (!order) {
  //   return next(new Error('No order found.'));
  // }
  console.log(order);
  
  const invoiceName = 'invoice-' + req.body.order + '.pdf';
  const invoicePath = path.join('data', 'invoices', invoiceName);

  const pdfDoc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'inline; filename="' + invoiceName + '"'
  );
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text('Invoice', {
    underline: true
  });
  pdfDoc.text('-----------------------');
  
    pdfDoc
      .fontSize(14)
      .text(
        req.body.order 
      );
  pdfDoc.text('---');
  pdfDoc.fontSize(20).text('Thank you for using!!');

  pdfDoc.end();
}).then(result => {
  const transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'alobachin@gmail.com',
        pass: 'awjaoywisywzuomh'
    }
});
var mainOptions = transporter.sendMail({ // thiết lập đối tượng, nội dung gửi mail
    from: 'mailserver@gmail.com',
    to: 'alobachin@gmail.com',
    subject: 'Test Nodemailer',
    text: 'You has recieved message ',
    html: `<h1>Your Bill</h1>`,
    attachments: {
      filename: 'bill.pdf',
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
})

   .catch(err => console.log(err))
}
exports.getInvoice = (req,res,next) => {
  
  //   if (!order) {
  //   return next(new Error('No order found.'));
  // }
  const invoiceName = 'invoice-' + req.params.userId + '.pdf';
  const invoicePath = path.join('data', 'invoices', invoiceName);

  const pdfDoc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'inline; filename="' + invoiceName + '"'
  );
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text('Invoice', {
    underline: true
  });
  pdfDoc.text('-----------------------');
  
    pdfDoc
      .fontSize(14)
      .text(
        req.params.userId
      );
  pdfDoc.text('---');
  pdfDoc.fontSize(20).text('Thank you for using!!');
  
  pdfDoc.end()

   .catch(err => console.log(err))
}