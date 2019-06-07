var ObjectID = require('bson-objectid');

module.exports = {
  "localhost:27017": {
    "databases": {
      "dropproject": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": []
          }
        ]
      },
      "undefined": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "urlJobs"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "undefined.urlJobs",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "urlJobs",
            "documents": [
              {
                "a": 1,
                "_id": {
                  "id": "\\úÖM\u0004 Üo\u000fú"
                }
              },
              {
                "a": 2,
                "_id": {
                  "id": "\\úÖM\u0004 Üo\u000fû"
                },
                "b": 1
              }
            ]
          }
        ]
      }
    }
  }
}