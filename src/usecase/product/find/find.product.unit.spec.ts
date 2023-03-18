import Product from "../../../domain/product/entity/product";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for find product", () => {
    it("should find a product", async () => {
        const repository = MockRepository();

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