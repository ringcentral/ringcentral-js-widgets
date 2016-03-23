var services = {};
function register(name, service) {
    services[name] = service;
}
function getServices() {
    return services;
}
export {
    register,
    getServices
};
