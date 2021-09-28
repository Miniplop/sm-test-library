import { Client } from "../prismic-configuration";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import resolver from "../sm-resolver.js";
import Layout from "../components/Layout";
import useUpdatePreviewRef from '../tools/useUpdatePreviewRef' //import from where you store this file

const Page = (props) => {
  useUpdatePreviewRef(props.previewData, props.id)
  return (
    <Layout menu={props.menu} footer={props.footer} categories={props.categories}>
      <SliceZone {...props} resolver={resolver} />
    </Layout>
  );
};
// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  type: 'home-page', 
  queryType: 'single',
});

export default Page;
