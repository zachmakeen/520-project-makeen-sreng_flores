# 520-Project-Makeen-Sreng_Flores
Name: Zacharie Makeen

Id: 1938801

Name: Juan-Carlos Sreng-Flores

Id: 1533920


Resource data set: 

https://www.kaggle.com/nasa/meteorite-landings

## Configuration 

### MinZoom value.

The configuration of the minimum zoom in the `config.js` file is at a value of `5` since for any lower zoom values the rendering would take too long to load due to the size of the data set.

If you wish to see more of the map for evaluation you may need to change the value of minZoom in the `config.js` file within the `client/src/utils/config.js` path.

### Server Response Format 

The server response format for the rectangle/bounds query only returns the following:
```json
{
    _id: "id"
    geo:
    {
        coordinates: [long, lat]
    }
}
```
Since the data set contains information about the meteorite landings, it is not necessary to query all the information for the user when only one of the `<Popup>` elements will be displayed one at a time. For that reason, the server will query the `<Popup>` using the query by `_id` in order to make the overall performance of the website much better.

From this improvement, we can conclude a much better rendering of the `<Marker>` tags within the map.

### Reverse Coordinates In the Server Side 

The coordinates format in Mongo Db is defined with the Longitude before the Latitude. However, when using Leaflet, it is necessary to have the Latitude before the Longitude when creating a point in the map. In order to improve efficiency of the application, the server side reverses the coordinates for the client side in the response of the fetch. Since we can assumed that the server will most likely have a "better" processing power than the user browsing the app, it will be able to swap the coordinates much faster than the user. 

Plus, the server will cache the responses for future queries which will definitely improve performance in cases where multiple fetches are done on the same bounds.
