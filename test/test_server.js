var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Query', function() {
	it('should return domain query result on /domains POST' , function( done ){
		this.timeout(10000);
		chai.request( server )
		.post('/domains')
		.send({'domains' : 'google.com,google.cn,google.中国'})
		.end( function( err , res ){
			res.should.have.status( 200 );
			res.should.be.json;
			res.body.status.should.equal( "success" );
   			res.body.data.should.be.a('array');
			done( );
		});
	});
});