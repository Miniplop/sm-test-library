import { Client } from "../../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";
import LayoutMarketing from "../../components/LayoutMarketing";
import BlogLayout from "../../components/BlogLayout";
import useUpdatePreviewRef from "../../tools/useUpdatePreviewRef"; //import from where you store this file
import { useEffect } from "react";
import Custom404 from "../404";

import resolver from "../../sm-resolver.js";

import { useRouter } from "next/router";
import Loader from "./../../components/Loader/Loader.js";

const BlogPage = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  if (!props.id) {
    return <Custom404 />;
  }
  useUpdatePreviewRef(props.previewData.ref, props.id);
  useUpdateToolbarDocs(blogPageToolbarDocs(props.uid, props.previewData.ref), [
    props,
  ]);
  return (
    <LayoutMarketing
      menuMarketing={props.menuMarketing}
      footerMarketing={props.footerMarketing}
      categories={props.categories}
    >
      <BlogLayout children={props.children} data={props.data}>
        <SliceZone {...props} resolver={resolver} />
      </BlogLayout>
    </LayoutMarketing>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "repeat",
  type: "blog-page",
  apiParams({ params }) {
    return {
      uid: params.uid,
    };
  },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "blog-page",
  getStaticPathsParams: {
    fallback: false,
  },
  formatPath: (prismicDocument) => {
    return {
      params: {
        uid: prismicDocument.uid,
      },
    };
  },
});

const useUpdateToolbarDocs = (docQuery, deps) => {
  useEffect(() => {
    docQuery();
  }, deps);
};

const blogPageToolbarDocs = (uid, ref = null) => async () => {
  const pageDocsPromise = getBlogPageDocs(uid, ref);
  //const layoutPromise = getLayout(ref, { fetch: 'layout.prismic_display_name' })
  //const prismicDocs = await Promise.all([pageDocsPromise, layoutPromise])
  const prismicDocs = await Promise.all([pageDocsPromise]);
  const [{ page }] = prismicDocs;

  return {
    page,
  };
};

const asyncHandler = (cb) => async (...args) => {
  try {
    return await cb(...args);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBlogPageDocs = asyncHandler(async (uid, ref = null) => {
  const page =
    (await getDocumentByUID("blog-page", uid, { ref, fetch: "page.slices" })) ||
    null; //, fetch: 'page.uid'

  return { page };
});

const getDocumentByUID = asyncHandler(async (type, uid, options = {}) =>
  Client().getByUID(type, uid, options)
);

export default BlogPage;
