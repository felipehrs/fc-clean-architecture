export class InputListProductsDTO {}

type Product = {
    id: string;
    name: string;
    price: number
}

export class OutputListProductsDTO {
    products: Product[];
}