import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import {v4 as uuid} from "uuid";

export default class CreateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    public async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        let product = new Product(uuid(), input.name, input.price);
        await this.repository.create(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}