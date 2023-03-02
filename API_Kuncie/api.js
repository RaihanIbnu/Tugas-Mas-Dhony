const HTTPlib = require("supertest");
const apKuncie = HTTPlib('https://api.kunciebootcampqa.com/api/bootcamp')

function getUserList(){
    return apKuncie.get('/users');
};

function deleteUser(userId){
    return apKuncie
        .delete('/users/' + userId);
}

function createUser(namaUser) {
    return apKuncie
        .post('/users')
        .send({
            "name": namaUser,
            "phone_number": "1111111", 
            "address": "Majalengka, Majalengka",
            "point": 500,
            "is_registered": true,
            "vehicles": [
                {
                    "name": "Elantra",
                    "type": "Hyundai"
                },
                {
                    "name": "F1ZR",
                    "type": "Yamaha"
                }
            ]
        });
}

function createUser2(payload) {
    return apKuncie
        .post('/users')
        .send(payload);
}

module.exports = {
    getUserList,
    createUser,
    createUser2,
    deleteUser
}