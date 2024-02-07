var expect = require("chai").expect;
var request = require("request");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dvl3rfp3o', 
    api_key: '199495448115874', 
    api_secret: 'sbRUCNbRBLxS16Td4oY37GwHqrI' 
  });

let token;

describe("Get all users", async function () {
    before(function (done) {
        // Perform user login and get the authentication token
        request.post({
            url: 'http://localhost:3000/api/users/login',
            json: {
                email: 'a@.com',
                password: 'a'
            }
        }, function (error, response, body) {
            token = body.data;
            done();
        });
    });

    it("should get all users", function (done) {
        request.get({
            url: `http://localhost:5003/api/users/get-all-users`,
            headers: {
                'authorization': `Bearer ${token}`
            }
        }, function (error, response, body) {
            if (response.statusCode == 200) {
                expect(response.statusCode).to.equal(200);
                body = JSON.parse(body)
                expect(body).to.have.property('message').eql('Users fetched successfully');
            }
            done();
        });
    });
    it("Get current user", function (done) {
        request.get({
            url: `http://localhost:5003/api/users/get-current-user`,
            headers: {
                'authorization': `Bearer ${token}`
            }
        }, function (error, response, body) {
            if (response.statusCode == 200) {
                expect(response.statusCode).to.equal(200);
                body = JSON.parse(body)
                expect(body.data).to.have.property('name').eql('a');
            }
            done();
        });
    });
    it("Get all chats", function (done) {
        request.get({
            url: `http://localhost:5003/api/chats/get-all-chats`,
            headers: {
                'authorization': `Bearer ${token}`
            }
        }, function (error, response, body) {
            if (response.statusCode == 200) {
                expect(response.statusCode).to.equal(200);
                body = JSON.parse(body)
                expect(body).to.have.property('message').eql('Chats fetched successfully');
            }
            done();
        });
    });
});

describe('Cloudinary Connection', function () {
    it('should connect to Cloudinary and upload an image', async function () {
        const imagePath = '/Users/ashwinsreedhar/Downloads/kitty-cat-kitten-pet-45201.jpeg';

        try {
            const uploadResult = await cloudinary.uploader.upload(imagePath);
            expect(uploadResult).to.have.property('secure_url');
            expect(uploadResult).to.have.property('public_id');
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    });
});