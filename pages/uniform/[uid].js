import { Client } from "../../prismic-configuration";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";
import Layout from "../../components/Layout";
import SliceZone from "next-slicezone";

import resolver from "../../sm-resolver.js";
import UniformSliceZone from "../../components/UniformSliceZone";
import useUpdatePreviewRef from "../../tools/useUpdatePreviewRef"; //import from where you store this file

import { useEffect } from "react";
import Custom404 from "../404";

import { useRouter } from "next/router";
import Loader from "./../../components/Loader/Loader.js";

const Page = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  if (!props.id) {
    return <Custom404 />;
  }
  useUpdatePreviewRef(props.previewData.ref, props.id);
  useUpdateToolbarDocs(
    uniformPageToolbarDocs(props.uid, props.previewData.ref),
    [props]
  );
  return (
    <Layout
      menu={props.menu}
      footer={props.footer}
      categories={props.categories}
      lang={props.lang}
      altLangs={props.alternate_languages}
    >
      <UniformSliceZone {...props} resolver={resolver} />
    </Layout>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: "uniform-page",
  queryType: "repeat",
  apiParams({ params }) {
    return {
      uid: params.uid,
    };
  },
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "uniform-page",
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

const uniformPageToolbarDocs = (uid, ref = null) => async () => {
  const pageDocsPromise = getUniformPageDocs(uid, ref);
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

const getUniformPageDocs = asyncHandler(async (uid, ref = null) => {
  const page =
    (await getDocumentByUID("uniform-page", uid, {
      ref,
      fetch: "page.slices",
    })) || null; //, fetch: 'page.uid'

  return { page };
});

const getDocumentByUID = asyncHandler(async (type, uid, options = {}) =>
  Client().getByUID(type, uid, options)
);

export default Page;
