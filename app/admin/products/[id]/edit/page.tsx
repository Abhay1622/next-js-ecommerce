import React from 'react'
import { ProductForm } from '../../_components/ProductForm'
import PageHeader from '../../_components/PageHeader'
import db from '@/db/db'

export default async function EditProductPage({
    params: { id }, }: { params: { id: string } }) {

    const product = await db.product.findUnique({ where: { id } })

    return (

        <div>
            <div className='mx-auto max-w-screen-xl w-full px-4 mt-2'>
                <PageHeader>Edit Products</PageHeader>
            </div>
            
            <ProductForm product={product} />
        </div>
    )
}