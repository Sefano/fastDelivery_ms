import { Category, Product } from "./models/exports.js";

export default class ProductRepository {
  async addProduct(name, description, category, price, image) {
    try {
      const product = new Product({
        name,
        description,
        category,
        price,
        image,
      });

      const savedProduct = await product.save();

      await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            products: savedProduct._id,
          },
        }
      );

      return savedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async addCategory(name, description) {
    try {
      const category = new Category(name, description);
      const savedCategory = await category.save();
      return savedCategory;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategory(id) {
    try {
      const category = await Category.findById(id).populate("products");
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategories() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts(limit, skip) {
    try {
      const [products, total] = await Promise.all([
        Product.find().skip(skip).limit(limit),
        Product.countDocuments(),
      ]);
      // const products = await Product.find().skip(skip).limit(limit);
      // const total = await Product.countDocuments();

      console.log(total);
      return {
        data: products,
        meta: {
          total: total,
          totalPages: Math.ceil(total / limit),
        },
      };
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getFilteredProducts(categoryIds, limit, skip) {
    try {
      const [products, total] = await Promise.all([
        Product.find({
          category: { $in: categoryIds },
        })
          .skip(skip)
          .limit(limit),
        Product.countDocuments({
          category: { $in: categoryIds },
        }),
      ]);

      console.log(total);
      if (!products) {
        const products = [];

        return {
          data: products,
          meta: {
            total: total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }
      return {
        data: products,
        meta: {
          total: total,
          totalPages: Math.ceil(total / limit),
        },
      };
      // return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByName(search, limit, skip) {
    try {
      const [products, total] = await Promise.all([
        Product.find({
          $text: { $search: search },
        })
          .skip(skip)
          .limit(limit),
        Product.countDocuments({
          $text: { $search: search },
        }),
      ]);

      // const products = await Product.find({
      //   $text: { $search: search },
      // });
      console.log(products);
      if (!products) {
        const products = [];
        return {
          data: products,
          meta: {
            total: total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }
      return {
        data: products,
        meta: {
          total: total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
