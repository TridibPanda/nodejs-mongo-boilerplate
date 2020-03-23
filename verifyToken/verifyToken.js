var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
	const token = req.header('token');
	if(!token) return res.status(401).send('Acess Denied');

	try{
		const verified = jwt.verify(token,'privateKey');
		req.user = verified;
		next();
	} catch(err){
		res.status(400).send('Invalid Token');
	}
}