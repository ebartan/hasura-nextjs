import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import initializeApollo from '../lib/apollo'
import { gql} from '@apollo/client'
export default function Home(products) {
    console.log(products)
    return (
        <div className={styles.container}>
          <Head>
            <title>Productsa</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div>
              Products
          </div>
          </div>
          )
}


export async function getStaticProps(context) {
    const client = initializeApollo();

    const products = await client.query({
        query: gql` query fetchWorks {
                works {
                    id
                    name
                    description
                    created_at
                    updated_at
                  }
            }
        `
    })

    return {
        props: {
            products: products
        },  
    }

}