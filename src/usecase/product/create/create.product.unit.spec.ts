import IProductRepository from "../../../domain/product/repository/product-repository.interface";

const Repository = (): IProductRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for create product", () => {
    it("should create a product", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository);
        
        const input: InputCreateProductDTO = {
            name: "Product 1",
            price: 10,
        }

        const output: OutputCreateProductDTO = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is empty", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository);
        
        const input: InputCreateProductDTO = {
            name: "",
            price: 10,
        }

        expect(async () => await usecase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price is invalid", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository);
        
        const input: InputCreateProductDTO = {
            name: "Product 1",
            price: -10,
        }

        expect(async () => await usecase.execute(input)).rejects.toThrowError("Price must be greater than zero");
    });
});