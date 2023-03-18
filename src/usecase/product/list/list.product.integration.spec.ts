import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"

describe("Integration Test list products use case", () => {
    let sequelize: Sequelize; 
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("should list all products", async () => {
        const product = new Product("222","Some...",510);

        const other = new Product("111","Other...",50);

        const repository = new ProductRepository();
        await repository.create(product);
        await repository.create(other);

        const result = await new ListProductUseCase(repository).execute({});
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].price).toBe(product.price);
        expect(result.products[1].id).toBe(other.id);
        expect(result.products[1].name).toBe(other.name);
        expect(result.products[1].price).toBe(other.price);
    });

    it("should return empty list", async () => {
        const repository = new ProductRepository();
        const result = await new ListProductUseCase(repository).execute({});
        expect(result.products.length).toBe(0);
        expect(result.products).toEqual([]);
    });

});