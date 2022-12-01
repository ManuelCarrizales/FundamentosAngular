export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
export interface CreateProductDTO extends Omit<Product2, 'id' | 'category'>{
    categoryId: number,
}
export interface Product2{
    id: string,
    title: string,
    price: number,
    images: string[],
    description: string,
    category: Category,
    taxes?:number,
}

export interface Category{
    id: string,
    name: string,
}