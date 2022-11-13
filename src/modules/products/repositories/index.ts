import { getRepository } from "typeorm";
import { IListResult } from "../../../interfaces/IListResult";
import { Product } from "../../../typeorm/entities/Product";
import { UserProductRating } from "../../../typeorm/entities/UserProductRating";
import { IProductFilterOptions } from "../interfaces/IProductFilterOptions";
import { IProductRating } from "../interfaces/IProductRating";

export class ProductRepository {
    async createOne(product: Product): Promise<Product> {
        const productRepository = getRepository(Product);
        const productObject = productRepository.create(product);
        return productRepository.save(productObject);
    }
    async addProductRating(product: IProductRating): Promise<UserProductRating> {
        const productRatingRepository = getRepository(UserProductRating);
        const productRatingObject = productRatingRepository.create(product);
        return productRatingRepository.save(productRatingObject);
    }

    async getAll(filterOptions: IProductFilterOptions): Promise<IListResult<Product>> {
        const { page, pageSize, ...restOptions } = filterOptions;
        const [list, total] = await
            getRepository(Product)
            .findAndCount({
                where: { ...restOptions },
                order: { updatedAt: 'DESC' },
                take: pageSize,
                skip: (page - 1) * pageSize,
            });
        return {
            list,
            total,
            page,
            pageSize,
        };
    }
}