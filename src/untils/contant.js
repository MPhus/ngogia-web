export const FUTURE_REACT_ROUTER_DOM = {
	v7_fetcherPersist: true,
	v7_normalizeFormMethod: true,
	v7_partialHydration: true,
	v7_relativeSplatPath: true,
	v7_skipActionErrorRevalidation: true,
	v7_startTransition: true,
}
let apiRoot = 'http://localhost:3000'
if (process.env.BUILD_MODE === 'dev') {
	apiRoot = 'http://localhost:3000'
}
if (process.env.BUILD_MODE === 'production') {
	apiRoot = 'https://ngogia-api.onrender.com'
}
export const API_CITY = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'


export const API_ROOT = apiRoot