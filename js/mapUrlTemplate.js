const mapUrlTemplate = {
	// 天地图影像
	tdt_img: "http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7d8ed5074765eff413b73de9bcb46719",
	// 天地图影像注记
	tdt_imglabel: "http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7d8ed5074765eff413b73de9bcb46719",
	// 天地图矢量
	tdt_vec: "http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7d8ed5074765eff413b73de9bcb46719",
	// 天地图矢量注记
	tdt_veclabel: "http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7d8ed5074765eff413b73de9bcb46719",
	// 天地图境界
	tdt_border: "http://t{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=7d8ed5074765eff413b73de9bcb46719",
	// forest featureserver
	featurelayerUrl: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/"
}
