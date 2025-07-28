import React from 'react'

const PageHeader = ( {children} : {children : React.ReactNode} ) => {
  return <h1 className="w-full mx-auto text-4xl mb-4">{children}</h1>
}

export default PageHeader