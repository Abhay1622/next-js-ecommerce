import React from 'react'
import PageHeader from './_components/PageHeader'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import db from '@/db/db'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './_components/ProductAction'

export default function AdminProductsPage() {
    return (
        <div className='mx-auto max-w-screen-xl w-full px-4 mt-2'>
            <div className='flex justify-between items-center gap-4'>
                <PageHeader>Products</PageHeader>
                <Button><Link href="/admin/products/new">Add Product</Link></Button>
            </div>
            <ProductsTable />
        </div>
    )
}

async function ProductsTable() {

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInRs: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
    })

    if (products.length === 0) return <p>No Products Found!</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailableForPurchase ? (
                                <>
                                    <CheckCircle2 />
                                </>
                            ) : (
                                <>
                                    <XCircle className='text-red-500' />
                                </>
                            )}
                        </TableCell>
                        <TableCell>
                            {product.name}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(product.priceInRs)}
                        </TableCell>
                        <TableCell>
                            {formatNumber(product._count.orders)}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className='sr-only'>Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                        Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
}
