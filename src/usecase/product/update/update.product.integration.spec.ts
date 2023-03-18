
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product";


describe("Integration Test update product use case", () => {
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
    
    it("should update a product", async () => {
        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("123", "Product", 25)
        ))

        const input: InputUpdateProductDTO = {
            id: "123",
            name: "Test",
            price: 20
        }

        const output: OutputUpdateProductDTO = {
            id: "123",
            name: "Test",
            price: 20
        }

        const result = await new UpdateProductUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });

    it("should throw error when product name is invalid", async () => {
        let input: InputUpdateProductDTO = {
            id: "123",
            name: "",
            price:100
        }

        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("123", "Product", 20)
        ))
        expect(async () => {await new UpdateProductUseCase(repository).execute(input)}).rejects.toThrow("Name is required");
    });

    it("should throw error when product price is invalid", async () => {
        let input: InputUpdateProductDTO = {
            id: "123",
            name: "Test",
            price:-100
        }
        const repository = new ProductRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(
            new Product("123", "Product", 20)
        ))
        expect(async () => {await new UpdateProductUseCase(repository).execute(input)}).rejects.toThrow("Price must be greater than zero");
    });
});