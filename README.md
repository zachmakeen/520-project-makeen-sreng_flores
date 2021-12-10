# 520-Project-Makeen-Sreng_Flores
Name: Zacharie Makeen

Id: 1938801

Name: Juan-Carlos Sreng-Flores

Id: 1533920


Resource data set: 

https://www.kaggle.com/nasa/meteorite-landings

## Attributions

### Source data set

The dataset was taken from the nasa within the `Kaggle` website. The reference can be found under this paragraph:

https://www.kaggle.com/nasa/meteorite-landings

### Leafletm Map

The application runs with `React` leaflet api program with tons of usable componetns and functions. The reference to the 
leaflet can be found under this paragraph:

https://react-leaflet.js.org/

### MeteoriteMapMove Component

The source code for the `<MapMoveComponent/>` has been taken from Professor Jaya Nilakantan at Dawson College. 

## Configuration 

### MinZoom value.

The configuration of the minimum zoom in the `config.js` file is at a value of `5` since for any lower zoom values the rendering would take too long to load due to the size of the data set.

If you wish to see more of the map for evaluation you may need to change the value of minZoom in the `config.js` file within the `client/src/utils/config.js` path.

## Performance of Meteorite-Landings-520

### Introduction and Methodology

The meteorite landings application was tested with Google Chrome's developer tools. The browser version at the time of testing was Version 96.0.4664.93 (Official Build) (arm64). The tests were performed on a Macbook Pro 2021 with a viewport of 1440 by 900.

### Areas to Improve

#### Functionality

Solely from manual testing, we noticed that fetching would sometimes take a cosiderable amount of time to fetch a lot of data. For example, in Africa there is a part that has 6000+ objects, which made the website inoperative for a few seconds. However, other regions with less data would perform a lot better.

#### Network Test

##### No Throttling

The network activity without throttling showed that rendering each chunk of land generally took around 50 ms on average with very little variance. In addition, the fetch requests vary in time depending on the size of the json that is returned. For example, a 54.6 kB package will take 981 ms whereas a 24.1 kB package will take 134 ms.

##### Slow 3G

The network activity with slow 3g as throttling drastically changed the results. Chunks of land could take up to 10 seconds to download. In fact, some of the fetch requests would download before the pngs were downloaded.

##### Performance Test

The recording taken from the performance tab, simulated a user moving around to different areas of the map. Obviously, the parts of the map that contained more data took much longer to render than those with less data. This caused a clear visual drop in frames. The performance profile showed that the frames would stay around 60 fps until the user stops moving the map in which case the application would need to perform a fetch and redner the points. During that time the user is unable to interact with the page until the tasks have completed. In addition, the profile showed that at the same time that frames were dropped, the CPU usage would be around 100%. This is because of the fetching and rendering. On the main thread the tasks that would cause this massive drop in frames were "Long Task", "Run Microtasks", "Function Call", and "Parse HTML". The Parse HTML is not a single block but rather many small blocks because it needs to render each object individually.

### Summary of Changes

To improve the performance of the application, a projection was added to the mongodb query to fetch all the objects within the bounds of a polygon defined by the viewport. This projection specified to only return the coordinates inside of the geo object as well as the id which is returned by default. This massively reduces the amount of data we are fetching which improved fetch times significantly. Instead of retrieving information about a meteorite landing by passing the object from the Map Component, there's a fetch inside the ToolTip component which will fetch it by id.

Furthermore, the limit of how much a user can zoom out was capped at a certain number, in order to reduce how many objetcs were fetched at one time within the viewport.

### Results and Conclusion

As a result of the changes that were made, there was a noticeable different in the performance of the website. It is not 100% smooth when it comes to loading thousands of objects at a time. But, the areas with less data do not drop in frames.
