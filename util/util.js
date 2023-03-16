const Delay = (ms) => new Promise(res => setTimeout(res, ms));
const curName = GetCurrentResourceName();