import { Client } from "../../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";

import resolver from "../../sm-resolver.js";
import Layout from "../../components/Layout";
import useUpdatePreviewRef from "../../tools/useUpdatePreviewRef"; //import from where you store this file

import { useEffect } from "react";
import Custom404 from "../404";

import { getInitialLocale } from "../../tools/getInitialLocale";

import { useRouter } from "next/router";
import Loader from "../../components/Loader/Loader.js";

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
    pageToolbarDocs(props.uid, props.previewData.ref, props.lang),
    [props]
  );
  // if(!router.isPreview){
  //   React.useEffect(() => {
  //     if(router.query.lang!=getInitialLocale(false)){
  //       router.replace('/[lang]/[uid]', `/${getInitialLocale(false)}/${router.query.uid}`)
  //     }
  //   })
  // }
  return (
    <Layout
      menu={props.menu}
      footer={props.footer}
      categories={props.categories}
      lang={props.lang}
      altLangs={props.alternate_languages}
    >
      <SliceZone {...props} resolver={resolver} />
    </Layout>
  );
};

export async function getStaticProps(context) {
  const regex = new RegExp("^[a-z]{2}-[a-z]{2}$");
  if (!regex.test(context.params.lang)) {
    return {
      notFound: true,
    };
  }
  const previewRef = context.preview ? context.previewData.ref : null;
  const document = await Client().getByUID("page", context.params.uid, {
    lang: context.params.lang,
    ref: previewRef,
  });
  if (!document) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...document,
      previewData: context.previewData || {},
      preview: context.preview || {},
      slices: document.data.slices,
    }, // will be passed to the page component as props
  };
}

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "page",
  getStaticPathsParams: {
    fallback: false,
  },
  formatPath: (prismicDocument) => {
    return {
      params: {
        uid: prismicDocument.uid,
        lang: prismicDocument.lang,
      },
    };
  },
});

const useUpdateToolbarDocs = (docQuery, deps) => {
  useEffect(() => {
    docQuery();
  }, deps);
};

const pageToolbarDocs = (uid, ref = null, lang = null) => async () => {
  const pageDocsPromise = getPageDocs(uid, ref, lang);
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

const getPageDocs = asyncHandler(async (uid, ref = null, lang = null) => {
  const page =
    (await getDocumentByUID("page", uid, {
      ref,
      fetch: "page.slices",
      lang,
    })) || null; //, fetch: 'page.uid'

  return { page };
});

const getDocumentByUID = asyncHandler(async (type, uid, options = {}) =>
  Client().getByUID(type, uid, options)
);

export default Page;
