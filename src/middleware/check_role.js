const { ErrorHandler } = require('../utils/error-handler');

module.exports = (roles) => async (req, res, next) => {
	try {
		const { role } = req.user;

		const roleMatch = roles.includes(role);

		if (!roleMatch) {
			return next(new ErrorHandler(401));
		}
	} catch (err) {
		return next(new ErrorHandler(401));
	}

	return next();
};
