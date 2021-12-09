import React, { Fragment } from 'react'
import { RichText } from 'prismic-reactjs'

const MenuSimple = ({ tab, index }) => (
    <a key={index} href={tab.primary.link.url} className="text-base font-medium text-gray-500 hover:text-gray-900">
      {RichText.asText(tab.primary.title)}
    </a>
)

export default MenuSimple