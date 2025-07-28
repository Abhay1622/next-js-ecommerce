import Nav from "@/components/Nav";

export default function AdminLayout({children} : Readonly<{children: React.ReactNode}>){
    return(
        <>
        <Nav></Nav>
        {children}
        </>
    )
}