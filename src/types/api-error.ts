export class ApiError extends Error {
	constructor(
		message: string,
		public code: number | string,
		public raw: unknown,
	) {
		super(message);
		this.name = 'ApiError';
	}
}