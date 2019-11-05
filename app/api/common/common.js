const config = require('../../config/config');
// module.exports = function generateOtp(options, callback){
// 		// console.log('inside');
// 		return (Math.floor(Math.random() * (config.app.OTPRange.high - config.app.OTPRange.low + 1) + config.app.OTPRange.low));
// 	}
exports.generateOtp = function () {
	// Validate request parameters, queries using express-validator
	
	return (Math.floor(Math.random() * (config.app.OTPRange.high - config.app.OTPRange.low + 1) + config.app.OTPRange.low));

	// var page = req.params.page ? req.params.page : 1;
	// var limit = req.params.limit ? req.params.limit : 10;
	// try {
	// 	var users = await UserService.getUsers({}, page, limit)
	// 	return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
	// } catch (e) {
	// 	return res.status(400).json({ status: 400, message: e.message });
	// }
}
// exports.data = helpers;