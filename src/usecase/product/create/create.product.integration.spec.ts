import { Sequelize } from "sequelize-typescript";
import { date } from "yup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

const input: InputCreateProductDTO = {
    name: "Product 1",
    price: 10,
}

describe("Integration test for create product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true }
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const output : OutputCreateProductDTO = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is empty", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDTO = {
            name: "",
            price: 10,
        }

        expect(async () => await usecase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price is invalid", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDTO = {
            name: "Product 1",
            price: -10,
        }

        expect(async () => await usecase.execute(input)).rejects.toThrowError("Price must be greater than zero");
    });

});