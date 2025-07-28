import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import React from 'react'

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaid: true },
        _count: true,
    })

    return {
        amount: data._sum.pricePaid || 0,
        numberOfSales: data._count || 0
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all(
        [
            db.user.count(),
            db.order.aggregate({
                _sum: { pricePaid: true },
            })
        ]
    )

    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaid || 0) / userCount / 100,
    }
}

async function getProductData() {

    const [activeCount, inActiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } })
    ])

    return {
        activeCount,
        inActiveCount
    }

}

export default async function AdminDashboard() {

    const [salesData, UserData , ProductData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            <DashboardCard title='sales'
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
            />

            <DashboardCard title='Customers'
                subtitle={`${formatCurrency(UserData.averageValuePerUser)} Average Value Per User`}
                body={formatNumber(UserData.userCount)}
            />

            <DashboardCard title='Active Products'
                subtitle={`${formatNumber(ProductData.inActiveCount)} Inactive Products`}
                body={formatNumber(ProductData.activeCount)}
            />

            {/* here formatCurrency only put , between which is the default for USD, if you want to change it you can change the formatters.ts file */}
        </div>
    )
}

type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}
