import React from 'react'
import './Home.css'
import Product from './Product'


function Home() {
    return (
        <div className="Home">
            <div className="Home-container">
                <div
                    className="Home-banner"
                    style={{backgroundImage: "url(https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg)"}}>

                </div>

                <div className="Home-content">

                    <div className="Home-row">
                        <Product id="123456"
                                title="Oculus"
                                price={29.99}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Dash_Oculus_1x._SY304_CB667158353_.jpg"
                                rating={4} />
                        <Product id="123457"
                                title="AmazonBasics"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
                                rating={5} />
                    </div>
                    <div className="Home-row">
                        <Product id="123458"
                                title="Gaming accessories"
                                price={29.99}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg"
                                rating={4} />
                        <Product id="123459"
                                title="Beauty picks"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
                                rating={5} />
                        <Product id="123459"
                                title="Shop Laptops & Tablets"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
                                rating={5} />
                        <Product id="1234500"
                                title="Explore home bedding"
                                price={20.19}
                                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_HomeBedding_Single_Cat_1x._SY304_CB418596953_.jpg"
                                rating={5} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
