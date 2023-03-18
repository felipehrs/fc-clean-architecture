import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test for find product", () => {
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

    it("should find a product", async () => {
        const product = new Product("1","Product 1",10);

        const repository = new ProductRepository();

        repository.create(product);

        const input: InputFindProductDTO = {
            id: product.id
        }

        const output: OutputFindProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await new FindProductUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });
});