import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../../prismic-configuration'

const ContentSectionCentered = ({ slice }) => (
  <section className="relative mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
    {
      slice.primary.description ?
      <RichText render={slice.primary.description} linkResolver={linkResolver}/>
      : <p>start by editing this slice from inside Prismic builder!</p>
    }
  </section>
)

export default ContentSectionCentered