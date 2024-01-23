function ResponseTemplate(data, message, error, status) {
	return {
		data,
		message,
		error,
		status,
	};
}

function ResGet(
	status,
	message,
	error,
	current_page,
	total_page,
	total_data,
	data,
) {
	return {
		status,
		message,
		error,
		current_page,
		total_page,
		total_data,
		data,
	};
}

module.exports = {
	ResponseTemplate,
	ResGet
};
