import { getToken } from '#auth';

export default eventHandler(async event => {
	const token = await getToken({ event });

	if (!token) {
		throw createError({
			statusMessage:
				'You are not permitted to access this resource. Please authenticate over Oauth2 and try again.',
			statusCode: 403
		});
	}
});
