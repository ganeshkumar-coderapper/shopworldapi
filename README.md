# shopworldapi

sails application to provide api for shopworld onlinestore on shopify


## api endpoints
- to create/update products in external database using shopify webhook
- update quantity/cancel order 


### create product api
- registered with shopify create product webhook
- creates a new product in external database using the received product data json from shopify

```
POST /products/create
```

### update product api
- registered with shopify update product webhook
- updates product in external database using the received product data json from shopify
- creates product in external database if it doesn't exist yet 

```
POST /products/update
```

### cancel order
- cancel the order using the order_id

```
POST /order/cancel
```

### update order quantity
- updates first line item quantity by 3 using the order_id
- 

```
POST /order/updateqty
```


## file structure
```
├── controllers
│   ├── OrderController
│   └── ProductsController
│
├── models
│   └── Product
│
└── config
    ├── custom
    ├── datastore
    └── routes
```