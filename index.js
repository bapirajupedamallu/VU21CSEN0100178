const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const baseUrl = 'http://20.244.56.144/test/companies';

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQxOTc5LCJpYXQiOjE3MjQ3NDE2NzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImVhODBhN2YyLWQ5ZDctNGU1OC05Yzg4LTg5ZWUyYzY2MjA3YSIsInN1YiI6InJwZWRhbWFsQGdpdGFtLmluIn0sImNvbXBhbnlOYW1lIjoiR2l0YW0iLCJjbGllbnRJRCI6ImVhODBhN2YyLWQ5ZDctNGU1OC05Yzg4LTg5ZWUyYzY2MjA3YSIsImNsaWVudFNlY3JldCI6ImVURndHaW9XaGlLbFZkSmciLCJvd25lck5hbWUiOiJQZWRhbWFsbHUgUmFtYSBTcml2YXRzYSBCYXBpcmFqdSIsIm93bmVyRW1haWwiOiJycGVkYW1hbEBnaXRhbS5pbiIsInJvbGxObyI6IlZVMjFDU0VOMDEwMDE3OCJ9.Sk_3o-x2Pyu0VqBmTgcv2V6PNCSpLEhF3kXJ1inzSik";

// Helper function to fetch data from the test server
const fetchData = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        return null;
    }
};

// API to get top n products within a category and company
app.get('/categories/:categoryName/products', async (req, res) => {
    const { categoryName } = req.params;
    const { company = 'AMZ', top = 10, minPrice = 1, maxPrice = 10000 } = req.query;

    const url = `${baseUrl}/${company}/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const data = await fetchData(url);

    if (data) {
        res.json(data);
    } else {
        res.status(500).send('Error fetching data from the e-commerce API.');
    }
});

// API to get details of a specific product
app.get('/categories/:categoryName/products/:productId', async (req, res) => {
    const { categoryName, productId } = req.params;
    const { company = 'AMZ' } = req.query;

    const url = `${baseUrl}/${company}/categories/${categoryName}/products/${productId}`;
    const data = await fetchData(url);

    if (data) {
        res.json(data);
    } else {
        res.status(500).send('Error fetching product details.');
    }
});

app.listen(port, () => {
    console.log(`Top Products Microservice listening on port ${port}`);
});
