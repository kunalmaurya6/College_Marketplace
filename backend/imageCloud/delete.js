import cloudinary from "../imageCloud/cloudinary.js";

const deleteProduct=async (product) => {
    const publicIds = product.image.map(img => img.image_key);

    if (publicIds.length > 0) {
        await Promise.all(
            publicIds.map(id => cloudinary.uploader.destroy(id))
        );
    }
}
export default deleteProduct;