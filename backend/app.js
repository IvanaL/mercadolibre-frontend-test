var express = require('express');
var app = express();
var cors = require('cors');
const axios = require('axios');
const apiInstance = axios.create({
  baseURL: 'https://api.mercadolibre.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
const port = process.env.PORT || 5000;
app.use(cors());

getAuthor = () => {
  return {
    name: 'Ivana',
    lastname: 'Leikin'
  };
}

getItems = (aData) => {
  let arrData;

  return aData.map((item) => {
    arrData = {
      id: item.id,
      title: item.title,
      price: {
        amount: item.price,
        currency: item.currency_id,
        decimal: getDecimal(item.price)
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    };

    return arrData;
  }) 
}

getItem = (itemId, itemDescription, category) => {

  let itemData = {
      id: itemId.id,
      title: itemId.title,
      price: {
        amount: itemId.price,
        currency: itemId.currency_id,
        decimal: itemId.decimal
      },
      picture: itemId.pictures[0].url,
      condition: itemId.condition,
      free_shipping: itemId.shipping.free_shipping,
      sold_quantity: itemId.sold_quantity,
      description: itemDescription.plain_text,
      category: {
        name: category
      }
    };

    return itemData; 
}

getBreadcrumb = (dataCategories) => {
  const categories = dataCategories.find(filter => filter.id === 'category');
  let result = categories.values.reduce(function (prev, current) {
    return (prev.results > current.results) ? prev : current
  });
  
  return result; 
}

getDecimal = (price) => {
  const decimal = price.toString().split('.')[1];
  const d = Number(decimal).toFixed(2);
  return Number(d);
}

formatResponseSearch = (response) => {
  const formattedResponse = {};
  
  formattedResponse.author = getAuthor();
  formattedResponse.items = getItems(response.results);

  // Se evalua si el array de filters esta vacío, de ser así toma el array de available_filters
  if(Array.isArray(response.results) && (response.results).length ) {
    if(response.filters.find(filter => filter.id === 'category')){
      formattedResponse.categories = getBreadcrumb(response.filters);
    } else{
      formattedResponse.categories = getBreadcrumb(response.available_filters);
    }
  } 
  
  return formattedResponse;
}

formatResponseId = (itemId, itemDescription, category) => {
  const formattedResponse = {};

  formattedResponse.author = getAuthor();
  formattedResponse.item = getItem(itemId, itemDescription, category);

  return formattedResponse;
}

app.all('/api/items', async(request, res, next) => {
  try {
    let query =  encodeURI(request.query.q);
    // Request a todos los items que coincidan con la búsqueda
    apiInstance.get(`/sites/MLA/search?q=${query}&limit=4`)
      .then(function(response) {

        res.json(formatResponseSearch(response.data));

      })
      .catch(err => res.send(err))
  } catch (err) {
    next(err);
  } 
});

app.all(`/api/items/:id`, async(request, res, next) => {
  try {
    let id = request.params.id;
    // Request al id del item
    apiInstance.get(`/items/${id}`)
      .then(function(response) {
        //Request a la descripción de ese item
        apiInstance.get(`/items/${id}/description`)
        .then(function(response2) {
          // Request a la categoría de ese item
          apiInstance.get(`/categories/${response.data.category_id}`)
          .then(function(response3) {
            res.json(formatResponseId(response.data, response2.data, response3.data.name));
          })
          .catch(err => res.send(err))

        })
        .catch(err => res.send(err))

      })
      .catch(err => res.send(err))

    } catch (err) {
    next(err);
  } 
});

app.listen(port, () => console.log(`Listening on port ${port}`));