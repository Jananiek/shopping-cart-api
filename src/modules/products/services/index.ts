import { ProductRepository } from '../repositories';
import { HTTP404Error } from '../../../middleware/errorManager/errorHandle/customErrors';
import { IResponseListResult } from '../../../interfaces/IResponseListResult';
import { Product } from '../../../typeorm/entities/Product';
import { IProductFilterOptions } from '../interfaces/IProductFilterOptions';
import { removeNullOrUndefinedValues } from '../../../utils/helper';
import { IPagination } from '../../../interfaces/IPagination';
import { IProductRating } from '../interfaces/IProductRating';
import { UserProductRating } from '../../../typeorm/entities/UserProductRating';

export class ProductService {
    protected productRepo: ProductRepository;
    constructor() {
        this.productRepo = new ProductRepository();
    }
    /**
     * @desc prepare object with filter attributes
     * @param {Record<string, string>} data
     * @param {string} [data.productCode]
     * @param {string} [data.productName]
     * @param {number} [data.page]
     * @param {number} [data.pageSize]
     * @returns {IProductFilterOptions}
     */
    public getProductFilterOptions(data: Record<string, string>): IProductFilterOptions {
        const filterOptions: IProductFilterOptions = {
            productCode: data.productCode,
            productName: data.productName,
            page: data.page ? Number(data.page) : 1,
            pageSize: data.pageSize ? Number(data.pageSize) : 10
        };
        return filterOptions;
    }

    /**
     * @desc Get all products with pagination
     * @param {Record<string, any>} query 
     * @returns {IResponseListResult<Product>}
     */
    public async getAll(query: Record<string, any>): Promise<IResponseListResult<Product>> {
        try {
            const filterOptions = this.getProductFilterOptions(query);
            const filteredOptions = removeNullOrUndefinedValues(filterOptions);
            const { page, pageSize, list, total } = await this.productRepo.getAll(filteredOptions);
            const paginationInfo: IPagination = {
                pages: Math.ceil(total / pageSize),
                pageSize,
                items: total,
                currentPage: page,
            };
            return {
                items: list,
                pagination: paginationInfo,
            };
        } catch (e) {
            throw new HTTP404Error(e.message);
        }
    }

    /**
     * @desc Create product
     * @param {Product} product input product object
     * @returns {Product}
     */
    public async createOne(product: Product): Promise<Product> {
        return await this.productRepo.createOne(product)
    }

    /**
     * @desc Add rating for a specific product by product id
     * @param {IProductRating} productRating
     * @param {number} [productRating.productId]
     * @param {number} [productRating.userId]
     * @param {number} [productRating.userRating]
     * @returns {UserProductRating}
     */
    public async addProductRating(productRating: IProductRating): Promise<UserProductRating> {
        return await this.productRepo.addProductRating(productRating)
    }

}
