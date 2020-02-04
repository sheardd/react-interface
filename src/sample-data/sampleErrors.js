const sampleErrors = {
  index: ["1", "2", "3", "4"],
  1: {
    "message": "It is probable that either the internet is down or the website's server is. Check the interface is still connected to the network, that the network still has internet, and that you can log into the Website's Admin Area.",
    "code": "Non-Specific Error"
  },
  2: {
    "message": "There was a problem updating the order. Please try again. If the problem persists, please refresh the interface page and then try again, or access the order directly through the shopify dashboard.",
    "code": "Non-Specific Error"
  },
  3: {
      index: ["1", "2"],
      1: {
        "id": "4097423245417",
        "collection": "dips",
        "title": "Garlic Aioli",
        "error": {
          "code": 406,
          "message": "Not Acceptable"
        }
       },
       2: {
        "id": "4097423245419",
        "collection": "dips",
        "title": "Garlic Aioli",
        "error": {
          "code": 406,
          "message": "Not Acceptable"
        }
       },
    },
  4: {
    "message": "No products retrieved. Either none exist or your Shopify API credentials are invalid. Please check them credentials and try again.",
    "code": "No Products"
  }
};

export default sampleErrors;