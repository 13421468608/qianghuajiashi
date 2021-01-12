// 一级菜单
export interface FeatureList {
    icon: any;
    title: string;
    id: string;
    path: string;
}

// 二级菜单
export interface MenuData {
    id: string;
    title: string
}

// 商品类型
export interface GoodType {
	id: string
	typeName: string
    goodSpecs: string
    created_at: string
    updated_at: string
}

export interface GoodTypeFrom {
    typeName: string
    goodSpecs: string[]
}

// 规格
export interface GoodSpecs {
	id: string
	specsName: string
    created_at: string
    updated_at: string
}

export interface GoodSpecsFrom {
    specsName: string
}

// 厂家
export interface Factory {
    id: string
    factoryName: string
    factoryPhone: string
    position: string
    createdAt: string
    updatedAt: string
}

export interface FactoryFrom {
    factoryName: string
    factoryPhone: string
    position: string
}

// 商品
export interface Good {
    id: number
    goodName: string
    goodTypeId: number
    goodType: GoodType
    goodSpecsId: number
    goodSpecs: GoodSpecs
    factoryId: number
    factory: Factory
    price: string
    buyingPrice: string
    explain: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface GoodFrom {
    goodName: string
	goodTypeId: number
	goodSpecsId: number
	factoryId: number
	price: string
	buyingPrice: string
	explain: string
	image: string
}