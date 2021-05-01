const Mongoose = require('mongoose')

class Database {
    constructor (url) {
        this.#init(url).then( _ => {
            this.usersCollection()
        })
    }

    async #init (url) {
        this.mongo = await Mongoose.connect(url, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async collaction (name, schema) {
        return this.mongo.model(name, schema)
    }

    async usersCollection () {
        this.users =  await this.collaction("users", Mongoose.Schema({
            chat_id: {
                type: Number,
                required: true,
                unique: true,
                index: true
            },
            step: {
                type: Number,
                default: 1,
            },
            name: {
                type: String,
                minlength: 3,
                maxlength: 20
            },
            age: {
                type: Number,
                min: 16
            }
        }))
    }

    async findUser(chat_id) {
        return await this.users.findOne({ chat_id: chat_id })
    }

    async createUser (chat_id) {
        return await this.users.create({ chat_id: chat_id })
    }

    async setName (chat_id, name) {
        return await this.users.updateOne({ chat_id }, { name })
    }

    async setStep (chat_id, step) {
        return await this.users.updateOne({ chat_id }, { step })
    }

    async setAge (chat_id, age) {
        return await this.users.updateOne({ chat_id }, { age })
    }

    
}


module.exports = Database

