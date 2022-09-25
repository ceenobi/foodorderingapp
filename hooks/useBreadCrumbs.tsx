import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type Data = {
  name: string
  href: string
  page: string
}

export default function useBreadcrumbs() {
  const handleBreadCrumbs = ({ href, name, page }: Data) => {
    return (
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem>
          <NextLink href='/' passHref>
            <BreadcrumbLink as={Link}>Home</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {href && name ? (
          <BreadcrumbItem>
            <NextLink href={href} passHref>
              <BreadcrumbLink as={Link}>{name}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ) : null}
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{page}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
  }
  return [handleBreadCrumbs]
}
