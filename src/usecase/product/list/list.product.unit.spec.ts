import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product"

const Repository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn()
    }
}

describe("Unit Test list products use case", () => {

    it("should list all products", async () => {
        const product = new Product("456","Test",510);

        const other = new Product("123","Test2",50);

        const repository = Repository();
        repository.findAll = jest.fn().mockReturnValue([product, other]);
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
        const repository = Repository();
        repository.findAll = jest.fn().mockReturnValue([])
        const result = await new ListProductUseCase(repository).execute({});
        expect(result.products.length).toBe(0);
        expect(result.products).toEqual([]);
    });

});