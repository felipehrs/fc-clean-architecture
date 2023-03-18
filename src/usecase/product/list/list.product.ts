import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductsDTO, InputListProductsDTO } from "./list.product.dto";

export default class ListProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface){
        this.repository = repository;
    }

    public async execute(input: InputListProductsDTO): Promise<OutputListProductsDTO> {
        const product_entities= await this.repository.findAll();
        return {
            products: product_entities.map(p => {return {
                id: p.id, 
                name: p.name, 
                price: p.price 
            }})
        }
    }

}