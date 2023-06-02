require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/views/draw/Draw",
  "esri/geometry/Polygon",
  "esri/geometry/Point"
], function (Map, MapView, Graphic, GraphicsLayer, Draw, Polygon, Point) {

  var map = new Map({
    basemap: "satellite"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map
  });

  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  // 绘制面图形用到的填充符号
  var fillSymbol = {
    type: "simple-fill",
    color: "yellow",
    outline: {
      color: "red",
      width: 2
    }
  };

  // 简单点符号
  var pointSymbol = {
    type: "simple-marker",
    style: "circle",
    size: 12,
    color: "blue"
  }

  var drawTool = new Draw({
    view: view
  });

  function showPolygon(event) {
    var polygon = new Polygon({
      rings: event.vertices,
      spatialReference: view.spatialReference
    });
    var polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    });
    // graphicsLayer.removeAll();
    view.graphics.removeAll();
    view.graphics.add(polygonGraphic);
    // graphicsLayer.add(polygonGraphic);
  }

  function addPolygonGraphic(event) {
    var polygon = new Polygon({
      rings: event.vertices,
      spatialReference: view.spatialReference
    });
    var polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    });
    view.graphics.removeAll();
    graphicsLayer.add(polygonGraphic);
  }

  document.getElementById("drawPolygon").addEventListener("click", function (e) {
    var drawAction = drawTool.create("polygon", { mode: "click" });
    drawAction.on("vertex-add", showPolygon);
    drawAction.on("vertex-remove", showPolygon);
    drawAction.on("cursor-update", showPolygon);
    drawAction.on("draw-complete", addPolygonGraphic);
  });

  document.getElementById("drawPoint").addEventListener("click", function (e) {
    var drawAction = drawTool.create("point");
    // drawAction.on("cursor-update", showPoint);
    drawAction.on("draw-complete", addPointGraphic);
  });

  function addPointGraphic(event) {
    var point = new Point({
      x: event.coordinates[0],
      y: event.coordinates[1],
      spatialReference: view.spatialReference
    });
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: pointSymbol
    });
    graphicsLayer.add(pointGraphic);
  }

  document.getElementById("clearDrawings").addEventListener("click", function (e) {
    graphicsLayer.removeAll();
  })
});
