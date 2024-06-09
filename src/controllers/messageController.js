const Message = require("../database/models/Message");
const Car = require("../database/models/Car");
const messageSchema = require("../validation/messageValidation");

const limit = 50;

const createMessage = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if(!car) {
        return res.status(400).send({ state: 'failed', message: 'This car doesnot exist' });
    }

    const { start, end, name, phone } = req.body;

    const data = { start, end, name, phone }

    const { error } = messageSchema.validate(data);

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message, error });
    }

    try {
        await Message.create({ start, end, name, phone, car_id: id });

        return res.status(200).send({ state: 'success', message: 'Created Message successfully'});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id);

        if(!message) {
            return res.status(400).send({ state: 'failed', message: 'This message does not exist'});
        }

        message.read = true;
        await message.save();

        return res.status(200).send({ state: 'success', message: 'Mark message as read successfully'});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllMessages = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Message.countDocuments({});

        const messages = await Message.find({}).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get all messages successfully', messages, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllReadedMessages = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Message.countDocuments({ read: true });

        const messages = await Message.find({ read: true }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get all readed messages successfully', messages, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllNotReadedMessages = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Message.countDocuments({ read: false });

        const messages = await Message.find({ read: false }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get all not readed messages successfully', messages, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id);

        if(!message) {
            return res.status(400).send({ state: 'failed', message: 'This message does not exist'});
        }

        return res.status(200).send({ state: 'success', message: 'Get the message successfully', message});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

module.exports = {
    showAllMessages,
    showAllNotReadedMessages,
    showAllReadedMessages,
    showMessage,
    createMessage,
    markAsRead
}