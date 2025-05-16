export const createCourse = (req, res) => {
    const { title, description, price } = req.body;
    console.log(title, description, price);
}