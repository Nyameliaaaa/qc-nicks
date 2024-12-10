import { getServerSession } from '#auth';

export default eventHandler(async event => {
	const session = await getServerSession(event);

	if (!session) {
		throw createError({
			statusMessage:
				'You are not permitted to access this resource. Please authenticate over Oauth2 and try again.',
			statusCode: 403
		});
	}
});
