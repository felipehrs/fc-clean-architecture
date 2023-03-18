import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export class UpdateProductUseCase {
    private repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this.repository = repository;
    }

    public async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO>{
        const product = await this.repository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.repository.update(product); 
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}