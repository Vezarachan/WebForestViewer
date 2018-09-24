		/**
		 * @author Leon Croft
		 */
		
		// 定义坐标系
		const CRS_4549 = new L.Proj.CRS('EPSG:4549',
			'+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs', {
				resolutions: [
					156367.7919628329 // 0
					, 78183.89598141646, 39091.94799070823, 19545.973995354114, 9772.986997677057, 4886.4934988385285, 2443.2467494192642, 1221.6233747096321, 610.8116873548161, 305.40584367740803, 152.70292183870401, 76.35146091935201, 38.175730459676004, 19.087865229838002, 9.543932614919001, 4.7719663074595005, 2.3859831537297502, 1.1929915768648751, 0.5964957884324376, 0.2982478942162188 // 19
				]
			});

		// 高亮要素
		const highlightFeature = (e) => {
			let layer = e.target;
			layer.setStyle({
				weight: 8,
				color: '#90caf9',
				fillOpacity: 0.6,
				fillColor: "#b2ebf2"
			});
			console.log(e);
		}

		// 重置要素样式
		const resetHighlight = (e) => {
			let layer = e.target;
			switch(e.target.options.url) {
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/6/":
					layer.setStyle({
						color: "#e0f2f1",
						weight: 3,
						fillOpacity: 0.75,
						fillColor: "#1de9b6"
					});
					break;
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/3/":
					layer.setStyle({
						fillColor: "#f39c12",
						fillOpacity: 0.85,
						color: "#fffde7",
						weight: 3
					});
					break;
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/5/":
					layer.setStyle({
						fillColor: "blue",
						fillOpacity: 0.75
					});
					break;
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/4/":
					layer.setStyle({
						fillColor: "#4e342e",
						fillOpacity: 0.75,
						color: "#4e342e"
					});
					break;
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/1/":
					layer.setStyle({
						color: "#e0e0e0",
						opacity: 0.75,
						weight: 8,
						color: "#424242"
					})
					break;
				case "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/0/":
					layer.setStyle({
						color: "#9e9e9e",
						opacity: 1.0,
						weight: 5,
						color: "#424242"
					});
					break;
			}
		}

		// 移动至选择的要素
		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight
				//				click: zoomToFeature
			});
		}

		const fl5popupTemplate = "<i class='fa fa-leaf fa-2x' style='color:#b9f6ca;'></i><br><table class=\"table table-bordered\"><tbody><tr><td>地名：{地名}</td><td>地类：{地类}</td></tr><tr><td>地貌：{地貌}</td><td>海拔：{海拔}m" +
			"</td></tr><tr><td>面积：{面积}</td><td>坡度：{坡度}°</td></tr><tr><td>起源：{起源}</td><td>郁闭度：{郁闭度}</td></tr><tr><td>" +
			"平均高：{平均高}</td><td>优势树种：{优势树种}</td></tr> </tbody></table>"

		const fl6popupTemplate = "<i class='fa fa-leaf fa-2x' style='color:#b9f6ca;'></i><br><table class=\"table table-bordered\"><tbody><tr><td>村名称：{村名称}</td><td>林班名：{林班名}</td></tr><tr><td>小地名：{小地名}</td><td>海拔：{海拔}m</td></tr><br>" +
			"<tr><td>面积：{面积}</td><td>坡度：{坡度}°</td></tr><tr><td>坡位：{坡位}</td><td>起源：{起源}</td></tr><tr><td>郁闭度：{郁闭度}</td><td>平均胸径：{平均胸径}</td></tr>" +
			"<tr><td>年龄：{年龄}</td><td>龄种：{龄种}</td></tr><tr><td>平均高：{平均高}</td><td>优势树种：{优势树种}</td></tr><tr><td>立地等级：{立地等级}</td><td>" +
			"管理类别：{管理类别}</td></tr></tbody></table>";

		const fl0popupTemplate = "<i class='fa fa-leaf fa-2x' style='color:#b9f6ca;'></i><br><table class=\"table table-bordered\"><tbody><tr><td>古树编号：{古树编}</td><td>小地名：{小地}</td></tr>" +
			"<tr><td>学名：{拉_1}</td><td>俗名：{中市}</td></tr><tr><td>纬度：{纬度}</td><td>经度：{经地}</td></tr><tr><td>分布特点：{分布特}</td><td>" +
			"古树等级：{古树等}</td></tr> </tbody></table>";

		// 古树名木marker
		var oldTreesMarker = L.AwesomeMarkers.icon({
			icon: 'leaf',
			markerColor: 'green',
			prefix: 'fa'
		})
		// 定义地图
		var map = L.map('viewDiv', {
			zoomControl: true,
			attributionControl: true,
			useCors: true,
		}).setView([30.352, 119.515], 16);

		/**
		 * 添加天地图底图
		 */
		var basemaplayer = L.layerGroup(
			[
				L.tileLayer(
					mapUrlTemplate.tdt_img, {
						subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
						crossOrigin: true
					}),
				L.tileLayer(
					mapUrlTemplate.tdt_imglabel, {
						subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
						crossOrigin: true
					}
				),
				L.tileLayer(
					mapUrlTemplate.tdt_border, {
						subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
						crossOrigin: true
					}
				),
				L.esri.featureLayer({
					url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/6",
					style: {
						color: "#37474f",
						weight: 5,
						fillOpacity: 0.65,
						fillColor: "#b0bec5"
					},
					useCors: true
				})
			]
		).addTo(map);

		// 添加Feature图层
		// 林场范围
		var featurelayer_7 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/7",
			style: {
				color: "#37474f",
				weight: 10,
				fillOpacity: 0.65
			},
			useCors: true
		}).addTo(map);

		// 林场小班
		var featurelayer_6 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/6",
			style: {
				color: "#e0f2f1",
				weight: 3,
				fillOpacity: 0.65,
				fillColor: "#1de9b6"
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).bindPopup(function(e) {
			return L.Util.template(fl6popupTemplate, e.feature.properties);
		}).addTo(map);

		// 公益林
		var featurelayer_5 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/3",
			style: {
				fillColor: "#f39c12",
				fillOpacity: 0.85,
				color: "#fffde7",
				weight: 3
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).bindPopup(function(e) {
			return L.Util.template(fl5popupTemplate, e.feature.properties);
		}).addTo(map);

		// 林场水域
		var featurelayer_4 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/5",
			style: {
				fillColor: "blue",
				fillOpacity: 0.65
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).addTo(map);

		// 林场居民点
		var featurelayer_3 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/4",
			style: {
				fillColor: "#4e342e",
				fillOpacity: 0.65,
				color: "#4e342e"
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).addTo(map);

		// 道路双线
		var featurelayer_2 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/1",
			style: {
				color: "#e0e0e0",
				opacity: 0.65,
				weight: 8,
				color: "#424242"
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).addTo(map);

		// 道路单线
		var featurelayer_1 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/0",
			style: {
				color: "#9e9e9e",
				opacity: 1.0,
				weight: 5,
				color: "#424242"
			},
			onEachFeature: onEachFeature,
			useCors: true
		}).addTo(map);

		// 古树名木
		var featurelayer_0 = L.esri.featureLayer({
			url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/FeatureServer/2",
			pointToLayer: function(geojson, latlng) {
				return L.marker(latlng, {
					icon: oldTreesMarker
				})
			},
			useCors: true
		}).bindPopup(function(e) {
			return L.Util.template(fl0popupTemplate, e.feature.properties);
		}).addTo(map);

		const layerGroup = L.layerGroup([featurelayer_7, featurelayer_6, featurelayer_5, featurelayer_4, featurelayer_3, featurelayer_2, featurelayer_1, featurelayer_0]);

		// 添加比例尺
		L.control.scale({
			imperial: false
		}).addTo(map);

		// 添加地图选择
		var baselayers = {
			"天地图": basemaplayer
		};

		var overlays = {
			"林场界线": featurelayer_7,
			"林场小班": featurelayer_6,
			"公益林": featurelayer_5,
			"林场水域": featurelayer_4,
			"林场居民点": featurelayer_3,
			"道路双线": featurelayer_1,
			"道路单线": featurelayer_2,
			"古树名木": featurelayer_0,
		};

		L.control.layers(baselayers, overlays).addTo(map);

		//		var miniMap = new L.Control.MiniMap(basemaplayer).addTo(map);
		// 回到原点
		const panTo = () => {
			map.panTo([30.352, 119.515], {
				animate: true
			});
		};

		// 选择的图层Id
		var selectedLayerId;
		// 选择的图层
		var selectedLayer;
		// 框选图形
		var poly; //生成的图形
		var previousIds = [];
		var queryFeatures;

		//		const clickSelection = () => {
		//			map.on("click", function(evt) {
		//				if(queryFeatures) {
		//					map.removeLayer(queryFeatures);
		//				}
		//
		//				L.esri.identifyFeatures({
		//						url: "http://111.231.64.206:8080/arcgis/rest/services/forest_layer_dev_ed/MapServer",
		//						useCors: true,
		//						layers: [0, 1, 2, 3, 4, 5, 6, 7]
		//					}).on(map)
		//					.at([evt.latlng.lat, evt.latlng.lng])
		//					.tolerance(3)
		//					.run(function(error, featureCollection, response) {
		//						if(featureCollection.features.length > 0) {
		//							queryFeatures = L.geoJSON(featureCollection.features[featureCollection.features.length - 1]).addTo(map);
		//							if(featureCollection.features[featureCollection.features.length - 1].layerId === 3) {
		//								queryFeatures.bindPopup(function() {
		//									return L.Util.template(fl5popupTemplate, featureCollection.features[featureCollection.features.length - 1].properties);
		//								}).openPopup();
		//							} else if(featureCollection.features[featureCollection.features.length - 1].layerId === 6) {
		//								queryFeatures.bindPopup(function() {
		//									return L.Util.template(fl6popupTemplate, featureCollection.features[featureCollection.features.length - 1].properties);
		//								}).openPopup();
		//							}
		//							alert(featureCollection.features[featureCollection.features.length - 1].layerId);
		//							console.log(featureCollection.features[featureCollection.features.length - 1].layerId);
		//							console.log(response.results[response.results.length - 1].attributes);
		//						}
		//					});
		//			});
		//		}

		//		// 获取选择的图层
		//		function getSelectedLayer() {
		//			selectedLayerId = $('#layer-selection option:selected');
		//			selectedLayer = layerGroup.getLayer(selectedLayerId.val());
		//			alert(selectedLayerId.text());
		//			$('#selectLayerModal').modal('hide');
		//		}
		//
		//		// 绘图事件
		//		$('#selectLayerModal').on('hidden.bs.modal', function() {
		//			DrawPolygon();
		//		});
		//
		//		// 执行查询
		//		function executeQuery() {
		//			queryLayer();
		//			map.removeLayer(poly);
		//		}
		//
		//		// 图形查询
		//		function queryLayer() {
		//			if(queryFeatures) {
		//				map.removeLayer(queryFeatures);
		//			}
		//			DrawPolygon();
		//			selectedLayer.query().intersects(poly).run(function(error, featureCollection, response) {
		//				if(featureCollection.features.length) {
		//					queryFeatures = L.geoJSON(featureCollection.features).addTo(map);
		//					$('#detailedTable').modal('show');
		//					console.log(featureCollection.features);
		//				}
		//			})
		//		}
		//
		// 绘制多边形
		function DrawPolygon() {
			var points = [];
			var pointsSym;
			var lines = new L.polyline([]);
			map.on('click', onClick); //点击地图
			map.on('dblclick', onDoubleClick); //双击完成

			function onClick(evt) {
				points.push([evt.latlng.lat, evt.latlng.lng]);
				lines.addLatLng(evt.latlng);
				map.addLayer(lines);
			}

			function onDoubleClick(evt) {
				poly = L.polygon([points]).addTo(map);
				map.removeLayer(lines);
				points = [];
				lines = new L.polyline([]);
				map.off('click', onClick);
			}
		}

		$('#fastSearch').on('shown.bs.modal', function() {
			selectedLayerId = $('#fast-selected-layer option:selected').val();
			selectedLayer = layerGroup.getLayer(selectedLayerId);
			var str = (index, value) => {
				return '<option value="${index}">${value}</option>'
			};
			if(selectedLayerId == 2) {
				layerFields.layer_6.every(function(index, vlaue) {
					$('#fields-quick').append(str(index, value));
				})
			} else if(selectedLayerId == 3) {
				$.each(layerFields.layer_5, function(index, value) {
					$('#fields-quick').append(str);
				});
			} else if(selectedLayerId == 8) {
				$.each(layerFields.layer_0, function(index, value) {
					$('#fields-quick').append(str);
				});
			}
		})

		// 查询事件
		const quickQuery = () => {

			alert(selectedLayerId);
			$('#fastSearch').modal('hide');
		}

		// 清除选择以及图形
		function DeleteGraphics() {
			map.off("click");
			map.off("dblclick");
			//			map.removeLayer(queryFeatures);
			map.removeLayer(poly);
			featurelayer_6.unbindPopup();
			featurelayer_5.unbindPopup();
			featurelayer_0.unbindPopup();
		}