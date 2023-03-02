const chai = require('chai');
chai.use(require('chai-json-schema'))
const expect = require('chai').expect;
const { it } = require('mocha');
const api = require('../api_kuncie/api.js');
const dataTest = require('../data/data_user.js');
const dataTestJSON = require('../data/data_user.json');
const dataSchema = require('../schema/schema_get_users.js');


describe('API GET USER LIST - API GET {{base_url}}/api/bootcamp/users dengan hooks', async () => {
    let idUser = '';

    before(async () => {
        console.log('Only this test will run');
        const response = await api.createUser('Raihan');
        expect(response.status).to.equal(200); 
        
        idUser = response.body.id;

    })

    beforeEach(() => {
        console.log('Will run before it');
    })

    afterEach(() => {
        console.log('Will run after it');
    });

    it('Test apakah funsi API Get User list berjalan ditandai dengan data Raihan muncul', async () => {
        const response = await api.getUserList();

        const filterResult = response.body.data.filter(function(data){
            return data.name === 'Raihan';
       });


        expect(response.status).to.equal(200, 'Response is not 200');
        expect(filterResult.length).to.greaterThan(0, 'No data with name Raihan');
    });

    it('Test apakah funsi API Get User list berjalan dimana data user yang saya buat ada', async () => {
        // create user
        const response = await api.createUser('Raihan');
        expect(response.status).to.equal(200); 

        const idUser = response.body.id;

        // get user list
        response = await api.getUserList();
        expect(response.status).to.equal(200); 

    // create user based on get list data
    const filterResult = response.body.data.filter((element) => {
        return element.id === idUser;
    });
        expect(filterResult.length).to.greaterThan(0, 'No Data found');
        expect(filterResult[0].name).to.equal('Raihan');
        expect(filterResult[0].id).to.equal(idUser);

    });

    it( 'Test apakah funsi API Create User menggunakan variasi data kosong', async () => {
        const payload = dataTest.dataUser
        payload.name = " ";
        const response = await api.createUser(payload);
        expect (response.status).to.equal(200,'Response is not 200');
    });
    it('Test apakah funsi API Create User menggunakan variasi data', async () => {
        const payload = dataTest.dataUser
        payload.name = "namaUser";
        const response = await api.createUser(payload);
        expect (response.status).to.equal(400, 'Response is not 200');
    });
});

describe.only('API Delete User List - API Delete {{base_url}}/api/bootcamp/users/{{userId}}', async () => {
    it('Test apakah fungsi API Delete berjalan', async () => {
        const response = await api.deleteUser();

        expect(response.status).to.equal(500, 'Response is not 200');
    
    });
    
    
   
});