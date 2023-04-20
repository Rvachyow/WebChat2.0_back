import UserModel from "../models/User.js";
import MsgModel from "../models/Msg.js";

export const msgCreate = async(req,res) => {
    try {  
        const doc = new MsgModel({
            text: req.body.text,
            user: req.userId,
            idRoom: req.body.idRoom,
        });
        const chat = await doc.save();
        console.log(req.body.idRoom, "roomId");
        const userInfo = await MsgModel.find({idRoom:req.body.idRoom}).populate('user').exec();
        res.json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось оправить сообщение в чат',
        });
      }
    };


export const msgRoomCreate = async(req,res) => {
    
    try {  
        const idRoom = (req.userId + req.body.id).split('').sort().join('');
        
     
        const doc = new RoomModel({
        user: req.userId,
        userTwo: req.body.id,
        idRoom
        });

        const room = await doc.save();
        
        res.json(idRoom);
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось оправить сообщение в чат',
        });
      }
    };

export const msgGetAllUsers = async(req,res) => {
    try {
        const user = await UserModel.find().exec();
        

    
    res.json(user)
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Нет доступа',
        });
      }
    };


export const msgGet = async(req,res) => {
    try {
      const userInfo = await MsgModel.find({idRoom:req.body.idRoom}).populate('user').exec();;
      res.json(userInfo)
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: 'Нет доступа',
          });
        }
      };