var services = {};
function register(name, service) {
    console.log(name);
    services[name] = service;
}
function getService() {
    return services;
}
export {
    register,
    getService
};
