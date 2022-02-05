const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/relatioinshipDemo")
    .then(() => {
        console.log("MONGO CONNECTION OPEN");
    })
    .catch(err => {
        console.log("OH NOOOO MONGO CONNECTION ERROR!!!");
        console.log(err);
    })


const clientSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    like: Number,
    client: [{type: Schema.Types.ObjectId, ref: "Client"}]
})

const Client = mongoose.model("Client", clientSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

//* ====================
//* ONE TO "BAJILLIONS"
//* ====================


// const makeTweets = async() => {
//     // const client = new Client({username: "chickenfan99", age: 61});
//     const client = await Client.findOne({username: "chikenfan99"});
//     const tweet2 = new Tweet({text: "bock bock my chickens make noises", likes: 3452});
//     tweet2.client = client;
//     tweet2.save();   
    
// }
 
// makeTweets()



const findTweet = async () => {
    const t = await Tweet.findOne({}).populate("client", "username")
    console.log(t);
}

findTweet();

