// Simulate API call slowness.
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));