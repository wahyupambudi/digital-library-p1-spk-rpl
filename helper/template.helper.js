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

function setPayloadDate(property, date) {
	if (date !== undefined) {
		return date + "T00:00:00.000Z";
	}
	return undefined;
}

module.exports = {
	ResponseTemplate,
	ResGet,
	setPayloadDate
};
