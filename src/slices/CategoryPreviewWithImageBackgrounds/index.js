import React from 'react'
import { RichText, Link } from 'prismic-reactjs'

const CategoryPreviewWithImageBackgrounds = ({ slice }) => (
  <section>
    <div class="bg-gray-50">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-baseline sm:justify-between">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-900"><RichText render={slice.primary.title} /></h2>
          <a href={Link.url(slice.primary.link)} class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"><span >{ slice.primary.linkLabel }</span><span aria-hidden="true"> &rarr;</span></a>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div class="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <img src={slice.primary.imageLeft.url} alt={slice.primary.imageLeft.alt} class="object-center object-cover group-hover:opacity-75"/>
            <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <div class="p-6 flex items-end">
              <div>
                <h3 class="font-semibold text-white">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                    <span >{ slice.primary.imageLeftTitle }</span>
                  </a>
                </h3>
                <p aria-hidden="true" class="mt-1 text-sm text-white">
                  <span >{ slice.primary.imageLeftCta }</span>
                </p>
              </div>
            </div>
          </div>
          <div class="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
            <img src={slice.primary.imageTopRight.url} alt={slice.primary.imageTopRight.alt} class="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"/>
            <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"></div>
            <div class="p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 class="font-semibold text-white">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                    <span >{ slice.primary.imageTopRightTitle }</span>
                  </a>
                </h3>
                <p aria-hidden="true" class="mt-1 text-sm text-white">
                  <span >{ slice.primary.imageTopRightCta }</span>
                </p>
              </div>
            </div>
          </div>
          <div class="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <img src={slice.primary.imageBottomRight.url} alt={slice.primary.imageBottomRight.alt} class="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"/>
            <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"></div>
            <div class="p-6 flex items-end sm:absolute sm:inset-0">
              <div>
                <h3 class="font-semibold text-white">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                    <span >{ slice.primary.imageBottomRightTitle }</span>
                  </a>
                </h3>
                <p aria-hidden="true" class="mt-1 text-sm text-white">
                  <span >{ slice.primary.imageBottomRightCta }</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 sm:hidden">
          <a href="#" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">Browse all categories<span aria-hidden="true"> &rarr;</span></a>
        </div>
      </div>
    </div>
  </section>
)

export default CategoryPreviewWithImageBackgrounds