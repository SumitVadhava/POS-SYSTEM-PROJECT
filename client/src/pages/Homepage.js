import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { Col, Row } from 'antd';
import axios from 'axios';
import ItemList from '../components/ItemList';

const Homepage = () => {
    const [itemsData, setItemsData] = useState([])

    //use effect
    useEffect(() => {
        const getAllItems = async () => {
            try {

                const { data } = await axios.get('/items/get-item');
                setItemsData(data);

            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
        }
        getAllItems();
    }, []);

    return (
        <DefaultLayout>
            <Row>
                {
                    itemsData.map((item) => (
                        <Col xs={24} lg={6} md={12} sm={6}>
                            <ItemList item={item} />
                        </Col>
                    ))
                }
            </Row>
        </DefaultLayout>
    )
}

export default Homepage;