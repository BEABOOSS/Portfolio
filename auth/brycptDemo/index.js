const bcrypt = require("bcrypt");


const hashPassword = async (pw) => {

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hashed);
};


const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log("Logged in!");
    } else {
        console.log("Try again!");
    }
}
// hashPassword("monkey");
login("monkey", "$2b$12$N2pnzoboNpIVoz4AjNB/IegFWGz5azwJNxrw1dZx15bPypqOFHdvq");
