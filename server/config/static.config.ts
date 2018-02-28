const dev: boolean = process.env.NODE_ENV === 'development';

const config = Object.freeze({
	etag: false,
	fallthrough: false,
	lastModified: false,
	maxAge: dev ? 0 : process.env.CACHE_DURATION_STATIC
});

export default config;
