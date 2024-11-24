const noob_helper = (req, res, next) => {
    console.log(req.method, req.path);

    // Verifica si hay claves en req.query
    if (Object.keys(req.query).length > 0) {
        console.log("El usuario mandó datos a través de la query:");
        console.log("Query completa:", req.query);
        console.log("Claves:", Object.keys(req.query));
        console.log("Valores:", Object.values(req.query));
    }

    // Verifica si hay datos en req.body
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("El usuario mandó datos en el cuerpo de la request:");
        console.log("Body completo:", req.body);
        console.log("Claves:", Object.keys(req.body));
        console.log("Valores:", Object.values(req.body));
    }

    // Verifica si hay cookies en req.cookies
    if (req.cookies && Object.keys(req.cookies).length > 0) {
        console.log("El usuario mandó cookies:");
        console.log("Cookies completas:", req.cookies);
        console.log("Claves:", Object.keys(req.cookies));
        console.log("Valores:", Object.values(req.cookies));
    }

    // Verifica si hay encabezados en req.headers
    if (req.headers && Object.keys(req.headers).length > 0) {
        console.log("El usuario mandó los siguientes encabezados:");
        console.log("Headers completos:", req.headers);
        console.log("Claves:", Object.keys(req.headers));
        console.log("Valores:", Object.values(req.headers));
    }

    // Verifica si hay sesión disponible
    if (req.session && Object.keys(req.session).length > 0) {
        console.log("El usuario tiene datos en la sesión:");
        console.log("Sesión completa:", req.session);
        console.log("Claves:", Object.keys(req.session));
        console.log("Valores:", Object.values(req.session));
    }

    // Construye un resumen en lenguaje natural
    const summary = [];
    if (req.headers && Object.keys(req.headers).length > 0) {
        summary.push(`Enviaste los siguientes encabezados: ${JSON.stringify(req.headers)}`);
    if (Object.keys(req.query).length > 0) {
        summary.push(`Enviaste datos en la query: ${JSON.stringify(req.query)}`);
    }
    if (req.body && Object.keys(req.body).length > 0) {
        summary.push(`Enviaste datos en el cuerpo: ${JSON.stringify(req.body)}`);
    }
    if (req.cookies && Object.keys(req.cookies).length > 0) {
        summary.push(`Enviaste cookies: ${JSON.stringify(req.cookies)}`);
    }
    }
    if (req.session && Object.keys(req.session).length > 0) {
        summary.push(`Tu sesión contiene: ${JSON.stringify(req.session)}`);
    }

    // Imprime el resumen
    console.log("#####################");
    console.log("Resumen:");
    summary.forEach((e)=>{
        console.log(e)
    })

    next();
};

module.exports = noob_helper