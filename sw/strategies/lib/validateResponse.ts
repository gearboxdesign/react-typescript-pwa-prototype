export default function validateResponse(response?: Response): Response {

	if (!response) {
		throw new Error('Response is undefined');
	}

	if (response.status >= 200 && response.status < 300 || response.status === 0) {
		return response;
	}

	throw new Error(response.statusText);
}
