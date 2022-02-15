# Real Time Chat App



==================================================================
---- Home ---- // ---- Friends ---- // ---- Incomming Request ----
==================================================================

<!-- in the DB could add blocked people *** MUST BE DONE WITH JOI *** -->
const UserSchemaDb = new mongoose.Schema{
    friendId : ["bob", "xavier", "jane"],
    mutualFriendId : [

        friend: {
            friendId: friendId(),
            mutualFriends: []
        }
    ],
    activeChatId : [],
    userId : []
}; 


<!-- mongoose schema -->
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    birhtday: {
        type: Number,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    }
})
------------------------------------------------------------------

<!-- add user to your friends list -->
const addFriendId = async(userId) => {
    const newFriend = await UserSchemaDb.friendId.push(userId);
    return newfriend;
};


<!-- only activates once you add that person  -->
<!-- NOTE: userId1 => the main person && userId2 => the one that's being added -->
<!-- So once you add that person this run and gets added to mutualFriendsId in an array -->
<!-- userId1.friendId(x) search if "x" is in userId2.friendId() === if true => return the userId1.mutualFriendId.push(userId1.friendId(x))  -->

const addMutualFriendId = (userId1, userId2) => {
    const user1 = UserSchemaDb.mutualFriendId.friend.friendId(userId1);
    const user2 = UserSchemaDb.mutualFriendId.friend.friendId(userId2);
    
    
    return 
};
==================================================================
## What info to show
public show everything => {
    bday, phone, email, username,
    also anyone can message you (even random people)
}


private can choose who see what => {
    friends sees everything and chat,
    mutual friends can send a request to chat,
    random user can't message you 
}




