# Real Time Chat App



==================================================================
---- Home ---- // ---- Friends ---- // ---- Incomming Request ----
==================================================================

<!-- in the DB could add blocked people -->
const UserSchemaDb = {
    friendId : ["bob", "xavier", "jane"],
    mutualFriendId : [

    ],
    activeChatId : [],
    userId : []
}; 
<!-- mongoose schema -->
const userSchema = new mongoose.Schema({
    userName: String,
    birhtday: Number,
    phoneNumber: Number,
    email: String
})

<!-- add user to your friends list -->
const addFriendId = userId => {
    return UserSchemaDb.friendId.push(userId);
};


<!-- only activates once you add that person  -->
<!-- So once you add that person this run and gets added to mutualFriendsId in an array -->
<!-- userId1.friendId(x) search if "x" is in userId2.friendId() === if true => return the userId1.mutualFriendId.push(userId1.friendId(x))  -->
const addMutualFriendId = (userId1, userId2) => {


};

## What info to show
public show everything => bday, phone, email, username

private can choose who see what => {
    friends sees everything and chat,
    mutual friends can send a request to chat,
}




