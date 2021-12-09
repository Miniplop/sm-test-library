import React from 'react'
import { Link, RichText } from 'prismic-reactjs'
import {linkResolver} from '../../../prismic-configuration'

const PromoSectionWithBackgroundImage = ({ slice }) => (
  <section>
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={slice.primary.image.url}
              alt={slice.primary.image.alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block sm:inline"><RichText render={slice.primary.title} /></span>
              </h2>
              <div className="mt-3 text-xl text-white">
                <RichText render={slice.primary.description} />
              </div>
              <a
                href={Link.url(slice.primary.link,linkResolver)}
                className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                <span >{ slice.primary.linkLabel }</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default PromoSectionWithBackgroundImage