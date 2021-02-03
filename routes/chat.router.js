const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("./../models/user.model");
const Chat = require("./../models/chat.model");
const Message = require("./../models/message.model");

const createError = require("http-errors");


// POST "/api/chat/:userId" to create a new chat

router.post("/chat/:userId", (req,res, next)=>{
    const {userId} = req.params
    // const currentUserId = req.session.currentUser._id

    const {currentUserId} = req.body;
    let chatId;  

    Chat.create({participants: [currentUserId, userId], messages:[]})
    .then((createdChat)=>{
        chatId = createdChat._id
        const pr = User.findByIdAndUpdate(currentUserId, {$push:{chats: chatId}})
        return pr;

    }).then(()=>{
        const pr = User.findByIdAndUpdate(userId, {$push:{chats: chatId}})
        return pr;

    }).then(()=>{
        res.status(200).json(chatId)
    })
    .catch(err =>{
        next( createError(err) );

    })
})



// GET "/api/chat/:id" to get a specific chat

router.get("/chat/:id", (req,res, next)=>{
    const {id} = req.params;

    Chat.findById(id)
        .populate("participants")
        .populate("messages")
        .then((foundChat) => {
            res.status(200).json(foundChat);
        })
        .catch((err) => {
          next(err)
        });

})



// POST "/api/message" to create a new message

router.post("/message", (req, res, next)=>{

    const {chat, sentBy, text} = req.body;
    let messageId;  

    Message.create({chat, sentBy, text, seen: false})
    .then((createdMessage)=>{
        messageId = createdMessage._id
        const pr = Chat.findByIdAndUpdate(chat, {$push:{messages: messageId}})
        return pr;

    }).then(()=>{
        res.status(200).json(messageId)
    })
    .catch(err =>{
        next( createError(err) );

    })
})



//PUT "/api/message/read/:id" to read a message

router.put("/message/read/:id", (req, res, next)=>{

    const {id} = req.params;
    

    Message.findByIdAndUpdate(id, {seen: true})
    .then((updatedMessage)=>{
        
        res.status(200).json(updatedMessage)
    })
    .catch(err =>{
        next( createError(err) );

    })
})


module.exports = router;