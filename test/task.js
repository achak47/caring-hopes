const chai = require ('chai');
const chaiHttp = require ('chai-http');
const server = require ('../index.js');


//Assertion style
chai.should();

chai.use(chaiHttp)

describe ('Task API', () => {
    /*
        testing the basic GET api
    */
    describe("GET /", () => {
        it("It should generate Hi World", (done) => {
            chai.request(server)
                .get ("/")
                .end ((err, res) => {
                    res.should.have.status (200);
                    done();
                })
        })
    })

    /*
        testing the GET api to return the user base present in 
        the database
    */

    describe("GET /api", () => {
        it ("It should return the list doctors and people", (done) => {
            chai.request (server)
                .get ("/api")
                .end ((err, res) => {
                    res.should.have.status(200);
                    if (err) {
                        console.log (err);
                    }
                    else {
                        console.log (res.body);
                    }
                    done();
                })
        })
    })
    /*
        testing the post api 
        to post a new doctor
    */
    describe ("POST /register", () => {
        it ("it should post a new doctor", async () => {
            const doctor = {
                name : "Debargha",
                number : "12345",
                email : "debargham14@gmail.com",
                desc : "Physician",
                password : "1234"
            }
            const res = await chai.request (server)
            .post ('/register')
            .set ('content-type', 'applicatio/json')
            .send (doctor)
        })
    })
})