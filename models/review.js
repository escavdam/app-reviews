// model/reviews.js
const reviews = []; // This is a placeholder, you can replace it with a database if needed.

// Function to get all reviews
function getAllReviews() {
    return reviews;
}

// Function to add a new review
function addReview(rating, message) {
    const newReview = {
        rating,
        message,
        createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    return newReview;
}

module.exports = {
    getAllReviews,
    addReview
};
