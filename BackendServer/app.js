const express = require('express');
const userRoutes = require('./Routes/user');
const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');

const cors = require('cors');
const helmet = require('helmet')



const Rooms = require('./Modals/Room');
const Chats = require('./Modals/chat');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(helmet());


app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
mongoose.connect(`mongodb+srv://${process.env.Mongo_DB}:${process.env.Mongo_Pass}@tungledb.b8ta1wp.mongodb.net/E-commerce`)
.then(result => {
    const server = app.listen(3100);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
      socket.on('roomData', data => {
        const rooms = new Rooms({
          userId: data.userId,
          Room: data.room,
        })
        rooms.save();
      })
      socket.on("sendDataClient", data => { 
        console.log(data)
        const chats = new Chats({
          chatRoom: data.room,
          message: data.content,
          userId: data.id
        })
        chats.save();
        io.emit("sendDataServer", { data });
      })
    
      socket.on('exit', data => {
        Rooms.findOneAndDelete({Room : data.room })
      })

      socket.on('disconnect', () => {
        console.log(`user is disconnect`);
      })

    })
})
.catch(err => console.log(err)
)