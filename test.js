const {
    createReview,
    getAllReviews,
    getReviewsByUser,
    updateReview,
    deleteReview
} = require('./database');  // Asegúrate de que la ruta sea correcta

// Crear reseñas
function testCreateReviews() {
    console.log('Creando reseñas...');
    createReview('good', 'Excelente producto!', 1);  // Suponiendo que el user_id es 1
    createReview('neutral', 'Producto decente, pero mejorable.', 2);
    createReview('bad', 'No me gustó para nada.', 3);
    console.log('Reseñas creadas.');
}

// Leer todas las reseñas
function testGetAllReviews() {
    console.log('Obteniendo todas las reseñas...');
    const reviews = getAllReviews();
    console.log(reviews);
}

// Leer reseñas por un usuario específico
function testGetReviewsByUser() {
    console.log('Obteniendo reseñas de usuario con ID 1...');
    const reviews = getReviewsByUser(1);  // Cambia el user_id para probar otros usuarios
    console.log(reviews);
}

// Actualizar una reseña
function testUpdateReview() {
    console.log('Actualizando una reseña...');
    // Supongamos que queremos actualizar la reseña con ID 1
    updateReview(1, 'good', '¡Producto increíble! Lo recomiendo.');  // Cambia el ID de la reseña y el mensaje
    console.log('Reseña actualizada.');
}

// Eliminar una reseña
function testDeleteReview() {
    console.log('Eliminando una reseña...');
    deleteReview(2);  // Cambia el ID de la reseña que deseas eliminar
    console.log('Reseña eliminada.');
}

// Ejecutar las pruebas
function runTests() {
    testCreateReviews();
    testGetAllReviews();
    testGetReviewsByUser();
    testUpdateReview();
    testDeleteReview();
}

runTests();
