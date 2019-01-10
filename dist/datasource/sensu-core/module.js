define(["app/core/utils/kbn","app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "09e93e7d33bf163e44f2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "datasource/sensu-core/module";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: [],
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./datasource/sensu-core/module.ts")(__webpack_require__.s = "./datasource/sensu-core/module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./datasource/sensu-core/api/aggregate_converters.ts":
/*!***********************************************************!*\
  !*** ./datasource/sensu-core/api/aggregate_converters.ts ***!
  \***********************************************************/
/*! exports provided: convertAggregatesToDataPoints, convertEventDataToAggregateModeResults, convertEventDataToAggregateModeChecks, convertEventDataToAggregateModeClient, convertEventDataToAggregateModeList, convertToAggregateModeClientJSON, convertAggregatesToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAggregatesToDataPoints", function() { return convertAggregatesToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeResults", function() { return convertEventDataToAggregateModeResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeChecks", function() { return convertEventDataToAggregateModeChecks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeClient", function() { return convertEventDataToAggregateModeClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeList", function() { return convertEventDataToAggregateModeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToAggregateModeClientJSON", function() { return convertToAggregateModeClientJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAggregatesToJSON", function() { return convertAggregatesToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");

function convertAggregatesToDataPoints(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var singleData = response.data;
        response.data = [];
        response.data.push(singleData);
    }
    var newData = null;
    for (var i = 0; i < response.data.length; i++) {
        var anAggregate = response.data[i];
        if (anAggregate.checks !== undefined) {
            var checkType = typeof (anAggregate.checks);
            switch (checkType) {
                case "number":
                    newData = convertEventDataToAggregateModeList(anAggregate, newData);
                    break;
                case "object":
                    newData = convertEventDataToAggregateModeClient(anAggregate, newData);
                    break;
            }
            continue;
        }
        if (anAggregate.clients !== undefined) {
            newData = convertEventDataToAggregateModeChecks(anAggregate, newData);
            continue;
        }
        if (anAggregate.summary !== undefined) {
            newData = convertEventDataToAggregateModeResults(anAggregate, newData);
            continue;
        }
        var datapoints = [];
        var timestamp = Math.floor(Date.now());
        datapoints[0] = [0, timestamp];
        anAggregate.datapoints = datapoints;
        anAggregate.target = anAggregate.name;
    }
    if (newData !== null) {
        response.data = newData;
    }
    return response;
}
function convertEventDataToAggregateModeResults(anEvent, dataSet) {
    var timestamp = Math.floor(Date.now());
    if (dataSet === null) {
        dataSet = [];
    }
    for (var i = 0; i < anEvent.summary.length; i++) {
        var aSummary = anEvent.summary[i];
        var checkData = {
            target: anEvent.check,
            clients: aSummary.clients,
            datapoints: [
                [aSummary.total, timestamp]
            ]
        };
        dataSet.push(checkData);
    }
    return dataSet;
}
function convertEventDataToAggregateModeChecks(anEvent, dataSet) {
    var timestamp = Math.floor(Date.now());
    if (dataSet === null) {
        dataSet = [];
    }
    for (var i = 0; i < anEvent.clients.length; i++) {
        var clientName = anEvent.clients[i];
        var checkData = {
            target: anEvent.name,
            datapoints: [
                [clientName, timestamp]
            ]
        };
        dataSet.push(checkData);
    }
    return dataSet;
}
function convertEventDataToAggregateModeClient(anEvent, dataSet) {
    var timestamp = Math.floor(Date.now());
    if (dataSet === null) {
        dataSet = [];
    }
    for (var i = 0; i < anEvent.checks.length; i++) {
        var checkName = anEvent.checks[i];
        var clientData = {
            target: anEvent.name,
            datapoints: [
                [checkName, timestamp]
            ]
        };
        dataSet.push(clientData);
    }
    return dataSet;
}
function convertEventDataToAggregateModeList(anEvent, dataSet) {
    if (dataSet === null) {
        dataSet = [];
    }
    var timestamp = Math.floor(Date.now());
    var item = {
        target: "checks",
        datapoints: [
            [anEvent.checks, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "clients",
        datapoints: [
            [anEvent.clients, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "critical",
        datapoints: [
            [anEvent.results.critical, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "ok",
        datapoints: [
            [anEvent.results.ok, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "stale",
        datapoints: [
            [anEvent.results.stale, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "total",
        datapoints: [
            [anEvent.results.total, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "unknown",
        datapoints: [
            [anEvent.results.unknown, timestamp]
        ]
    };
    dataSet.push(item);
    item = {
        target: "warning",
        datapoints: [
            [anEvent.results.warning, timestamp]
        ]
    };
    dataSet.push(item);
    return dataSet;
}
function convertToAggregateModeClientJSON(data, dataSet) {
    var timestamp = Math.floor(Date.now());
    if (dataSet === null) {
        dataSet = [];
    }
    for (var i = 0; i < data.checks.length; i++) {
        var checkName = data.checks[i];
        var clientData = {
            target: data.name,
            datapoints: [
                [checkName, timestamp]
            ]
        };
        dataSet.push(clientData);
    }
    return dataSet;
}
function convertAggregatesToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    var aggregateName = "ALL";
    if (aTarget.dimensions.length > 0) {
        aggregateName = aTarget.dimensions[0].value;
    }
    for (var i = 0; i < response.data.length; i++) {
        var item = response.data[i];
        var datapoints = [];
        var data = {
            client: item.name,
            checks: item.checks,
            aggregate_name: aggregateName,
        };
        datapoints.push(data);
        item.datapoints = datapoints;
        item.type = "docs";
    }
    return response;
}



/***/ }),

/***/ "./datasource/sensu-core/api/aggregate_requests.ts":
/*!*********************************************************!*\
  !*** ./datasource/sensu-core/api/aggregate_requests.ts ***!
  \*********************************************************/
/*! exports provided: getAggregateURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAggregateURIs", function() { return getAggregateURIs; });
function getAggregateURIs(target, aggregateNames) {
    var uris = [];
    var dimensionURI = "/aggregates";
    var anAggregateName = null;
    if (aggregateNames.length) {
        for (var i = 0; i < aggregateNames.length; i++) {
            anAggregateName = aggregateNames[i];
            dimensionURI = "/aggregates/" + anAggregateName;
            switch (target.aggregateMode) {
                case "checks":
                    dimensionURI = "/aggregates/" + anAggregateName + "/checks";
                    break;
                case "clients":
                    dimensionURI = "/aggregates/" + anAggregateName + "/clients";
                    break;
                case "list":
                    dimensionURI = "/aggregates/" + anAggregateName;
                    break;
                case "results_critical":
                    dimensionURI = "/aggregates/" + anAggregateName + "/results/critical";
                    break;
                case "results_ok":
                    dimensionURI = "/aggregates/" + anAggregateName + "/results/ok";
                    break;
                case "results_unknown":
                    dimensionURI = "/aggregates/" + anAggregateName + "/results/unknown";
                    break;
                case "results_warning":
                    dimensionURI = "/aggregates/" + anAggregateName + "/results/warning";
                    break;
            }
            uris.push(dimensionURI);
        }
    }
    if (uris.length === 0) {
        uris.push(dimensionURI);
    }
    return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_converters.ts":
/*!********************************************************!*\
  !*** ./datasource/sensu-core/api/client_converters.ts ***!
  \********************************************************/
/*! exports provided: convertClientsToDataPoints, convertClientsToJSON, convertClientHistoryToDataPoints, convertClientSummaryMetricsToJSON, convertClientHealthToJSON, convertClientHealthMetricsToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientsToDataPoints", function() { return convertClientsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientsToJSON", function() { return convertClientsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHistoryToDataPoints", function() { return convertClientHistoryToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientSummaryMetricsToJSON", function() { return convertClientSummaryMetricsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHealthToJSON", function() { return convertClientHealthToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHealthMetricsToJSON", function() { return convertClientHealthMetricsToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");
/* harmony import */ var _client_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client_filters */ "./datasource/sensu-core/api/client_filters.ts");


function convertClientsToDataPoints(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var singleData = response.data;
        response.data = [];
        response.data.push(singleData);
    }
    switch (aTarget.clientQueryMode) {
        case "list":
            var filterData = [];
            var arrClientNames = [];
            if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
                arrClientNames = Object(_client_filters__WEBPACK_IMPORTED_MODULE_1__["getClientsWithFilter"])(aTarget, response);
                for (var i = 0; i < response.data.length; i++) {
                    if (arrClientNames.indexOf(response.data[i].name) >= 0) {
                        filterData.push(response.data[i]);
                    }
                }
                response.data = filterData;
            }
            for (var i = 0; i < response.data.length; i++) {
                var data = response.data[i];
                var datapoints = [];
                if (data.timestamp !== undefined) {
                    datapoints[0] = [1, (data.timestamp * 1000)];
                }
                data.datapoints = datapoints;
                data.target = data.name;
            }
            break;
        case "count":
            if (response.data.length > 0) {
                var data = response.data[0];
                var datapoints = [];
                var clientCount = 0;
                var arrClientNames_1 = [];
                if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
                    arrClientNames_1 = Object(_client_filters__WEBPACK_IMPORTED_MODULE_1__["getClientsWithFilter"])(aTarget, response);
                    clientCount = arrClientNames_1.length;
                }
                else {
                    clientCount = response.data.length;
                }
                if (data.timestamp !== undefined) {
                    datapoints[0] = [clientCount, (data.timestamp * 1000)];
                }
                data.datapoints = datapoints;
                data.address = undefined;
                data.name = undefined;
                data.socket = undefined;
                data.subscriptions = undefined;
                data.version = undefined;
                data.target = "ClientCount";
                if (aTarget.aliasReplaced) {
                    data.target = aTarget.aliasReplaced;
                }
                response.data = [data];
            }
            break;
    }
    return response;
}
function convertClientsToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var data = response.data;
        response.data = [];
        response.data.push(data);
    }
    var newData = [];
    for (var i = 0; i < response.data.length; i++) {
        var pushItem = true;
        var item = JSON.parse(JSON.stringify(response.data[i]));
        item.datapoints = [];
        item.type = "docs";
        var address = item.address;
        if (item.address === "unknown") {
            item.address = "JIT Client";
        }
        if (aTarget.filters !== undefined) {
            if (aTarget.filters.length !== undefined) {
                for (var j = 0; j < aTarget.filters.length; j++) {
                    var aFilter = aTarget.filters[j];
                    switch (aFilter.filterType) {
                        case "regex":
                            try {
                                var flags = aFilter.filterRegexFlags;
                                var re = new RegExp(aFilter.filterRegex, flags);
                                if (re.test(item.name)) {
                                    aFilter.filterMessage = "OK";
                                }
                                else {
                                    pushItem = false;
                                }
                            }
                            catch (err) {
                                aFilter.filterMessage = "Invalid Regular Expression";
                                break;
                            }
                            break;
                        case "field":
                            if (item.hasOwnProperty(aFilter.filterFieldName)) {
                                var fieldVal = item[aFilter.filterFieldName];
                                if (fieldVal !== aFilter.filterFieldValueReplaced) {
                                    pushItem = false;
                                }
                            }
                            else {
                                pushItem = false;
                            }
                            break;
                    }
                }
            }
        }
        if (pushItem) {
            var entry = {
                type: "docs",
                datapoints: [item]
            };
            newData.push(entry);
        }
    }
    response.data = newData;
    return response;
}
function convertClientHistoryToDataPoints(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        var startingTimestamp = 0;
        if (anEvent.last_execution !== undefined) {
            startingTimestamp = anEvent.last_execution - (60 * anEvent.history.length);
        }
        if (anEvent.history !== undefined) {
            for (var y = 0; y < anEvent.history.length; y++) {
                datapoints[y] = [anEvent.history[y], (startingTimestamp + (60 * y)) * 1000];
            }
        }
        anEvent.datapoints = datapoints;
        anEvent.target = "unknown";
        if (anEvent.name !== undefined) {
            anEvent.target = anEvent.name;
        }
        if (anEvent.check !== undefined) {
            anEvent.target = anEvent.check;
        }
    }
    return response;
}
function convertClientSummaryMetricsToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
}
function convertClientHealthToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    var filteredData = [];
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        if (anEvent.check.issued !== undefined) {
            var data = {
                timestamp: (anEvent.check.issued * 1000),
                check_name: anEvent.check.name,
                client: anEvent.client,
                check: anEvent.check,
                occurrences: anEvent.occurrences,
                occurrences_watermark: anEvent.occurrences_watermark,
                action: anEvent.action,
                id: anEvent.id,
                last_state_change: (anEvent.last_state_change * 1000),
                last_ok: (anEvent.last_ok * 1000),
                silenced: anEvent.silenced,
                silenced_by: anEvent.silenced_by
            };
            try {
                data.check.issued = data.check.issued * 1000;
                data.check.executed = data.check.executed * 1000;
            }
            catch (err) {
            }
            datapoints.push(data);
            anEvent.datapoints = datapoints;
            delete anEvent.check;
            delete anEvent.client;
            anEvent.type = "docs";
            if (!anEvent.silenced) {
                filteredData.push(anEvent);
            }
            if (anEvent.silenced && !aTarget.hideSilencedEvents) {
                filteredData.push(anEvent);
            }
        }
    }
    response.data = filteredData;
    return response;
}
function convertClientHealthMetricsToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_filters.ts":
/*!*****************************************************!*\
  !*** ./datasource/sensu-core/api/client_filters.ts ***!
  \*****************************************************/
/*! exports provided: getClientsWithFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientsWithFilter", function() { return getClientsWithFilter; });
function getClientsWithFilter(aTarget, response) {
    var arrClientNames = [];
    for (var i = 0; i < aTarget.filters.length; i++) {
        var aFilter = aTarget.filters[i];
        switch (aFilter.filterType) {
            case "field":
                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].hasOwnProperty(aFilter.filterFieldName)) {
                        var fieldVal = response.data[j][aFilter.filterFieldName];
                        if (fieldVal === aFilter.filterFieldValueReplaced) {
                            if (arrClientNames.indexOf(response.data[j].name) === -1) {
                                arrClientNames.push(response.data[j].name);
                            }
                        }
                    }
                }
                break;
            case "fetch":
                for (var j = 0; j < response.data.length; j++) {
                    if (aFilter.value === response.data[j].name) {
                        if (arrClientNames.indexOf(response.data[j].name) === -1) {
                            arrClientNames.push(response.data[j].name);
                        }
                    }
                }
                break;
            case "regex":
                try {
                    var flags = aFilter.filterRegexFlags;
                    var re = new RegExp(aFilter.filterRegex, flags);
                    for (var j = 0; j < response.data.length; j++) {
                        if (re.test(response.data[j].name)) {
                            if (arrClientNames.indexOf(response.data[j].name) === -1) {
                                arrClientNames.push(response.data[j].name);
                            }
                        }
                    }
                }
                catch (err) {
                    aFilter.filterMessage = "Invalid Regular Expression";
                }
                break;
        }
    }
    return arrClientNames;
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_requests.ts":
/*!******************************************************!*\
  !*** ./datasource/sensu-core/api/client_requests.ts ***!
  \******************************************************/
/*! exports provided: getClientsURIs, getClientHealthURIs, getClientHistoryURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientsURIs", function() { return getClientsURIs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientHealthURIs", function() { return getClientHealthURIs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientHistoryURIs", function() { return getClientHistoryURIs; });
function getClientsURIs(checkNames, clientNames) {
    var uris = [];
    var dimensionURI = "/clients";
    if (clientNames.length) {
        for (var i = 0; i < clientNames.length; i++) {
            var aClientName = clientNames[i];
            dimensionURI = "/clients/" + aClientName;
            uris.push(dimensionURI);
        }
    }
    if (uris.length === 0) {
        uris.push(dimensionURI);
    }
    uris.push("/events");
    uris.push("/results");
    return uris;
}
function getClientHealthURIs(clientNames) {
    var uris = [];
    if (clientNames.length) {
        for (var i = 0; i < clientNames.length; i++) {
            var aClientName = clientNames[i];
            var resultsURI = "/results/" + aClientName;
            uris.push(resultsURI);
            var eventsURI = "/events/" + aClientName;
            uris.push(eventsURI);
        }
    }
    if (uris.length === 0) {
        uris.push("/results");
        uris.push("/events");
    }
    return uris;
}
function getClientHistoryURIs(clientNames) {
    var uris = [];
    var dimensionURI = "/clients";
    if (clientNames.length) {
        for (var i = 0; i < clientNames.length; i++) {
            var aClientName = clientNames[i];
            dimensionURI = "/clients/" + aClientName + "/history";
            uris.push(dimensionURI);
        }
    }
    if (uris.length === 0) {
        uris.push(dimensionURI);
    }
    return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_converters.ts":
/*!*******************************************************!*\
  !*** ./datasource/sensu-core/api/event_converters.ts ***!
  \*******************************************************/
/*! exports provided: convertEventsToJSON, convertEventsToDataPoints, convertEventsToEventMetrics, convertEventsToEventMetricsJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToJSON", function() { return convertEventsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToDataPoints", function() { return convertEventsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToEventMetrics", function() { return convertEventsToEventMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToEventMetricsJSON", function() { return convertEventsToEventMetricsJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");
/* harmony import */ var _event_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_filters */ "./datasource/sensu-core/api/event_filters.ts");


function convertEventsToDataPoints(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var singleData = response.data;
        response.data = [];
        response.data.push(singleData);
    }
    var filteredData = [];
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        var startingTimestamp = 0;
        if (anEvent.timestamp !== undefined) {
            startingTimestamp = anEvent.timestamp - (60 * anEvent.check.history.length);
        }
        if (anEvent.last_execution !== undefined) {
            startingTimestamp = anEvent.last_execution - (60 * anEvent.history.length);
        }
        for (var y = 0; y < anEvent.check.history.length; y++) {
            datapoints[y] = [anEvent.check.history[y], (startingTimestamp + (60 * y)) * 1000];
        }
        anEvent.datapoints = datapoints;
        anEvent.target = anEvent.client.name;
        anEvent.clientName = anEvent.client.name;
        if (Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
            if (!anEvent.silenced) {
                filteredData.push(anEvent);
            }
            if (anEvent.silenced && !aTarget.hideSilencedEvents) {
                filteredData.push(anEvent);
            }
        }
    }
    var newResponse = { data: filteredData };
    return newResponse;
}
function convertEventsToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    var filteredData = [];
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        if ((anEvent.check.issued !== undefined) && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
            var clientShortname = anEvent.client.name;
            var parts = anEvent.client.name.split(".");
            if (parts.length > 0) {
                clientShortname = parts[0];
            }
            anEvent.client.client_short_name = clientShortname;
            var statusText = "UNKNOWN";
            if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined)) {
                switch (anEvent.check.status) {
                    case 0:
                        statusText = "OK";
                        break;
                    case 1:
                        statusText = "WARNING";
                        break;
                    case 2:
                        statusText = "CRITICAL";
                        break;
                    case 3:
                        statusText = "UNKNOWN";
                        break;
                    default:
                        statusText = "UNKNOWN";
                        break;
                }
            }
            anEvent.check.status_text = statusText;
            var data = {
                timestamp: (anEvent.check.issued * 1000),
                check_name: anEvent.check.name,
                client: anEvent.client,
                check: anEvent.check,
                occurrences: anEvent.occurrences,
                occurrences_watermark: anEvent.occurrences_watermark,
                action: anEvent.action,
                id: anEvent.id,
                last_state_change: (anEvent.last_state_change * 1000),
                last_ok: (anEvent.last_ok * 1000),
                silenced: anEvent.silenced,
                silenced_by: anEvent.silenced_by
            };
            try {
                data.check.issued = data.check.issued * 1000;
                data.check.executed = data.check.executed * 1000;
            }
            catch (err) {
            }
            datapoints.push(data);
            anEvent.datapoints = datapoints;
            delete anEvent.check;
            delete anEvent.client;
            anEvent.type = "docs";
            if (!anEvent.silenced) {
                filteredData.push(anEvent);
            }
            if (anEvent.silenced && !aTarget.hideSilencedEvents) {
                filteredData.push(anEvent);
            }
        }
    }
    var newResponse = { data: filteredData };
    return newResponse;
}
function convertEventsToEventMetricsJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    var timestamp = 0;
    try {
        timestamp = response.data[0].check.issued * 1000;
    }
    catch (err) {
    }
    var eventMetrics = {
        target: "allEvents",
        timestamp: timestamp,
        numEvents: 0,
        numSilenced: 0,
        numClientsSilenced: 0,
        numChecksSilenced: 0,
        numWarningEvents: 0,
        numWarningEventsSilenced: 0,
        numCriticalEvents: 0,
        numCriticalEventsSilenced: 0,
        numUnknownEvents: 0,
        numUnknownEventsSilenced: 0
    };
    var clientNames = [];
    var checkNames = [];
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        if (anEvent.check.issued !== undefined) {
            if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined) && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
                eventMetrics.numEvents += 1;
                switch (anEvent.check.status) {
                    case 1:
                        eventMetrics.numWarningEvents += 1;
                        if (anEvent.silenced) {
                            eventMetrics.numWarningEventsSilenced += 1;
                            eventMetrics.numSilenced += 1;
                        }
                        break;
                    case 2:
                        eventMetrics.numCriticalEvents += 1;
                        if (anEvent.silenced) {
                            eventMetrics.numCriticalEventsSilenced += 1;
                            eventMetrics.numSilenced += 1;
                        }
                        break;
                    default:
                        eventMetrics.numUnknownEvents += 1;
                        if (anEvent.silenced) {
                            eventMetrics.numUnknownEventsSilenced += 1;
                            eventMetrics.numSilenced += 1;
                        }
                        break;
                }
            }
            if (clientNames.indexOf(anEvent.client.name) < 0) {
                clientNames.push(anEvent.client.name);
            }
            if (checkNames.indexOf(anEvent.check.name) < 0) {
                checkNames.push(anEvent.check.name);
            }
            for (var i_1 = 0; i_1 < anEvent.silenced_by.length; i_1++) {
                if (anEvent.silenced_by[i_1].indexOf("*") >= 0) {
                    eventMetrics.numClientsSilenced += 1;
                }
                else {
                    eventMetrics.numChecksSilenced += 1;
                }
            }
        }
    }
    eventMetrics.numClientsSilenced = clientNames.length;
    eventMetrics.numChecksSilenced = checkNames.length;
    response.data = [{
            target: "allEvents",
            timestamp: timestamp,
            type: "docs",
            datapoints: [eventMetrics]
        }];
    return response;
}
function convertEventsToEventMetrics(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    var newResponse = { data: [] };
    var timestamp = 0;
    try {
        timestamp = response.data[0].check.issued * 1000;
    }
    catch (err) {
    }
    var eventMetrics = {
        target: "allEvents",
        timestamp: timestamp,
        numEvents: 0.0,
        numSilenced: 0.0,
        numClientsSilenced: 0.0,
        numChecksSilenced: 0.0,
        numWarningEvents: 0.0,
        numWarningEventsSilenced: 0.0,
        numCriticalEvents: 0.0,
        numCriticalEventsSilenced: 0.0,
        numUnknownEvents: 0.0,
        numUnknownEventsSilenced: 0.0
    };
    var clientNames = [];
    var checkNames = [];
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        if (anEvent.check.issued !== undefined) {
            if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined) && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
                eventMetrics.numEvents += 1.0;
                switch (anEvent.check.status) {
                    case 1:
                        eventMetrics.numWarningEvents += 1.0;
                        if (anEvent.silenced) {
                            eventMetrics.numWarningEventsSilenced += 1.0;
                            eventMetrics.numSilenced += 1.0;
                        }
                        break;
                    case 2:
                        eventMetrics.numCriticalEvents += 1.0;
                        if (anEvent.silenced) {
                            eventMetrics.numCriticalEventsSilenced += 1.0;
                            eventMetrics.numSilenced += 1.0;
                        }
                        break;
                    default:
                        eventMetrics.numUnknownEvents += 1.0;
                        if (anEvent.silenced) {
                            eventMetrics.numUnknownEventsSilenced += 1.0;
                            eventMetrics.numSilenced += 1.0;
                        }
                        break;
                }
            }
            if (clientNames.indexOf(anEvent.client.name) < 1.0) {
                clientNames.push(anEvent.client.name);
            }
            if (checkNames.indexOf(anEvent.check.name) < 1.0) {
                checkNames.push(anEvent.check.name);
            }
            for (var i_2 = 0; i_2 < anEvent.silenced_by.length; i_2++) {
                if (anEvent.silenced_by[i_2].indexOf("*") >= 0) {
                    eventMetrics.numClientsSilenced += 1.0;
                }
                else {
                    eventMetrics.numChecksSilenced += 1.0;
                }
            }
        }
    }
    var targetName = null;
    if (aTarget.name !== undefined) {
        targetName = aTarget.name;
    }
    if (aTarget.aliasReplaced !== undefined) {
        targetName = aTarget.aliasReplaced;
    }
    newResponse.data = [{
            target: targetName,
            datapoints: [
                [0.00, timestamp]
            ]
        }];
    switch (aTarget.eventMetricMode) {
        case "all_events_count":
            if (targetName === null) {
                newResponse.data[0].target = "all_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
            break;
        case "active_events_count":
            if (targetName === null) {
                newResponse.data[0].target = "active_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numEvents - eventMetrics.numSilenced, timestamp]];
            break;
        case "critical_count":
            if (targetName === null) {
                newResponse.data[0].target = "critical_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents, timestamp]];
            break;
        case "critical_active_count":
            if (targetName === null) {
                newResponse.data[0].target = "critical_active_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents - eventMetrics.numCriticalEventsSilenced, timestamp]];
            break;
        case "critical_silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "critical_silenced_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numCriticalEventsSilenced, timestamp]];
            break;
        case "warning_count":
            if (targetName === null) {
                newResponse.data[0].target = "warning_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents, timestamp]];
            break;
        case "warning_active_count":
            if (targetName === null) {
                newResponse.data[0].target = "warning_active_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents - eventMetrics.numWarningEventsSilenced, timestamp]];
            break;
        case "warning_silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "warning_silenced_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numWarningEventsSilenced, timestamp]];
            break;
        case "unknown_count":
            if (targetName === null) {
                newResponse.data[0].target = "unknown_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents, timestamp]];
            break;
        case "unknown_active_count":
            if (targetName === null) {
                newResponse.data[0].target = "unknown_active_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents - eventMetrics.numUnknownEventsSilenced, timestamp]];
            break;
        case "unknown_silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "unknown_silenced_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numUnknownEventsSilenced, timestamp]];
            break;
        case "silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "silenced_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numSilenced, timestamp]];
            break;
        case "clients_silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "clients_silenced_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numClientsSilenced, timestamp]];
            break;
        case "checks_silenced_count":
            if (targetName === null) {
                newResponse.data[0].target = "checks_silenced_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numChecksSilenced, timestamp]];
            break;
        default:
            if (targetName === null) {
                newResponse.data[0].target = "all_events_count";
            }
            newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
            break;
    }
    return newResponse;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_filters.ts":
/*!****************************************************!*\
  !*** ./datasource/sensu-core/api/event_filters.ts ***!
  \****************************************************/
/*! exports provided: includeEventTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includeEventTarget", function() { return includeEventTarget; });
function includeEventTarget(target, anEvent) {
    if (target.filters === undefined) {
        return true;
    }
    if (target.filters.length === 0) {
        return true;
    }
    for (var i = 0; i < target.filters.length; i++) {
        var aFilter = target.filters[i];
        switch (aFilter.filterType) {
            case "field":
                if (anEvent.client.hasOwnProperty(aFilter.filterFieldName)) {
                    var aVal = anEvent.client[aFilter.filterFieldName];
                    if (aVal === aFilter.filterFieldValueReplaced) {
                        return true;
                    }
                }
                break;
        }
    }
    return false;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_requests.ts":
/*!*****************************************************!*\
  !*** ./datasource/sensu-core/api/event_requests.ts ***!
  \*****************************************************/
/*! exports provided: getEventsURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEventsURIs", function() { return getEventsURIs; });
function getEventsURIs(checkNames, clientNames) {
    var uris = [];
    var dimensionURI = "/events";
    var aClientName = null;
    var aCheckName = null;
    var anAggregateName = null;
    if (clientNames.length) {
        for (var i = 0; i < clientNames.length; i++) {
            aClientName = clientNames[i];
            dimensionURI = "/events/" + aClientName;
            uris.push(dimensionURI);
        }
    }
    if ((checkNames.length) && (clientNames.length)) {
        for (var i = 0; i < clientNames.length; i++) {
            aClientName = clientNames[i];
            for (var j = 0; j < checkNames.length; j++) {
                aCheckName = checkNames[i];
                dimensionURI = "/events/" + aClientName + "/" + aCheckName;
                uris.push(dimensionURI);
            }
        }
    }
    if (uris.length === 0) {
        uris.push(dimensionURI);
    }
    return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/result_converters.ts":
/*!********************************************************!*\
  !*** ./datasource/sensu-core/api/result_converters.ts ***!
  \********************************************************/
/*! exports provided: convertResultsToTable, convertResultsToDataPoints, convertResultsToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToTable", function() { return convertResultsToTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToDataPoints", function() { return convertResultsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToJSON", function() { return convertResultsToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");

function convertResultsToTable(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var singleData = response.data;
        response.data = [];
        response.data.push(singleData);
    }
    var rowData = [];
    for (var i = 0; i < response.data.length; i++) {
        var rowInfo = response.data[i];
        var aRow = [
            rowInfo.check.issued * 1000,
            rowInfo.client,
            rowInfo.check.name,
            rowInfo.check.status,
            rowInfo.check.issued * 1000,
            rowInfo.check.executed * 1000,
            rowInfo.check.output,
            rowInfo.check.type,
            rowInfo.check.thresholds.warning,
            rowInfo.check.thresholds.critical
        ];
        rowData.push(aRow);
    }
    var anEvent = response.data[0];
    var datapoints = [];
    datapoints[0] = [anEvent.check.status, (anEvent.check.issued * 1000)];
    anEvent.datapoints = datapoints;
    anEvent.type = "table";
    anEvent.columns = [
        { text: "Time", type: "date" },
        { text: "client" },
        { text: "check.name" },
        { text: "check.status" },
        { text: "check.issued", type: "date" },
        { text: "check.executed", type: "date" },
        { text: "check.output" },
        { text: "check.type" },
        { text: "check.thresholds.warning" },
        { text: "check.thresholds.critical" }
    ];
    anEvent.rows = rowData;
    response.data = [anEvent];
    return response;
}
function convertResultsToJSON(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        if (anEvent.check.issued !== undefined) {
            var data = {
                timestamp: (anEvent.check.issued * 1000),
                message: anEvent.check.name,
                client: anEvent.client,
                check: {
                    name: anEvent.check.name,
                    issued: (anEvent.check.issued * 1000),
                    executed: (anEvent.check.executed * 1000),
                    output: anEvent.check.output,
                    status: anEvent.check.status,
                    type: anEvent.check.type
                }
            };
            datapoints.push(data);
            anEvent.datapoints = datapoints;
            delete anEvent.check;
            delete anEvent.client;
            anEvent.type = "docs";
        }
    }
    return response;
}
function convertResultsToDataPoints(aTarget, responses) {
    var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
    if (response.data.length === undefined) {
        var singleData = response.data;
        response.data = [];
        response.data.push(singleData);
    }
    for (var i = 0; i < response.data.length; i++) {
        var anEvent = response.data[i];
        var datapoints = [];
        if (anEvent.check.issued !== undefined) {
            datapoints[0] = [anEvent.check.status, (anEvent.check.issued * 1000)];
        }
        anEvent.datapoints = datapoints;
        if (anEvent.check.name !== undefined) {
            anEvent.target = anEvent.check.name;
        }
        else {
            anEvent.target = anEvent.check;
        }
    }
    return response;
}



/***/ }),

/***/ "./datasource/sensu-core/api/result_requests.ts":
/*!******************************************************!*\
  !*** ./datasource/sensu-core/api/result_requests.ts ***!
  \******************************************************/
/*! exports provided: getResultURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResultURIs", function() { return getResultURIs; });
function getResultURIs(checkNames, clientNames) {
    var uris = [];
    var dimensionURI = "/results";
    var aClientName = null;
    var aCheckName = null;
    var anAggregateName = null;
    if (clientNames.length) {
        for (var i = 0; i < clientNames.length; i++) {
            aClientName = clientNames[i];
            dimensionURI = "/results/" + aClientName;
            uris.push(dimensionURI);
        }
    }
    if ((checkNames.length) && (clientNames.length)) {
        for (var i = 0; i < clientNames.length; i++) {
            aClientName = clientNames[i];
            for (var j = 0; j < checkNames.length; j++) {
                aCheckName = checkNames[i];
                dimensionURI = "/results/" + aClientName + "/" + aCheckName;
                uris.push(dimensionURI);
            }
        }
    }
    if (uris.length === 0) {
        uris.push(dimensionURI);
    }
    return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/utils.ts":
/*!********************************************!*\
  !*** ./datasource/sensu-core/api/utils.ts ***!
  \********************************************/
/*! exports provided: getResponseForTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResponseForTarget", function() { return getResponseForTarget; });
function getResponseForTarget(aTarget, responses) {
    var response = {
        data: []
    };
    for (var i = 0; i < responses.data.length; i++) {
        if (responses.data[i].target === aTarget) {
            response.data = responses.data[i].response.data;
            break;
        }
    }
    return response;
}



/***/ }),

/***/ "./datasource/sensu-core/datasource.ts":
/*!*********************************************!*\
  !*** ./datasource/sensu-core/datasource.ts ***!
  \*********************************************/
/*! exports provided: SensuCoreDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensuCoreDatasource", function() { return SensuCoreDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/utils/kbn */ "grafana/app/core/utils/kbn");
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_aggregate_requests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/aggregate_requests */ "./datasource/sensu-core/api/aggregate_requests.ts");
/* harmony import */ var _api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/aggregate_converters */ "./datasource/sensu-core/api/aggregate_converters.ts");
/* harmony import */ var _api_client_requests__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/client_requests */ "./datasource/sensu-core/api/client_requests.ts");
/* harmony import */ var _api_client_converters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api/client_converters */ "./datasource/sensu-core/api/client_converters.ts");
/* harmony import */ var _api_event_requests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/event_requests */ "./datasource/sensu-core/api/event_requests.ts");
/* harmony import */ var _api_event_converters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api/event_converters */ "./datasource/sensu-core/api/event_converters.ts");
/* harmony import */ var _api_result_requests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./api/result_requests */ "./datasource/sensu-core/api/result_requests.ts");
/* harmony import */ var _api_result_converters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./api/result_converters */ "./datasource/sensu-core/api/result_converters.ts");










var SensuCoreDatasource = (function () {
    function SensuCoreDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv) {
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.basicAuth = instanceSettings.basicAuth;
        this.withCredentials = instanceSettings.withCredentials;
        this.q = $q;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.uiSegmentSrv = uiSegmentSrv;
        this.minimumInterval = 60000;
    }
    SensuCoreDatasource.prototype.metricFindQuery = function (options) {
        var isClientTags = false;
        var isClientTagValue = false;
        var aQuery = "/clients";
        var tagToValue = "";
        options = this.templateSrv.replaceWithText(options);
        if ((options !== undefined) && (options !== "")) {
            switch (true) {
                case /clienttags/.test(options):
                    aQuery = "/clients";
                    isClientTags = true;
                    break;
                case /clienttagvalue/.test(options):
                    aQuery = "/clients";
                    isClientTagValue = true;
                    tagToValue = options.split("tag=")[1];
                    break;
                default:
                    aQuery = options;
            }
            if (!aQuery.startsWith("/", 0)) {
                aQuery = "/" + aQuery;
            }
        }
        var thisRef = this;
        return this.backendSrv.datasourceRequest({
            url: this.url + aQuery,
            data: options,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            }
        }).then(function (response) {
            if (isClientTags) {
                return thisRef.generateClientQueryTags(response);
            }
            if (isClientTagValue) {
                return thisRef.getClientQueryTagValue(response, tagToValue);
            }
            return thisRef.mapToClientNameAndVersion(response);
        });
    };
    SensuCoreDatasource.prototype.generateClientQueryTags = function (response) {
        var clientQueryTags = [];
        var allTags = [];
        var excludedTags = [
            "name",
            "socket",
            "address",
            "subscriptions",
            "timestamp",
            "keepalive",
            "keepalives",
            "redact",
            "version"
        ];
        for (var i = 0; i < response.data.length; i++) {
            var keys = Object.keys(response.data[i]);
            for (var j = 0; j < keys.length; j++) {
                var keyName = keys[j];
                if (excludedTags.indexOf(keyName) === -1) {
                    var tagValue = response.data[i][keyName];
                    var fullKeyName = keyName + "=" + tagValue;
                    if (allTags.indexOf(fullKeyName) < 0) {
                        allTags.push(fullKeyName);
                    }
                }
            }
        }
        if (allTags.length > 0) {
            allTags.sort();
            for (var i = 0; i < allTags.length; i++) {
                clientQueryTags.push({
                    text: allTags[i],
                    expandable: true
                });
            }
        }
        return clientQueryTags;
    };
    SensuCoreDatasource.prototype.getClientQueryTagValue = function (response, tag) {
        var tagSplit = tag.split("=");
        var tagToMatch = tagSplit[0];
        var tagValueToMatch = tagSplit[1];
        var clientQueryTags = [];
        var allTagValues = [];
        for (var i = 0; i < response.data.length; i++) {
            var keys = Object.keys(response.data[i]);
            for (var j = 0; j < keys.length; j++) {
                var keyName = keys[j];
                if (tagToMatch === keyName) {
                    if (typeof response.data[i][tagToMatch] !== "string") {
                        for (var z = 0; z < response.data[i][tagToMatch].length; z++) {
                            if (response.data[i][tagToMatch][z] === tagValueToMatch) {
                                var tagValue = response.data[i].name;
                                if (allTagValues.indexOf(tagValue) < 0) {
                                    allTagValues.push(tagValue);
                                }
                            }
                        }
                    }
                    else {
                        if (response.data[i][tagToMatch] === tagValueToMatch) {
                            var tagValue = response.data[i].name;
                            if (allTagValues.indexOf(tagValue) < 0) {
                                allTagValues.push(tagValue);
                            }
                        }
                    }
                }
            }
        }
        if (allTagValues.length > 0) {
            for (var i = 0; i < allTagValues.length; i++) {
                clientQueryTags.push({
                    text: allTagValues[i]
                });
            }
        }
        return clientQueryTags;
    };
    SensuCoreDatasource.prototype.mapToClientNameAndVersion = function (result) {
        if (result.data.length === 0) {
            return {};
        }
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data, function (d) {
            var x = {
                text: "",
                expandable: true
            };
            try {
                x = {
                    text: d.name,
                    expandable: true
                };
            }
            catch (e) {
                console.log("bad data");
            }
            return x;
        });
    };
    SensuCoreDatasource.prototype.getClientNames = function (dimensions) {
        var values = [];
        for (var i = 0; i < dimensions.length; i++) {
            if (dimensions[i].dimensionType === "clientName") {
                var aDimension = dimensions[i].value;
                if (this.templateSrv.getVariableName(aDimension)) {
                    var templateVar = this.templateSrv.replace(aDimension);
                    if (templateVar.length > 0) {
                        if (templateVar.startsWith("{")) {
                            templateVar = templateVar.slice(1, -1);
                            var templateVars = templateVar.split(",");
                            values.push.apply(values, templateVars);
                        }
                        else {
                            values.push(templateVar);
                        }
                    }
                }
                else {
                    values.push(aDimension);
                }
            }
        }
        return values;
    };
    SensuCoreDatasource.prototype.getCheckNames = function (dimensions) {
        var values = [];
        for (var i = 0; i < dimensions.length; i++) {
            if (dimensions[i].dimensionType === "checkName") {
                var aDimension = dimensions[i].value;
                if (this.templateSrv.getVariableName(aDimension)) {
                    var templateVar = this.templateSrv.replace(aDimension);
                    if (templateVar.length > 0) {
                        if (templateVar.startsWith("{")) {
                            templateVar = templateVar.slice(1, -1);
                            var templateVars = templateVar.split(",");
                            values.push.apply(values, templateVars);
                        }
                        else {
                            values.push(templateVar);
                        }
                    }
                }
                else {
                    values.push(aDimension);
                }
            }
        }
        return values;
    };
    SensuCoreDatasource.prototype.getAggregateNames = function (dimensions) {
        var values = [];
        for (var i = 0; i < dimensions.length; i++) {
            if (dimensions[i].dimensionType === "aggregateName") {
                var aDimension = dimensions[i].value;
                if (this.templateSrv.getVariableName(aDimension)) {
                    var templateVar = this.templateSrv.replace(aDimension);
                    if (templateVar.length > 0) {
                        if (templateVar.startsWith("{")) {
                            templateVar = templateVar.slice(1, -1);
                            var templateVars = templateVar.split(",");
                            values.push.apply(values, templateVars);
                        }
                        else {
                            values.push(templateVar);
                        }
                    }
                }
                else {
                    values.push(aDimension);
                }
            }
        }
        return values;
    };
    SensuCoreDatasource.prototype.replaceFilterValues = function (filters) {
        for (var i = 0; i < filters.length; i++) {
            var aFilter = filters[i];
            switch (aFilter.filterType) {
                case "field":
                    var aFieldValue = aFilter.filterFieldValue;
                    var templatedValue = this.templateSrv.replace(aFieldValue);
                    aFilter.filterFieldValueReplaced = templatedValue;
                    break;
            }
        }
        return filters;
    };
    SensuCoreDatasource.prototype.getQueryURIByType = function (target) {
        var uris = [];
        var dimensionURI = "/events";
        var clientNames = null;
        var checkNames = null;
        var aggregateNames = null;
        if (target.dimensions !== undefined) {
            clientNames = this.getClientNames(target.dimensions);
            checkNames = this.getCheckNames(target.dimensions);
            aggregateNames = this.getAggregateNames(target.dimensions);
        }
        if (target.filters !== undefined) {
            this.replaceFilterValues(target.filters);
        }
        if (target.alias !== undefined) {
            target.aliasReplaced = this.templateSrv.replace(target.alias);
        }
        switch (target.sourceType) {
            case "aggregates":
            case "aggregates_json":
                uris = Object(_api_aggregate_requests__WEBPACK_IMPORTED_MODULE_2__["getAggregateURIs"])(target, aggregateNames);
                break;
            case "check_subscriptions":
                break;
            case "client_health_json":
                uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientHealthURIs"])(clientNames);
                break;
            case "clients":
            case "clients_json":
                uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientsURIs"])(checkNames, clientNames);
                break;
            case "clienthistory":
                uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientHistoryURIs"])(clientNames);
                break;
            case "event_metrics":
            case "event_metrics_json":
            case "events":
            case "events_json":
                uris = Object(_api_event_requests__WEBPACK_IMPORTED_MODULE_6__["getEventsURIs"])(checkNames, clientNames);
                break;
            case "results_json":
            case "results_table":
                uris = Object(_api_result_requests__WEBPACK_IMPORTED_MODULE_8__["getResultURIs"])(checkNames, clientNames);
                break;
            case "sensu_health_json":
                break;
            case "silenced_entries_json":
                break;
            case "stashes_json":
                break;
        }
        return uris;
    };
    SensuCoreDatasource.prototype.getBuckets = function (responses) {
        var buckets = {};
        for (var i = 0; i < responses.data.length; i++) {
            var refId = responses.data[i].target.refId;
            if (buckets.hasOwnProperty(refId)) {
                buckets[refId].push(responses.data[i]);
            }
            else {
                buckets[refId] = [responses.data[i]];
            }
        }
        return buckets;
    };
    SensuCoreDatasource.prototype.processConversions = function (sourceType, aTarget, responses) {
        var result = { data: [] };
        switch (sourceType) {
            case "aggregates":
                result = Object(_api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__["convertAggregatesToDataPoints"])(aTarget, responses);
                break;
            case "aggregates_json":
                result = Object(_api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__["convertAggregatesToJSON"])(aTarget, responses);
                return result;
            case "clients":
                result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientsToDataPoints"])(aTarget, responses);
                return result;
            case "clients_json":
                result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientsToJSON"])(aTarget, responses);
                return result;
            case "client_health_json":
                result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientHealthToJSON"])(aTarget, responses);
                return result;
            case "clienthistory":
                result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientHistoryToDataPoints"])(aTarget, responses);
                break;
            case "events":
                result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToDataPoints"])(aTarget, responses);
                break;
            case "events_json":
                result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToJSON"])(aTarget, responses);
                break;
            case "event_metrics":
                result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToEventMetrics"])(aTarget, responses);
                break;
            case "event_metrics_json":
                result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToEventMetricsJSON"])(aTarget, responses);
                break;
            case "results_json":
                result = Object(_api_result_converters__WEBPACK_IMPORTED_MODULE_9__["convertResultsToJSON"])(aTarget, responses);
                break;
            case "results_table":
                result = Object(_api_result_converters__WEBPACK_IMPORTED_MODULE_9__["convertResultsToTable"])(aTarget, responses);
                break;
            default:
                console.log("Unknown source type");
                break;
        }
        return result;
    };
    SensuCoreDatasource.prototype.setRawTargets = function (aTarget, result) {
        for (var i = 0; i < result.data.length; i++) {
            result.data[i].rawTarget = result.data[i].target;
        }
        return result;
    };
    SensuCoreDatasource.prototype.processFilters = function (aTarget, result) {
        if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
            var filterData = [];
            for (var i = 0; i < aTarget.filters.length; i++) {
                var aFilter = aTarget.filters[i];
                for (var j = 0; j < result.data.length; j++) {
                    var aRawTarget = result.data[j].rawTarget;
                    if (aFilter.filterType === aRawTarget) {
                        if (aTarget.aliasReplaced) {
                            result.data[j].target = aTarget.aliasReplaced + " " + aRawTarget;
                        }
                        filterData.push(result.data[j]);
                    }
                }
            }
            if (filterData.length > 0) {
                result.data = filterData;
            }
        }
        else {
            if (aTarget.aliasReplaced) {
                for (var i = 0; i < result.data.length; i++) {
                    result.data[i].target = aTarget.aliasReplaced;
                }
            }
        }
        return result;
    };
    SensuCoreDatasource.prototype.parseQueryResult = function (responses) {
        var allResults = { data: [] };
        if (!responses || !responses.data) {
            return allResults;
        }
        var buckets = this.getBuckets(responses);
        var bucketKeys = Object.keys(buckets);
        for (var i = 0; i < bucketKeys.length; i++) {
            var aKey = bucketKeys[i];
            var sourceType = buckets[aKey][0].target.sourceType;
            var aTarget = buckets[aKey][0].target;
            var result = this.processConversions(sourceType, aTarget, responses);
            result = this.setRawTargets(aTarget, result);
            result = this.processFilters(aTarget, result);
            for (var i_1 = 0; i_1 < result.data.length; i_1++) {
                allResults.data.push(result.data[i_1]);
            }
        }
        return allResults;
    };
    SensuCoreDatasource.prototype.getCheckInterval = function (client, checkName) {
    };
    SensuCoreDatasource.prototype.dimensionFindValues = function (target, dimension) {
        var dimensionURI = "/clients";
        switch (dimension.dimensionType) {
            case "clientName":
                dimensionURI = "/clients";
                break;
            case "checkName":
                dimensionURI = "/checks";
                break;
            case "aggregateName":
                dimensionURI = "/aggregates";
                break;
        }
        return this.backendSrv.datasourceRequest({
            url: this.url + dimensionURI,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            }
        }).then(this.mapToTextValue);
    };
    SensuCoreDatasource.prototype.mapToTextValue = function (result) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data, function (d, i) {
            return {
                text: d.name,
                value: d.name
            };
        });
    };
    SensuCoreDatasource.prototype.filterFindValues = function (target, filter) {
        var filterURI = "/clients";
        switch (filter.filterType) {
            case "clientName":
                filterURI = "/clients";
                break;
            case "checkName":
                filterURI = "/checks";
                break;
            case "aggregateName":
                filterURI = "/aggregates";
                break;
        }
        return this.backendSrv.datasourceRequest({
            url: this.url + filterURI,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            }
        }).then(this.mapToTextValue);
    };
    SensuCoreDatasource.prototype.query = function (options) {
        var queries = [];
        var thisRef = this;
        var singleTarget = null;
        options.targets.forEach(function (target) {
            queries.push(target);
        });
        var interval = options.interval;
        var zz = Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["interval_to_ms"])(interval);
        if (Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["interval_to_ms"])(interval) < this.minimumInterval) {
            interval = Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["secondsToHms"])(this.minimumInterval / 1000);
        }
        var deferred = this.q.defer();
        if (queries.length === 0) {
            deferred.resolve({
                data: []
            });
            return deferred.promise;
        }
        var allQueries = this.q.all({
            first: thisRef.multipleDataQueries(queries),
        });
        allQueries.then(function (results) {
            deferred.resolve(results.first);
        });
        return deferred.promise;
    };
    SensuCoreDatasource.prototype.singleDataQuery = function (singleTarget, uriType) {
        var deferred = this.q.defer();
        var params = {};
        var httpOptions = {
            method: "GET",
            url: this.url + uriType,
            params: params,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            }
        };
        this.backendSrv.datasourceRequest(httpOptions)
            .then(function (response) {
            var anError = null;
            if (response.status !== 200) {
                console.log("error...");
                anError = new Error("Bad Status: " + response.status);
                deferred.reject(anError);
            }
            if (!response.data) {
                anError = new Error("No data");
                deferred.reject(anError);
            }
            deferred.resolve({ target: singleTarget, response: response });
        }, function (response) {
            console.error("Unable to load data. Response: %o", response.data ? response.data.message : response);
            var error = new Error("Unable to load data");
            deferred.reject(error);
        });
        return deferred.promise;
    };
    SensuCoreDatasource.prototype.multiDone = function (responses) {
        return this.parseQueryResult(responses);
    };
    SensuCoreDatasource.prototype.multipleDataQueries = function (pendingQueries) {
        var deferred = this.q.defer();
        var dataCalls = [];
        var thisRef = this;
        var index = 0;
        while (index < pendingQueries.length) {
            var aTarget = pendingQueries[index];
            var uriList = this.getQueryURIByType(aTarget);
            for (var i = 0; i < uriList.length; i++) {
                dataCalls.push(thisRef.singleDataQuery(aTarget, uriList[i]));
            }
            index++;
        }
        this.q.all(dataCalls)
            .then(function (results) {
            var response = {
                data: []
            };
            var i = 0;
            while (i < results.length) {
                response.data.push(results[i]);
                i++;
            }
            deferred.resolve(thisRef.multiDone(response));
        }, function (errors) {
            deferred.reject(errors);
        }, function (updates) {
            deferred.update(updates);
        });
        return deferred.promise;
    };
    SensuCoreDatasource.prototype.getServerInfo = function () {
        return this.backendSrv.datasourceRequest({
            url: this.url + "/info",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            },
            method: "GET",
        }).then(function (response) {
            return response.data;
        });
    };
    SensuCoreDatasource.prototype.testDatasource = function () {
        return this.backendSrv.datasourceRequest({
            url: this.url + "/info",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.basicAuth
            },
            method: "GET",
        }).then(function (response) {
            if (response.status === 200) {
                return {
                    status: "success",
                    message: "Data source is working",
                    title: "Success"
                };
            }
            return {
                status: "error",
                message: "Data source is not working",
                title: "Error"
            };
        });
    };
    return SensuCoreDatasource;
}());



/***/ }),

/***/ "./datasource/sensu-core/module.ts":
/*!*****************************************!*\
  !*** ./datasource/sensu-core/module.ts ***!
  \*****************************************/
/*! exports provided: Datasource, QueryCtrl, ConfigCtrl, QueryOptionsCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return SensuConfigCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryOptionsCtrl", function() { return SensuQueryOptionsCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./datasource/sensu-core/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["SensuCoreDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./datasource/sensu-core/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["SensuCoreDatasourceQueryCtrl"]; });

/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__);



Object(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["loadPluginCss"])({
    dark: "plugins/grafana-sensu-app/datasource/sensu-core/css/query-editor.css",
    light: "plugins/grafana-sensu-app/datasource/sensu-core/css/query-editor.css"
});
var SensuConfigCtrl = (function () {
    function SensuConfigCtrl() {
    }
    SensuConfigCtrl.templateUrl = "datasource/sensu-core/partials/config.html";
    return SensuConfigCtrl;
}());
var SensuQueryOptionsCtrl = (function () {
    function SensuQueryOptionsCtrl() {
    }
    SensuQueryOptionsCtrl.templateUrl = "datasource/sensu-core/partials/query.options.html";
    return SensuQueryOptionsCtrl;
}());



/***/ }),

/***/ "./datasource/sensu-core/query_ctrl.ts":
/*!*********************************************!*\
  !*** ./datasource/sensu-core/query_ctrl.ts ***!
  \*********************************************/
/*! exports provided: SensuCoreDatasourceQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensuCoreDatasourceQueryCtrl", function() { return SensuCoreDatasourceQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__);


var SensuCoreDatasourceQueryCtrl = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SensuCoreDatasourceQueryCtrl, _super);
    function SensuCoreDatasourceQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.scope = $scope;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.templateSrv = templateSrv;
        _this.sourceTypes = [
            {
                text: "Aggregates",
                value: "aggregates",
            },
            {
                text: "Aggregates as JSON",
                value: "aggregates_json",
            },
            {
                text: "Check Subscriptions",
                value: "check_subscriptions",
            },
            {
                text: "Clients",
                value: "clients",
            },
            {
                text: "Clients as JSON",
                value: "clients_json",
            },
            {
                text: "Client Health as JSON",
                value: "client_health_json",
            },
            {
                text: "Client History",
                value: "client_history",
            },
            {
                text: "Events",
                value: "events",
            },
            {
                text: "Events as JSON",
                value: "events_json",
            },
            {
                text: "Event Metrics",
                value: "event_metrics",
            },
            {
                text: "Event Metrics JSON",
                value: "event_metrics_json",
            },
            {
                text: "Results as JSON",
                value: "results_json",
            },
            {
                text: "Results as Table",
                value: "results_table",
            },
            {
                text: "Sensu Health",
                value: "sensu_health_json",
            },
            {
                text: "Silenced Entries",
                value: "silenced_entries_json",
            },
            {
                text: "Stashes",
                value: "stashes_json",
            }
        ];
        _this.dimensionTypes = {
            aggregates: [
                {
                    text: "Aggregate Name",
                    value: "aggregateName",
                }
            ],
            aggregates_json: [
                {
                    text: "Aggregate Name",
                    value: "aggregateName",
                }
            ],
            check_subscriptions: [
                {
                    text: "Aggregate Name",
                    value: "aggregateName",
                },
                {
                    text: "Check Name",
                    value: "checkName",
                },
                {
                    text: "Check Type",
                    value: "checkType",
                },
                {
                    text: "Source (JIT Client)",
                    value: "sourceName",
                }
            ],
            clients: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            client_health_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                }
            ],
            client_history: [
                {
                    text: "Client Name",
                    value: "clientName"
                }
            ],
            clients_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            events: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName"
                }
            ],
            events_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName"
                }
            ],
            event_metrics: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName"
                }
            ],
            event_metrics_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName"
                }
            ],
            results_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            results_table: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            sensu_health_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            silenced_entries_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ],
            stashes_json: [
                {
                    text: "Client Name",
                    value: "clientName"
                },
                {
                    text: "Check Name",
                    value: "checkName",
                }
            ]
        };
        _this.filterTypes = {
            aggregates: [
                {
                    text: "Number of Checks",
                    value: "checks",
                    type: "value"
                },
                {
                    text: "Number of Clients",
                    value: "clients",
                    type: "value"
                },
                {
                    text: "State Critical",
                    value: "critical",
                    type: "value"
                },
                {
                    text: "State OK",
                    value: "ok",
                    type: "value"
                },
                {
                    text: "State Stale",
                    value: "stale",
                    type: "value"
                },
                {
                    text: "State Unknown",
                    value: "unknown",
                    type: "value"
                },
                {
                    text: "State Warning",
                    value: "warning",
                    type: "value"
                },
                {
                    text: "Total Checks",
                    value: "total",
                    type: "value"
                }
            ],
            client_health_json: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                }
            ],
            clients: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            clients_json: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            events: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Check Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            events_json: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Check Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            event_metrics: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Check Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            event_metrics_json: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Check Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ],
            results_json: [
                {
                    text: "Client Name",
                    value: "fetch"
                },
                {
                    text: "Client Name RegEx",
                    value: "regex"
                },
                {
                    text: "Check Name RegEx",
                    value: "regex"
                },
                {
                    text: "Field",
                    value: "field"
                }
            ]
        };
        _this.aggregateModes = [
            {
                text: "List",
                value: "list"
            },
            {
                text: "Clients",
                value: "clients"
            },
            {
                text: "Checks",
                value: "checks"
            },
            {
                text: "Results Critical",
                value: "results_critical"
            },
            {
                text: "Results OK",
                value: "results_ok"
            },
            {
                text: "Results Unknown",
                value: "results_unknown"
            },
            {
                text: "Results Warning",
                value: "results_warning"
            },
        ];
        _this.clientQueryModes = [
            {
                text: "List",
                value: "list"
            },
            {
                text: "Count",
                value: "count"
            }
        ];
        _this.eventMetricModes = [
            {
                text: "All Events",
                value: "all_events_count"
            },
            {
                text: "Active Events",
                value: "active_events_count"
            },
            {
                text: "Critical Total Count",
                value: "critical_count"
            },
            {
                text: "Critical Active Count",
                value: "critical_active_count"
            },
            {
                text: "Critical Silenced Count",
                value: "critical_silenced_count"
            },
            {
                text: "Warning Total Count",
                value: "warning_count"
            },
            {
                text: "Warning Silenced Count",
                value: "warning_silenced_count"
            },
            {
                text: "Warning Active Count",
                value: "warning_active_count"
            },
            {
                text: "Unknown Total Count",
                value: "unknown_count"
            },
            {
                text: "Unknown Active Count",
                value: "unknown_active_count"
            },
            {
                text: "Unknown Silenced Count",
                value: "unknown_silenced_count"
            },
            {
                text: "Silenced Total Count",
                value: "silenced_count"
            },
            {
                text: "Clients Silenced Count",
                value: "clients_silenced_count"
            },
            {
                text: "Checks Silenced Count",
                value: "checks_silenced_count"
            }
        ];
        _this.target.clientQueryMode = _this.target.clientQueryMode || "count";
        _this.target.eventMetricMode = _this.target.eventMetricMode || "all_events_count";
        _this.target.aggregateMode = _this.target.aggregateMode || "list";
        _this.target.sourceType = _this.target.sourceType || "events";
        _this.target.dimensions = _this.target.dimensions || [];
        return _this;
    }
    SensuCoreDatasourceQueryCtrl.prototype.removeDimension = function (dimension) {
        if (this.target.dimensions) {
            this.target.dimensions.splice(this.target.dimensions.indexOf(dimension), 1);
            this.panelCtrl.refresh();
        }
    };
    SensuCoreDatasourceQueryCtrl.prototype.addDimension = function () {
        if (!this.target.dimensions) {
            this.target.dimensions = [];
        }
        var dimensionsForSourceType = this.dimensionTypes[this.target.sourceType];
        var defaultDimensionType = dimensionsForSourceType[0].value;
        this.target.dimensions.push({
            name: null,
            value: null,
            dimensionType: defaultDimensionType
        });
    };
    SensuCoreDatasourceQueryCtrl.prototype.getDimensionValues = function (dimension) {
        if (dimension) {
            return this.datasource.dimensionFindValues(this.target, dimension)
                .then(this.uiSegmentSrv.transformToSegments(true));
        }
    };
    SensuCoreDatasourceQueryCtrl.prototype.removeFilter = function (filter) {
        if (this.target.filters) {
            this.target.filters.splice(this.target.filters.indexOf(filter), 1);
            this.panelCtrl.refresh();
        }
    };
    SensuCoreDatasourceQueryCtrl.prototype.addFilter = function () {
        if (!this.target.filters) {
            this.target.filters = [];
        }
        var filtersForSourceType = this.filterTypes[this.target.sourceType];
        var defaultFilterType = filtersForSourceType[0].type;
        this.target.filters.push({
            name: null,
            value: null,
            filterType: defaultFilterType
        });
    };
    SensuCoreDatasourceQueryCtrl.prototype.getFilterValues = function (filter) {
        if (filter) {
            return this.datasource.filterFindValues(this.target, filter)
                .then(this.uiSegmentSrv.transformToSegments(true));
        }
    };
    SensuCoreDatasourceQueryCtrl.prototype.getOptions = function () {
        return this.datasource.metricFindQuery(this.target)
            .then(this.uiSegmentSrv.transformToSegments(true));
    };
    SensuCoreDatasourceQueryCtrl.prototype.sourceTypeChanged = function () {
        if (this.target.dimensions) {
            this.target.dimensions = [];
        }
        this.onChangeInternal();
    };
    SensuCoreDatasourceQueryCtrl.prototype.modeChanged = function () {
        this.onChangeInternal();
    };
    SensuCoreDatasourceQueryCtrl.prototype.onChangeInternal = function () {
        this.panelCtrl.refresh();
    };
    SensuCoreDatasourceQueryCtrl.templateUrl = "datasource/sensu-core/partials/query.editor.html";
    return SensuCoreDatasourceQueryCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]));



/***/ }),

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9iZ2Fubi9Eb2N1bWVudHMvcmVwb3MtZ3JhZmFuYS1wbHVnaW5zL1dJUC9ncmFmYW5hLXNlbnN1LWFwcC9zcmMvZGF0YXNvdXJjZS9zZW5zdS1jb3JlL2FwaS9hZ2dyZWdhdGVfY29udmVydGVycy50cyIsIndlYnBhY2s6Ly8vc3JjL1VzZXJzL2JnYW5uL0RvY3VtZW50cy9yZXBvcy1ncmFmYW5hLXBsdWdpbnMvV0lQL2dyYWZhbmEtc2Vuc3UtYXBwL3NyYy9kYXRhc291cmNlL3NlbnN1LWNvcmUvYXBpL2FnZ3JlZ2F0ZV9yZXF1ZXN0cy50cyIsIndlYnBhY2s6Ly8vc3JjL1VzZXJzL2JnYW5uL0RvY3VtZW50cy9yZXBvcy1ncmFmYW5hLXBsdWdpbnMvV0lQL2dyYWZhbmEtc2Vuc3UtYXBwL3NyYy9kYXRhc291cmNlL3NlbnN1LWNvcmUvYXBpL2NsaWVudF9jb252ZXJ0ZXJzLnRzIiwid2VicGFjazovLy9zcmMvVXNlcnMvYmdhbm4vRG9jdW1lbnRzL3JlcG9zLWdyYWZhbmEtcGx1Z2lucy9XSVAvZ3JhZmFuYS1zZW5zdS1hcHAvc3JjL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9hcGkvY2xpZW50X2ZpbHRlcnMudHMiLCJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9iZ2Fubi9Eb2N1bWVudHMvcmVwb3MtZ3JhZmFuYS1wbHVnaW5zL1dJUC9ncmFmYW5hLXNlbnN1LWFwcC9zcmMvZGF0YXNvdXJjZS9zZW5zdS1jb3JlL2FwaS9jbGllbnRfcmVxdWVzdHMudHMiLCJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9iZ2Fubi9Eb2N1bWVudHMvcmVwb3MtZ3JhZmFuYS1wbHVnaW5zL1dJUC9ncmFmYW5hLXNlbnN1LWFwcC9zcmMvZGF0YXNvdXJjZS9zZW5zdS1jb3JlL2FwaS9ldmVudF9jb252ZXJ0ZXJzLnRzIiwid2VicGFjazovLy9zcmMvVXNlcnMvYmdhbm4vRG9jdW1lbnRzL3JlcG9zLWdyYWZhbmEtcGx1Z2lucy9XSVAvZ3JhZmFuYS1zZW5zdS1hcHAvc3JjL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9hcGkvZXZlbnRfZmlsdGVycy50cyIsIndlYnBhY2s6Ly8vc3JjL1VzZXJzL2JnYW5uL0RvY3VtZW50cy9yZXBvcy1ncmFmYW5hLXBsdWdpbnMvV0lQL2dyYWZhbmEtc2Vuc3UtYXBwL3NyYy9kYXRhc291cmNlL3NlbnN1LWNvcmUvYXBpL2V2ZW50X3JlcXVlc3RzLnRzIiwid2VicGFjazovLy9zcmMvVXNlcnMvYmdhbm4vRG9jdW1lbnRzL3JlcG9zLWdyYWZhbmEtcGx1Z2lucy9XSVAvZ3JhZmFuYS1zZW5zdS1hcHAvc3JjL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9hcGkvcmVzdWx0X2NvbnZlcnRlcnMudHMiLCJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9iZ2Fubi9Eb2N1bWVudHMvcmVwb3MtZ3JhZmFuYS1wbHVnaW5zL1dJUC9ncmFmYW5hLXNlbnN1LWFwcC9zcmMvZGF0YXNvdXJjZS9zZW5zdS1jb3JlL2FwaS9yZXN1bHRfcmVxdWVzdHMudHMiLCJ3ZWJwYWNrOi8vL3NyYy9Vc2Vycy9iZ2Fubi9Eb2N1bWVudHMvcmVwb3MtZ3JhZmFuYS1wbHVnaW5zL1dJUC9ncmFmYW5hLXNlbnN1LWFwcC9zcmMvZGF0YXNvdXJjZS9zZW5zdS1jb3JlL2FwaS91dGlscy50cyIsIndlYnBhY2s6Ly8vc3JjL1VzZXJzL2JnYW5uL0RvY3VtZW50cy9yZXBvcy1ncmFmYW5hLXBsdWdpbnMvV0lQL2dyYWZhbmEtc2Vuc3UtYXBwL3NyYy9kYXRhc291cmNlL3NlbnN1LWNvcmUvZGF0YXNvdXJjZS50cyIsIndlYnBhY2s6Ly8vc3JjL1VzZXJzL2JnYW5uL0RvY3VtZW50cy9yZXBvcy1ncmFmYW5hLXBsdWdpbnMvV0lQL2dyYWZhbmEtc2Vuc3UtYXBwL3NyYy9kYXRhc291cmNlL3NlbnN1LWNvcmUvbW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvVXNlcnMvYmdhbm4vRG9jdW1lbnRzL3JlcG9zLWdyYWZhbmEtcGx1Z2lucy9XSVAvZ3JhZmFuYS1zZW5zdS1hcHAvc3JjL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9xdWVyeV9jdHJsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcC9jb3JlL3V0aWxzL2tiblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcC9wbHVnaW5zL3Nka1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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T0Qsc0RBQWUsR0FBZixVQUFnQixNQUFNO1FBQ3BCLElBQUksTUFBTSxFQUFFO1lBRVYsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO2lCQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQU1ELGlEQUFVLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV2RCxDQUFDO0lBTUQsd0RBQWlCLEdBQWpCO1FBRUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBTUQsa0RBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFNRCx1REFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUF4bkJNLHdDQUFXLEdBQUcsa0RBQWtELENBQUM7SUEwbkIxRSxtQ0FBQztDQUFBLENBM25CaUQsaUVBQVMsR0EybkIxRDtBQTNuQndDOzs7Ozs7Ozs7Ozs7QUNKekMsd0U7Ozs7Ozs7Ozs7O0FDQUEscUU7Ozs7Ozs7Ozs7O0FDQUEsb0QiLCJmaWxlIjoiZGF0YXNvdXJjZS9zZW5zdS1jb3JlL21vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiKTtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmsuaWQsIGNodW5rLm1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIwOWU5M2U3ZDMzYmYxNjNlNDRmMlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJkYXRhc291cmNlL3NlbnN1LWNvcmUvbW9kdWxlXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9kYXRhc291cmNlL3NlbnN1LWNvcmUvbW9kdWxlLnRzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kYXRhc291cmNlL3NlbnN1LWNvcmUvbW9kdWxlLnRzXCIpO1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcbiAqXG4gKi9cbmltcG9ydCB7IGdldFJlc3BvbnNlRm9yVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBbY29udmVydEFnZ3JlZ2F0ZXNUb0RhdGFQb2ludHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlc3BvbnNlIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY29udmVydEFnZ3JlZ2F0ZXNUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRm9yVGFyZ2V0KGFUYXJnZXQsIHJlc3BvbnNlcyk7XG4gIC8vIHRoZSByZXN1bHQgaGFzIG5vIFwiZGF0YXBvaW50c1wiLCBuZWVkIHRvIGNyZWF0ZSBpdCBiYXNlZCBvbiB0aGUgY2hlY2sgZGF0YVxuXG4gIC8vIHdoZW4gd2UgaGF2ZSBhIGNoZWNrbmFtZSBhbmQgYW4gY2xpZW50TmFtZSwgdGhlIHJlc3BvbnNlIGlzIGRpZmZlcmVudCwgdGhlXG4gIC8vIGRhdGEgaXMgbm90IGFuIGFycmF5LCBidXQgY29udGFpbnMgdGhlIHNhbWUgaW5mb3JtYXRpb24sIHJlY3JlYXRlIGFuZCBwdXNoXG4gIGlmIChyZXNwb25zZS5kYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHNpbmdsZURhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgIHJlc3BvbnNlLmRhdGEgPSBbXTtcbiAgICByZXNwb25zZS5kYXRhLnB1c2goc2luZ2xlRGF0YSk7XG4gIH1cbiAgLy8gc3RvcmFnZSBmb3IgbmV3IGRhdGEgc2VyaWVzIGNvbnN0cnVjdGVkIGJ5IGFnZ3JlZ2F0ZSByZXNwb25zZXNcbiAgdmFyIG5ld0RhdGEgPSBudWxsO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYW5BZ2dyZWdhdGUgPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIC8vIGNoZWNrcyBpcyBkZWZpbmVkIHdoZW4gdGhlIGFnZ3JlZ2F0ZSBtb2RlIGlzIGVpdGhlciBcIkNsaWVudHNcIiBvciBcIkxpc3RcIlxuICAgIGlmIChhbkFnZ3JlZ2F0ZS5jaGVja3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gY3JlYXRlIGEgbmV3IGJsb2NrIG9mIGRhdGFwb2ludHMgZm9yIGVhY2ggYWdncmVnYXRlIHJlc3VsdCBqc29uIGVudHJ5XG4gICAgICAvL1xuICAgICAgdmFyIGNoZWNrVHlwZSA9IHR5cGVvZihhbkFnZ3JlZ2F0ZS5jaGVja3MpO1xuICAgICAgc3dpdGNoIChjaGVja1R5cGUpIHtcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgIC8vIGNoZWNrc1R5cGUgaXMgYSBudW1iZXIsIHdoaWNoIGlzIGFuIGFnZ3JlZ2F0ZSBsaXN0IHJlc3BvbnNlXG4gICAgICAgICAgbmV3RGF0YSA9IGNvbnZlcnRFdmVudERhdGFUb0FnZ3JlZ2F0ZU1vZGVMaXN0KGFuQWdncmVnYXRlLCBuZXdEYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgIC8vIGNoZWNrVHlwZSBpcyBhbiBvYmplY3QsIHdoaWNoIGlzIGFuIGFnZ3JlZ2F0ZSBjbGllbnRzIHJlc3BvbnNlXG4gICAgICAgICAgbmV3RGF0YSA9IGNvbnZlcnRFdmVudERhdGFUb0FnZ3JlZ2F0ZU1vZGVDbGllbnQoYW5BZ2dyZWdhdGUsIG5ld0RhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIGNsaWVudHMgaXMgZGVmaW5lZCB3aGVuIHRoZSBhZ2dyZWdhdGUgbW9kZSBpcyBcIkNoZWNrc1wiXG4gICAgaWYgKGFuQWdncmVnYXRlLmNsaWVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3RGF0YSA9IGNvbnZlcnRFdmVudERhdGFUb0FnZ3JlZ2F0ZU1vZGVDaGVja3MoYW5BZ2dyZWdhdGUsIG5ld0RhdGEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIHN1bW1hcnkgaXMgZGVmaW5lZCB3aGVuIHRoZSBhZ2dyZWdhdGUgbW9kZSBpcyBcIlJlc3VsdHMgT0svV0FSTklORy9DUklUSUNBTC9VTktOT1dOXCJcbiAgICBpZiAoYW5BZ2dyZWdhdGUuc3VtbWFyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdEYXRhID0gY29udmVydEV2ZW50RGF0YVRvQWdncmVnYXRlTW9kZVJlc3VsdHMoYW5BZ2dyZWdhdGUsIG5ld0RhdGEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBhIHNpbXBsZSBhZ2dyZWdhdGUgcmVzcG9uc2UgKG5vIG1vZGUpXG4gICAgdmFyIGRhdGFwb2ludHMgPSBbXTtcbiAgICAvLyB0aW1lc3RhbXAgaXMgdGhlIHF1ZXJ5IG5vdyAoanVzdCB1c2Ugbm93KVxuICAgIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICAgIGRhdGFwb2ludHNbMF0gPSBbMCwgdGltZXN0YW1wXTtcbiAgICBhbkFnZ3JlZ2F0ZS5kYXRhcG9pbnRzID0gZGF0YXBvaW50cztcbiAgICAvLyBzZXQgdGhlIHRhcmdldCB0byBiZSB0aGUgbmFtZSBvZiB0aGUgYWdncmVnYXRlXG4gICAgYW5BZ2dyZWdhdGUudGFyZ2V0ID0gYW5BZ2dyZWdhdGUubmFtZTtcbiAgfVxuICBpZiAobmV3RGF0YSAhPT0gbnVsbCkge1xuICAgIC8vIG92ZXJ3cml0ZSB0aGUgb2xkIGRhdGEgZmllbGQgd2l0aCB0aGUgbmV3IGV4cGFuZGVkIHNldFxuICAgIHJlc3BvbnNlLmRhdGEgPSBuZXdEYXRhO1xuICB9XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gY29udmVydEV2ZW50RGF0YVRvQWdncmVnYXRlTW9kZVJlc3VsdHMoYW5FdmVudCwgZGF0YVNldCkge1xuICB2YXIgdGltZXN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKTtcbiAgaWYgKGRhdGFTZXQgPT09IG51bGwpIHtcbiAgICAvLyBpbml0aWFsaXplIGVtcHR5IGFycmF5XG4gICAgZGF0YVNldCA9IFtdO1xuICB9XG4gIC8vIGl0ZXJhdGUgb3ZlciB0aGUgY2hlY2tzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYW5FdmVudC5zdW1tYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFTdW1tYXJ5ID0gYW5FdmVudC5zdW1tYXJ5W2ldO1xuICAgIHZhciBjaGVja0RhdGEgPSB7XG4gICAgICB0YXJnZXQ6IGFuRXZlbnQuY2hlY2ssXG4gICAgICBjbGllbnRzOiBhU3VtbWFyeS5jbGllbnRzLFxuICAgICAgZGF0YXBvaW50czogW1xuICAgICAgICBbYVN1bW1hcnkudG90YWwsIHRpbWVzdGFtcF1cbiAgICAgIF1cbiAgICB9O1xuICAgIGRhdGFTZXQucHVzaChjaGVja0RhdGEpO1xuICB9XG4gIHJldHVybiBkYXRhU2V0O1xufVxuLy8gQW4gYWdncmVnYXRlIGNoZWNrcyByZXN1bHQgaGFzIHRoZSBmb3JtYXRcbi8vIHtcbi8vICAgIGNsaWVudHM6IFtcbi8vICAgICAgY2xpZW50TmFtZVxuLy8gICAgXSxcbi8vICAgIG5hbWU6IGNoZWNrTmFtZVxuLy8gfVxuZnVuY3Rpb24gY29udmVydEV2ZW50RGF0YVRvQWdncmVnYXRlTW9kZUNoZWNrcyhhbkV2ZW50LCBkYXRhU2V0KSB7XG4gIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICBpZiAoZGF0YVNldCA9PT0gbnVsbCkge1xuICAgIC8vIGluaXRpYWxpemUgZW1wdHkgYXJyYXlcbiAgICBkYXRhU2V0ID0gW107XG4gIH1cbiAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBjaGVja3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbkV2ZW50LmNsaWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2xpZW50TmFtZSA9IGFuRXZlbnQuY2xpZW50c1tpXTtcbiAgICB2YXIgY2hlY2tEYXRhID0ge1xuICAgICAgdGFyZ2V0OiBhbkV2ZW50Lm5hbWUsXG4gICAgICBkYXRhcG9pbnRzOiBbXG4gICAgICAgIFtjbGllbnROYW1lLCB0aW1lc3RhbXBdXG4gICAgICBdXG4gICAgfTtcbiAgICBkYXRhU2V0LnB1c2goY2hlY2tEYXRhKTtcbiAgfVxuICByZXR1cm4gZGF0YVNldDtcbn1cblxuLy8gQW4gYWdncmVnYXRlIGNsaWVudHMgcmVzdWx0IGhhcyB0aGUgZm9ybWF0XG4vLyB7XG4vLyAgICBjaGVja3M6IFtcbi8vICAgICAgY2hlY2tOYW1lXG4vLyAgICBdLFxuLy8gICAgbmFtZTogY2xpZW50TmFtZVxuLy8gfVxuZnVuY3Rpb24gY29udmVydEV2ZW50RGF0YVRvQWdncmVnYXRlTW9kZUNsaWVudChhbkV2ZW50LCBkYXRhU2V0KSB7XG4gIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xuICBpZiAoZGF0YVNldCA9PT0gbnVsbCkge1xuICAgIC8vIGluaXRpYWxpemUgZW1wdHkgYXJyYXlcbiAgICBkYXRhU2V0ID0gW107XG4gIH1cbiAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBjaGVja3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbkV2ZW50LmNoZWNrcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjaGVja05hbWUgPSBhbkV2ZW50LmNoZWNrc1tpXTtcbiAgICB2YXIgY2xpZW50RGF0YSA9IHtcbiAgICAgIHRhcmdldDogYW5FdmVudC5uYW1lLFxuICAgICAgZGF0YXBvaW50czogW1xuICAgICAgICBbY2hlY2tOYW1lLCB0aW1lc3RhbXBdXG4gICAgICBdXG4gICAgfTtcbiAgICBkYXRhU2V0LnB1c2goY2xpZW50RGF0YSk7XG4gIH1cbiAgcmV0dXJuIGRhdGFTZXQ7XG59XG4vLyBBbiBhZ2dyZWdhdGUgbGlzdCByZXN1bHQgaGFzIHRoZSBmb3JtYXRcbi8vIHtcbi8vICAgY2hlY2tzOiBpbnQsXG4vLyAgIGNsaWVudHM6IGludCxcbi8vICAgcmVzdWx0czoge1xuLy8gICAgY3JpdGljYWw6IGludCxcbi8vICAgIG9rOiBpbnQsXG4vLyAgICBzdGFsZTogaW50LFxuLy8gICAgdG90YWw6IGludCxcbi8vICAgIHVua25vd246IGludCxcbi8vICAgIHdhcm5pbmc6IGludFxuLy8gICB9XG4vLyB9XG5mdW5jdGlvbiBjb252ZXJ0RXZlbnREYXRhVG9BZ2dyZWdhdGVNb2RlTGlzdChhbkV2ZW50LCBkYXRhU2V0KSB7XG4gIGlmIChkYXRhU2V0ID09PSBudWxsKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBlbXB0eSBhcnJheVxuICAgIGRhdGFTZXQgPSBbXTtcbiAgfVxuICB2YXIgdGltZXN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKTtcbiAgdmFyIGl0ZW0gPSB7XG4gICAgdGFyZ2V0OiBcImNoZWNrc1wiLFxuICAgIGRhdGFwb2ludHM6IFtcbiAgICAgIFthbkV2ZW50LmNoZWNrcywgdGltZXN0YW1wXVxuICAgIF1cbiAgfTtcbiAgZGF0YVNldC5wdXNoKGl0ZW0pO1xuICBpdGVtID0ge1xuICAgIHRhcmdldDogXCJjbGllbnRzXCIsXG4gICAgZGF0YXBvaW50czogW1xuICAgICAgW2FuRXZlbnQuY2xpZW50cywgdGltZXN0YW1wXVxuICAgIF1cbiAgfTtcbiAgZGF0YVNldC5wdXNoKGl0ZW0pO1xuICBpdGVtID0ge1xuICAgIHRhcmdldDogXCJjcml0aWNhbFwiLFxuICAgIGRhdGFwb2ludHM6IFtcbiAgICAgIFthbkV2ZW50LnJlc3VsdHMuY3JpdGljYWwsIHRpbWVzdGFtcF1cbiAgICBdXG4gIH07XG4gIGRhdGFTZXQucHVzaChpdGVtKTtcbiAgaXRlbSA9IHtcbiAgICB0YXJnZXQ6IFwib2tcIixcbiAgICBkYXRhcG9pbnRzOiBbXG4gICAgICBbYW5FdmVudC5yZXN1bHRzLm9rLCB0aW1lc3RhbXBdXG4gICAgXVxuICB9O1xuICBkYXRhU2V0LnB1c2goaXRlbSk7XG4gIGl0ZW0gPSB7XG4gICAgdGFyZ2V0OiBcInN0YWxlXCIsXG4gICAgZGF0YXBvaW50czogW1xuICAgICAgW2FuRXZlbnQucmVzdWx0cy5zdGFsZSwgdGltZXN0YW1wXVxuICAgIF1cbiAgfTtcbiAgZGF0YVNldC5wdXNoKGl0ZW0pO1xuICBpdGVtID0ge1xuICAgIHRhcmdldDogXCJ0b3RhbFwiLFxuICAgIGRhdGFwb2ludHM6IFtcbiAgICAgIFthbkV2ZW50LnJlc3VsdHMudG90YWwsIHRpbWVzdGFtcF1cbiAgICBdXG4gIH07XG4gIGRhdGFTZXQucHVzaChpdGVtKTtcbiAgaXRlbSA9IHtcbiAgICB0YXJnZXQ6IFwidW5rbm93blwiLFxuICAgIGRhdGFwb2ludHM6IFtcbiAgICAgIFthbkV2ZW50LnJlc3VsdHMudW5rbm93biwgdGltZXN0YW1wXVxuICAgIF1cbiAgfTtcbiAgZGF0YVNldC5wdXNoKGl0ZW0pO1xuICBpdGVtID0ge1xuICAgIHRhcmdldDogXCJ3YXJuaW5nXCIsXG4gICAgZGF0YXBvaW50czogW1xuICAgICAgW2FuRXZlbnQucmVzdWx0cy53YXJuaW5nLCB0aW1lc3RhbXBdXG4gICAgXVxuICB9O1xuICBkYXRhU2V0LnB1c2goaXRlbSk7XG5cbiAgcmV0dXJuIGRhdGFTZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUb0FnZ3JlZ2F0ZU1vZGVDbGllbnRKU09OKGRhdGEsIGRhdGFTZXQpIHtcbiAgdmFyIHRpbWVzdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XG4gIGlmIChkYXRhU2V0ID09PSBudWxsKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBlbXB0eSBhcnJheVxuICAgIGRhdGFTZXQgPSBbXTtcbiAgfVxuICAvLyBpdGVyYXRlIG92ZXIgdGhlIGNoZWNrc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuY2hlY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNoZWNrTmFtZSA9IGRhdGEuY2hlY2tzW2ldO1xuICAgIHZhciBjbGllbnREYXRhID0ge1xuICAgICAgdGFyZ2V0OiBkYXRhLm5hbWUsXG4gICAgICBkYXRhcG9pbnRzOiBbXG4gICAgICAgIFtjaGVja05hbWUsIHRpbWVzdGFtcF1cbiAgICAgIF1cbiAgICB9O1xuICAgIGRhdGFTZXQucHVzaChjbGllbnREYXRhKTtcbiAgfVxuICByZXR1cm4gZGF0YVNldDtcbn1cblxuLyoqXG4gKiBbY29udmVydEFnZ3JlZ2F0ZXNUb0pTT04gZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlc3BvbnNlIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gYVRhcmdldCAgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRBZ2dyZWdhdGVzVG9KU09OKGFUYXJnZXQsIHJlc3BvbnNlcykge1xuICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpO1xuICB2YXIgYWdncmVnYXRlTmFtZSA9IFwiQUxMXCI7XG4gIGlmIChhVGFyZ2V0LmRpbWVuc2lvbnMubGVuZ3RoID4gMCkge1xuICAgIGFnZ3JlZ2F0ZU5hbWUgPSBhVGFyZ2V0LmRpbWVuc2lvbnNbMF0udmFsdWU7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIHZhciBkYXRhcG9pbnRzID0gW107XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBjbGllbnQ6IGl0ZW0ubmFtZSxcbiAgICAgIGNoZWNrczogaXRlbS5jaGVja3MsXG4gICAgICBhZ2dyZWdhdGVfbmFtZTogYWdncmVnYXRlTmFtZSxcbiAgICB9O1xuICAgIGRhdGFwb2ludHMucHVzaChkYXRhKTtcbiAgICBpdGVtLmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICAgIGl0ZW0udHlwZSA9IFwiZG9jc1wiO1xuICB9XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuZXhwb3J0IHtcbiAgY29udmVydEFnZ3JlZ2F0ZXNUb0RhdGFQb2ludHMsXG4gIGNvbnZlcnRFdmVudERhdGFUb0FnZ3JlZ2F0ZU1vZGVSZXN1bHRzLFxuICBjb252ZXJ0RXZlbnREYXRhVG9BZ2dyZWdhdGVNb2RlQ2hlY2tzLFxuICBjb252ZXJ0RXZlbnREYXRhVG9BZ2dyZWdhdGVNb2RlQ2xpZW50LFxuICBjb252ZXJ0RXZlbnREYXRhVG9BZ2dyZWdhdGVNb2RlTGlzdCxcbiAgY29udmVydFRvQWdncmVnYXRlTW9kZUNsaWVudEpTT04sXG4gIGNvbnZlcnRBZ2dyZWdhdGVzVG9KU09OXG59O1xuIiwiLyoqXG4gKlxuICovXG5cbmZ1bmN0aW9uIGdldEFnZ3JlZ2F0ZVVSSXModGFyZ2V0LCBhZ2dyZWdhdGVOYW1lcykge1xuICAvLyBodHRwczovL3NlbnN1YXBwLm9yZy9kb2NzLzAuMjgvYXBpL2FnZ3JlZ2F0ZXMtYXBpLmh0bWxcbiAgdmFyIHVyaXMgPSBbXTtcbiAgdmFyIGRpbWVuc2lvblVSSSA9IFwiL2FnZ3JlZ2F0ZXNcIjtcbiAgdmFyIGFuQWdncmVnYXRlTmFtZSA9IG51bGw7XG4gIC8vIG5hbWUsIG5hbWUvY2xpZW50cywgbmFtZS9jaGVja3MsIG5hbWUvcmVzdWx0cy9zZXZlcml0eVxuICBpZiAoYWdncmVnYXRlTmFtZXMubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZ2dyZWdhdGVOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgYW5BZ2dyZWdhdGVOYW1lID0gYWdncmVnYXRlTmFtZXNbaV07XG4gICAgICBkaW1lbnNpb25VUkkgPSBcIi9hZ2dyZWdhdGVzL1wiICsgYW5BZ2dyZWdhdGVOYW1lO1xuICAgICAgc3dpdGNoICh0YXJnZXQuYWdncmVnYXRlTW9kZSkge1xuICAgICAgICBjYXNlIFwiY2hlY2tzXCI6XG4gICAgICAgICAgZGltZW5zaW9uVVJJID0gXCIvYWdncmVnYXRlcy9cIiArIGFuQWdncmVnYXRlTmFtZSArIFwiL2NoZWNrc1wiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY2xpZW50c1wiOlxuICAgICAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2FnZ3JlZ2F0ZXMvXCIgKyBhbkFnZ3JlZ2F0ZU5hbWUgKyBcIi9jbGllbnRzXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsaXN0XCI6XG4gICAgICAgICAgZGltZW5zaW9uVVJJID0gXCIvYWdncmVnYXRlcy9cIiArIGFuQWdncmVnYXRlTmFtZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlc3VsdHNfY3JpdGljYWxcIjpcbiAgICAgICAgICBkaW1lbnNpb25VUkkgPSBcIi9hZ2dyZWdhdGVzL1wiICsgYW5BZ2dyZWdhdGVOYW1lICsgXCIvcmVzdWx0cy9jcml0aWNhbFwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVzdWx0c19va1wiOlxuICAgICAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2FnZ3JlZ2F0ZXMvXCIgKyBhbkFnZ3JlZ2F0ZU5hbWUgKyBcIi9yZXN1bHRzL29rXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzX3Vua25vd25cIjpcbiAgICAgICAgICBkaW1lbnNpb25VUkkgPSBcIi9hZ2dyZWdhdGVzL1wiICsgYW5BZ2dyZWdhdGVOYW1lICsgXCIvcmVzdWx0cy91bmtub3duXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzX3dhcm5pbmdcIjpcbiAgICAgICAgICBkaW1lbnNpb25VUkkgPSBcIi9hZ2dyZWdhdGVzL1wiICsgYW5BZ2dyZWdhdGVOYW1lICsgXCIvcmVzdWx0cy93YXJuaW5nXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB1cmlzLnB1c2goZGltZW5zaW9uVVJJKTtcbiAgICB9XG4gIH1cbiAgaWYgKHVyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgdXJpcy5wdXNoKGRpbWVuc2lvblVSSSk7XG4gIH1cbiAgcmV0dXJuIHVyaXM7XG59XG5cbmV4cG9ydCB7XG4gIGdldEFnZ3JlZ2F0ZVVSSXNcbn07XG4iLCIvKlxuXG4gKi9cbmltcG9ydCB7IGdldFJlc3BvbnNlRm9yVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldENsaWVudHNXaXRoRmlsdGVyIH0gZnJvbSBcIi4vY2xpZW50X2ZpbHRlcnNcIjtcblxuIC8qKlxuICogW2NvbnZlcnRDbGllbnRzVG9EYXRhUG9pbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY29udmVydENsaWVudHNUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRm9yVGFyZ2V0KGFUYXJnZXQsIHJlc3BvbnNlcyk7XG5cbiAgLy8gdGhlIHJlc3VsdCBoYXMgbm8gXCJkYXRhcG9pbnRzXCIsIG5lZWQgdG8gY3JlYXRlIGl0IGJhc2VkIG9uIHRoZSBjaGVjayBkYXRhXG4gIC8vIHdoZW4gd2UgaGF2ZSBhIGNoZWNrbmFtZSBhbmQgYW4gY2xpZW50TmFtZSwgdGhlIHJlc3BvbnNlIGlzIGRpZmZlcmVudCwgdGhlXG4gIC8vIGRhdGEgaXMgbm90IGFuIGFycmF5LCBidXQgY29udGFpbnMgdGhlIHNhbWUgaW5mb3JtYXRpb24sIHJlY3JlYXRlIGFuZCBwdXNoXG4gIGlmIChyZXNwb25zZS5kYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHNpbmdsZURhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgIHJlc3BvbnNlLmRhdGEgPSBbXTtcbiAgICByZXNwb25zZS5kYXRhLnB1c2goc2luZ2xlRGF0YSk7XG4gIH1cbiAgc3dpdGNoIChhVGFyZ2V0LmNsaWVudFF1ZXJ5TW9kZSkge1xuICAgIGNhc2UgXCJsaXN0XCI6XG4gICAgICBsZXQgZmlsdGVyRGF0YSA9IFtdO1xuICAgICAgbGV0IGFyckNsaWVudE5hbWVzID0gW107XG4gICAgICBpZiAoKGFUYXJnZXQuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSAmJiAoYVRhcmdldC5maWx0ZXJzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgIGFyckNsaWVudE5hbWVzID0gZ2V0Q2xpZW50c1dpdGhGaWx0ZXIoYVRhcmdldCwgcmVzcG9uc2UpO1xuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGRhdGEgYW5kIHN0b3JlIHRoZSBtYXRjaGluZyBjbGllbnRzIGluIHRoZSBuZXcgZmlsdGVyZWREYXRhXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIHB1c2ggbWF0Y2hpbmcgY2xpZW50IG5hbWVzXG4gICAgICAgICAgaWYgKGFyckNsaWVudE5hbWVzLmluZGV4T2YocmVzcG9uc2UuZGF0YVtpXS5uYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICBmaWx0ZXJEYXRhLnB1c2gocmVzcG9uc2UuZGF0YVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG5vdyByZXBsYWNlIGRhdGEgd2l0aCBmaWx0ZXJlZCBkYXRhXG4gICAgICAgIHJlc3BvbnNlLmRhdGEgPSBmaWx0ZXJEYXRhO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YVtpXTtcbiAgICAgICAgbGV0IGRhdGFwb2ludHMgPSBbXTtcbiAgICAgICAgaWYgKGRhdGEudGltZXN0YW1wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkYXRhcG9pbnRzWzBdID0gWzEsIChkYXRhLnRpbWVzdGFtcCAqIDEwMDApXTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICAgICAgICAvLyBzZXQgdGhlIHRhcmdldFxuICAgICAgICBkYXRhLnRhcmdldCA9IGRhdGEubmFtZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb3VudFwiOlxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGFbMF07XG4gICAgICAgIGxldCBkYXRhcG9pbnRzID0gW107XG4gICAgICAgIGxldCBjbGllbnRDb3VudCA9IDA7XG4gICAgICAgIGxldCBhcnJDbGllbnROYW1lcyA9IFtdO1xuICAgICAgICBpZiAoKGFUYXJnZXQuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSAmJiAoYVRhcmdldC5maWx0ZXJzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgYXJyQ2xpZW50TmFtZXMgPSBnZXRDbGllbnRzV2l0aEZpbHRlcihhVGFyZ2V0LCByZXNwb25zZSk7XG4gICAgICAgICAgY2xpZW50Q291bnQgPSBhcnJDbGllbnROYW1lcy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xpZW50Q291bnQgPSByZXNwb25zZS5kYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS50aW1lc3RhbXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRhdGFwb2ludHNbMF0gPSBbY2xpZW50Q291bnQsIChkYXRhLnRpbWVzdGFtcCAqIDEwMDApXTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICAgICAgICAvLyBzZXQgdGhlIHRhcmdldFxuICAgICAgICBkYXRhLmFkZHJlc3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRhdGEubmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZGF0YS5zb2NrZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRhdGEuc3Vic2NyaXB0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgZGF0YS52ZXJzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBkYXRhLnRhcmdldCA9IFwiQ2xpZW50Q291bnRcIjtcbiAgICAgICAgaWYgKGFUYXJnZXQuYWxpYXNSZXBsYWNlZCkge1xuICAgICAgICAgIGRhdGEudGFyZ2V0ID0gYVRhcmdldC5hbGlhc1JlcGxhY2VkO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlLmRhdGEgPSBbZGF0YV07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8qKlxuICogW2NvbnZlcnRDbGllbnRzVG9KU09OIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IGFUYXJnZXQgIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb252ZXJ0Q2xpZW50c1RvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgdmFyIHJlc3BvbnNlID0gZ2V0UmVzcG9uc2VGb3JUYXJnZXQoYVRhcmdldCwgcmVzcG9uc2VzKTtcblxuICBpZiAocmVzcG9uc2UuZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICByZXNwb25zZS5kYXRhID0gW107XG4gICAgcmVzcG9uc2UuZGF0YS5wdXNoKGRhdGEpO1xuICB9XG4gIC8vIHN0YXJ0IHdpdGggYW4gZW1wdHkgbGlzdFxuICB2YXIgbmV3RGF0YSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBkZWZhdWx0IHRvIGFkZGluZyB0aGUgaXRlbXMsIGZpbHRlcnMgd2lsbCBzZXQgdGhpcyB0byBmYWxzZSBhcyBuZWVkZWRcbiAgICBsZXQgcHVzaEl0ZW0gPSB0cnVlO1xuICAgIC8vIGNsb25lIGl0XG4gICAgbGV0IGl0ZW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGFbaV0pKTtcbiAgICAvLyBlbXB0eSBkYXRhcG9pbnRzXG4gICAgaXRlbS5kYXRhcG9pbnRzID0gW107XG4gICAgLy8gc2V0IHRoZSB0eXBlIHRvIGRvY3NcbiAgICBpdGVtLnR5cGUgPSBcImRvY3NcIjtcbiAgICAvL2l0ZW0udmFsdWUgPSAwO1xuICAgIC8vIGlmIHRoZXJlXCJzIG5vIGFkZHJlc3MsIGl0IGlzIGEgSklUIGNsaWVudFxuICAgIHZhciBhZGRyZXNzID0gaXRlbS5hZGRyZXNzO1xuICAgIGlmIChpdGVtLmFkZHJlc3MgPT09IFwidW5rbm93blwiKSB7XG4gICAgICBpdGVtLmFkZHJlc3MgPSBcIkpJVCBDbGllbnRcIjtcbiAgICB9XG4gICAgLy8gY2hlY2sgZmlsdGVyc1xuICAgIGlmIChhVGFyZ2V0LmZpbHRlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGFUYXJnZXQuZmlsdGVycy5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFUYXJnZXQuZmlsdGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBhRmlsdGVyID0gYVRhcmdldC5maWx0ZXJzW2pdO1xuICAgICAgICAgIHN3aXRjaCAoYUZpbHRlci5maWx0ZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwicmVnZXhcIjpcbiAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSByZWdleCBpcyB2YWxpZFxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBmbGFncyA9IGFGaWx0ZXIuZmlsdGVyUmVnZXhGbGFncztcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKGFGaWx0ZXIuZmlsdGVyUmVnZXgsIGZsYWdzKTtcbiAgICAgICAgICAgICAgICBpZiAocmUudGVzdChpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBwdXNoIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibWF0Y2hlZCByZWdleFwiKTtcbiAgICAgICAgICAgICAgICAgIGFGaWx0ZXIuZmlsdGVyTWVzc2FnZSA9IFwiT0tcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcHVzaEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGFGaWx0ZXIuZmlsdGVyTWVzc2FnZSA9IFwiSW52YWxpZCBSZWd1bGFyIEV4cHJlc3Npb25cIjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiSW52YWxpZCBSZWdleCBEZXRlY3RlZCFcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZmllbGRcIjpcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoYUZpbHRlci5maWx0ZXJGaWVsZE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkVmFsID0gaXRlbVthRmlsdGVyLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsICE9PSBhRmlsdGVyLmZpbHRlckZpZWxkVmFsdWVSZXBsYWNlZCkge1xuICAgICAgICAgICAgICAgICAgcHVzaEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmllbGQsIG5vIHB1c2hcbiAgICAgICAgICAgICAgICBwdXNoSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBwdXNoIGludG8gdGhlIGRhdGFwb2ludHNcbiAgICBpZiAocHVzaEl0ZW0pIHtcbiAgICAgIC8vaXRlbURhdGEuZGF0YXBvaW50cy5wdXNoKGl0ZW1EYXRhKTtcbiAgICAgIHZhciBlbnRyeSA9IHtcbiAgICAgICAgdHlwZTogXCJkb2NzXCIsXG4gICAgICAgIGRhdGFwb2ludHM6IFtpdGVtXVxuICAgICAgfTtcbiAgICAgIG5ld0RhdGEucHVzaChlbnRyeSk7XG4gICAgfVxuICB9XG4gIHJlc3BvbnNlLmRhdGEgPSBuZXdEYXRhO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8qKlxuICogW2NvbnZlcnRDbGllbnRIaXN0b3J5VG9EYXRhUG9pbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRDbGllbnRIaXN0b3J5VG9EYXRhUG9pbnRzKGFUYXJnZXQsIHJlc3BvbnNlcykge1xuICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpO1xuXG4gIC8vIHRoZSByZXN1bHQgaGFzIG5vIFwiZGF0YXBvaW50c1wiLCBuZWVkIHRvIGNyZWF0ZSBpdCBiYXNlZCBvbiB0aGUgY2hlY2sgZGF0YVxuICAvLyB3aGVuIHdlIGhhdmUgYSBjaGVja25hbWUgYW5kIGFuIGNsaWVudE5hbWUsIHRoZSByZXNwb25zZSBpcyBkaWZmZXJlbnQsIHRoZVxuICAvLyBkYXRhIGlzIG5vdCBhbiBhcnJheSwgYnV0IGNvbnRhaW5zIHRoZSBzYW1lIGluZm9ybWF0aW9uLCByZWNyZWF0ZSBhbmQgcHVzaFxuICAvL2lmIChyZXNwb25zZS5kYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gIC8vICB2YXIgc2luZ2xlRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gIC8vICByZXNwb25zZS5kYXRhID0gW107XG4gIC8vICByZXNwb25zZS5kYXRhLnB1c2goc2luZ2xlRGF0YSk7XG4gIC8vfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYW5FdmVudCA9IHJlc3BvbnNlLmRhdGFbaV07XG4gICAgdmFyIGRhdGFwb2ludHMgPSBbXTtcbiAgICB2YXIgc3RhcnRpbmdUaW1lc3RhbXAgPSAwO1xuICAgIGlmIChhbkV2ZW50Lmxhc3RfZXhlY3V0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0YXJ0aW5nVGltZXN0YW1wID0gYW5FdmVudC5sYXN0X2V4ZWN1dGlvbiAtICg2MCAqIGFuRXZlbnQuaGlzdG9yeS5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyB0aW1lIG5lZWRzIHRvIGJlIGluIE1TLCB3ZSBnZXQgRVBPQ0ggZnJvbSBTZW5zdVxuICAgIGlmIChhbkV2ZW50Lmhpc3RvcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBhbkV2ZW50Lmhpc3RvcnkubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgZGF0YXBvaW50c1t5XSA9IFthbkV2ZW50Lmhpc3RvcnlbeV0sIChzdGFydGluZ1RpbWVzdGFtcCArICg2MCAqIHkpKSAqIDEwMDBdO1xuICAgICAgfVxuICAgIH1cbiAgICBhbkV2ZW50LmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICAgIC8vIHNldCB0aGUgdGFyZ2V0IHRvIGJlIHRoZSBjaGVjayBuYW1lXG4gICAgYW5FdmVudC50YXJnZXQgPSBcInVua25vd25cIjtcbiAgICBpZiAoYW5FdmVudC5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFuRXZlbnQudGFyZ2V0ID0gYW5FdmVudC5uYW1lO1xuICAgIH1cbiAgICBpZiAoYW5FdmVudC5jaGVjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhbkV2ZW50LnRhcmdldCA9IGFuRXZlbnQuY2hlY2s7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIEpTT04gd2l0aCB0aGUgZm9sbG93aW5nOlxuICogICAgI0NoZWNrc1xuICogICAgI0NoZWNrcyBzaWxlbmNlZFxuICogICAgI0NoZWNrcyBPS1xuICogICAgI0NoZWNrcyB3YXJuaW5nXG4gKiAgICAjQ2hlY2tzIENyaXRpY2FsXG4gKiAgICAjQ2xpZW50c1xuICogICAgI0NsaWVudHMgc2lsZW5jZWRcbiAqICAgICNDbGllbnRzIE9LXG4gKiAgICAjQ2xpZW50cyB3YXJuaW5nXG4gKiAgICAjQ2xpZW50cyBDcml0aWNhbFxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZXMgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb252ZXJ0Q2xpZW50U3VtbWFyeU1ldHJpY3NUb0pTT04oYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRm9yVGFyZ2V0KGFUYXJnZXQsIHJlc3BvbnNlcyk7XG5cbn1cblxuLypcbiAgQ2xpZW50IEhlYWx0aFxuXG4gIEhlYWx0aCBpcyBkZXRlcm1pbmVkIGJ5IHRha2luZyB0aGUgd29yc3Qgb2YgdGhlIG5vbi1zaWxlbmNlZCByZXN1bHRzIGZvciBhIGNsaWVudFxuXG4gIFRoZSBcInVua25vd25cIiBzdGF0ZSBjYW4gb3B0aW9uYWxseSBiZSB1c2VkIGFzIHRoZSB3b3JzdCBzdGF0ZVxuICBTcGVjaWZpY2FsbHk6XG4gICAgL3Jlc3VsdHMvOmNsaWVudFxuICAgICAgICBzdGF0dXMgZmllbGQgaXMgaW5zcGVjdGVkIGZvcjpcbiAgICAgICAgMCA9IE9LXG4gICAgICAgIDEgPSBXQVJOSU5HXG4gICAgICAgIDIgPSBDUklUSUNBTFxuICAgICAgICAzID0gVU5LTk9XTlxuICAgIC9ldmVudHMvOmNsaWVudFxuICAgICAgICBzdGF0dXMgZmllbGQgaXMgaW5zcGVjdGVkXG5cbiAqL1xuXG4vKipcbiAqIFtjb252ZXJ0Q2xpZW50SGVhbHRoVG9KU09OIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXQgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlc3BvbnNlIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb252ZXJ0Q2xpZW50SGVhbHRoVG9KU09OKGFUYXJnZXQsIHJlc3BvbnNlcykge1xuICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpO1xuXG4gIHZhciBmaWx0ZXJlZERhdGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFuRXZlbnQgPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIHZhciBkYXRhcG9pbnRzID0gW107XG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhbkV2ZW50KSk7XG4gICAgaWYgKGFuRXZlbnQuY2hlY2suaXNzdWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0aW1lc3RhbXA6IChhbkV2ZW50LmNoZWNrLmlzc3VlZCAqIDEwMDApLFxuICAgICAgICBjaGVja19uYW1lOiBhbkV2ZW50LmNoZWNrLm5hbWUsXG4gICAgICAgIGNsaWVudDogYW5FdmVudC5jbGllbnQsXG4gICAgICAgIGNoZWNrOiBhbkV2ZW50LmNoZWNrLFxuICAgICAgICBvY2N1cnJlbmNlczogYW5FdmVudC5vY2N1cnJlbmNlcyxcbiAgICAgICAgb2NjdXJyZW5jZXNfd2F0ZXJtYXJrOiBhbkV2ZW50Lm9jY3VycmVuY2VzX3dhdGVybWFyayxcbiAgICAgICAgYWN0aW9uOiBhbkV2ZW50LmFjdGlvbixcbiAgICAgICAgaWQ6IGFuRXZlbnQuaWQsXG4gICAgICAgIGxhc3Rfc3RhdGVfY2hhbmdlOiAoYW5FdmVudC5sYXN0X3N0YXRlX2NoYW5nZSAqIDEwMDApLFxuICAgICAgICBsYXN0X29rOiAoYW5FdmVudC5sYXN0X29rICogMTAwMCksXG4gICAgICAgIHNpbGVuY2VkOiBhbkV2ZW50LnNpbGVuY2VkLFxuICAgICAgICBzaWxlbmNlZF9ieTogYW5FdmVudC5zaWxlbmNlZF9ieVxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEuY2hlY2suaXNzdWVkID0gZGF0YS5jaGVjay5pc3N1ZWQgKiAxMDAwO1xuICAgICAgICBkYXRhLmNoZWNrLmV4ZWN1dGVkID0gZGF0YS5jaGVjay5leGVjdXRlZCAqIDEwMDA7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfVxuICAgICAgZGF0YXBvaW50cy5wdXNoKGRhdGEpO1xuICAgICAgYW5FdmVudC5kYXRhcG9pbnRzID0gZGF0YXBvaW50cztcbiAgICAgIGRlbGV0ZSBhbkV2ZW50LmNoZWNrO1xuICAgICAgZGVsZXRlIGFuRXZlbnQuY2xpZW50O1xuICAgICAgYW5FdmVudC50eXBlID0gXCJkb2NzXCI7XG4gICAgICBpZiAoIWFuRXZlbnQuc2lsZW5jZWQpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhLnB1c2goYW5FdmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoYW5FdmVudC5zaWxlbmNlZCAmJiAhYVRhcmdldC5oaWRlU2lsZW5jZWRFdmVudHMpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhLnB1c2goYW5FdmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc3BvbnNlLmRhdGEgPSBmaWx0ZXJlZERhdGE7XG4gIC8vdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKTtcbiAgLy9jb25zb2xlLmxvZyhzdHIpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8vIFRPRE9cbi8vICBUaGlzIG5lZWRzIHRvIHJldHVybiBoZWFsdGggb2YgaW5kaXZpZHVhbCBjbGllbnRzXG5mdW5jdGlvbiBjb252ZXJ0Q2xpZW50SGVhbHRoTWV0cmljc1RvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgdmFyIHJlc3BvbnNlID0gZ2V0UmVzcG9uc2VGb3JUYXJnZXQoYVRhcmdldCwgcmVzcG9uc2VzKTtcbn1cblxuXG5leHBvcnQge1xuICBjb252ZXJ0Q2xpZW50c1RvRGF0YVBvaW50cyxcbiAgY29udmVydENsaWVudHNUb0pTT04sXG4gIGNvbnZlcnRDbGllbnRIaXN0b3J5VG9EYXRhUG9pbnRzLFxuICBjb252ZXJ0Q2xpZW50U3VtbWFyeU1ldHJpY3NUb0pTT04sXG4gIGNvbnZlcnRDbGllbnRIZWFsdGhUb0pTT04sXG4gIGNvbnZlcnRDbGllbnRIZWFsdGhNZXRyaWNzVG9KU09OXG59O1xuIiwiXG5mdW5jdGlvbiBnZXRDbGllbnRzV2l0aEZpbHRlcihhVGFyZ2V0LCByZXNwb25zZSkge1xuICB2YXIgYXJyQ2xpZW50TmFtZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhVGFyZ2V0LmZpbHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYUZpbHRlciA9IGFUYXJnZXQuZmlsdGVyc1tpXTtcbiAgICBzd2l0Y2ggKGFGaWx0ZXIuZmlsdGVyVHlwZSkge1xuICAgICAgY2FzZSBcImZpZWxkXCI6XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhW2pdLmhhc093blByb3BlcnR5KGFGaWx0ZXIuZmlsdGVyRmllbGROYW1lKSkge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsID0gcmVzcG9uc2UuZGF0YVtqXVthRmlsdGVyLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgICBpZiAoZmllbGRWYWwgPT09IGFGaWx0ZXIuZmlsdGVyRmllbGRWYWx1ZVJlcGxhY2VkKSB7XG4gICAgICAgICAgICAgIC8vIG1hdGNoZWQgZmllbGRcbiAgICAgICAgICAgICAgaWYgKGFyckNsaWVudE5hbWVzLmluZGV4T2YocmVzcG9uc2UuZGF0YVtqXS5uYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhcnJDbGllbnROYW1lcy5wdXNoKHJlc3BvbnNlLmRhdGFbal0ubmFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZmV0Y2hcIjpcbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBvZiB0aGUgZGF0YVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoYUZpbHRlci52YWx1ZSA9PT0gcmVzcG9uc2UuZGF0YVtqXS5uYW1lKSB7XG4gICAgICAgICAgICAvLyBhZGQgdG8gbGlzdCBvZiB0cmFja2VkIG5hbWVzXG4gICAgICAgICAgICBpZiAoYXJyQ2xpZW50TmFtZXMuaW5kZXhPZihyZXNwb25zZS5kYXRhW2pdLm5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICBhcnJDbGllbnROYW1lcy5wdXNoKHJlc3BvbnNlLmRhdGFbal0ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJlZ2V4XCI6XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgcmVnZXggaXMgdmFsaWRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZmxhZ3MgPSBhRmlsdGVyLmZpbHRlclJlZ2V4RmxhZ3M7XG4gICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChhRmlsdGVyLmZpbHRlclJlZ2V4LCBmbGFncyk7XG4gICAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBvZiB0aGUgZGF0YVxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHJlLnRlc3QocmVzcG9uc2UuZGF0YVtqXS5uYW1lKSkge1xuICAgICAgICAgICAgICAvLyBhZGQgdG8gbGlzdCBvZiB0cmFja2VkIG5hbWVzXG4gICAgICAgICAgICAgIGlmIChhcnJDbGllbnROYW1lcy5pbmRleE9mKHJlc3BvbnNlLmRhdGFbal0ubmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgYXJyQ2xpZW50TmFtZXMucHVzaChyZXNwb25zZS5kYXRhW2pdLm5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBhRmlsdGVyLmZpbHRlck1lc3NhZ2UgPSBcIkludmFsaWQgUmVndWxhciBFeHByZXNzaW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJDbGllbnROYW1lcztcbn1cblxuZXhwb3J0IHtcbiAgZ2V0Q2xpZW50c1dpdGhGaWx0ZXJcbn07XG4iLCIvKlxuXG4gKi9cblxuZnVuY3Rpb24gZ2V0Q2xpZW50c1VSSXMoY2hlY2tOYW1lcywgY2xpZW50TmFtZXMpIHtcbiAgdmFyIHVyaXMgPSBbXTtcbiAgdmFyIGRpbWVuc2lvblVSSSA9IFwiL2NsaWVudHNcIjtcbiAgLy8gbG9vayBmb3IgY2xpZW50TmFtZSBpbiBkaW1lbnNpb25zXG4gIGlmIChjbGllbnROYW1lcy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2NsaWVudHMvXCIgKyBhQ2xpZW50TmFtZTtcbiAgICAgIHVyaXMucHVzaChkaW1lbnNpb25VUkkpO1xuICAgIH1cbiAgfVxuICBpZiAodXJpcy5sZW5ndGggPT09IDApIHtcbiAgICB1cmlzLnB1c2goZGltZW5zaW9uVVJJKTtcbiAgfVxuICB1cmlzLnB1c2goXCIvZXZlbnRzXCIpO1xuICB1cmlzLnB1c2goXCIvcmVzdWx0c1wiKTtcblxuICByZXR1cm4gdXJpcztcbn1cblxuLyoqXG4gKiBbZ2V0Q2xpZW50SGVhbHRoVVJJcyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gY2xpZW50TmFtZXMgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudEhlYWx0aFVSSXMoY2xpZW50TmFtZXMpIHtcbiAgdmFyIHVyaXMgPSBbXTtcbiAgLy8gbG9vayBmb3IgY2xpZW50TmFtZSBpbiBkaW1lbnNpb25zXG4gIGlmIChjbGllbnROYW1lcy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIHZhciByZXN1bHRzVVJJID0gXCIvcmVzdWx0cy9cIiArIGFDbGllbnROYW1lO1xuICAgICAgdXJpcy5wdXNoKHJlc3VsdHNVUkkpO1xuICAgICAgdmFyIGV2ZW50c1VSSSA9IFwiL2V2ZW50cy9cIiArIGFDbGllbnROYW1lO1xuICAgICAgdXJpcy5wdXNoKGV2ZW50c1VSSSk7XG4gICAgfVxuICB9XG4gIGlmICh1cmlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHVyaXMucHVzaChcIi9yZXN1bHRzXCIpO1xuICAgIHVyaXMucHVzaChcIi9ldmVudHNcIik7XG4gIH1cbiAgcmV0dXJuIHVyaXM7XG59XG5cbi8qKlxuICogW2dldENsaWVudEhpc3RvcnlVUklzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBjbGllbnROYW1lcyBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50SGlzdG9yeVVSSXMoY2xpZW50TmFtZXMpIHtcbiAgdmFyIHVyaXMgPSBbXTtcbiAgdmFyIGRpbWVuc2lvblVSSSA9IFwiL2NsaWVudHNcIjtcbiAgLy8gbG9vayBmb3IgY2xpZW50TmFtZSBpbiBkaW1lbnNpb25zXG4gIGlmIChjbGllbnROYW1lcy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2NsaWVudHMvXCIgKyBhQ2xpZW50TmFtZSArIFwiL2hpc3RvcnlcIjtcbiAgICAgIHVyaXMucHVzaChkaW1lbnNpb25VUkkpO1xuICAgIH1cbiAgfVxuICBpZiAodXJpcy5sZW5ndGggPT09IDApIHtcbiAgICB1cmlzLnB1c2goZGltZW5zaW9uVVJJKTtcbiAgfVxuICByZXR1cm4gdXJpcztcbn1cblxuZXhwb3J0IHtcbiAgZ2V0Q2xpZW50c1VSSXMsXG4gIGdldENsaWVudEhlYWx0aFVSSXMsXG4gIGdldENsaWVudEhpc3RvcnlVUklzXG59O1xuIiwiLyoqXG4gKlxuICovXG5pbXBvcnQgeyBnZXRSZXNwb25zZUZvclRhcmdldCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBpbmNsdWRlRXZlbnRUYXJnZXQgfSBmcm9tIFwiLi9ldmVudF9maWx0ZXJzXCI7XG4vKipcbiAqIFtjb252ZXJ0RXZlbnRzVG9EYXRhUG9pbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRFdmVudHNUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRm9yVGFyZ2V0KGFUYXJnZXQsIHJlc3BvbnNlcyk7XG5cbiAgLy8gY29udmVydCBoaXN0b3J5IHRvIGRhdGFwb2ludHNcblxuICAvLyB0aGUgcmVzdWx0IGhhcyBubyBcImRhdGFwb2ludHNcIiwgbmVlZCB0byBjcmVhdGUgaXQgYmFzZWQgb24gdGhlIGNoZWNrIGRhdGFcblxuICAvLyB3aGVuIHdlIGhhdmUgYSBjaGVja25hbWUgYW5kIGFuIGNsaWVudE5hbWUsIHRoZSByZXNwb25zZSBpcyBkaWZmZXJlbnQsIHRoZVxuICAvLyBkYXRhIGlzIG5vdCBhbiBhcnJheSwgYnV0IGNvbnRhaW5zIHRoZSBzYW1lIGluZm9ybWF0aW9uLCByZWNyZWF0ZSBhbmQgcHVzaFxuICBpZiAocmVzcG9uc2UuZGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBzaW5nbGVEYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICByZXNwb25zZS5kYXRhID0gW107XG4gICAgcmVzcG9uc2UuZGF0YS5wdXNoKHNpbmdsZURhdGEpO1xuICB9XG4gIHZhciBmaWx0ZXJlZERhdGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFuRXZlbnQgPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIHZhciBkYXRhcG9pbnRzID0gW107XG4gICAgdmFyIHN0YXJ0aW5nVGltZXN0YW1wID0gMDtcbiAgICAvLyBhbiBldmVudCB3aXRoIGNsaWVudCBwYXJhbSBoYXMgYSB0aW1lc3RhbXAgYXQgdGhlIHRvcGxldmVsXG4gICAgaWYgKGFuRXZlbnQudGltZXN0YW1wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0YXJ0aW5nVGltZXN0YW1wID0gYW5FdmVudC50aW1lc3RhbXAgLSAoNjAgKiBhbkV2ZW50LmNoZWNrLmhpc3RvcnkubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGFuRXZlbnQubGFzdF9leGVjdXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RhcnRpbmdUaW1lc3RhbXAgPSBhbkV2ZW50Lmxhc3RfZXhlY3V0aW9uIC0gKDYwICogYW5FdmVudC5oaXN0b3J5Lmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHRpbWUgbmVlZHMgdG8gYmUgaW4gTVMsIHdlIGdldCBFUE9DSCBmcm9tIFNlbnN1XG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBhbkV2ZW50LmNoZWNrLmhpc3RvcnkubGVuZ3RoOyB5KyspIHtcbiAgICAgIGRhdGFwb2ludHNbeV0gPSBbYW5FdmVudC5jaGVjay5oaXN0b3J5W3ldLCAoc3RhcnRpbmdUaW1lc3RhbXAgKyAoNjAgKiB5KSkgKiAxMDAwXTtcbiAgICB9XG4gICAgYW5FdmVudC5kYXRhcG9pbnRzID0gZGF0YXBvaW50cztcbiAgICAvLyBzZXQgdGhlIHRhcmdldCB0byBiZSB0aGUgY2hlY2sgbmFtZVxuICAgIGFuRXZlbnQudGFyZ2V0ID0gYW5FdmVudC5jbGllbnQubmFtZTtcbiAgICAvKlxuICAgIGlmIChhbkV2ZW50LmNoZWNrLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYW5FdmVudC50YXJnZXQgPSBhbkV2ZW50LmNoZWNrLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuRXZlbnQudGFyZ2V0ID0gYW5FdmVudC5jaGVjaztcbiAgICB9XG4gICAgKi9cbiAgICBhbkV2ZW50LmNsaWVudE5hbWUgPSBhbkV2ZW50LmNsaWVudC5uYW1lO1xuICAgIGlmIChpbmNsdWRlRXZlbnRUYXJnZXQoYVRhcmdldCwgYW5FdmVudCkpIHtcbiAgICAgIGlmICghYW5FdmVudC5zaWxlbmNlZCkge1xuICAgICAgICBmaWx0ZXJlZERhdGEucHVzaChhbkV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkICYmICFhVGFyZ2V0LmhpZGVTaWxlbmNlZEV2ZW50cykge1xuICAgICAgICBmaWx0ZXJlZERhdGEucHVzaChhbkV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIG5ld1Jlc3BvbnNlID0geyBkYXRhOiBmaWx0ZXJlZERhdGEgfTtcblxuICByZXR1cm4gbmV3UmVzcG9uc2U7XG59XG5cblxuZnVuY3Rpb24gY29udmVydEV2ZW50c1RvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgdmFyIHJlc3BvbnNlID0gZ2V0UmVzcG9uc2VGb3JUYXJnZXQoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgLy8gZG8gbm90IGFsbG93IG1vZGlmaWNhdGlvbiBvZiByZXNwb25zZVxuICAvL3ZhciBuZXdSZXNwb25zZSA9IHt9O1xuXG4gIHZhciBmaWx0ZXJlZERhdGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFuRXZlbnQgPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIHZhciBkYXRhcG9pbnRzID0gW107XG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhbkV2ZW50KSk7XG4gICAgaWYgKChhbkV2ZW50LmNoZWNrLmlzc3VlZCAhPT0gdW5kZWZpbmVkKSAmJiBpbmNsdWRlRXZlbnRUYXJnZXQoYVRhcmdldCwgYW5FdmVudCkpIHtcbiAgICAgIHZhciBjbGllbnRTaG9ydG5hbWUgPSBhbkV2ZW50LmNsaWVudC5uYW1lO1xuICAgICAgLy8gdHJ5IHRvIHNwbGl0IG9uIGRvdCBub3RhdGlvbiwgdGFrZSB0aGUgZmlyc3QgaXRlbVxuICAgICAgdmFyIHBhcnRzID0gYW5FdmVudC5jbGllbnQubmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjbGllbnRTaG9ydG5hbWUgPSBwYXJ0c1swXTtcbiAgICAgIH1cbiAgICAgIGFuRXZlbnQuY2xpZW50LmNsaWVudF9zaG9ydF9uYW1lID0gY2xpZW50U2hvcnRuYW1lO1xuICAgICAgLy8gbm93IGNyZWF0ZSB0ZXh0LWJhc2VkIHZlcnNpb24gb2Ygc3RhdHVzXG4gICAgICB2YXIgc3RhdHVzVGV4dCA9IFwiVU5LTk9XTlwiO1xuICAgICAgaWYgKChhbkV2ZW50LmNoZWNrICE9PSB1bmRlZmluZWQpICYmIChhbkV2ZW50LmNoZWNrLnN0YXR1cyAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBzd2l0Y2ggKGFuRXZlbnQuY2hlY2suc3RhdHVzKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiT0tcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIldBUk5JTkdcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNSSVRJQ0FMXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVTktOT1dOXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiVU5LTk9XTlwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFuRXZlbnQuY2hlY2suc3RhdHVzX3RleHQgPSBzdGF0dXNUZXh0O1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogKGFuRXZlbnQuY2hlY2suaXNzdWVkICogMTAwMCksXG4gICAgICAgIGNoZWNrX25hbWU6IGFuRXZlbnQuY2hlY2submFtZSxcbiAgICAgICAgY2xpZW50OiBhbkV2ZW50LmNsaWVudCxcbiAgICAgICAgY2hlY2s6IGFuRXZlbnQuY2hlY2ssXG4gICAgICAgIG9jY3VycmVuY2VzOiBhbkV2ZW50Lm9jY3VycmVuY2VzLFxuICAgICAgICBvY2N1cnJlbmNlc193YXRlcm1hcms6IGFuRXZlbnQub2NjdXJyZW5jZXNfd2F0ZXJtYXJrLFxuICAgICAgICBhY3Rpb246IGFuRXZlbnQuYWN0aW9uLFxuICAgICAgICBpZDogYW5FdmVudC5pZCxcbiAgICAgICAgbGFzdF9zdGF0ZV9jaGFuZ2U6IChhbkV2ZW50Lmxhc3Rfc3RhdGVfY2hhbmdlICogMTAwMCksXG4gICAgICAgIGxhc3Rfb2s6IChhbkV2ZW50Lmxhc3Rfb2sgKiAxMDAwKSxcbiAgICAgICAgc2lsZW5jZWQ6IGFuRXZlbnQuc2lsZW5jZWQsXG4gICAgICAgIHNpbGVuY2VkX2J5OiBhbkV2ZW50LnNpbGVuY2VkX2J5XG4gICAgICB9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YS5jaGVjay5pc3N1ZWQgPSBkYXRhLmNoZWNrLmlzc3VlZCAqIDEwMDA7XG4gICAgICAgIGRhdGEuY2hlY2suZXhlY3V0ZWQgPSBkYXRhLmNoZWNrLmV4ZWN1dGVkICogMTAwMDtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICB9XG4gICAgICBkYXRhcG9pbnRzLnB1c2goZGF0YSk7XG4gICAgICBhbkV2ZW50LmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICAgICAgZGVsZXRlIGFuRXZlbnQuY2hlY2s7XG4gICAgICBkZWxldGUgYW5FdmVudC5jbGllbnQ7XG4gICAgICBhbkV2ZW50LnR5cGUgPSBcImRvY3NcIjtcbiAgICAgIGlmICghYW5FdmVudC5zaWxlbmNlZCkge1xuICAgICAgICBmaWx0ZXJlZERhdGEucHVzaChhbkV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkICYmICFhVGFyZ2V0LmhpZGVTaWxlbmNlZEV2ZW50cykge1xuICAgICAgICBmaWx0ZXJlZERhdGEucHVzaChhbkV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIG5ld1Jlc3BvbnNlID0geyBkYXRhOiBmaWx0ZXJlZERhdGEgfTtcblxuICAvL3ZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShuZXdSZXNwb25zZSwgbnVsbCwgMik7XG4gIC8vY29uc29sZS5sb2coc3RyKTtcbiAgcmV0dXJuIG5ld1Jlc3BvbnNlO1xufVxuXG4vKipcbiAqIFRoZSB0YWtlcyAvZXZlbnRzIG91dHB1dCBmcm9tIFNlbnN1IGFuZCByZXR1cm5zIHRoZSBmb2xsb3dpbmc6XG4gKiBDb3VudCBvZiBXQVJOSU5HLCBhbmQgTnVtYmVyIFNpbGVuY2VkXG4gKiBDb3VudCBvZiBDUklUSUNBTCwgYW5kIG51bWJlciBzaWxlbmNlZFxuICogQ291bnQgb2YgVU5LTk9XTiwgYW5kIG51bWJlciBzaWxlbmNlZFxuICogQ291bnQgb2YgYWxsIEV2ZW50c1xuICogQ291bnQgb2YgYWxsIEV2ZW50cyBub3QgU2lsZW5jZWRcbiAqIENvdW50IG9mIGFsbCBTaWxlbmNlZCBFdmVudHNcbiAqIENvdW50IG9mIENsaWVudHMgU2lsZW5jZWRcbiAqIENvdW50IG9mIENoZWNrcyBTaWxlbmNlZFxuICpcbiAqIEZpbHRlcnMgYXJlIGFsc28gYXBwbGllZFxuICpcbiAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0ICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY29udmVydEV2ZW50c1RvRXZlbnRNZXRyaWNzSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgdmFyIHJlc3BvbnNlID0gZ2V0UmVzcG9uc2VGb3JUYXJnZXQoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgLy8gdGltZXN0YW1wIGlzIHRha2VuIGZyb20gZmlyc3QgaXRlbSBpbiByZXNwb25zZVxuICB2YXIgdGltZXN0YW1wID0gMDtcbiAgdHJ5IHtcbiAgICB0aW1lc3RhbXAgPSByZXNwb25zZS5kYXRhWzBdLmNoZWNrLmlzc3VlZCAqIDEwMDA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuICB2YXIgZXZlbnRNZXRyaWNzID0ge1xuICAgIHRhcmdldDogXCJhbGxFdmVudHNcIixcbiAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICBudW1FdmVudHM6IDAsXG4gICAgbnVtU2lsZW5jZWQ6IDAsXG4gICAgbnVtQ2xpZW50c1NpbGVuY2VkOiAwLFxuICAgIG51bUNoZWNrc1NpbGVuY2VkOiAwLFxuICAgIG51bVdhcm5pbmdFdmVudHM6IDAsXG4gICAgbnVtV2FybmluZ0V2ZW50c1NpbGVuY2VkOiAwLFxuICAgIG51bUNyaXRpY2FsRXZlbnRzOiAwLFxuICAgIG51bUNyaXRpY2FsRXZlbnRzU2lsZW5jZWQ6IDAsXG4gICAgbnVtVW5rbm93bkV2ZW50czogMCxcbiAgICBudW1Vbmtub3duRXZlbnRzU2lsZW5jZWQ6IDBcbiAgfTtcbiAgdmFyIGNsaWVudE5hbWVzID0gW107XG4gIHZhciBjaGVja05hbWVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhbkV2ZW50ID0gcmVzcG9uc2UuZGF0YVtpXTtcbiAgICBpZiAoYW5FdmVudC5jaGVjay5pc3N1ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKChhbkV2ZW50LmNoZWNrICE9PSB1bmRlZmluZWQpICYmIChhbkV2ZW50LmNoZWNrLnN0YXR1cyAhPT0gdW5kZWZpbmVkKSAmJiBpbmNsdWRlRXZlbnRUYXJnZXQoYVRhcmdldCwgYW5FdmVudCkpIHtcbiAgICAgICAgZXZlbnRNZXRyaWNzLm51bUV2ZW50cyArPSAxO1xuICAgICAgICBzd2l0Y2ggKGFuRXZlbnQuY2hlY2suc3RhdHVzKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZXZlbnRNZXRyaWNzLm51bVdhcm5pbmdFdmVudHMgKz0gMTtcbiAgICAgICAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkKSB7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1XYXJuaW5nRXZlbnRzU2lsZW5jZWQgKz0gMTtcbiAgICAgICAgICAgICAgZXZlbnRNZXRyaWNzLm51bVNpbGVuY2VkICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBldmVudE1ldHJpY3MubnVtQ3JpdGljYWxFdmVudHMgKz0gMTtcbiAgICAgICAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkKSB7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1Dcml0aWNhbEV2ZW50c1NpbGVuY2VkICs9IDE7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1TaWxlbmNlZCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1Vbmtub3duRXZlbnRzICs9IDE7XG4gICAgICAgICAgICBpZiAoYW5FdmVudC5zaWxlbmNlZCkge1xuICAgICAgICAgICAgICBldmVudE1ldHJpY3MubnVtVW5rbm93bkV2ZW50c1NpbGVuY2VkICs9IDE7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1TaWxlbmNlZCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHN0b3JlIHRoZSBjbGllbnQgbmFtZXMgdG8gY291bnQgbGF0ZXJcbiAgICAgIGlmIChjbGllbnROYW1lcy5pbmRleE9mKGFuRXZlbnQuY2xpZW50Lm5hbWUpIDwgMCkge1xuICAgICAgICBjbGllbnROYW1lcy5wdXNoKGFuRXZlbnQuY2xpZW50Lm5hbWUpO1xuICAgICAgfVxuICAgICAgLy8gc3RvcmUgdGhlIGNoZWNrIG5hbWVzIHRvIGNvdW50IGxhdGVyXG4gICAgICBpZiAoY2hlY2tOYW1lcy5pbmRleE9mKGFuRXZlbnQuY2hlY2submFtZSkgPCAwKSB7XG4gICAgICAgIGNoZWNrTmFtZXMucHVzaChhbkV2ZW50LmNoZWNrLm5hbWUpO1xuICAgICAgfVxuICAgICAgLy8gaW5zcGVjdCBzaWxlbmNlZF9ieSBmb3IgY2xpZW50bmFtZToqLCB3aWNoIG1lYW5zIHRoZSBjbGllbnQgaXMgc2lsZW5jZWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW5FdmVudC5zaWxlbmNlZF9ieS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYW5FdmVudC5zaWxlbmNlZF9ieVtpXS5pbmRleE9mKFwiKlwiKSA+PSAwKSB7XG4gICAgICAgICAgZXZlbnRNZXRyaWNzLm51bUNsaWVudHNTaWxlbmNlZCArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1DaGVja3NTaWxlbmNlZCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50TWV0cmljcy5udW1DbGllbnRzU2lsZW5jZWQgPSBjbGllbnROYW1lcy5sZW5ndGg7XG4gIGV2ZW50TWV0cmljcy5udW1DaGVja3NTaWxlbmNlZCA9IGNoZWNrTmFtZXMubGVuZ3RoO1xuICByZXNwb25zZS5kYXRhID0gW3tcbiAgICB0YXJnZXQ6IFwiYWxsRXZlbnRzXCIsXG4gICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgdHlwZTogXCJkb2NzXCIsXG4gICAgZGF0YXBvaW50czogW2V2ZW50TWV0cmljc11cbiAgfV07XG4gIC8vdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKTtcbiAgLy9jb25zb2xlLmxvZyhzdHIpO1xuICAvL3ZhciB4ID0gcmVzcG9uc2UuZGF0YVswXS5kYXRhcG9pbnRzWzBdWzFdO1xuICAvL2NvbnNvbGUubG9nKFwiWCA9IFwiICsgeCk7XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuLyoqXG4gKiBbY29udmVydEV2ZW50c1RvRXZlbnRNZXRyaWNzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBhVGFyZ2V0ICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZXNwb25zZXMgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb252ZXJ0RXZlbnRzVG9FdmVudE1ldHJpY3MoYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIC8vIGZpbmQgYSByZXNwb25zZSB0aGF0IG1hdGNoZXMgdGhlIHRhcmdldFxuICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpO1xuICB2YXIgbmV3UmVzcG9uc2UgPSB7IGRhdGE6IFtdfTtcbiAgLy8gdGltZXN0YW1wIGlzIHRha2VuIGZyb20gZmlyc3QgaXRlbSBpbiByZXNwb25zZVxuICB2YXIgdGltZXN0YW1wID0gMDtcbiAgdHJ5IHtcbiAgICB0aW1lc3RhbXAgPSByZXNwb25zZS5kYXRhWzBdLmNoZWNrLmlzc3VlZCAqIDEwMDA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuICB2YXIgZXZlbnRNZXRyaWNzID0ge1xuICAgIHRhcmdldDogXCJhbGxFdmVudHNcIixcbiAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgICBudW1FdmVudHM6IDAuMCxcbiAgICBudW1TaWxlbmNlZDogMC4wLFxuICAgIG51bUNsaWVudHNTaWxlbmNlZDogMC4wLFxuICAgIG51bUNoZWNrc1NpbGVuY2VkOiAwLjAsXG4gICAgbnVtV2FybmluZ0V2ZW50czogMC4wLFxuICAgIG51bVdhcm5pbmdFdmVudHNTaWxlbmNlZDogMC4wLFxuICAgIG51bUNyaXRpY2FsRXZlbnRzOiAwLjAsXG4gICAgbnVtQ3JpdGljYWxFdmVudHNTaWxlbmNlZDogMC4wLFxuICAgIG51bVVua25vd25FdmVudHM6IDAuMCxcbiAgICBudW1Vbmtub3duRXZlbnRzU2lsZW5jZWQ6IDAuMFxuICB9O1xuICB2YXIgY2xpZW50TmFtZXMgPSBbXTtcbiAgdmFyIGNoZWNrTmFtZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFuRXZlbnQgPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIGlmIChhbkV2ZW50LmNoZWNrLmlzc3VlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoKGFuRXZlbnQuY2hlY2sgIT09IHVuZGVmaW5lZCkgJiYgKGFuRXZlbnQuY2hlY2suc3RhdHVzICE9PSB1bmRlZmluZWQpICYmIGluY2x1ZGVFdmVudFRhcmdldChhVGFyZ2V0LCBhbkV2ZW50KSkge1xuICAgICAgICBldmVudE1ldHJpY3MubnVtRXZlbnRzICs9IDEuMDtcbiAgICAgICAgc3dpdGNoIChhbkV2ZW50LmNoZWNrLnN0YXR1cykge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1XYXJuaW5nRXZlbnRzICs9IDEuMDtcbiAgICAgICAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkKSB7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1XYXJuaW5nRXZlbnRzU2lsZW5jZWQgKz0gMS4wO1xuICAgICAgICAgICAgICBldmVudE1ldHJpY3MubnVtU2lsZW5jZWQgKz0gMS4wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZXZlbnRNZXRyaWNzLm51bUNyaXRpY2FsRXZlbnRzICs9IDEuMDtcbiAgICAgICAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkKSB7XG4gICAgICAgICAgICAgIGV2ZW50TWV0cmljcy5udW1Dcml0aWNhbEV2ZW50c1NpbGVuY2VkICs9IDEuMDtcbiAgICAgICAgICAgICAgZXZlbnRNZXRyaWNzLm51bVNpbGVuY2VkICs9IDEuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBldmVudE1ldHJpY3MubnVtVW5rbm93bkV2ZW50cyArPSAxLjA7XG4gICAgICAgICAgICBpZiAoYW5FdmVudC5zaWxlbmNlZCkge1xuICAgICAgICAgICAgICBldmVudE1ldHJpY3MubnVtVW5rbm93bkV2ZW50c1NpbGVuY2VkICs9IDEuMDtcbiAgICAgICAgICAgICAgZXZlbnRNZXRyaWNzLm51bVNpbGVuY2VkICs9IDEuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBzdG9yZSB0aGUgY2xpZW50IG5hbWVzIHRvIGNvdW50IGxhdGVyXG4gICAgICBpZiAoY2xpZW50TmFtZXMuaW5kZXhPZihhbkV2ZW50LmNsaWVudC5uYW1lKSA8IDEuMCkge1xuICAgICAgICBjbGllbnROYW1lcy5wdXNoKGFuRXZlbnQuY2xpZW50Lm5hbWUpO1xuICAgICAgfVxuICAgICAgLy8gc3RvcmUgdGhlIGNoZWNrIG5hbWVzIHRvIGNvdW50IGxhdGVyXG4gICAgICBpZiAoY2hlY2tOYW1lcy5pbmRleE9mKGFuRXZlbnQuY2hlY2submFtZSkgPCAxLjApIHtcbiAgICAgICAgY2hlY2tOYW1lcy5wdXNoKGFuRXZlbnQuY2hlY2submFtZSk7XG4gICAgICB9XG4gICAgICAvLyBpbnNwZWN0IHNpbGVuY2VkX2J5IGZvciBjbGllbnRuYW1lOiosIHdpY2ggbWVhbnMgdGhlIGNsaWVudCBpcyBzaWxlbmNlZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbkV2ZW50LnNpbGVuY2VkX2J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbkV2ZW50LnNpbGVuY2VkX2J5W2ldLmluZGV4T2YoXCIqXCIpID49IDApIHtcbiAgICAgICAgICBldmVudE1ldHJpY3MubnVtQ2xpZW50c1NpbGVuY2VkICs9IDEuMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudE1ldHJpY3MubnVtQ2hlY2tzU2lsZW5jZWQgKz0gMS4wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHRhcmdldE5hbWUgPSBudWxsO1xuICBpZiAoYVRhcmdldC5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICB0YXJnZXROYW1lID0gYVRhcmdldC5uYW1lO1xuICB9XG4gIGlmIChhVGFyZ2V0LmFsaWFzUmVwbGFjZWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRhcmdldE5hbWUgPSBhVGFyZ2V0LmFsaWFzUmVwbGFjZWQ7XG4gIH1cbiAgbmV3UmVzcG9uc2UuZGF0YSA9IFt7XG4gICAgdGFyZ2V0OiB0YXJnZXROYW1lLFxuICAgIGRhdGFwb2ludHM6IFtcbiAgICAgIFsgMC4wMCwgdGltZXN0YW1wIF1cbiAgICBdXG4gIH1dO1xuICBzd2l0Y2ggKGFUYXJnZXQuZXZlbnRNZXRyaWNNb2RlKSB7XG4gICAgY2FzZSBcImFsbF9ldmVudHNfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJhbGxfZXZlbnRzX2NvdW50XCI7XG4gICAgICB9XG4gICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLmRhdGFwb2ludHMgPSBbWyBldmVudE1ldHJpY3MubnVtRXZlbnRzLCB0aW1lc3RhbXBdXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJhY3RpdmVfZXZlbnRzX2NvdW50XCI6XG4gICAgICBpZiAodGFyZ2V0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLnRhcmdldCA9IFwiYWN0aXZlX2V2ZW50c19jb3VudFwiO1xuICAgICAgfVxuICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS5kYXRhcG9pbnRzID0gW1sgZXZlbnRNZXRyaWNzLm51bUV2ZW50cyAtIGV2ZW50TWV0cmljcy5udW1TaWxlbmNlZCwgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY3JpdGljYWxfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJjcml0aWNhbF9ldmVudHNfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1Dcml0aWNhbEV2ZW50cywgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY3JpdGljYWxfYWN0aXZlX2NvdW50XCI6XG4gICAgICBpZiAodGFyZ2V0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLnRhcmdldCA9IFwiY3JpdGljYWxfYWN0aXZlX2NvdW50XCI7XG4gICAgICB9XG4gICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLmRhdGFwb2ludHMgPSBbWyBldmVudE1ldHJpY3MubnVtQ3JpdGljYWxFdmVudHMgLSBldmVudE1ldHJpY3MubnVtQ3JpdGljYWxFdmVudHNTaWxlbmNlZCwgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY3JpdGljYWxfc2lsZW5jZWRfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJjcml0aWNhbF9zaWxlbmNlZF9jb3VudFwiO1xuICAgICAgfVxuICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS5kYXRhcG9pbnRzID0gW1sgZXZlbnRNZXRyaWNzLm51bUNyaXRpY2FsRXZlbnRzU2lsZW5jZWQsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndhcm5pbmdfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJ3YXJuaW5nX2V2ZW50c19jb3VudFwiO1xuICAgICAgfVxuICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS5kYXRhcG9pbnRzID0gW1sgZXZlbnRNZXRyaWNzLm51bVdhcm5pbmdFdmVudHMsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndhcm5pbmdfYWN0aXZlX2NvdW50XCI6XG4gICAgICBpZiAodGFyZ2V0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLnRhcmdldCA9IFwid2FybmluZ19hY3RpdmVfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1XYXJuaW5nRXZlbnRzIC0gZXZlbnRNZXRyaWNzLm51bVdhcm5pbmdFdmVudHNTaWxlbmNlZCwgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2FybmluZ19zaWxlbmNlZF9jb3VudFwiOlxuICAgICAgaWYgKHRhcmdldE5hbWUgPT09IG51bGwpIHtcbiAgICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS50YXJnZXQgPSBcIndhcm5pbmdfc2lsZW5jZWRfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1XYXJuaW5nRXZlbnRzU2lsZW5jZWQsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInVua25vd25fY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJ1bmtub3duX2V2ZW50c19jb3VudFwiO1xuICAgICAgfVxuICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS5kYXRhcG9pbnRzID0gW1sgZXZlbnRNZXRyaWNzLm51bVVua25vd25FdmVudHMsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInVua25vd25fYWN0aXZlX2NvdW50XCI6XG4gICAgICBpZiAodGFyZ2V0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLnRhcmdldCA9IFwidW5rbm93bl9hY3RpdmVfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1Vbmtub3duRXZlbnRzIC0gZXZlbnRNZXRyaWNzLm51bVVua25vd25FdmVudHNTaWxlbmNlZCwgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwidW5rbm93bl9zaWxlbmNlZF9jb3VudFwiOlxuICAgICAgaWYgKHRhcmdldE5hbWUgPT09IG51bGwpIHtcbiAgICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS50YXJnZXQgPSBcInVua25vd25fc2lsZW5jZWRfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1Vbmtub3duRXZlbnRzU2lsZW5jZWQsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNpbGVuY2VkX2NvdW50XCI6XG4gICAgICBpZiAodGFyZ2V0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLnRhcmdldCA9IFwic2lsZW5jZWRfZXZlbnRzX2NvdW50XCI7XG4gICAgICB9XG4gICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLmRhdGFwb2ludHMgPSBbWyBldmVudE1ldHJpY3MubnVtU2lsZW5jZWQsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNsaWVudHNfc2lsZW5jZWRfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJjbGllbnRzX3NpbGVuY2VkX2NvdW50XCI7XG4gICAgICB9XG4gICAgICBuZXdSZXNwb25zZS5kYXRhWzBdLmRhdGFwb2ludHMgPSBbWyBldmVudE1ldHJpY3MubnVtQ2xpZW50c1NpbGVuY2VkLCB0aW1lc3RhbXBdXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjaGVja3Nfc2lsZW5jZWRfY291bnRcIjpcbiAgICAgIGlmICh0YXJnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0udGFyZ2V0ID0gXCJjaGVja3Nfc2lsZW5jZWRfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1DaGVja3NTaWxlbmNlZCwgdGltZXN0YW1wXV07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHRhcmdldE5hbWUgPT09IG51bGwpIHtcbiAgICAgICAgbmV3UmVzcG9uc2UuZGF0YVswXS50YXJnZXQgPSBcImFsbF9ldmVudHNfY291bnRcIjtcbiAgICAgIH1cbiAgICAgIG5ld1Jlc3BvbnNlLmRhdGFbMF0uZGF0YXBvaW50cyA9IFtbIGV2ZW50TWV0cmljcy5udW1FdmVudHMsIHRpbWVzdGFtcF1dO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgLy92YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkobmV3UmVzcG9uc2UsIG51bGwsIDIpO1xuICAvL2NvbnNvbGUubG9nKHN0cik7XG4gIHJldHVybiBuZXdSZXNwb25zZTtcbn1cblxuZXhwb3J0IHtcbiAgY29udmVydEV2ZW50c1RvSlNPTixcbiAgY29udmVydEV2ZW50c1RvRGF0YVBvaW50cyxcbiAgY29udmVydEV2ZW50c1RvRXZlbnRNZXRyaWNzLFxuICBjb252ZXJ0RXZlbnRzVG9FdmVudE1ldHJpY3NKU09OXG59O1xuIiwiLyoqXG4gKlxuICovXG5cbi8qKlxuICogTm8gZmllbGRzIG1lYW5zIGl0IGlzIGEgbWF0Y2hcbiAqIEBwYXJhbSAge1t0eXBlXX0gIHRhcmdldCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBpbmNsdWRlRXZlbnRUYXJnZXQodGFyZ2V0LCBhbkV2ZW50KSB7XG4gIGlmICh0YXJnZXQuZmlsdGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHRhcmdldC5maWx0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0LmZpbHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYUZpbHRlciA9IHRhcmdldC5maWx0ZXJzW2ldO1xuICAgIHN3aXRjaCAoYUZpbHRlci5maWx0ZXJUeXBlKSB7XG4gICAgICBjYXNlIFwiZmllbGRcIjpcbiAgICAgICAgLy8gZmlsdGVyRmllbGROYW1lXG4gICAgICAgIC8vIGZpbHRlckZpZWxkVmFsdWVcbiAgICAgICAgaWYgKGFuRXZlbnQuY2xpZW50Lmhhc093blByb3BlcnR5KGFGaWx0ZXIuZmlsdGVyRmllbGROYW1lKSkge1xuICAgICAgICAgIC8vIG1hdGNoZWQgZmllbGQsIGNoZWNrIHZhbHVlXG4gICAgICAgICAgdmFyIGFWYWwgPSBhbkV2ZW50LmNsaWVudFthRmlsdGVyLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgaWYgKGFWYWwgPT09IGFGaWx0ZXIuZmlsdGVyRmllbGRWYWx1ZVJlcGxhY2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IHtcbiAgaW5jbHVkZUV2ZW50VGFyZ2V0XG59O1xuIiwiLyoqXG4gKlxuICovXG5cbmZ1bmN0aW9uIGdldEV2ZW50c1VSSXMoY2hlY2tOYW1lcywgY2xpZW50TmFtZXMpIHtcbiAgLy8gaHR0cHM6Ly9zZW5zdWFwcC5vcmcvZG9jcy8wLjI4L2FwaS9ldmVudHMtYXBpLmh0bWxcbiAgdmFyIHVyaXMgPSBbXTtcbiAgdmFyIGRpbWVuc2lvblVSSSA9IFwiL2V2ZW50c1wiO1xuICB2YXIgYUNsaWVudE5hbWUgPSBudWxsO1xuICB2YXIgYUNoZWNrTmFtZSA9IG51bGw7XG4gIHZhciBhbkFnZ3JlZ2F0ZU5hbWUgPSBudWxsO1xuICBpZiAoY2xpZW50TmFtZXMubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2V2ZW50cy9cIiArIGFDbGllbnROYW1lO1xuICAgICAgdXJpcy5wdXNoKGRpbWVuc2lvblVSSSk7XG4gICAgfVxuICB9XG4gIGlmICgoY2hlY2tOYW1lcy5sZW5ndGgpICYmIChjbGllbnROYW1lcy5sZW5ndGgpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hlY2tOYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICBhQ2hlY2tOYW1lID0gY2hlY2tOYW1lc1tpXTtcbiAgICAgICAgZGltZW5zaW9uVVJJID0gXCIvZXZlbnRzL1wiICsgYUNsaWVudE5hbWUgKyBcIi9cIiArIGFDaGVja05hbWU7XG4gICAgICAgIHVyaXMucHVzaChkaW1lbnNpb25VUkkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodXJpcy5sZW5ndGggPT09IDApIHtcbiAgICB1cmlzLnB1c2goZGltZW5zaW9uVVJJKTtcbiAgfVxuICByZXR1cm4gdXJpcztcbn1cblxuZXhwb3J0IHtcbiAgZ2V0RXZlbnRzVVJJc1xufTtcbiIsIlxuaW1wb3J0IHsgZ2V0UmVzcG9uc2VGb3JUYXJnZXQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBjb252ZXJ0UmVzdWx0c1RvVGFibGUoYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gIHZhciByZXNwb25zZSA9IGdldFJlc3BvbnNlRm9yVGFyZ2V0KGFUYXJnZXQsIHJlc3BvbnNlcyk7XG5cbiAgLy8gdGhlIHJlc3VsdCBoYXMgbm8gXCJkYXRhcG9pbnRzXCIsIG5lZWQgdG8gY3JlYXRlIGl0IGJhc2VkIG9uIHRoZSBjaGVjayBkYXRhXG4gIC8vIHdoZW4gd2UgaGF2ZSBhIGNoZWNrbmFtZSBhbmQgYSBjbGllbnROYW1lLCB0aGUgcmVzcG9uc2UgaXMgZGlmZmVyZW50LCB0aGVcbiAgLy8gZGF0YSBpcyBub3QgYW4gYXJyYXksIGJ1dCBjb250YWlucyB0aGUgc2FtZSBpbmZvcm1hdGlvbiwgcmVjcmVhdGUgYW5kIHB1c2hcbiAgaWYgKHJlc3BvbnNlLmRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc2luZ2xlRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgcmVzcG9uc2UuZGF0YSA9IFtdO1xuICAgIHJlc3BvbnNlLmRhdGEucHVzaChzaW5nbGVEYXRhKTtcbiAgfVxuICAvLyB0aGlzIHdpbGwgYmUgY29sbGFwc2VkIGludG8gdGFibGUgZm9ybWF0LCB3aGVyZSB0aGUgY29sdW1ucyBhcmUgcHJlZGVmaW5lZFxuICAvLyBhbmQgZWFjaCByb3cgaXMgYSByZXNwb25zZSBmb3JtYXR0ZWQgdG8gdGhlIGNvbHVtbnNcbiAgdmFyIHJvd0RhdGEgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJvd0luZm8gPSByZXNwb25zZS5kYXRhW2ldO1xuICAgIHZhciBhUm93ID0gW1xuICAgICAgcm93SW5mby5jaGVjay5pc3N1ZWQgKiAxMDAwLFxuICAgICAgcm93SW5mby5jbGllbnQsXG4gICAgICByb3dJbmZvLmNoZWNrLm5hbWUsXG4gICAgICByb3dJbmZvLmNoZWNrLnN0YXR1cyxcbiAgICAgIHJvd0luZm8uY2hlY2suaXNzdWVkICogMTAwMCxcbiAgICAgIHJvd0luZm8uY2hlY2suZXhlY3V0ZWQgKiAxMDAwLFxuICAgICAgcm93SW5mby5jaGVjay5vdXRwdXQsXG4gICAgICByb3dJbmZvLmNoZWNrLnR5cGUsXG4gICAgICByb3dJbmZvLmNoZWNrLnRocmVzaG9sZHMud2FybmluZyxcbiAgICAgIHJvd0luZm8uY2hlY2sudGhyZXNob2xkcy5jcml0aWNhbFxuICAgIF07XG4gICAgLy8gbm93IHB1c2ggaW50byByb3dEYXRhXG4gICAgcm93RGF0YS5wdXNoKGFSb3cpO1xuICB9XG4gIC8vIGNvbGxhcHNlIGV2ZXJ5dGhpbmcgaW50byBkYXRhWzBdXG4gIHZhciBhbkV2ZW50ID0gcmVzcG9uc2UuZGF0YVswXTtcbiAgdmFyIGRhdGFwb2ludHMgPSBbXTtcbiAgZGF0YXBvaW50c1swXSA9IFthbkV2ZW50LmNoZWNrLnN0YXR1cywgKGFuRXZlbnQuY2hlY2suaXNzdWVkICogMTAwMCldO1xuICBhbkV2ZW50LmRhdGFwb2ludHMgPSBkYXRhcG9pbnRzO1xuICBhbkV2ZW50LnR5cGUgPSBcInRhYmxlXCI7XG4gIGFuRXZlbnQuY29sdW1ucyA9IFtcbiAgICB7IHRleHQ6IFwiVGltZVwiLCB0eXBlOiBcImRhdGVcIn0sXG4gICAgeyB0ZXh0OiBcImNsaWVudFwiIH0sXG4gICAgeyB0ZXh0OiBcImNoZWNrLm5hbWVcIiB9LFxuICAgIHsgdGV4dDogXCJjaGVjay5zdGF0dXNcIiB9LFxuICAgIHsgdGV4dDogXCJjaGVjay5pc3N1ZWRcIiwgdHlwZTogXCJkYXRlXCIgfSxcbiAgICB7IHRleHQ6IFwiY2hlY2suZXhlY3V0ZWRcIiwgdHlwZTogXCJkYXRlXCIgfSxcbiAgICB7IHRleHQ6IFwiY2hlY2sub3V0cHV0XCIgfSxcbiAgICB7IHRleHQ6IFwiY2hlY2sudHlwZVwiIH0sXG4gICAgeyB0ZXh0OiBcImNoZWNrLnRocmVzaG9sZHMud2FybmluZ1wiIH0sXG4gICAgeyB0ZXh0OiBcImNoZWNrLnRocmVzaG9sZHMuY3JpdGljYWxcIiB9XG4gIF07XG4gIGFuRXZlbnQucm93cyA9IHJvd0RhdGE7XG4gIC8vIHRydW5jYXRlIHRoZSByZXN0XG4gIHJlc3BvbnNlLmRhdGEgPSBbYW5FdmVudF07XG4gIC8vdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLCBudWxsLCAyKTtcbiAgLy9jb25zb2xlLmxvZyhzdHIpO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbi8qXG5SZXNwb25zZSBjb21lIGJhY2sgYXM6XG57XG5cImNsaWVudFwiOiBcInAzLWdyYXBoaXRlLXQxXCIsXG5cImNoZWNrXCI6IHtcbiAgXCJ0aHJlc2hvbGRzXCI6IHtcbiAgICBcIndhcm5pbmdcIjogMTIwLFxuICAgIFwiY3JpdGljYWxcIjogMTgwXG4gIH0sXG4gIFwibmFtZVwiOiBcImtlZXBhbGl2ZVwiLFxuICBcImlzc3VlZFwiOiAxNDgyMDY3Mjg0LFxuICBcImV4ZWN1dGVkXCI6IDE0ODIwNjcyODQsXG4gIFwib3V0cHV0XCI6IFwiS2VlcGFsaXZlIHNlbnQgZnJvbSBjbGllbnQgMyBzZWNvbmRzIGFnb1wiLFxuICBcInN0YXR1c1wiOiAwLFxuICBcInR5cGVcIjogXCJzdGFuZGFyZFwiXG59XG59XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSZXN1bHRzVG9KU09OKGFUYXJnZXQsIHJlc3BvbnNlcykge1xuICB2YXIgcmVzcG9uc2UgPSBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2UuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhbkV2ZW50ID0gcmVzcG9uc2UuZGF0YVtpXTtcbiAgICB2YXIgZGF0YXBvaW50cyA9IFtdO1xuICAgIGlmIChhbkV2ZW50LmNoZWNrLmlzc3VlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdGltZXN0YW1wOiAoYW5FdmVudC5jaGVjay5pc3N1ZWQgKiAxMDAwKSxcbiAgICAgICAgbWVzc2FnZTogYW5FdmVudC5jaGVjay5uYW1lLFxuICAgICAgICBjbGllbnQ6IGFuRXZlbnQuY2xpZW50LFxuICAgICAgICBjaGVjazoge1xuICAgICAgICAgIG5hbWU6IGFuRXZlbnQuY2hlY2submFtZSxcbiAgICAgICAgICBpc3N1ZWQ6IChhbkV2ZW50LmNoZWNrLmlzc3VlZCAqIDEwMDApLFxuICAgICAgICAgIGV4ZWN1dGVkOiAoYW5FdmVudC5jaGVjay5leGVjdXRlZCAqIDEwMDApLFxuICAgICAgICAgIG91dHB1dDogYW5FdmVudC5jaGVjay5vdXRwdXQsXG4gICAgICAgICAgc3RhdHVzOiBhbkV2ZW50LmNoZWNrLnN0YXR1cyxcbiAgICAgICAgICB0eXBlOiBhbkV2ZW50LmNoZWNrLnR5cGVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGRhdGFwb2ludHMucHVzaChkYXRhKTtcbiAgICAgIGFuRXZlbnQuZGF0YXBvaW50cyA9IGRhdGFwb2ludHM7XG4gICAgICBkZWxldGUgYW5FdmVudC5jaGVjaztcbiAgICAgIGRlbGV0ZSBhbkV2ZW50LmNsaWVudDtcbiAgICAgIGFuRXZlbnQudHlwZSA9IFwiZG9jc1wiO1xuICAgIH1cbiAgfVxuICAvL3ZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMik7XG4gIC8vY29uc29sZS5sb2coc3RyKTtcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG4vKipcbiAqIFtjb252ZXJ0UmVzdWx0c1RvRGF0YVBvaW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVzcG9uc2UgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb252ZXJ0UmVzdWx0c1RvRGF0YVBvaW50cyhhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgdmFyIHJlc3BvbnNlID0gZ2V0UmVzcG9uc2VGb3JUYXJnZXQoYVRhcmdldCwgcmVzcG9uc2VzKTtcblxuICAvLyB0aGUgcmVzdWx0IGhhcyBubyBcImRhdGFwb2ludHNcIiwgbmVlZCB0byBjcmVhdGUgaXQgYmFzZWQgb24gdGhlIGNoZWNrIGRhdGFcbiAgLy8gd2hlbiB3ZSBoYXZlIGEgY2hlY2tuYW1lIGFuZCBhbiBjbGllbnROYW1lLCB0aGUgcmVzcG9uc2UgaXMgZGlmZmVyZW50LCB0aGVcbiAgLy8gZGF0YSBpcyBub3QgYW4gYXJyYXksIGJ1dCBjb250YWlucyB0aGUgc2FtZSBpbmZvcm1hdGlvbiwgcmVjcmVhdGUgYW5kIHB1c2hcbiAgaWYgKHJlc3BvbnNlLmRhdGEubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc2luZ2xlRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgcmVzcG9uc2UuZGF0YSA9IFtdO1xuICAgIHJlc3BvbnNlLmRhdGEucHVzaChzaW5nbGVEYXRhKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYW5FdmVudCA9IHJlc3BvbnNlLmRhdGFbaV07XG4gICAgLy92YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkoYW5FdmVudCwgbnVsbCwgMik7XG4gICAgLy9jb25zb2xlLmxvZyhzdHIpO1xuICAgIHZhciBkYXRhcG9pbnRzID0gW107XG4gICAgaWYgKGFuRXZlbnQuY2hlY2suaXNzdWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRhdGFwb2ludHNbMF0gPSBbYW5FdmVudC5jaGVjay5zdGF0dXMsIChhbkV2ZW50LmNoZWNrLmlzc3VlZCAqIDEwMDApXTtcbiAgICAgIC8vIHRoZSBkdXJhdGlvbiBpcyBoZXJlLi4uXG4gICAgICAvLyBkYXRhcG9pbnRzWzBdID0gW2FuRXZlbnQuY2hlY2suZHVyYXRpb24sIChhbkV2ZW50LmNoZWNrLmlzc3VlZCAqIDEwMDApXTtcbiAgICB9XG4gICAgYW5FdmVudC5kYXRhcG9pbnRzID0gZGF0YXBvaW50cztcbiAgICAvLyBzZXQgdGhlIHRhcmdldCB0byBiZSB0aGUgY2hlY2sgbmFtZVxuICAgIGlmIChhbkV2ZW50LmNoZWNrLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYW5FdmVudC50YXJnZXQgPSBhbkV2ZW50LmNoZWNrLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuRXZlbnQudGFyZ2V0ID0gYW5FdmVudC5jaGVjaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG5cbmV4cG9ydCB7XG4gIGNvbnZlcnRSZXN1bHRzVG9UYWJsZSxcbiAgY29udmVydFJlc3VsdHNUb0RhdGFQb2ludHMsXG4gIGNvbnZlcnRSZXN1bHRzVG9KU09OXG59O1xuIiwiXG5mdW5jdGlvbiBnZXRSZXN1bHRVUklzKGNoZWNrTmFtZXMsIGNsaWVudE5hbWVzKSB7XG4gIHZhciB1cmlzID0gW107XG4gIHZhciBkaW1lbnNpb25VUkkgPSBcIi9yZXN1bHRzXCI7XG4gIHZhciBhQ2xpZW50TmFtZSA9IG51bGw7XG4gIHZhciBhQ2hlY2tOYW1lID0gbnVsbDtcbiAgdmFyIGFuQWdncmVnYXRlTmFtZSA9IG51bGw7XG4gIGlmIChjbGllbnROYW1lcy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsaWVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhQ2xpZW50TmFtZSA9IGNsaWVudE5hbWVzW2ldO1xuICAgICAgZGltZW5zaW9uVVJJID0gXCIvcmVzdWx0cy9cIiArIGFDbGllbnROYW1lO1xuICAgICAgdXJpcy5wdXNoKGRpbWVuc2lvblVSSSk7XG4gICAgfVxuICB9XG4gIGlmICgoY2hlY2tOYW1lcy5sZW5ndGgpICYmIChjbGllbnROYW1lcy5sZW5ndGgpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgYUNsaWVudE5hbWUgPSBjbGllbnROYW1lc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hlY2tOYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICBhQ2hlY2tOYW1lID0gY2hlY2tOYW1lc1tpXTtcbiAgICAgICAgZGltZW5zaW9uVVJJID0gXCIvcmVzdWx0cy9cIiArIGFDbGllbnROYW1lICsgXCIvXCIgKyBhQ2hlY2tOYW1lO1xuICAgICAgICB1cmlzLnB1c2goZGltZW5zaW9uVVJJKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHVyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgdXJpcy5wdXNoKGRpbWVuc2lvblVSSSk7XG4gIH1cbiAgcmV0dXJuIHVyaXM7XG59XG5cbmV4cG9ydCB7XG4gIGdldFJlc3VsdFVSSXNcbn07XG4iLCJmdW5jdGlvbiBnZXRSZXNwb25zZUZvclRhcmdldChhVGFyZ2V0LCByZXNwb25zZXMpIHtcbiAgLy8gZmluZCBhIHJlc3BvbnNlIHRoYXQgbWF0Y2hlcyB0aGUgdGFyZ2V0XG4gIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgIGRhdGE6IFtdXG4gIH07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2VzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmVzcG9uc2VzLmRhdGFbaV0udGFyZ2V0ID09PSBhVGFyZ2V0KSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSByZXNwb25zZSB0byBjb252ZXJ0XG4gICAgICByZXNwb25zZS5kYXRhID0gcmVzcG9uc2VzLmRhdGFbaV0ucmVzcG9uc2UuZGF0YTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cblxuZXhwb3J0IHtcbiAgZ2V0UmVzcG9uc2VGb3JUYXJnZXRcbn07XG4iLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2dyYWZhbmEvYXBwL2NvcmUvdXRpbHMva2JuLmQudHNcIiAvPlxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcblxuaW1wb3J0IHsgaW50ZXJ2YWxfdG9fbXMsIHNlY29uZHNUb0htcyB9IGZyb20gXCJncmFmYW5hL2FwcC9jb3JlL3V0aWxzL2tiblwiO1xuXG5pbXBvcnQgeyBnZXRBZ2dyZWdhdGVVUklzIH0gZnJvbSAnLi9hcGkvYWdncmVnYXRlX3JlcXVlc3RzJztcbmltcG9ydCB7IGNvbnZlcnRBZ2dyZWdhdGVzVG9EYXRhUG9pbnRzLCBjb252ZXJ0QWdncmVnYXRlc1RvSlNPTiB9IGZyb20gJy4vYXBpL2FnZ3JlZ2F0ZV9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IGdldENsaWVudHNVUklzLCBnZXRDbGllbnRIZWFsdGhVUklzLCBnZXRDbGllbnRIaXN0b3J5VVJJcyB9IGZyb20gJy4vYXBpL2NsaWVudF9yZXF1ZXN0cyc7XG5pbXBvcnQgeyBjb252ZXJ0Q2xpZW50c1RvRGF0YVBvaW50cywgY29udmVydENsaWVudHNUb0pTT04sIGNvbnZlcnRDbGllbnRIZWFsdGhUb0pTT04sIGNvbnZlcnRDbGllbnRIaXN0b3J5VG9EYXRhUG9pbnRzIH1cbiAgZnJvbSAnLi9hcGkvY2xpZW50X2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgZ2V0RXZlbnRzVVJJcyB9IGZyb20gJy4vYXBpL2V2ZW50X3JlcXVlc3RzJztcbmltcG9ydCB7IGNvbnZlcnRFdmVudHNUb0RhdGFQb2ludHMsIGNvbnZlcnRFdmVudHNUb0pTT04sIGNvbnZlcnRFdmVudHNUb0V2ZW50TWV0cmljcywgY29udmVydEV2ZW50c1RvRXZlbnRNZXRyaWNzSlNPTiB9IGZyb20gJy4vYXBpL2V2ZW50X2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgZ2V0UmVzdWx0VVJJcyB9IGZyb20gJy4vYXBpL3Jlc3VsdF9yZXF1ZXN0cyc7XG5pbXBvcnQgeyBjb252ZXJ0UmVzdWx0c1RvSlNPTiwgY29udmVydFJlc3VsdHNUb1RhYmxlIH0gZnJvbSAnLi9hcGkvcmVzdWx0X2NvbnZlcnRlcnMnO1xuXG5leHBvcnQgY2xhc3MgU2Vuc3VDb3JlRGF0YXNvdXJjZSB7XG4gIHVybDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGJhc2ljQXV0aDogc3RyaW5nO1xuICB3aXRoQ3JlZGVudGlhbHM6IGFueTtcbiAgcTogYW55O1xuICBiYWNrZW5kU3J2OiBhbnk7XG4gIHRlbXBsYXRlU3J2OiBhbnk7XG4gIHVpU2VnbWVudFNydjogYW55O1xuICBtaW5pbXVtSW50ZXJ2YWw6IGFueTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlU2V0dGluZ3M6IGFueSwgJHE6IGFueSwgYmFja2VuZFNydjogYW55LCB0ZW1wbGF0ZVNydjogYW55LCB1aVNlZ21lbnRTcnY6IGFueSkge1xuICAgIHRoaXMudXJsID0gaW5zdGFuY2VTZXR0aW5ncy51cmw7XG4gICAgdGhpcy5uYW1lID0gaW5zdGFuY2VTZXR0aW5ncy5uYW1lO1xuICAgIHRoaXMuYmFzaWNBdXRoID0gaW5zdGFuY2VTZXR0aW5ncy5iYXNpY0F1dGg7XG4gICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBpbnN0YW5jZVNldHRpbmdzLndpdGhDcmVkZW50aWFscztcbiAgICB0aGlzLnEgPSAkcTtcbiAgICB0aGlzLmJhY2tlbmRTcnYgPSBiYWNrZW5kU3J2O1xuICAgIHRoaXMudGVtcGxhdGVTcnYgPSB0ZW1wbGF0ZVNydjtcbiAgICB0aGlzLnVpU2VnbWVudFNydiA9IHVpU2VnbWVudFNydjtcbiAgICB0aGlzLm1pbmltdW1JbnRlcnZhbCA9IDYwMDAwOyAvLyBtaWxsaXNlY29uZHNcbiAgfVxuXG4gIC8vIFJlcXVpcmVkIGZvciB0ZW1wbGF0aW5nXG4gIC8vIGdldHMgdGhlIGNsaWVudHMgZnJvbSBTZW5zdSBBUElcbiAgLy8gaHR0cHM6Ly9zZW5zdWFwcC5vcmcvZG9jcy8wLjI2L2FwaS9jbGllbnRzLWFwaS5odG1sXG5cbiAgbWV0cmljRmluZFF1ZXJ5KG9wdGlvbnM6IGFueSkge1xuICAgIC8vY29uc29sZS5sb2coXCJtZXRyaWNGaW5kUXVlcnkgZW50ZXJlZDogXCIgKyBvcHRpb25zKTtcbiAgICB2YXIgaXNDbGllbnRUYWdzID0gZmFsc2U7XG4gICAgdmFyIGlzQ2xpZW50VGFnVmFsdWUgPSBmYWxzZTtcbiAgICB2YXIgYVF1ZXJ5ID0gXCIvY2xpZW50c1wiO1xuICAgIHZhciB0YWdUb1ZhbHVlID0gXCJcIjtcbiAgICAvLyBzdWJzdGl0dXRlIHRlbXBsYXRlIHZhcnNcbiAgICBvcHRpb25zID0gdGhpcy50ZW1wbGF0ZVNydi5yZXBsYWNlV2l0aFRleHQob3B0aW9ucyk7XG4gICAgaWYgKChvcHRpb25zICE9PSB1bmRlZmluZWQpICYmIChvcHRpb25zICE9PSBcIlwiKSkge1xuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgL2NsaWVudHRhZ3MvLnRlc3Qob3B0aW9ucyk6XG4gICAgICAgICAgYVF1ZXJ5ID0gXCIvY2xpZW50c1wiO1xuICAgICAgICAgIGlzQ2xpZW50VGFncyA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgL2NsaWVudHRhZ3ZhbHVlLy50ZXN0KG9wdGlvbnMpOlxuICAgICAgICAgIGFRdWVyeSA9IFwiL2NsaWVudHNcIjtcbiAgICAgICAgICBpc0NsaWVudFRhZ1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAvLyBzcGxpdCBvdXQgdGhlIHRhZyBmcm9tIHRoZSBxdWVyeVxuICAgICAgICAgIHRhZ1RvVmFsdWUgPSBvcHRpb25zLnNwbGl0KFwidGFnPVwiKVsxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBhUXVlcnkgPSBvcHRpb25zO1xuICAgICAgfVxuICAgICAgLy8gbWFrZSBzdXJlIHRoZXJlIGlzIGEgbGVhZGluZyBzbGFzaFxuICAgICAgaWYgKCFhUXVlcnkuc3RhcnRzV2l0aChcIi9cIiwgMCkpIHtcbiAgICAgICAgYVF1ZXJ5ID0gXCIvXCIgKyBhUXVlcnk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0aGlzUmVmID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kU3J2LmRhdGFzb3VyY2VSZXF1ZXN0KHtcbiAgICAgIHVybDogdGhpcy51cmwgKyBhUXVlcnksXG4gICAgICBkYXRhOiBvcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IHRoaXMuYmFzaWNBdXRoXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZTogYW55KSB7XG4gICAgICAvL3RoaXNSZWYuY2xpZW50UXVlcnlUYWdzID0gX3RoaXMuZ2VuZXJhdGVDbGllbnRRdWVyeVRhZ3MocmVzcG9uc2UpO1xuICAgICAgaWYgKGlzQ2xpZW50VGFncykge1xuICAgICAgICByZXR1cm4gdGhpc1JlZi5nZW5lcmF0ZUNsaWVudFF1ZXJ5VGFncyhyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNDbGllbnRUYWdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpc1JlZi5nZXRDbGllbnRRdWVyeVRhZ1ZhbHVlKHJlc3BvbnNlLCB0YWdUb1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzUmVmLm1hcFRvQ2xpZW50TmFtZUFuZFZlcnNpb24ocmVzcG9uc2UpO1xuICAgIH0pO1xuICB9XG5cblxuICBnZW5lcmF0ZUNsaWVudFF1ZXJ5VGFncyhyZXNwb25zZTogYW55KSB7XG4gICAgdmFyIGNsaWVudFF1ZXJ5VGFncyA9IFtdO1xuICAgIHZhciBhbGxUYWdzID0gW107XG4gICAgdmFyIGV4Y2x1ZGVkVGFncyA9IFtcbiAgICAgIFwibmFtZVwiLFxuICAgICAgXCJzb2NrZXRcIixcbiAgICAgIFwiYWRkcmVzc1wiLFxuICAgICAgXCJzdWJzY3JpcHRpb25zXCIsXG4gICAgICBcInRpbWVzdGFtcFwiLFxuICAgICAgXCJrZWVwYWxpdmVcIixcbiAgICAgIFwia2VlcGFsaXZlc1wiLFxuICAgICAgXCJyZWRhY3RcIixcbiAgICAgIFwidmVyc2lvblwiXG4gICAgXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVzcG9uc2UuZGF0YVtpXSk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IGtleU5hbWUgPSBrZXlzW2pdO1xuICAgICAgICBpZiAoZXhjbHVkZWRUYWdzLmluZGV4T2Yoa2V5TmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgbGV0IHRhZ1ZhbHVlID0gcmVzcG9uc2UuZGF0YVtpXVtrZXlOYW1lXTtcbiAgICAgICAgICBsZXQgZnVsbEtleU5hbWUgPSBrZXlOYW1lICsgXCI9XCIgKyB0YWdWYWx1ZTtcbiAgICAgICAgICBpZiAoYWxsVGFncy5pbmRleE9mKGZ1bGxLZXlOYW1lKSA8IDApIHtcbiAgICAgICAgICAgIGFsbFRhZ3MucHVzaChmdWxsS2V5TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxUYWdzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGJ1aWxkIHRoZSB0YWdzXG4gICAgICBhbGxUYWdzLnNvcnQoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsVGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbGllbnRRdWVyeVRhZ3MucHVzaChcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBhbGxUYWdzW2ldLFxuICAgICAgICAgICAgZXhwYW5kYWJsZTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsaWVudFF1ZXJ5VGFncztcbiAgfVxuXG4gIGdldENsaWVudFF1ZXJ5VGFnVmFsdWUocmVzcG9uc2U6IGFueSwgdGFnOiBzdHJpbmcpIHtcbiAgICB2YXIgdGFnU3BsaXQgPSB0YWcuc3BsaXQoXCI9XCIpO1xuICAgIHZhciB0YWdUb01hdGNoID0gdGFnU3BsaXRbMF07XG4gICAgdmFyIHRhZ1ZhbHVlVG9NYXRjaCA9IHRhZ1NwbGl0WzFdO1xuICAgIHZhciBjbGllbnRRdWVyeVRhZ3MgPSBbXTtcbiAgICB2YXIgYWxsVGFnVmFsdWVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlc3BvbnNlLmRhdGFbaV0pO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGxldCBrZXlOYW1lID0ga2V5c1tqXTtcbiAgICAgICAgaWYgKHRhZ1RvTWF0Y2ggPT09IGtleU5hbWUpIHtcblxuICAgICAgICAgIC8vIHRoaXMgY2FuIGJlIGEgdmFsdWUgb3IgYW4gYXJyYXkgaW5zaWRlLCBjaGVjayBib3RoXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhW2ldW3RhZ1RvTWF0Y2hdICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IHJlc3BvbnNlLmRhdGFbaV1bdGFnVG9NYXRjaF0ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGFbaV1bdGFnVG9NYXRjaF1bel0gPT09IHRhZ1ZhbHVlVG9NYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vbGV0IHRhZ1ZhbHVlID0gcmVzcG9uc2UuZGF0YVtpXVtrZXlOYW1lXTtcbiAgICAgICAgICAgICAgICBsZXQgdGFnVmFsdWUgPSByZXNwb25zZS5kYXRhW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKGFsbFRhZ1ZhbHVlcy5pbmRleE9mKHRhZ1ZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGFsbFRhZ1ZhbHVlcy5wdXNoKHRhZ1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGFbaV1bdGFnVG9NYXRjaF0gPT09IHRhZ1ZhbHVlVG9NYXRjaCkge1xuICAgICAgICAgICAgICAvL2xldCB0YWdWYWx1ZSA9IHJlc3BvbnNlLmRhdGFbaV1ba2V5TmFtZV07XG4gICAgICAgICAgICAgIGxldCB0YWdWYWx1ZSA9IHJlc3BvbnNlLmRhdGFbaV0ubmFtZTtcbiAgICAgICAgICAgICAgaWYgKGFsbFRhZ1ZhbHVlcy5pbmRleE9mKHRhZ1ZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICBhbGxUYWdWYWx1ZXMucHVzaCh0YWdWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbFRhZ1ZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBidWlsZCB0aGUgdGFnc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxUYWdWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xpZW50UXVlcnlUYWdzLnB1c2goXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogYWxsVGFnVmFsdWVzW2ldXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xpZW50UXVlcnlUYWdzO1xuICB9XG5cbiAgLyoqXG4gICAqIFttYXBUb0NsaWVudE5hbWVBbmRWZXJzaW9uIGRlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHJlc3VsdCBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIG1hcFRvQ2xpZW50TmFtZUFuZFZlcnNpb24ocmVzdWx0OiBhbnkpIHtcbiAgICBpZiAocmVzdWx0LmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHJldHVybiBfLm1hcChyZXN1bHQuZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgdmFyIHggPSB7XG4gICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgIGV4cGFuZGFibGU6IHRydWVcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICB4ID0ge1xuICAgICAgICAgIHRleHQ6IGQubmFtZSxcbiAgICAgICAgICBleHBhbmRhYmxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKFwiYmFkIGRhdGFcIik7IH1cbiAgICAgIHJldHVybiB4O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFtnZXRDbGllbnROYW1lcyBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBkaW1lbnNpb25zIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGdldENsaWVudE5hbWVzKGRpbWVuc2lvbnM6IGFueSkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbWVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkaW1lbnNpb25zW2ldLmRpbWVuc2lvblR5cGUgPT09IFwiY2xpZW50TmFtZVwiKSB7XG4gICAgICAgIHZhciBhRGltZW5zaW9uID0gZGltZW5zaW9uc1tpXS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVTcnYuZ2V0VmFyaWFibGVOYW1lKGFEaW1lbnNpb24pKSB7XG4gICAgICAgICAgLy8gdGVtcGxhdGUgdmFyaWFibGUgZm91bmQsIGV4cGFuZCBpdFxuICAgICAgICAgIHZhciB0ZW1wbGF0ZVZhciA9IHRoaXMudGVtcGxhdGVTcnYucmVwbGFjZShhRGltZW5zaW9uKTtcbiAgICAgICAgICBpZiAodGVtcGxhdGVWYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhlIGV4cGFuZGVkIHZhcmlhYmxlIGNvbWVzIGJhY2sgYXMgeyB2YWx1ZTEgLCB2YWx1ZTIgfVxuICAgICAgICAgICAgLy8gb3IgaXQgY29tZXMgYmFjayBhcyBqdXN0IGEgdmFsdWVcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZVZhci5zdGFydHNXaXRoKFwie1wiKSkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVZhciA9IHRlbXBsYXRlVmFyLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlVmFycyA9IHRlbXBsYXRlVmFyLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCB0ZW1wbGF0ZVZhcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGVtcGxhdGVWYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaChhRGltZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKHZhbHVlcyk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBbZ2V0Q2hlY2tOYW1lcyBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W2FueV19IGRpbWVuc2lvbnMgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2V0Q2hlY2tOYW1lcyhkaW1lbnNpb25zOiBhbnkpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGltZW5zaW9uc1tpXS5kaW1lbnNpb25UeXBlID09PSBcImNoZWNrTmFtZVwiKSB7XG4gICAgICAgIHZhciBhRGltZW5zaW9uID0gZGltZW5zaW9uc1tpXS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVTcnYuZ2V0VmFyaWFibGVOYW1lKGFEaW1lbnNpb24pKSB7XG4gICAgICAgICAgLy8gdGVtcGxhdGUgdmFyaWFibGUgZm91bmQsIGV4cGFuZCBpdFxuICAgICAgICAgIHZhciB0ZW1wbGF0ZVZhciA9IHRoaXMudGVtcGxhdGVTcnYucmVwbGFjZShhRGltZW5zaW9uKTtcbiAgICAgICAgICBpZiAodGVtcGxhdGVWYXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gdGhlIGV4cGFuZGVkIHZhcmlhYmxlIGNvbWVzIGJhY2sgYXMgeyB2YWx1ZTEgLCB2YWx1ZTIgfVxuICAgICAgICAgICAgLy8gb3IgaXQgY29tZXMgYmFjayBhcyBqdXN0IGEgdmFsdWVcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZVZhci5zdGFydHNXaXRoKFwie1wiKSkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVZhciA9IHRlbXBsYXRlVmFyLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlVmFycyA9IHRlbXBsYXRlVmFyLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCB0ZW1wbGF0ZVZhcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGVtcGxhdGVWYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaChhRGltZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFtnZXRBZ2dyZWdhdGVOYW1lcyBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBkaW1lbnNpb25zIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGdldEFnZ3JlZ2F0ZU5hbWVzKGRpbWVuc2lvbnMpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGltZW5zaW9uc1tpXS5kaW1lbnNpb25UeXBlID09PSBcImFnZ3JlZ2F0ZU5hbWVcIikge1xuICAgICAgICB2YXIgYURpbWVuc2lvbiA9IGRpbWVuc2lvbnNbaV0udmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlU3J2LmdldFZhcmlhYmxlTmFtZShhRGltZW5zaW9uKSkge1xuICAgICAgICAgIC8vIHRlbXBsYXRlIHZhcmlhYmxlIGZvdW5kLCBleHBhbmQgaXRcbiAgICAgICAgICB2YXIgdGVtcGxhdGVWYXIgPSB0aGlzLnRlbXBsYXRlU3J2LnJlcGxhY2UoYURpbWVuc2lvbik7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlVmFyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHRoZSBleHBhbmRlZCB2YXJpYWJsZSBjb21lcyBiYWNrIGFzIHsgdmFsdWUxICwgdmFsdWUyIH1cbiAgICAgICAgICAgIC8vIG9yIGl0IGNvbWVzIGJhY2sgYXMganVzdCBhIHZhbHVlXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVWYXIuc3RhcnRzV2l0aChcIntcIikpIHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVWYXIgPSB0ZW1wbGF0ZVZhci5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZVZhcnMgPSB0ZW1wbGF0ZVZhci5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgdGVtcGxhdGVWYXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRlbXBsYXRlVmFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2goYURpbWVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHJlcGxhY2VGaWx0ZXJWYWx1ZXMoZmlsdGVycykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFGaWx0ZXIgPSBmaWx0ZXJzW2ldO1xuICAgICAgc3dpdGNoIChhRmlsdGVyLmZpbHRlclR5cGUpIHtcbiAgICAgICAgY2FzZSBcImZpZWxkXCI6XG4gICAgICAgICAgLy8gRmllbGQgZmlsdGVycyBoYXZlIHRoZXNlIHByb3BlcnRpZXNcbiAgICAgICAgICAvLyBmaWx0ZXJGaWVsZE5hbWVcbiAgICAgICAgICAvLyBmaWx0ZXJGaWVsZFZhbHVlXG4gICAgICAgICAgLy92YXIgYUZpZWxkTmFtZSA9IGFGaWx0ZXIuZmlsdGVyRmllbGROYW1lO1xuICAgICAgICAgIHZhciBhRmllbGRWYWx1ZSA9IGFGaWx0ZXIuZmlsdGVyRmllbGRWYWx1ZTtcbiAgICAgICAgICB2YXIgdGVtcGxhdGVkVmFsdWUgPSB0aGlzLnRlbXBsYXRlU3J2LnJlcGxhY2UoYUZpZWxkVmFsdWUpO1xuICAgICAgICAgIGFGaWx0ZXIuZmlsdGVyRmllbGRWYWx1ZVJlcGxhY2VkID0gdGVtcGxhdGVkVmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFtnZXRRdWVyeVVSSUJ5VHlwZSBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXQgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbQXJyYXkgb2YgVVJJc11cbiAgICovXG4gIGdldFF1ZXJ5VVJJQnlUeXBlKHRhcmdldCkge1xuICAgIHZhciB1cmlzID0gW107XG4gICAgdmFyIGRpbWVuc2lvblVSSSA9IFwiL2V2ZW50c1wiO1xuICAgIHZhciBjbGllbnROYW1lcyA9IG51bGw7XG4gICAgdmFyIGNoZWNrTmFtZXMgPSBudWxsO1xuICAgIHZhciBhZ2dyZWdhdGVOYW1lcyA9IG51bGw7XG4gICAgaWYgKHRhcmdldC5kaW1lbnNpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsaWVudE5hbWVzID0gdGhpcy5nZXRDbGllbnROYW1lcyh0YXJnZXQuZGltZW5zaW9ucyk7XG4gICAgICBjaGVja05hbWVzID0gdGhpcy5nZXRDaGVja05hbWVzKHRhcmdldC5kaW1lbnNpb25zKTtcbiAgICAgIGFnZ3JlZ2F0ZU5hbWVzID0gdGhpcy5nZXRBZ2dyZWdhdGVOYW1lcyh0YXJnZXQuZGltZW5zaW9ucyk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBjb252ZXJ0IGFsbCB0ZW1wbGF0ZWQgdmFsdWVzXG4gICAgICB0aGlzLnJlcGxhY2VGaWx0ZXJWYWx1ZXModGFyZ2V0LmZpbHRlcnMpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmFsaWFzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5hbGlhc1JlcGxhY2VkID0gdGhpcy50ZW1wbGF0ZVNydi5yZXBsYWNlKHRhcmdldC5hbGlhcyk7XG4gICAgfVxuICAgIHN3aXRjaCAodGFyZ2V0LnNvdXJjZVR5cGUpIHtcbiAgICAgIGNhc2UgXCJhZ2dyZWdhdGVzXCI6XG4gICAgICBjYXNlIFwiYWdncmVnYXRlc19qc29uXCI6XG4gICAgICAgIC8vIGh0dHBzOi8vc2Vuc3VhcHAub3JnL2RvY3MvMC4yOC9hcGkvYWdncmVnYXRlcy1hcGkuaHRtbFxuICAgICAgICB1cmlzID0gZ2V0QWdncmVnYXRlVVJJcyh0YXJnZXQsIGFnZ3JlZ2F0ZU5hbWVzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2hlY2tfc3Vic2NyaXB0aW9uc1wiOlxuICAgICAgICAvLyBodHRwczovL3NlbnN1YXBwLm9yZy9kb2NzLzAuMjgvYXBpL2NoZWNrcy1hcGkuaHRtbFxuICAgICAgICAvL1xuICAgICAgICAvLyBSZXR1cm5zIGxpc3Qgb2Ygc3Vic2NyaXB0aW9uIG5hbWVzLCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGNoZWNrcyBmb3IgdGhlIHN1YnNjcmlwdGlvblxuICAgICAgICAvLyBEaW1lbnNpb25zIGFyZTpcbiAgICAgICAgLy8gICAgbmFtZSAtIG5hbWUgb2YgY2hlY2tcbiAgICAgICAgLy8gICAgYWdncmVnYXRlIC0gbmFtZSBvZiBhZ2dyZWdhdGVcbiAgICAgICAgLy8gICAgdHlwZSAobWV0cmljfGNoZWNrKVxuICAgICAgICAvLyAgICBzb3VyY2UgLSBKSVQgY2xpZW50XG4gICAgICAgIC8vXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNsaWVudF9oZWFsdGhfanNvblwiOlxuICAgICAgICB1cmlzID0gZ2V0Q2xpZW50SGVhbHRoVVJJcyhjbGllbnROYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNsaWVudHNcIjpcbiAgICAgIGNhc2UgXCJjbGllbnRzX2pzb25cIjpcbiAgICAgICAgLy8gaHR0cHM6Ly9zZW5zdWFwcC5vcmcvZG9jcy8wLjI4L2FwaS9jbGllbnRzLWFwaS5odG1sXG4gICAgICAgIHVyaXMgPSBnZXRDbGllbnRzVVJJcyhjaGVja05hbWVzLCBjbGllbnROYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNsaWVudGhpc3RvcnlcIjpcbiAgICAgICAgLy8gaHR0cHM6Ly9zZW5zdWFwcC5vcmcvZG9jcy8wLjI4L2FwaS9jbGllbnRzLWFwaS5odG1sXG4gICAgICAgIC8vIGxvb2sgZm9yIGNsaWVudE5hbWUgaW4gZGltZW5zaW9uc1xuICAgICAgICB1cmlzID0gZ2V0Q2xpZW50SGlzdG9yeVVSSXMoY2xpZW50TmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJldmVudF9tZXRyaWNzXCI6XG4gICAgICBjYXNlIFwiZXZlbnRfbWV0cmljc19qc29uXCI6XG4gICAgICBjYXNlIFwiZXZlbnRzXCI6XG4gICAgICBjYXNlIFwiZXZlbnRzX2pzb25cIjpcbiAgICAgICAgLy8gaHR0cHM6Ly9zZW5zdWFwcC5vcmcvZG9jcy8wLjI4L2FwaS9ldmVudHMtYXBpLmh0bWxcbiAgICAgICAgdXJpcyA9IGdldEV2ZW50c1VSSXMoY2hlY2tOYW1lcywgY2xpZW50TmFtZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyZXN1bHRzX2pzb25cIjpcbiAgICAgIGNhc2UgXCJyZXN1bHRzX3RhYmxlXCI6XG4gICAgICAgIC8vIGh0dHBzOi8vc2Vuc3VhcHAub3JnL2RvY3MvMC4yOC9hcGkvcmVzdWx0cy1hcGkuaHRtbFxuICAgICAgICB1cmlzID0gZ2V0UmVzdWx0VVJJcyhjaGVja05hbWVzLCBjbGllbnROYW1lcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNlbnN1X2hlYWx0aF9qc29uXCI6XG4gICAgICAgIC8vIGh0dHBzOi8vc2Vuc3VhcHAub3JnL2RvY3MvMC4yOC9hcGkvaGVhbHRoLWFuZC1pbmZvLWFwaS5odG1sXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNpbGVuY2VkX2VudHJpZXNfanNvblwiOlxuICAgICAgICAvLyBodHRwczovL3NlbnN1YXBwLm9yZy9kb2NzLzAuMjgvYXBpL3NpbGVuY2VkLWFwaS5odG1sXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInN0YXNoZXNfanNvblwiOlxuICAgICAgICAvLyBodHRwczovL3NlbnN1YXBwLm9yZy9kb2NzLzAuMjgvYXBpL3N0YXNoZXMtYXBpLmh0bWxcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB1cmlzO1xuICB9XG5cbiAgZ2V0QnVja2V0cyhyZXNwb25zZXMpIHtcbiAgICB2YXIgYnVja2V0cyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcG9uc2VzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByZWZJZCA9IHJlc3BvbnNlcy5kYXRhW2ldLnRhcmdldC5yZWZJZDtcbiAgICAgIGlmIChidWNrZXRzLmhhc093blByb3BlcnR5KHJlZklkKSkge1xuICAgICAgICBidWNrZXRzW3JlZklkXS5wdXNoKHJlc3BvbnNlcy5kYXRhW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Y2tldHNbcmVmSWRdID0gW3Jlc3BvbnNlcy5kYXRhW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1Y2tldHM7XG4gIH1cblxuICBwcm9jZXNzQ29udmVyc2lvbnMoc291cmNlVHlwZSwgYVRhcmdldCwgcmVzcG9uc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgZGF0YTogW10gfTtcbiAgICBzd2l0Y2ggKHNvdXJjZVR5cGUpIHtcbiAgICAgIGNhc2UgXCJhZ2dyZWdhdGVzXCI6XG4gICAgICAgIHJlc3VsdCA9IGNvbnZlcnRBZ2dyZWdhdGVzVG9EYXRhUG9pbnRzKGFUYXJnZXQsIHJlc3BvbnNlcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImFnZ3JlZ2F0ZXNfanNvblwiOlxuICAgICAgICByZXN1bHQgPSBjb252ZXJ0QWdncmVnYXRlc1RvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgY2FzZSBcImNsaWVudHNcIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydENsaWVudHNUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIGNhc2UgXCJjbGllbnRzX2pzb25cIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydENsaWVudHNUb0pTT04oYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIGNhc2UgXCJjbGllbnRfaGVhbHRoX2pzb25cIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydENsaWVudEhlYWx0aFRvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgY2FzZSBcImNsaWVudGhpc3RvcnlcIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydENsaWVudEhpc3RvcnlUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZXZlbnRzXCI6XG4gICAgICAgIHJlc3VsdCA9IGNvbnZlcnRFdmVudHNUb0RhdGFQb2ludHMoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZXZlbnRzX2pzb25cIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydEV2ZW50c1RvSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJldmVudF9tZXRyaWNzXCI6XG4gICAgICAgIHJlc3VsdCA9IGNvbnZlcnRFdmVudHNUb0V2ZW50TWV0cmljcyhhVGFyZ2V0LCByZXNwb25zZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJldmVudF9tZXRyaWNzX2pzb25cIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydEV2ZW50c1RvRXZlbnRNZXRyaWNzSlNPTihhVGFyZ2V0LCByZXNwb25zZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyZXN1bHRzX2pzb25cIjpcbiAgICAgICAgcmVzdWx0ID0gY29udmVydFJlc3VsdHNUb0pTT04oYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVzdWx0c190YWJsZVwiOlxuICAgICAgICByZXN1bHQgPSBjb252ZXJ0UmVzdWx0c1RvVGFibGUoYVRhcmdldCwgcmVzcG9uc2VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gc291cmNlIHR5cGVcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc2V0UmF3VGFyZ2V0cyhhVGFyZ2V0LCByZXN1bHQpIHtcbiAgICAvLyBrZWVwIHRoZSBhY3R1YWwgbmFtZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0LmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdC5kYXRhW2ldLnJhd1RhcmdldCA9IHJlc3VsdC5kYXRhW2ldLnRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb2Nlc3NGaWx0ZXJzKGFUYXJnZXQsIHJlc3VsdCkge1xuICAgIC8vIGlmIHRoZXJlIGFyZSBubyBmaWx0ZXJzLCByZXR1cm4gYWxsIGRhdGFbXSBpdGVtc1xuICAgIGlmICgoYVRhcmdldC5maWx0ZXJzICE9PSB1bmRlZmluZWQpICYmIChhVGFyZ2V0LmZpbHRlcnMubGVuZ3RoID4gMCkpIHtcbiAgICAgIHZhciBmaWx0ZXJEYXRhID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFUYXJnZXQuZmlsdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYUZpbHRlciA9IGFUYXJnZXQuZmlsdGVyc1tpXTtcbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBkYXRhLCBmaW5kIG1hdGNoaW5nIHRhcmdldHNcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBhUmF3VGFyZ2V0ID0gcmVzdWx0LmRhdGFbal0ucmF3VGFyZ2V0O1xuICAgICAgICAgIGlmIChhRmlsdGVyLmZpbHRlclR5cGUgPT09IGFSYXdUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIFByZXBlbmQgQWxpYXNcbiAgICAgICAgICAgIGlmIChhVGFyZ2V0LmFsaWFzUmVwbGFjZWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LmRhdGFbal0udGFyZ2V0ID0gYVRhcmdldC5hbGlhc1JlcGxhY2VkICsgXCIgXCIgKyBhUmF3VGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2F2ZSB0aGlzIHJlc3VsdFxuICAgICAgICAgICAgZmlsdGVyRGF0YS5wdXNoKHJlc3VsdC5kYXRhW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlIGhhdmUgZmlsdGVyZWQgZGF0YSwgcmVwbGFjZSB0aGUgcmVzdWx0IHdpdGggaXRcbiAgICAgIGlmIChmaWx0ZXJEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0LmRhdGEgPSBmaWx0ZXJEYXRhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZmlsdGVycywgYXBwbHkgdGhlIGFsaWFzICh0aGlzIGlzIHByb2JhYmx5IG5vdCB3aGF0IHlvdSB3YW50LCBidXQgYWxsb3cgaXQuLi4pXG4gICAgICBpZiAoYVRhcmdldC5hbGlhc1JlcGxhY2VkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0LmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICByZXN1bHQuZGF0YVtpXS50YXJnZXQgPSBhVGFyZ2V0LmFsaWFzUmVwbGFjZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiBbcGFyc2VRdWVyeVJlc3VsdCBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBhVGFyZ2V0ICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gcmVzcG9uc2VzIEFycmF5IG9mIFJlc3BvbnNlcywgY29udGFpbmluZyBkYXRhW3sgdGFyZ2V0OiBhVGFyZ2V0LCByZXNwb25zZTogcmVzcG9uc2V9XVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHBhcnNlUXVlcnlSZXN1bHQocmVzcG9uc2VzKSB7XG5cbiAgICAvLyBUaGlzIHdpbGwgbWF0Y2ggcmVmSWQncyBmb3IgcmVzcG9uc2VzIGFuZCBidWNrZXQgdGhlbSB0b2dldGhlciwgdGhlbiBwYXNzIHRoZSBidWNrZXQgdG8gdGhlIGNvbnZlcnNpb24gcm91dGluZXNcbiAgICAvLyBUaGlzIGFsbG93cyBtdWx0aXBsZSByZXNwb25zZXMgaW50ZW5kZWQgZm9yIGEgc2luZ2xlIHRhcmdldCB0byBhbGwgYmUgcHJvY2Vzc2VkIGF0IG9uY2VcbiAgICAvLyBJdCBpcyB1cCB0byB0aGUgcHJvY2Vzc29yIHRvIHVzZSB0aGUgZGF0YSBzZW50LCBhbmQgcmV0dXJuIGEgcmVzdWx0IHRoYXQgY2FuIGJlIHVzZWQuXG4gICAgdmFyIGFsbFJlc3VsdHMgPSB7IGRhdGE6IFtdIH07XG4gICAgaWYgKCFyZXNwb25zZXMgfHwgIXJlc3BvbnNlcy5kYXRhKSB7XG4gICAgICByZXR1cm4gYWxsUmVzdWx0cztcbiAgICB9XG4gICAgdmFyIGJ1Y2tldHMgPSB0aGlzLmdldEJ1Y2tldHMocmVzcG9uc2VzKTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUga2V5cyBpbiB0aGUgYnVja2V0cyB0byBnZXQgdGhlIHRhcmdldCBhbmQgc291cmNlIHR5cGVcbiAgICB2YXIgYnVja2V0S2V5cyA9IE9iamVjdC5rZXlzKGJ1Y2tldHMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVja2V0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGFLZXkgPSBidWNrZXRLZXlzW2ldO1xuICAgICAgbGV0IHNvdXJjZVR5cGUgPSBidWNrZXRzW2FLZXldWzBdLnRhcmdldC5zb3VyY2VUeXBlO1xuICAgICAgLy8gYWxzbyB1c2UgdGhlIHRhcmdldCBmcm9tIHRoZSBmaXJzdCByZXNwb25zZVxuICAgICAgbGV0IGFUYXJnZXQgPSBidWNrZXRzW2FLZXldWzBdLnRhcmdldDtcbiAgICAgIC8vIGNvbnZlcnQgcmVzdWx0cyBhY2NvcmRpbmcgdG8gdGhlIHNvdXJjZVR5cGVcbiAgICAgIC8vIElNUE9SVEFOVDogZG8gbm90IGFsbG93IHJlc3BvbnNlcyB0byBiZSBtb2RpZmVkLCByZXR1cm4gYSBuZXcgb2JqZWN0IVxuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucHJvY2Vzc0NvbnZlcnNpb25zKHNvdXJjZVR5cGUsIGFUYXJnZXQsIHJlc3BvbnNlcyk7XG4gICAgICAvLyB1cGRhdGUgcmVzdWx0IHdpdGggdGhlIHJhd1RhcmdldCBuYW1lIChwcmVzZXJ2ZSBuYW1lIGZyb20gYWxpYXNpbmcpXG4gICAgICByZXN1bHQgPSB0aGlzLnNldFJhd1RhcmdldHMoYVRhcmdldCwgcmVzdWx0KTtcbiAgICAgIC8vIGFwcGx5IGZpbHRlcnNcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJvY2Vzc0ZpbHRlcnMoYVRhcmdldCwgcmVzdWx0KTtcbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgb2YgdGhlIHJlc3VsdHMgYW5kIHB1c2ggaW50byBhbGxSZXN1bHRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFsbFJlc3VsdHMuZGF0YS5wdXNoKHJlc3VsdC5kYXRhW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFsbFJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGdldENoZWNrSW50ZXJ2YWwoY2xpZW50LCBjaGVja05hbWUpIHtcbiAgICAvLyBodHRwOi8vMTAuMjI3Ljg2LjYyL3Jlc3VsdHMvZGVmYXVsdC1vZWwtNjcteDg2LTY0L2tlZXBhbGl2ZVxuICAgIC8qIFRoZSBjaGVjayBtYXkgbm90IGhhdmUgaW50ZXJ2YWwgZGVmaW5lZCwgd2hpY2ggbWVhbnMgaXQgaXMgZGVmYXVsdGVkIHRvIDYwIHNlY29uZHNcbiAgICB7XG4gICAgICBcImNsaWVudFwiOiBcImRlZmF1bHQtb2VsLTY3LXg4Ni02NFwiLFxuICAgICAgXCJjaGVja1wiOiB7XG4gICAgICAgIFwidGhyZXNob2xkc1wiOiB7XG4gICAgICAgICAgXCJ3YXJuaW5nXCI6IDEyMCxcbiAgICAgICAgICBcImNyaXRpY2FsXCI6IDE4MFxuICAgICAgICB9LFxuICAgICAgICBcIm5hbWVcIjogXCJrZWVwYWxpdmVcIixcbiAgICAgICAgXCJpc3N1ZWRcIjogMTQ3NjI3NzAzOSxcbiAgICAgICAgXCJleGVjdXRlZFwiOiAxNDc2Mjc3MDM5LFxuICAgICAgICBcIm91dHB1dFwiOiBcIk5vIGtlZXBhbGl2ZSBzZW50IGZyb20gY2xpZW50IGZvciA0MDg2MCBzZWNvbmRzICg+PTE4MClcIixcbiAgICAgICAgXCJzdGF0dXNcIjogMixcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RhbmRhcmRcIlxuICAgICAgfVxuICAgIH1cbiAgICAgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBbZGltZW5zaW9uRmluZFZhbHVlcyBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXQgICAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtbdHlwZV19IGRpbWVuc2lvbiBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGRpbWVuc2lvbkZpbmRWYWx1ZXModGFyZ2V0LCBkaW1lbnNpb24pIHtcbiAgICB2YXIgZGltZW5zaW9uVVJJID0gXCIvY2xpZW50c1wiO1xuICAgIHN3aXRjaCAoZGltZW5zaW9uLmRpbWVuc2lvblR5cGUpIHtcbiAgICAgIGNhc2UgXCJjbGllbnROYW1lXCI6XG4gICAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2NsaWVudHNcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2hlY2tOYW1lXCI6XG4gICAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2NoZWNrc1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJhZ2dyZWdhdGVOYW1lXCI6XG4gICAgICAgIGRpbWVuc2lvblVSSSA9IFwiL2FnZ3JlZ2F0ZXNcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJhY2tlbmRTcnYuZGF0YXNvdXJjZVJlcXVlc3Qoe1xuICAgICAgdXJsOiB0aGlzLnVybCArIGRpbWVuc2lvblVSSSxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiB0aGlzLmJhc2ljQXV0aFxuICAgICAgfVxuICAgIH0pLnRoZW4odGhpcy5tYXBUb1RleHRWYWx1ZSk7XG4gIH1cblxuICBtYXBUb1RleHRWYWx1ZShyZXN1bHQpIHtcbiAgICByZXR1cm4gXy5tYXAocmVzdWx0LmRhdGEsIChkLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OiBkLm5hbWUsXG4gICAgICAgIHZhbHVlOiBkLm5hbWVcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogW2RpbWVuc2lvbkZpbmRWYWx1ZXMgZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0ICAgIFtkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7W3R5cGVdfSBmaWx0ZXIgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBmaWx0ZXJGaW5kVmFsdWVzKHRhcmdldCwgZmlsdGVyKSB7XG4gICAgdmFyIGZpbHRlclVSSSA9IFwiL2NsaWVudHNcIjtcbiAgICBzd2l0Y2ggKGZpbHRlci5maWx0ZXJUeXBlKSB7XG4gICAgICBjYXNlIFwiY2xpZW50TmFtZVwiOlxuICAgICAgICBmaWx0ZXJVUkkgPSBcIi9jbGllbnRzXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNoZWNrTmFtZVwiOlxuICAgICAgICBmaWx0ZXJVUkkgPSBcIi9jaGVja3NcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYWdncmVnYXRlTmFtZVwiOlxuICAgICAgICBmaWx0ZXJVUkkgPSBcIi9hZ2dyZWdhdGVzXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kU3J2LmRhdGFzb3VyY2VSZXF1ZXN0KHtcbiAgICAgIHVybDogdGhpcy51cmwgKyBmaWx0ZXJVUkksXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogdGhpcy5iYXNpY0F1dGhcbiAgICAgIH1cbiAgICB9KS50aGVuKHRoaXMubWFwVG9UZXh0VmFsdWUpO1xuICB9XG5cbiAgcXVlcnkob3B0aW9ucykge1xuICAgIHZhciBxdWVyaWVzOiBhbnlbXSA9IFtdO1xuICAgIC8vdmFyIHF1ZXJpZXMgPSBbXTtcbiAgICB2YXIgdGhpc1JlZiA9IHRoaXM7XG4gICAgdmFyIHNpbmdsZVRhcmdldCA9IG51bGw7XG4gICAgb3B0aW9ucy50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAvLyBUT0RPIGhhbmRsZSBoaWRlIGFuZCBubyB0YXJnZXQgc3BlY2lmaWVkXG4gICAgICAvL2lmICh0YXJnZXQuaGlkZSB8fCAhdGFyZ2V0LnRhcmdldCkge1xuICAgICAgLy8gIGNvbnRpbnVlO1xuICAgICAgLy99XG4gICAgICBxdWVyaWVzLnB1c2godGFyZ2V0KTtcbiAgICB9KTtcbiAgICB2YXIgaW50ZXJ2YWwgPSBvcHRpb25zLmludGVydmFsO1xuICAgIC8vY29uc29sZS5sb2coXCJvcHRpb25zIGludGVydmFsID0gXCIgKyBpbnRlcnZhbCk7XG4gICAgLy9sZXQgeXkgPSBrYm4uc2Vjb25kc1RvSG1zKHRoaXMubWluaW11bUludGVydmFsIC8gMTAwMCk7XG4gICAgbGV0IHp6ID0gaW50ZXJ2YWxfdG9fbXMoaW50ZXJ2YWwpO1xuICAgIGlmIChpbnRlcnZhbF90b19tcyhpbnRlcnZhbCkgPCB0aGlzLm1pbmltdW1JbnRlcnZhbCkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJEZXRlY3RlZCBpbnRlcnZhbCBzbWFsbGVyIHRoYW4gYWxsb3dlZDogXCIgKyBpbnRlcnZhbCk7XG4gICAgICBpbnRlcnZhbCA9IHNlY29uZHNUb0htcyh0aGlzLm1pbmltdW1JbnRlcnZhbCAvIDEwMDApO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJOZXcgSW50ZXJ2YWw6IFwiICsgaW50ZXJ2YWwpO1xuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiaW50ZXJ2YWwgYWZ0ZXIgbWluIGNoZWNrID0gXCIgKyBpbnRlcnZhbCk7XG4gICAgdmFyIGRlZmVycmVkID0gdGhpcy5xLmRlZmVyKCk7XG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcXVlcmllcywgcmV0dXJuIGVtcHR5IGRhdGFcbiAgICBpZiAocXVlcmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibm8gdGFncyB2aXNpYmxlIG9yIHNwZWNpZmllZCwgbm8gZGF0YSB0byBmZXRjaFwiKTtcbiAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICBkYXRhOiBbXVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGFsbFF1ZXJpZXMgPSB0aGlzLnEuYWxsKHtcbiAgICAgIGZpcnN0OiB0aGlzUmVmLm11bHRpcGxlRGF0YVF1ZXJpZXMocXVlcmllcyksXG4gICAgfSk7XG4gICAgYWxsUXVlcmllcy50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICAgIC8vIHJldHVybiByZXN1bHRzIGZyb20gcXVlcmllc1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHRzLmZpcnN0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfVxuXG4gIHNpbmdsZURhdGFRdWVyeShzaW5nbGVUYXJnZXQsIHVyaVR5cGUpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwic2luZ2xlRGF0YVF1ZXJ5IGVudGVyZWRcIik7XG4gICAgLy92YXIgdGhpc1JlZiA9IHRoaXM7XG4gICAgdmFyIGRlZmVycmVkID0gdGhpcy5xLmRlZmVyKCk7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIHZhciBodHRwT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIHVybDogdGhpcy51cmwgKyB1cmlUeXBlLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogdGhpcy5iYXNpY0F1dGhcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYmFja2VuZFNydi5kYXRhc291cmNlUmVxdWVzdChodHRwT3B0aW9ucylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBhbkVycm9yID0gbnVsbDtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvci4uLlwiKTtcbiAgICAgICAgICBhbkVycm9yID0gbmV3IEVycm9yKFwiQmFkIFN0YXR1czogXCIgKyByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChhbkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICBhbkVycm9yID0gbmV3IEVycm9yKFwiTm8gZGF0YVwiKTtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoYW5FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyB1c2VkIHRvIHBhcnNlIHBlciByZXNwb25zZSwgaW5zdGVhZCB0aGlzIGlzIHJldHVybmluZyB0aGUgdGFyZ2V0IGFuZCByZXNwb25zZSB0byBiZSBsYXRlclxuICAgICAgICAvLyB1c2VkIGJ5IG11bHRpRG9uZVxuICAgICAgICAvLyBPTEQ6IGRlZmVycmVkLnJlc29sdmUoX3RoaXMucGFyc2VRdWVyeVJlc3VsdChzaW5nbGVUYXJnZXQsIHJlc3BvbnNlKSk7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoeyB0YXJnZXQ6IHNpbmdsZVRhcmdldCwgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBsb2FkIGRhdGEuIFJlc3BvbnNlOiAlb1wiLCByZXNwb25zZS5kYXRhID8gcmVzcG9uc2UuZGF0YS5tZXNzYWdlIDogcmVzcG9uc2UpO1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBkYXRhXCIpO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIGNhbGxlZCB3aGVuIGFsbCBxdWVyaWVzIGhhdmUgYmVlbiBjb21wbGV0ZWQuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gcmVzcG9uc2VzIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgbXVsdGlEb25lKHJlc3BvbnNlcykge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUXVlcnlSZXN1bHQocmVzcG9uc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXZlcmFnZXMgcHJvbWlzZXMgdG8gcGVyZm9ybSBtdWx0aXBsZSBhc3luYyBxdWVyaWVzXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gcGVuZGluZ1F1ZXJpZXMgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIG11bHRpcGxlRGF0YVF1ZXJpZXMocGVuZGluZ1F1ZXJpZXMpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSB0aGlzLnEuZGVmZXIoKTtcbiAgICB2YXIgZGF0YUNhbGxzID0gW107XG4gICAgdmFyIHRoaXNSZWYgPSB0aGlzO1xuICAgIC8vIGZvciBlYWNoIHF1ZXJ5LCB3ZSBnZXQgYSBsaXN0IG9mIHNlbnN1IHVyaXMnIHRvIGhpdFxuICAgIC8vIHRvIHJldHJpZXZlIHRoZSBkYXRhXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBwZW5kaW5nUXVlcmllcy5sZW5ndGgpIHtcbiAgICAgIGxldCBhVGFyZ2V0ID0gcGVuZGluZ1F1ZXJpZXNbaW5kZXhdO1xuICAgICAgdmFyIHVyaUxpc3QgPSB0aGlzLmdldFF1ZXJ5VVJJQnlUeXBlKGFUYXJnZXQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRhdGFDYWxscy5wdXNoKHRoaXNSZWYuc2luZ2xlRGF0YVF1ZXJ5KGFUYXJnZXQsIHVyaUxpc3RbaV0pKTtcbiAgICAgIH1cbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIC8qXG4gICAgYW5ndWxhci5mb3JFYWNoKHBlbmRpbmdRdWVyaWVzLCBmdW5jdGlvbihhVGFyZ2V0KSB7XG4gICAgICB2YXIgdXJpTGlzdCA9IHRoaXNSZWYuZ2V0UXVlcnlVUklCeVR5cGUoYVRhcmdldCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVyaUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YUNhbGxzLnB1c2godGhpc1JlZi5zaW5nbGVEYXRhUXVlcnkoYVRhcmdldCwgdXJpTGlzdFtpXSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICovXG4gICAgdGhpcy5xLmFsbChkYXRhQ2FsbHMpXG4gICAgICAudGhlbihcbiAgICAgICAgZnVuY3Rpb24ocmVzdWx0cykge1xuICAgICAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgLy8gbWVyZ2UgYWxsIG9mIHRoZSByZXN1bHRzIGludG8gb25lIHJlc3BvbnNlXG4gICAgICAgICAgd2hpbGUgKGkgPCByZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5wdXNoKHJlc3VsdHNbaV0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKlxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChyZXN1bHRzLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgLy9hbmd1bGFyLmZvckVhY2gocmVzdWx0LmRhdGEsIGZ1bmN0aW9uKGRhdGFTZXQpIHtcbiAgICAgICAgICAgIC8vICByZXNwb25zZS5kYXRhLnB1c2goZGF0YVNldCk7XG4gICAgICAgICAgICAvL30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICovXG4gICAgICAgICAgLy8gbXVsdGlEb25lIG5lZWRzIHRvIHJldHVybiBhbGwgb2YgdGhlIHBhcnNlZCByZXN1bHRzIGluc2lkZSBzb21ldmFyLmRhdGFbXVxuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodGhpc1JlZi5tdWx0aURvbmUocmVzcG9uc2UpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9ycyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHVwZGF0ZXMpIHtcbiAgICAgICAgICBkZWZlcnJlZC51cGRhdGUodXBkYXRlcyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cblxuICBnZXRTZXJ2ZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLmJhY2tlbmRTcnYuZGF0YXNvdXJjZVJlcXVlc3Qoe1xuICAgICAgdXJsOiB0aGlzLnVybCArIFwiL2luZm9cIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiB0aGlzLmJhc2ljQXV0aFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG4gIH1cblxuICAvLyBSZXF1aXJlZFxuICAvLyBVc2VkIGZvciB0ZXN0aW5nIGRhdGFzb3VyY2UgaW4gZGF0YXNvdXJjZSBjb25maWd1cmF0aW9uIHBhbmdlXG4gIC8vICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiXG4gIC8vXG5cbiAgdGVzdERhdGFzb3VyY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZFNydi5kYXRhc291cmNlUmVxdWVzdCh7XG4gICAgICB1cmw6IHRoaXMudXJsICsgXCIvaW5mb1wiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IHRoaXMuYmFzaWNBdXRoXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIH0pLnRoZW4oKHJlc3BvbnNlOiB7IHN0YXR1czogbnVtYmVyOyB9KSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiRGF0YSBzb3VyY2UgaXMgd29ya2luZ1wiLFxuICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NcIlxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRGF0YSBzb3VyY2UgaXMgbm90IHdvcmtpbmdcIixcbiAgICAgICAgdGl0bGU6IFwiRXJyb3JcIlxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIiwiXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuXG5pbXBvcnQge1NlbnN1Q29yZURhdGFzb3VyY2V9IGZyb20gXCIuL2RhdGFzb3VyY2VcIjtcbmltcG9ydCB7U2Vuc3VDb3JlRGF0YXNvdXJjZVF1ZXJ5Q3RybH0gZnJvbSBcIi4vcXVlcnlfY3RybFwiO1xuXG5pbXBvcnQge2xvYWRQbHVnaW5Dc3N9IGZyb20gXCJncmFmYW5hL2FwcC9wbHVnaW5zL3Nka1wiO1xuXG5sb2FkUGx1Z2luQ3NzKHtcbiAgZGFyazogXCJwbHVnaW5zL2dyYWZhbmEtc2Vuc3UtYXBwL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9jc3MvcXVlcnktZWRpdG9yLmNzc1wiLFxuICBsaWdodDogXCJwbHVnaW5zL2dyYWZhbmEtc2Vuc3UtYXBwL2RhdGFzb3VyY2Uvc2Vuc3UtY29yZS9jc3MvcXVlcnktZWRpdG9yLmNzc1wiXG59KTtcblxuY2xhc3MgU2Vuc3VDb25maWdDdHJsIHtcbiAgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJkYXRhc291cmNlL3NlbnN1LWNvcmUvcGFydGlhbHMvY29uZmlnLmh0bWxcIjtcbn1cblxuY2xhc3MgU2Vuc3VRdWVyeU9wdGlvbnNDdHJsIHtcbiAgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJkYXRhc291cmNlL3NlbnN1LWNvcmUvcGFydGlhbHMvcXVlcnkub3B0aW9ucy5odG1sXCI7XG59XG5cbmV4cG9ydCB7XG4gIFNlbnN1Q29yZURhdGFzb3VyY2UgYXMgRGF0YXNvdXJjZSxcbiAgU2Vuc3VDb3JlRGF0YXNvdXJjZVF1ZXJ5Q3RybCBhcyBRdWVyeUN0cmwsXG4gIFNlbnN1Q29uZmlnQ3RybCBhcyBDb25maWdDdHJsLFxuICBTZW5zdVF1ZXJ5T3B0aW9uc0N0cmwgYXMgUXVlcnlPcHRpb25zQ3RybFxufTtcbiIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBRdWVyeUN0cmwgfSBmcm9tIFwiZ3JhZmFuYS9hcHAvcGx1Z2lucy9zZGtcIjtcblxuZXhwb3J0IGNsYXNzIFNlbnN1Q29yZURhdGFzb3VyY2VRdWVyeUN0cmwgZXh0ZW5kcyBRdWVyeUN0cmwge1xuICBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcImRhdGFzb3VyY2Uvc2Vuc3UtY29yZS9wYXJ0aWFscy9xdWVyeS5lZGl0b3IuaHRtbFwiO1xuXG4gIHNjb3BlOiBhbnk7XG4gIHVpU2VnbWVudFNydjogYW55O1xuICB0ZW1wbGF0ZVNydjogYW55O1xuICBzb3VyY2VUeXBlczogYW55W107XG4gIGRpbWVuc2lvblR5cGVzOiBhbnk7XG4gIGZpbHRlclR5cGVzOiBhbnk7XG4gIGFnZ3JlZ2F0ZU1vZGVzOiBhbnk7XG4gIGNsaWVudFF1ZXJ5TW9kZXM6IGFueTtcbiAgZXZlbnRNZXRyaWNNb2RlczogYW55O1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsIHRlbXBsYXRlU3J2LCB1aVNlZ21lbnRTcnYpIHtcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XG4gICAgdGhpcy5zY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLnVpU2VnbWVudFNydiA9IHVpU2VnbWVudFNydjtcbiAgICB0aGlzLnRlbXBsYXRlU3J2ID0gdGVtcGxhdGVTcnY7XG4gICAgLy8gc291cmNlIHR5cGVzIGZvciB0aGUgcG9wZG93blxuICAgIHRoaXMuc291cmNlVHlwZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQWdncmVnYXRlc1wiLFxuICAgICAgICB2YWx1ZTogXCJhZ2dyZWdhdGVzXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkFnZ3JlZ2F0ZXMgYXMgSlNPTlwiLFxuICAgICAgICB2YWx1ZTogXCJhZ2dyZWdhdGVzX2pzb25cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2hlY2sgU3Vic2NyaXB0aW9uc1wiLFxuICAgICAgICB2YWx1ZTogXCJjaGVja19zdWJzY3JpcHRpb25zXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudHNcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50c1wiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDbGllbnRzIGFzIEpTT05cIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50c19qc29uXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBIZWFsdGggYXMgSlNPTlwiLFxuICAgICAgICB2YWx1ZTogXCJjbGllbnRfaGVhbHRoX2pzb25cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50IEhpc3RvcnlcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50X2hpc3RvcnlcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRXZlbnRzXCIsXG4gICAgICAgIHZhbHVlOiBcImV2ZW50c1wiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJFdmVudHMgYXMgSlNPTlwiLFxuICAgICAgICB2YWx1ZTogXCJldmVudHNfanNvblwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJFdmVudCBNZXRyaWNzXCIsXG4gICAgICAgIHZhbHVlOiBcImV2ZW50X21ldHJpY3NcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRXZlbnQgTWV0cmljcyBKU09OXCIsXG4gICAgICAgIHZhbHVlOiBcImV2ZW50X21ldHJpY3NfanNvblwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJSZXN1bHRzIGFzIEpTT05cIixcbiAgICAgICAgdmFsdWU6IFwicmVzdWx0c19qc29uXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlc3VsdHMgYXMgVGFibGVcIixcbiAgICAgICAgdmFsdWU6IFwicmVzdWx0c190YWJsZVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJTZW5zdSBIZWFsdGhcIixcbiAgICAgICAgdmFsdWU6IFwic2Vuc3VfaGVhbHRoX2pzb25cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiU2lsZW5jZWQgRW50cmllc1wiLFxuICAgICAgICB2YWx1ZTogXCJzaWxlbmNlZF9lbnRyaWVzX2pzb25cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiU3Rhc2hlc1wiLFxuICAgICAgICB2YWx1ZTogXCJzdGFzaGVzX2pzb25cIixcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgLy8gRWFjaCBzb3VyY2UgdHlwZSBoYXZlIGRpZmZlcmVudCBkaW1lbnNpb25zXG4gICAgLy8gICAvLyAgICBuYW1lIC0gbmFtZSBvZiBjaGVja1xuICAgICAgLy8gICAgYWdncmVnYXRlIC0gbmFtZSBvZiBhZ2dyZWdhdGVcbiAgICAgIC8vICAgIHR5cGUgKG1ldHJpY3xjaGVjaylcbiAgICAgIC8vICAgIHNvdXJjZSAtIEpJVCBjbGllbnRcbiAgICB0aGlzLmRpbWVuc2lvblR5cGVzID0ge1xuICAgICAgYWdncmVnYXRlczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkFnZ3JlZ2F0ZSBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImFnZ3JlZ2F0ZU5hbWVcIixcbiAgICAgIH1dLFxuICAgICAgYWdncmVnYXRlc19qc29uOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQWdncmVnYXRlIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiYWdncmVnYXRlTmFtZVwiLFxuICAgICAgfV0sXG4gICAgICBjaGVja19zdWJzY3JpcHRpb25zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQWdncmVnYXRlIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiYWdncmVnYXRlTmFtZVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBUeXBlXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrVHlwZVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJTb3VyY2UgKEpJVCBDbGllbnQpXCIsXG4gICAgICAgIHZhbHVlOiBcInNvdXJjZU5hbWVcIixcbiAgICAgIH1dLFxuICAgICAgY2xpZW50czogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiLFxuICAgICAgfV0sXG4gICAgICBjbGllbnRfaGVhbHRoX2pzb246IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICB2YWx1ZTogXCJjbGllbnROYW1lXCJcbiAgICAgIH1dLFxuICAgICAgY2xpZW50X2hpc3Rvcnk6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICB2YWx1ZTogXCJjbGllbnROYW1lXCJcbiAgICAgIH1dLFxuICAgICAgY2xpZW50c19qc29uOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50TmFtZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNoZWNrIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2hlY2tOYW1lXCIsXG4gICAgICB9XSxcbiAgICAgIGV2ZW50czogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiXG4gICAgICB9XSxcbiAgICAgIGV2ZW50c19qc29uOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50TmFtZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNoZWNrIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2hlY2tOYW1lXCJcbiAgICAgIH1dLFxuICAgICAgZXZlbnRfbWV0cmljczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiXG4gICAgICB9XSxcbiAgICAgIGV2ZW50X21ldHJpY3NfanNvbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiXG4gICAgICB9XSxcbiAgICAgIHJlc3VsdHNfanNvbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiLFxuICAgICAgfV0sXG4gICAgICByZXN1bHRzX3RhYmxlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50TmFtZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNoZWNrIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2hlY2tOYW1lXCIsXG4gICAgICB9XSxcbiAgICAgIHNlbnN1X2hlYWx0aF9qc29uOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50TmFtZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNoZWNrIE5hbWVcIixcbiAgICAgICAgdmFsdWU6IFwiY2hlY2tOYW1lXCIsXG4gICAgICB9XSxcbiAgICAgIHNpbGVuY2VkX2VudHJpZXNfanNvbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNsaWVudE5hbWVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrTmFtZVwiLFxuICAgICAgfV0sXG4gICAgICBzdGFzaGVzX2pzb246IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICB2YWx1ZTogXCJjbGllbnROYW1lXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2hlY2sgTmFtZVwiLFxuICAgICAgICB2YWx1ZTogXCJjaGVja05hbWVcIixcbiAgICAgIH1dXG4gICAgfTtcblxuICAgIC8vIHNhbWVcbiAgICB0aGlzLmZpbHRlclR5cGVzID0ge1xuICAgICAgYWdncmVnYXRlczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJOdW1iZXIgb2YgQ2hlY2tzXCIsXG4gICAgICAgICAgdmFsdWU6IFwiY2hlY2tzXCIsXG4gICAgICAgICAgdHlwZTogXCJ2YWx1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIk51bWJlciBvZiBDbGllbnRzXCIsXG4gICAgICAgICAgdmFsdWU6IFwiY2xpZW50c1wiLFxuICAgICAgICAgIHR5cGU6IFwidmFsdWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTdGF0ZSBDcml0aWNhbFwiLFxuICAgICAgICAgIHZhbHVlOiBcImNyaXRpY2FsXCIsXG4gICAgICAgICAgdHlwZTogXCJ2YWx1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlN0YXRlIE9LXCIsXG4gICAgICAgICAgdmFsdWU6IFwib2tcIixcbiAgICAgICAgICB0eXBlOiBcInZhbHVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiU3RhdGUgU3RhbGVcIixcbiAgICAgICAgICB2YWx1ZTogXCJzdGFsZVwiLFxuICAgICAgICAgIHR5cGU6IFwidmFsdWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTdGF0ZSBVbmtub3duXCIsXG4gICAgICAgICAgdmFsdWU6IFwidW5rbm93blwiLFxuICAgICAgICAgIHR5cGU6IFwidmFsdWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJTdGF0ZSBXYXJuaW5nXCIsXG4gICAgICAgICAgdmFsdWU6IFwid2FybmluZ1wiLFxuICAgICAgICAgIHR5cGU6IFwidmFsdWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJUb3RhbCBDaGVja3NcIixcbiAgICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiLFxuICAgICAgICAgIHR5cGU6IFwidmFsdWVcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgY2xpZW50X2hlYWx0aF9qc29uOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmV0Y2hcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBjbGllbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmV0Y2hcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJGaWVsZFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmllbGRcIlxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBjbGllbnRzX2pzb246IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJmZXRjaFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lIFJlZ0V4XCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJyZWdleFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkZpZWxkXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJmaWVsZFwiXG4gICAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV2ZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiBcImZldGNoXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWUgUmVnRXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBcInJlZ2V4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2hlY2sgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJGaWVsZFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmllbGRcIlxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBldmVudHNfanNvbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiBcImZldGNoXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWUgUmVnRXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBcInJlZ2V4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2hlY2sgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJGaWVsZFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmllbGRcIlxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBldmVudF9tZXRyaWNzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmV0Y2hcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDbGllbnQgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDaGVjayBOYW1lIFJlZ0V4XCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJyZWdleFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkZpZWxkXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJmaWVsZFwiXG4gICAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV2ZW50X21ldHJpY3NfanNvbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiBcImZldGNoXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2xpZW50IE5hbWUgUmVnRXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBcInJlZ2V4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ2hlY2sgTmFtZSBSZWdFeFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwicmVnZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJGaWVsZFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiZmllbGRcIlxuICAgICAgICAgIH1cbiAgICAgIF0sXG4gICAgICByZXN1bHRzX2pzb246IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJmZXRjaFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkNsaWVudCBOYW1lIFJlZ0V4XCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJyZWdleFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkNoZWNrIE5hbWUgUmVnRXhcIixcbiAgICAgICAgICAgIHZhbHVlOiBcInJlZ2V4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiRmllbGRcIixcbiAgICAgICAgICAgIHZhbHVlOiBcImZpZWxkXCJcbiAgICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuYWdncmVnYXRlTW9kZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTGlzdFwiLFxuICAgICAgICB2YWx1ZTogXCJsaXN0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpZW50c1wiLFxuICAgICAgICB2YWx1ZTogXCJjbGllbnRzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2hlY2tzXCIsXG4gICAgICAgIHZhbHVlOiBcImNoZWNrc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlc3VsdHMgQ3JpdGljYWxcIixcbiAgICAgICAgdmFsdWU6IFwicmVzdWx0c19jcml0aWNhbFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlc3VsdHMgT0tcIixcbiAgICAgICAgdmFsdWU6IFwicmVzdWx0c19va1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlc3VsdHMgVW5rbm93blwiLFxuICAgICAgICB2YWx1ZTogXCJyZXN1bHRzX3Vua25vd25cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJSZXN1bHRzIFdhcm5pbmdcIixcbiAgICAgICAgdmFsdWU6IFwicmVzdWx0c193YXJuaW5nXCJcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIHRoaXMuY2xpZW50UXVlcnlNb2RlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJMaXN0XCIsXG4gICAgICAgIHZhbHVlOiBcImxpc3RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJjb3VudFwiXG4gICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMuZXZlbnRNZXRyaWNNb2RlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJBbGwgRXZlbnRzXCIsXG4gICAgICAgIHZhbHVlOiBcImFsbF9ldmVudHNfY291bnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJBY3RpdmUgRXZlbnRzXCIsXG4gICAgICAgIHZhbHVlOiBcImFjdGl2ZV9ldmVudHNfY291bnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDcml0aWNhbCBUb3RhbCBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJjcml0aWNhbF9jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNyaXRpY2FsIEFjdGl2ZSBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJjcml0aWNhbF9hY3RpdmVfY291bnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDcml0aWNhbCBTaWxlbmNlZCBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJjcml0aWNhbF9zaWxlbmNlZF9jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIldhcm5pbmcgVG90YWwgQ291bnRcIixcbiAgICAgICAgdmFsdWU6IFwid2FybmluZ19jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIldhcm5pbmcgU2lsZW5jZWQgQ291bnRcIixcbiAgICAgICAgdmFsdWU6IFwid2FybmluZ19zaWxlbmNlZF9jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIldhcm5pbmcgQWN0aXZlIENvdW50XCIsXG4gICAgICAgIHZhbHVlOiBcIndhcm5pbmdfYWN0aXZlX2NvdW50XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiVW5rbm93biBUb3RhbCBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJ1bmtub3duX2NvdW50XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiVW5rbm93biBBY3RpdmUgQ291bnRcIixcbiAgICAgICAgdmFsdWU6IFwidW5rbm93bl9hY3RpdmVfY291bnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJVbmtub3duIFNpbGVuY2VkIENvdW50XCIsXG4gICAgICAgIHZhbHVlOiBcInVua25vd25fc2lsZW5jZWRfY291bnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJTaWxlbmNlZCBUb3RhbCBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJzaWxlbmNlZF9jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNsaWVudHMgU2lsZW5jZWQgQ291bnRcIixcbiAgICAgICAgdmFsdWU6IFwiY2xpZW50c19zaWxlbmNlZF9jb3VudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkNoZWNrcyBTaWxlbmNlZCBDb3VudFwiLFxuICAgICAgICB2YWx1ZTogXCJjaGVja3Nfc2lsZW5jZWRfY291bnRcIlxuICAgICAgfVxuICAgIF07XG4gICAgdGhpcy50YXJnZXQuY2xpZW50UXVlcnlNb2RlID0gdGhpcy50YXJnZXQuY2xpZW50UXVlcnlNb2RlIHx8IFwiY291bnRcIjtcbiAgICB0aGlzLnRhcmdldC5ldmVudE1ldHJpY01vZGUgPSB0aGlzLnRhcmdldC5ldmVudE1ldHJpY01vZGUgfHwgXCJhbGxfZXZlbnRzX2NvdW50XCI7XG5cbiAgICB0aGlzLnRhcmdldC5hZ2dyZWdhdGVNb2RlID0gdGhpcy50YXJnZXQuYWdncmVnYXRlTW9kZSB8fCBcImxpc3RcIjtcbiAgICAvLyBkZWZhdWx0IHNvdXJjZSB0eXBlIGlzIGV2ZW50c1xuICAgIHRoaXMudGFyZ2V0LnNvdXJjZVR5cGUgPSB0aGlzLnRhcmdldC5zb3VyY2VUeXBlIHx8IFwiZXZlbnRzXCI7XG4gICAgLy8gbm8gZGltZW5zaW9ucyBpbml0aWFsbHlcbiAgICB0aGlzLnRhcmdldC5kaW1lbnNpb25zID0gdGhpcy50YXJnZXQuZGltZW5zaW9ucyB8fCBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVtb3ZlRGltZW5zaW9uIGRlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtbdHlwZV19IGRpbWVuc2lvbiBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHJlbW92ZURpbWVuc2lvbihkaW1lbnNpb24pIHtcbiAgICBpZiAodGhpcy50YXJnZXQuZGltZW5zaW9ucykge1xuICAgICAgdGhpcy50YXJnZXQuZGltZW5zaW9ucy5zcGxpY2UodGhpcy50YXJnZXQuZGltZW5zaW9ucy5pbmRleE9mKGRpbWVuc2lvbiksIDEpO1xuICAgICAgdGhpcy5wYW5lbEN0cmwucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbYWRkRGltZW5zaW9uIGRlc2NyaXB0aW9uXVxuICAgKi9cbiAgYWRkRGltZW5zaW9uKCkge1xuICAgIGlmICghdGhpcy50YXJnZXQuZGltZW5zaW9ucykge1xuICAgICAgdGhpcy50YXJnZXQuZGltZW5zaW9ucyA9IFtdO1xuICAgIH1cbiAgICB2YXIgZGltZW5zaW9uc0ZvclNvdXJjZVR5cGUgPSB0aGlzLmRpbWVuc2lvblR5cGVzW3RoaXMudGFyZ2V0LnNvdXJjZVR5cGVdO1xuICAgIHZhciBkZWZhdWx0RGltZW5zaW9uVHlwZSA9IGRpbWVuc2lvbnNGb3JTb3VyY2VUeXBlWzBdLnZhbHVlO1xuICAgIHRoaXMudGFyZ2V0LmRpbWVuc2lvbnMucHVzaCh7XG4gICAgICBuYW1lOiBudWxsLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBkaW1lbnNpb25UeXBlOiBkZWZhdWx0RGltZW5zaW9uVHlwZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFtnZXREaW1lbnNpb25WYWx1ZXMgZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gZGltZW5zaW9uIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2V0RGltZW5zaW9uVmFsdWVzKGRpbWVuc2lvbikge1xuICAgIGlmIChkaW1lbnNpb24pIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJoYXZlIGEgZGltZW5zaW9uLCBnZXR0aW5nIGF2YWlsYWJsZSB2YWx1ZXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhc291cmNlLmRpbWVuc2lvbkZpbmRWYWx1ZXModGhpcy50YXJnZXQsIGRpbWVuc2lvbilcbiAgICAgICAgLnRoZW4odGhpcy51aVNlZ21lbnRTcnYudHJhbnNmb3JtVG9TZWdtZW50cyh0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFtyZW1vdmVGaWx0ZXIgZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gZGltZW5zaW9uIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgcmVtb3ZlRmlsdGVyKGZpbHRlcikge1xuICAgIGlmICh0aGlzLnRhcmdldC5maWx0ZXJzKSB7XG4gICAgICB0aGlzLnRhcmdldC5maWx0ZXJzLnNwbGljZSh0aGlzLnRhcmdldC5maWx0ZXJzLmluZGV4T2YoZmlsdGVyKSwgMSk7XG4gICAgICB0aGlzLnBhbmVsQ3RybC5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFthZGRGaWx0ZXIgZGVzY3JpcHRpb25dXG4gICAqL1xuICBhZGRGaWx0ZXIoKSB7XG4gICAgaWYgKCF0aGlzLnRhcmdldC5maWx0ZXJzKSB7XG4gICAgICB0aGlzLnRhcmdldC5maWx0ZXJzID0gW107XG4gICAgfVxuICAgIHZhciBmaWx0ZXJzRm9yU291cmNlVHlwZSA9IHRoaXMuZmlsdGVyVHlwZXNbdGhpcy50YXJnZXQuc291cmNlVHlwZV07XG4gICAgdmFyIGRlZmF1bHRGaWx0ZXJUeXBlID0gZmlsdGVyc0ZvclNvdXJjZVR5cGVbMF0udHlwZTtcbiAgICB0aGlzLnRhcmdldC5maWx0ZXJzLnB1c2goe1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgZmlsdGVyVHlwZTogZGVmYXVsdEZpbHRlclR5cGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBbZ2V0RmlsdGVyVmFsdWVzIGRlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtbdHlwZV19IGRpbWVuc2lvbiBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGdldEZpbHRlclZhbHVlcyhmaWx0ZXIpIHtcbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiaGF2ZSBhIGRpbWVuc2lvbiwgZ2V0dGluZyBhdmFpbGFibGUgdmFsdWVzXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YXNvdXJjZS5maWx0ZXJGaW5kVmFsdWVzKHRoaXMudGFyZ2V0LCBmaWx0ZXIpXG4gICAgICAgIC50aGVuKHRoaXMudWlTZWdtZW50U3J2LnRyYW5zZm9ybVRvU2VnbWVudHModHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbZ2V0T3B0aW9ucyBkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2UubWV0cmljRmluZFF1ZXJ5KHRoaXMudGFyZ2V0KVxuICAgICAgLnRoZW4odGhpcy51aVNlZ21lbnRTcnYudHJhbnNmb3JtVG9TZWdtZW50cyh0cnVlKSk7XG4gICAgLy8gT3B0aW9ucyBoYXZlIHRvIGJlIHRyYW5zZm9ybWVkIGJ5IHVpU2VnbWVudFNydiB0byBiZSB1c2FibGUgYnkgbWV0cmljLXNlZ21lbnQtbW9kZWwgZGlyZWN0aXZlXG4gIH1cblxuICAvKipcbiAgICogW3NvdXJjZVR5cGVDaGFuZ2VkIGRlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIHNvdXJjZVR5cGVDaGFuZ2VkKCkge1xuICAgIC8vIHJlc2V0IGRpbWVuc2lvbnNcbiAgICBpZiAodGhpcy50YXJnZXQuZGltZW5zaW9ucykge1xuICAgICAgdGhpcy50YXJnZXQuZGltZW5zaW9ucyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlSW50ZXJuYWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBbbW9kZUNoYW5nZWQgZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgbW9kZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5vbkNoYW5nZUludGVybmFsKCk7XG4gIH1cblxuICAvKipcbiAgICogW29uQ2hhbmdlSW50ZXJuYWwgZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgb25DaGFuZ2VJbnRlcm5hbCgpIHtcbiAgICB0aGlzLnBhbmVsQ3RybC5yZWZyZXNoKCk7IC8vIEFza3MgdGhlIHBhbmVsIHRvIHJlZnJlc2ggZGF0YS5cbiAgfVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3JhZmFuYV9hcHBfY29yZV91dGlsc19rYm5fXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZ3JhZmFuYV9hcHBfcGx1Z2luc19zZGtfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX187Il0sInNvdXJjZVJvb3QiOiIifQ==