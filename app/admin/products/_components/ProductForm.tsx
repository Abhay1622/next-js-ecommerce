'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { useActionState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product }: { product?: Product | null }) {
    const [priceInRs, setpriceInRs] = useState<number | undefined>(product?.priceInRs)
    const [error, action] = useActionState(
        product == null ? addProduct : updateProduct.bind(null, product.id), 
        {}
    )

    return (
        <form action={action} className="space-y-8 mx-auto max-w-screen-xl w-full px-4 mt-5">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    defaultValue={product?.name || ""}
                />
                {error?.name && (
                    <div className="text-red-500 text-sm">{error.name.join(", ")}</div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceInRs">Price In Rs</Label>
                <Input
                    type="text"
                    id="priceInRs"
                    name="priceInRs"
                    required
                    value={priceInRs}
                    onChange={e => setpriceInRs(Number(e.target.value) || undefined)}
                />
                <div className="text-muted-foreground">
                    {formatCurrency((priceInRs || 0))}
                </div>
                {error?.priceInRs && (
                    <div className="text-red-500 text-sm">{error.priceInRs.join(", ")}</div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    defaultValue={product?.description}
                />
                {error?.description && (
                    <div className="text-red-500 text-sm">{error.description.join(", ")}</div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input 
                    type="file" 
                    id="file" 
                    name="file" 
                    required={product == null} 
                />
                {product != null && <div>{product.filePath}</div>}
                {error?.file && (
                    <div className="text-red-500 text-sm">{error.file.join(", ")}</div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input 
                    type="file" 
                    id="image" 
                    name="image" 
                    required={product == null}
                />
                {product != null && 
                    <Image 
                        src={product.imagePath}
                        className="h-[400px] w-[400px] object-cover rounded-lg"
                        height={400}
                        width={400}
                        alt="Product Image"
                    />
                }
                {error?.image && (
                    <div className="text-red-500 text-sm">{error.image.join(", ")}</div>
                )}
            </div>

            {error?._form && (
                <div className="text-red-500 text-sm">{error._form.join(", ")}</div>
            )}

            <Button type="submit">Save</Button>
        </form>
    )
}