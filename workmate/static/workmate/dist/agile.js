webpackJsonp([ 0 ], {
    0: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(97), a = n(118);
        n(301);
        var c = n(330), l = n(331), u = n(332), d = n(335), f = n(336), p = n(337), v = n(338), h = n(339), m = function() {
            function t() {}
            return t = i([ o.Component({
                selector: "agile-app",
                template: '\n        <story-list></story-list>\n        <div class="wm-messages ui sticky bottom fixed"><alert></alert></div>\n    ',
                directives: [ h.StoryListComponent, v.AlertComponent ],
                providers: [ s.HTTP_PROVIDERS, o.provide(s.RequestOptions, {
                    useClass: c.ExRequestOptions
                }), l.AlertService, u.StoryService, d.StoryStateService, f.StoryTypeService, p.TagService ]
            }), r("design:paramtypes", []) ], t);
        }();
        e.AgileComponent = m, a.bootstrap(m);
    },
    330: function(t, e, n) {
        "use strict";
        var i = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, r = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = function(t) {
            function e() {
                t.call(this), this.headers.append("X-CSRFToken", this.getCookie("csrftoken"));
            }
            return i(e, t), e.prototype.getCookie = function(t) {
                var e = "; " + document.cookie, n = e.split("; " + t + "=");
                return 2 == n.length ? n.pop().split(";").shift() : void 0;
            }, e.prototype.appendHeaders = function(t, e) {
                this.headers.append(t, e);
            }, e = r([ s.Injectable(), o("design:paramtypes", []) ], e);
        }(a.BaseRequestOptions);
        e.ExRequestOptions = c;
    },
    331: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(35), a = function() {
            function t() {
                var t = this;
                this._nextId = 1, this.alerts$ = new s.Observable(function(e) {
                    return t._dataObserver = e;
                }).share(), this._dataStore = {
                    alerts: []
                };
            }
            return t.prototype.createAlert = function(t) {
                var e = this;
                t.id = this.getNextId(), this._dataStore.alerts.push(t), this._dataObserver.next(this._dataStore.alerts), 
                "error" == t.type ? setTimeout(function() {
                    return e.closeAlert(t);
                }, t.dismissErrorTimeout) : setTimeout(function() {
                    return e.closeAlert(t);
                }, t.dismissDefaultTimeout);
            }, t.prototype.closeAlert = function(t) {
                var e = this;
                this._dataStore.alerts.forEach(function(n, i) {
                    n.id === t.id && e._dataStore.alerts.splice(i, 1);
                }), this._dataObserver.next(this._dataStore.alerts);
            }, t.prototype.getNextId = function() {
                return this._nextId++;
            }, t = i([ o.Injectable(), r("design:paramtypes", []) ], t);
        }();
        e.AlertService = a;
    },
    332: function(t, e, n) {
        "use strict";
        var i = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, r = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var i = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this.effortChoices = [ {
                    value: "0.5",
                    label: "0.5 Points"
                }, {
                    value: "1.0",
                    label: "1 Point"
                }, {
                    value: "2.0",
                    label: "2 Points"
                }, {
                    value: "3.0",
                    label: "3 Points"
                }, {
                    value: "5.0",
                    label: "5 Points"
                } ], this._baseUrl = "/api/v1/story/", this._resourceName = "story", this.objects$ = new u.Observable(function(t) {
                    return i._objectsObserver = t;
                }).share();
            }
            return i(e, t), e = r([ s.Injectable(), o("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryService = d;
    },
    333: function(t, e, n) {
        "use strict";
        var i = n(330), r = n(334), o = n(35), s = function() {
            function t(t, e) {
                var n = this;
                this._http = t, this._AlertService = e, this._baseUrl = "", this._resourceName = "", 
                this._postOptions = new i.ExRequestOptions(), this.meta$ = new o.Observable(function(t) {
                    return n._metaObserver = t;
                }).share(), this._dataStore = {
                    objects: [],
                    meta: {}
                }, this._postOptions.appendHeaders("Content-Type", "application/json");
            }
            return t.prototype.loadMeta = function() {
                var t = this;
                "undefined" == typeof this._dataStore || 0 == Object.keys(this._dataStore.meta).length ? this._http.get(this._baseUrl + "schema/").map(this.extractData).subscribe(function(e) {
                    t._dataStore.meta = e, t._metaObserver.next(t._dataStore.meta);
                }, function(e) {
                    return t.handleError(e);
                }) : this._metaObserver.next(this._dataStore.meta);
            }, t.prototype.loadAll = function() {
                var t = this;
                "undefined" == typeof this._dataStore || 0 == this._dataStore.objects.length ? this._http.get(this._baseUrl).map(this.extractData).subscribe(function(e) {
                    t._dataStore.objects = e, t._objectsObserver.next(t._dataStore.objects);
                }, function(e) {
                    return t.handleError(e);
                }) : this._objectsObserver.next(this._dataStore.objects);
            }, t.prototype.load = function(t) {
                var e = this;
                this._http.get("" + this._baseUrl + t + "/").map(this.extractData).subscribe(function(t) {
                    var n = !1;
                    e._dataStore.objects.forEach(function(i, r) {
                        i.id === t.id && (e._dataStore.objects[r] = t, n = !0);
                    }), n || e._dataStore.objects.push(t), e._objectsObserver.next(e._dataStore.objects);
                }, function(t) {
                    return e.handleError(t);
                });
            }, t.prototype.create = function(t) {
                var e = this, n = JSON.stringify(t);
                return this._http.post(this._baseUrl, n, this._postOptions).map(this.extractData).subscribe(function(t) {
                    e._dataStore.objects.push(t), e._objectsObserver.next(e._dataStore.objects);
                }, function(n) {
                    return e.handleError(n, t);
                }, function() {
                    return e.handleCompleted();
                });
            }, t.prototype.update = function(t) {
                var e = this, n = JSON.stringify(t);
                return this._http.put("" + this._baseUrl + t.id + "/", n, this._postOptions).map(this.extractData).subscribe(function(t) {
                    e._dataStore.objects.forEach(function(n, i) {
                        n.id === t.id && (e._dataStore.objects[i] = t, e._dataStore.objects[i]._validation_errors = {});
                    }), e._objectsObserver.next(e._dataStore.objects);
                }, function(n) {
                    return e.handleError(n, t);
                }, function() {
                    return e.handleCompleted();
                });
            }, t.prototype.delete = function(t) {
                var e = this;
                this._http.delete("" + this._baseUrl + t + "/").subscribe(function(n) {
                    e._dataStore.objects.forEach(function(n, i) {
                        n.id === t && e._dataStore.objects.splice(i, 1);
                    }), e._objectsObserver.next(e._dataStore.objects);
                }, function(t) {
                    return e.handleError(t);
                }, function() {
                    return e.handleCompleted();
                });
            }, t.prototype.extractData = function(t) {
                if (t.status < 200 || t.status >= 300) throw new Error("Bad response status: " + t.status);
                var e = t.json();
                return e.object || e.objects || e || {};
            }, t.prototype.handleCompleted = function() {
                this.createAlert("success", "Completed successfully");
            }, t.prototype.handleError = function(t, e) {
                var n = JSON.parse(t._body), i = "";
                return e && n.hasOwnProperty(this._resourceName) ? (e._validation_errors = n[this._resourceName], 
                i = "The data failed validation, please fix any issues and re-submit.") : i = n.error_message || "An unknown server error occurred.", 
                this.createAlert("error", i), o.Observable.throw(i);
            }, t.prototype.createAlert = function(t, e) {
                this._AlertService.createAlert(new r.Alert({
                    type: t,
                    message: e
                }));
            }, t;
        }();
        e.BaseService = s;
    },
    334: function(t, e) {
        "use strict";
        var n = function() {
            function t(t) {
                this.type = t.type, this.message = t.message, this.dismissable = null == t.dismissable ? !0 : t.dismissable, 
                this.dismissDefaultTimeout = t.dismissDefaultTimeout || 5e3, this.dismissErrorTimeout = t.dismissErrorTimeout || 1e4;
            }
            return t;
        }();
        e.Alert = n;
    },
    335: function(t, e, n) {
        "use strict";
        var i = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, r = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var i = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/story_state/", 
                this._resourceName = "story_state", this.objects$ = new u.Observable(function(t) {
                    return i._objectsObserver = t;
                }).share();
            }
            return i(e, t), e = r([ s.Injectable(), o("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryStateService = d;
    },
    336: function(t, e, n) {
        "use strict";
        var i = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, r = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var i = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/story_type/", 
                this._resourceName = "story_type", this.objects$ = new u.Observable(function(t) {
                    return i._objectsObserver = t;
                }).share();
            }
            return i(e, t), e = r([ s.Injectable(), o("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryTypeService = d;
    },
    337: function(t, e, n) {
        "use strict";
        var i = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, r = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var i = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/tag/", 
                this._resourceName = "tag", this.objects$ = new u.Observable(function(t) {
                    return i._objectsObserver = t;
                }).share();
            }
            return i(e, t), e = r([ s.Injectable(), o("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.TagService = d;
    },
    338: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(331), a = '\n    <div class="ui {{ alert.type }} message" *ngFor="let alert of _alerts">\n        <i class="close icon" *ngIf="alert.dismissable"></i><div class="header capitalize">{{ alert.type }}</div>\n        <p>{{ alert.message }}</p>\n    </div>\n  ', c = function() {
            function t(t) {
                this._AlertService = t;
            }
            return t.prototype.ngOnInit = function() {
                var t = this;
                this._AlertService.alerts$.subscribe(function(e) {
                    return t._alerts = e;
                });
            }, t = i([ o.Component({
                selector: "alert",
                template: a
            }), r("design:paramtypes", [ s.AlertService ]) ], t);
        }();
        e.AlertComponent = c;
    },
    339: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(340), a = n(332), c = n(335), l = n(336), u = n(337), d = n(341), f = n(342), p = n(349), v = n(351), h = n(352), m = function() {
            function t(t, e, n, i, r) {
                this._StoryService = t, this._StoryStateService = e, this._StoryTypeService = n, 
                this._TagService = i, this._DragulaService = r, this._newBacklogOpened = !1, this._newIceboxOpened = !1, 
                this.createNew = function(t) {
                    t ? (this._newBacklogStory = new s.Story({
                        icebox: !1,
                        state: null,
                        title: "New Story",
                        type: null
                    }), this._newBacklogOpened = !this._newBacklogOpened) : (this._newIceboxStory = new s.Story({
                        icebox: !0,
                        state: null,
                        title: "New Story",
                        type: null
                    }), this._newIceboxOpened = !this._newIceboxOpened);
                };
            }
            return t.prototype.ngOnInit = function() {
                var t = this;
                this._StoryService.objects$.subscribe(function(e) {
                    return t._stories = e;
                }), this._StoryStateService.objects$.subscribe(function(e) {
                    return t._states = e;
                }), this._StoryTypeService.objects$.subscribe(function(e) {
                    return t._types = e;
                }), this._TagService.objects$.subscribe(function(e) {
                    return t._tags = e;
                }), this._StoryService.loadAll(), this._StoryStateService.loadAll(), this._StoryTypeService.loadAll(), 
                this._TagService.loadAll(), this._DragulaService.drop.subscribe(function(e) {
                    t.onDrop(e.slice(1));
                });
            }, t.prototype.onDrop = function(t) {
                var e = t[0], n = (t[1], e.attributes["data-id"].value), i = this._stories.find(function(t) {
                    return t.id == n;
                }), r = "icebox" == e.parentElement.attributes["data-list"].value;
                i.icebox = r, this._StoryService.update(i);
            }, t = i([ o.Component({
                selector: "story-list",
                template: v.htmlTemplate,
                directives: [ h.Dragula, f.StoryDetailComponent, p.StoryListItemComponent ],
                viewProviders: [ h.DragulaService ],
                pipes: [ d.FilterPipe ]
            }), r("design:paramtypes", [ a.StoryService, c.StoryStateService, l.StoryTypeService, u.TagService, h.DragulaService ]) ], t);
        }();
        e.StoryListComponent = m;
    },
    340: function(t, e) {
        "use strict";
        var n = function() {
            function t(t) {
                this.description = t.description, this.icebox = t.icebox, this.title = t.title, 
                this.state = t.state, this.tags = t.tags || [], this.tasks = t.tasks || [], this.type = t.type;
            }
            return t;
        }();
        e.Story = n;
    },
    341: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = function() {
            function t() {}
            return t.prototype.transform = function(t, e) {
                var n = e;
                if (n && Array.isArray(t)) {
                    var i = Object.keys(n);
                    return t.filter(function(t) {
                        return i.reduce(function(e, i) {
                            return e && t[i] === n[i];
                        }, !0);
                    });
                }
                return t;
            }, t = i([ o.Pipe({
                name: "filter",
                pure: !1
            }), r("design:paramtypes", []) ], t);
        }();
        e.FilterPipe = s;
    },
    342: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(343), a = n(344), c = n(346), l = n(332), u = n(335), d = n(336), f = n(337), p = n(348), v = function() {
            function t(t, e, n, i) {
                this._StoryService = t, this._StoryStateService = e, this._StoryTypeService = n, 
                this._TagService = i;
            }
            return t.prototype.addTask = function() {
                var t = new s.StoryTask({
                    completed: !1,
                    description: ""
                });
                this.story.tasks.push(t);
            }, t.prototype.save = function() {
                this.story.id ? this._StoryService.update(this.story) : this._StoryService.create(this.story);
            }, t.prototype.delete = function() {
                this.story.id && this._StoryService.delete(this.story.id);
            }, t.prototype.ngOnInit = function() {
                var t = this;
                this._StoryTypeService.objects$.subscribe(function(e) {
                    return t._types = e;
                }), this._StoryStateService.objects$.subscribe(function(e) {
                    return t._states = e;
                }), this._TagService.objects$.subscribe(function(e) {
                    return t._tags = e;
                }), this._StoryStateService.loadAll(), this._StoryTypeService.loadAll(), this._TagService.loadAll();
            }, i([ o.Input(), r("design:type", Object) ], t.prototype, "story", void 0), t = i([ o.Component({
                selector: "[story-detail]",
                template: p.htmlTemplate,
                directives: [ a.SMSelect, c.SMSelectMultiple ]
            }), r("design:paramtypes", [ l.StoryService, u.StoryStateService, d.StoryTypeService, f.TagService ]) ], t);
        }();
        e.StoryDetailComponent = v;
    },
    343: function(t, e) {
        "use strict";
        var n = function() {
            function t(t) {
                this.completed = t.completed, this.description = t.description;
            }
            return t;
        }();
        e.StoryTask = n;
    },
    344: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(202), a = n(345), c = function() {
            function t(t, e) {
                this._elementRef = t, this._vm = e, e.valueAccessor = this;
            }
            return t.prototype.ngOnInit = function() {
                var t = this;
                setTimeout(function() {
                    jQuery(t._elementRef.nativeElement).find(".ui.dropdown").dropdown({});
                }, 0);
            }, t.prototype.getTextLabel = function(t) {
                if (t) {
                    if (this.textLabel && this.boundValueAttr) for (var e = 0; e < this.choices.length; e++) if (t[this.boundValueAttr] == this.choices[e][this.boundValueAttr] || t == this.choices[e][this.boundValueAttr]) return this.choices[e][this.textLabel];
                    return t[this.textLabel] || t;
                }
            }, t.prototype.onSelect = function(t) {
                var e = t[this.boundValueAttr] || t;
                this.writeValue(e), this._vm.viewToModelUpdate(e);
            }, t.prototype.writeValue = function(t) {
                this._selectedItem = t;
            }, t.prototype.registerOnChange = function(t) {
                this._onChange = t;
            }, t.prototype.registerOnTouched = function(t) {
                this._onTouched = t;
            }, i([ o.Input(), r("design:type", Object) ], t.prototype, "choices", void 0), i([ o.Input(), r("design:type", String) ], t.prototype, "textLabel", void 0), 
            i([ o.Input(), r("design:type", String) ], t.prototype, "boundValueAttr", void 0), 
            t = i([ o.Component({
                selector: "[sm-select], sm-select",
                template: a.htmlTemplate
            }), r("design:paramtypes", [ o.ElementRef, s.NgModel ]) ], t);
        }();
        e.SMSelect = c;
    },
    345: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n    \n    <div class="ui selection dropdown">\n        <i class="dropdown icon"></i><div class="text">{{getTextLabel(_selectedItem)}}</div>\n        <div class="menu transition hidden">\n            <div class="item" *ngFor="let choice of choices" (click)="onSelect(choice)">{{getTextLabel(choice)}}</div>\n        </div>\n    </div>\n';
    },
    346: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(202), a = n(347), c = function() {
            function t(t, e) {
                this._elementRef = t, this._selectedItems = [], this._vm = e, e.valueAccessor = this;
            }
            return t.prototype.ngOnInit = function() {
                var t = this;
                setTimeout(function() {
                    jQuery(t._elementRef.nativeElement).find(".ui.dropdown").dropdown({});
                }, 0);
            }, t.prototype.getTextLabel = function(t) {
                return t[this.textLabel] || t;
            }, t.prototype.onSelect = function(t, e) {
                t.stopPropagation();
                for (var n = !1, i = 0; i < this._selectedItems.length; i++) if (this._selectedItems[i].id === e.id) {
                    n = !0;
                    break;
                }
                n || (this._selectedItems.push(e), this._vm.viewToModelUpdate(this._selectedItems));
            }, t.prototype.onRemove = function(t, e) {
                t.stopPropagation();
                for (var n = 0; n < this._selectedItems.length; n++) if (this._selectedItems[n].id === e.id) {
                    this._selectedItems.splice(n, 1), this._vm.viewToModelUpdate(this._selectedItems);
                    break;
                }
            }, t.prototype.isSelected = function(t) {
                for (var e = 0; e < this._selectedItems.length; e++) if (this._selectedItems[e].id === t.id) return !0;
            }, t.prototype.writeValue = function(t) {
                this._selectedItems = t;
            }, t.prototype.registerOnChange = function(t) {
                this._onChange = t;
            }, t.prototype.registerOnTouched = function(t) {
                this._onTouched = t;
            }, i([ o.Input(), r("design:type", Object) ], t.prototype, "choices", void 0), i([ o.Input(), r("design:type", String) ], t.prototype, "textLabel", void 0), 
            i([ o.Input(), r("design:type", String) ], t.prototype, "addedClass", void 0), t = i([ o.Component({
                selector: "[sm-select-multiple], sm-select-multiple",
                template: a.htmlTemplate
            }), r("design:paramtypes", [ o.ElementRef, s.NgModel ]) ], t);
        }();
        e.SMSelectMultiple = c;
    },
    347: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n    \n    <div class="ui selection dropdown multiple {{addedClass}}">\n        <i class="dropdown icon"></i>\n        <a class="ui label transition visible" *ngFor="let choice of _selectedItems">{{getTextLabel(choice)}}<i class="delete icon" (click)="onRemove($event, choice)"></i></a>\n        <div class="text"></div>\n        <div class="menu">\n            <div class="item" [ngClass]="{filtered: isSelected(choice)}" *ngFor="let choice of choices" (click)="onSelect($event, choice)">{{getTextLabel(choice, choiceLabel)}}</div>\n        </div>\n    </div>\n';
    },
    348: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <div class="field" [ngClass]="{\'error\': story._validation_errors?.title}">\n        <label>\n            <div class="ui label">ID<div class="detail">{{ story.id }}</div></div>\n        </label>\n        <div class="ui small input">\n            <textarea [(ngModel)]="story.title" rows="2"></textarea>\n        </div>\n    </div>\n    <div class="inline field" [ngClass]="{\'error\': story._validation_errors?.type}">\n        <label>Type</label>\n        <div sm-select class="ui right floated small input" [(ngModel)]="story.type" [choices]="_types" [textLabel]="\'title\'"></div>\n    </div>\n    <div class="ui hidden clearing divider"></div>\n    <div class="inline field" [ngClass]="{\'error\': story._validation_errors?.effort}">\n        <label>Effort</label>\n        <div sm-select class="ui right floated small input" [(ngModel)]="story.effort" [choices]="_StoryService.effortChoices" [textLabel]="\'label\'" [boundValueAttr]="\'value\'"></div>\n    </div>\n    <div class="ui hidden clearing divider"></div>\n    <div class="inline field" [ngClass]="{\'error\': story._validation_errors?.state}">\n        <label>State</label>\n        <div sm-select class="ui right floated small input" [(ngModel)]="story.state" [choices]="_states" [textLabel]="\'title\'"></div>\n    </div>\n    <div class="ui hidden clearing divider"></div>  \n    <div class="field" [ngClass]="{\'error\': story._validation_errors?.description}">\n        <label>Description</label>\n        <div class="ui small input">\n            <textarea [(ngModel)]="story.description" rows="3"></textarea>\n        </div>\n    </div>\n    <div class="field" [ngClass]="{\'error\': story._validation_errors?.tags}">\n        <label>Tags</label>\n        <div sm-select-multiple class="ui small input" [(ngModel)]="story.tags" [choices]="_tags" [textLabel]="\'title\'" [addedClass]="\'fluid\'"></div>\n    </div>\n    <div class="field" [ngClass]="{\'error\': story._validation_errors?.tasks}">\n        <label>Tasks</label>\n        <div class="field" *ngFor="let task of story.tasks">\n            <div class="ui small fluid left icon input">\n                <i class="inverted circular checkmark link icon" [ngClass]="{\'green\': task.completed}" (click)="task.completed = !task.completed"></i>\n                <input [(ngModel)]="task.description">\n            </div>\n        </div>\n    </div>\n    <button class="ui right floated mini button" (click)="addTask()">Add Task</button>\n    <div class="ui hidden clearing divider"></div>\n    <button *ngIf="story.id" class="ui secondary button" (click)="delete()">Delete</button>\n    <button class="ui right floated primary button" (click)="save()">Save</button>\n    <div class="ui hidden clearing divider"></div>\n';
    },
    349: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(342), a = n(350), c = function() {
            function t() {
                this._opened = !1, this.toggle = function() {
                    this._opened = !this._opened;
                };
            }
            return i([ o.Input(), r("design:type", Object) ], t.prototype, "story", void 0), 
            t = i([ o.Component({
                selector: "[story-list-item]",
                template: a.htmlTemplate,
                directives: [ s.StoryDetailComponent ]
            }), r("design:paramtypes", []) ], t);
        }();
        e.StoryListItemComponent = c;
    },
    350: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <div class="item">\n        <div class="content">\n            <p class="cursor-pointer" (click)="toggle()">{{ story.title }}</p>\n            <div class="extra">\n                <div class="ui label"><i class="star icon"></i>{{ story.effort }}</div>\n                <div class="ui label" *ngFor="let tag of story.tags">{{ tag.title }}</div>\n                <button class="ui right floated mini button">Start</button>\n            </div>\n        </div>\n    </div>\n    <div class="ui secondary form segment" *ngIf="_opened" story-detail [story]="story"></div>\n';
    },
    351: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <div class="ui equal width grid">\n        <div class="column">\n            <div class="ui segment">\n                <button class="ui mini compact right floated icon button" (click)="createNew(true)">\n                    <i class="plus icon"></i>\n                </button>\n                <p>Backlog</p>\n            </div>\n            <div class="ui secondary form segment" *ngIf="_newBacklogOpened" story-detail [story]="_newBacklogStory"></div>\n            <div class="ui raised segments" style="min-height: 50px;" [dragula]=\'"first-bag"\' [attr.data-list]="\'backlog\'">\n                <div class="ui segment" *ngFor="let story of _stories | filter : {icebox: false}" [attr.data-id]="story.id" story-list-item [story]="story"></div>\n            </div>\n        </div>\n        <div class="column">\n            <div class="ui segment">\n                <button class="ui mini compact right floated icon button" (click)="createNew(false)">\n                    <i class="plus icon"></i>\n                </button>\n                <p>Icebox</p>\n            </div>\n            <div class="ui secondary form segment" *ngIf="_newIceboxOpened" story-detail [story]="_newIceboxStory"></div>\n            <div class="ui raised segments" [dragula]=\'"first-bag"\' style="min-height: 50px;" [attr.data-list]="\'icebox\'">\n                <div class="ui segment" *ngFor="let story of _stories | filter : {icebox: true}" [attr.data-id]="story.id" story-list-item [story]="story"></div>\n            </div>\n        </div>\n    </div>\n\n';
    },
    352: function(t, e, n) {
        "use strict";
        function i(t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
        }
        var r = n(353), o = n(354);
        i(n(353)), i(n(354)), Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            directives: [ r.Dragula ],
            providers: [ o.DragulaService ]
        };
    },
    353: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(1), s = n(354), a = n(355), c = function() {
            function t(t, e) {
                this.el = t, this.dragulaService = e, this.container = t.nativeElement;
            }
            return t.prototype.ngOnInit = function() {
                var t = this, e = this.dragulaService.find(this.bag), n = function() {
                    t.dragulaModel && (t.drake.models ? t.drake.models.push(t.dragulaModel) : t.drake.models = [ t.dragulaModel ]);
                };
                e ? (this.drake = e.drake, n(), this.drake.containers.push(this.container)) : (this.drake = a({
                    containers: [ this.container ]
                }), n(), this.dragulaService.add(this.bag, this.drake));
            }, t.prototype.ngOnChanges = function(t) {
                if (t && t.dragulaModel && this.drake) if (this.drake.models) {
                    var e = this.drake.models.indexOf(t.dragulaModel.previousValue);
                    this.drake.models.splice(e, 1, t.dragulaModel.currentValue);
                } else this.drake.models = [ t.dragulaModel.currentValue ];
            }, i([ o.Input("dragula"), r("design:type", String) ], t.prototype, "bag", void 0), 
            i([ o.Input(), r("design:type", Object) ], t.prototype, "dragulaModel", void 0), 
            t = i([ o.Directive({
                selector: "[dragula]"
            }), r("design:paramtypes", [ o.ElementRef, s.DragulaService ]) ], t);
        }();
        e.Dragula = c;
    },
    354: function(t, e, n) {
        "use strict";
        var i = this && this.__decorate || function(t, e, n, i) {
            var r, o = arguments.length, s = 3 > o ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (3 > o ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
        }, r = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, o = n(355), s = n(1), a = function() {
            function t() {
                this.cancel = new s.EventEmitter(), this.cloned = new s.EventEmitter(), this.drag = new s.EventEmitter(), 
                this.dragend = new s.EventEmitter(), this.drop = new s.EventEmitter(), this.out = new s.EventEmitter(), 
                this.over = new s.EventEmitter(), this.remove = new s.EventEmitter(), this.shadow = new s.EventEmitter(), 
                this.dropModel = new s.EventEmitter(), this.removeModel = new s.EventEmitter(), 
                this.events = [ "cancel", "cloned", "drag", "dragend", "drop", "out", "over", "remove", "shadow", "dropModel", "removeModel" ], 
                this.bags = [];
            }
            return t.prototype.add = function(t, e) {
                var n = this.find(t);
                if (n) throw new Error('Bag named: "' + t + '" already exists.');
                return n = {
                    name: t,
                    drake: e
                }, this.bags.push(n), e.models && this.handleModels(t, e), n.initEvents || this.setupEvents(n), 
                n;
            }, t.prototype.find = function(t) {
                for (var e = 0; e < this.bags.length; e++) if (this.bags[e].name === t) return this.bags[e];
            }, t.prototype.destroy = function(t) {
                var e = this.find(t), n = this.bags.indexOf(e);
                this.bags.splice(n, 1), e.drake.destroy();
            }, t.prototype.setOptions = function(t, e) {
                var n = this.add(t, o(e));
                this.handleModels(t, n.drake);
            }, t.prototype.handleModels = function(t, e) {
                var n, i, r, o, s = this;
                e.on("remove", function(n, r) {
                    e.models && (o = e.models[e.containers.indexOf(r)], o.splice(i, 1), s.removeModel.emit([ t, n, r ]));
                }), e.on("drag", function(t, e) {
                    n = t, i = s.domIndexOf(t, e);
                }), e.on("drop", function(a, c, l) {
                    if (e.models && c) {
                        if (r = s.domIndexOf(a, c), o = e.models[e.containers.indexOf(l)], c === l) o.splice(r, 0, o.splice(i, 1)[0]); else {
                            var u = n === a, d = e.models[e.containers.indexOf(c)], f = u ? o[i] : JSON.parse(JSON.stringify(o[i]));
                            u && o.splice(i, 1), d.splice(r, 0, f), c.removeChild(a);
                        }
                        s.dropModel.emit([ t, a, c, l ]);
                    }
                });
            }, t.prototype.setupEvents = function(t) {
                t.initEvents = !0;
                var e = this, n = function(n) {
                    function i() {
                        var i = Array.prototype.slice.call(arguments);
                        e[n].emit([ t.name ].concat(i));
                    }
                    t.drake.on(n, i);
                };
                this.events.forEach(n);
            }, t.prototype.domIndexOf = function(t, e) {
                return Array.prototype.indexOf.call(e.children, t);
            }, t = i([ s.Injectable(), r("design:paramtypes", []) ], t);
        }();
        e.DragulaService = a;
    },
    355: function(t, e, n) {
        (function(e) {
            "use strict";
            function i(t, e) {
                function n(t) {
                    return -1 !== ut.containers.indexOf(t) || lt.isContainer(t);
                }
                function i(t) {
                    var e = t ? "remove" : "add";
                    r(j, e, "mousedown", R), r(j, e, "mouseup", D);
                }
                function a(t) {
                    var e = t ? "remove" : "add";
                    r(j, e, "mousemove", x);
                }
                function h(t) {
                    var e = t ? "remove" : "add";
                    _[e](j, "selectstart", w), _[e](j, "click", w);
                }
                function y() {
                    i(!0), D({});
                }
                function w(t) {
                    at && t.preventDefault();
                }
                function R(t) {
                    et = t.clientX, nt = t.clientY;
                    var e = 1 !== o(t) || t.metaKey || t.ctrlKey;
                    if (!e) {
                        var n = t.target, i = T(n);
                        i && (at = i, a(), "mousedown" === t.type && (v(n) ? n.focus() : t.preventDefault()));
                    }
                }
                function x(t) {
                    if (at) {
                        if (0 === o(t)) return void D({});
                        if (void 0 === t.clientX || t.clientX !== et || void 0 === t.clientY || t.clientY !== nt) {
                            if (lt.ignoreInputTextSelection) {
                                var e = g("clientX", t), n = g("clientY", t), i = O.elementFromPoint(e, n);
                                if (v(i)) return;
                            }
                            var r = at;
                            a(!0), h(), P(), C(r);
                            var c = s(W);
                            Z = g("pageX", t) - c.left, tt = g("pageY", t) - c.top, S.add(ot || W, "gu-transit"), 
                            Y(), U(t);
                        }
                    }
                }
                function T(t) {
                    if (!(ut.dragging && Q || n(t))) {
                        for (var e = t; p(t) && n(p(t)) === !1; ) {
                            if (lt.invalid(t, e)) return;
                            if (t = p(t), !t) return;
                        }
                        var i = p(t);
                        if (i && !lt.invalid(t, e)) {
                            var r = lt.moves(t, i, e, m(t));
                            if (r) return {
                                item: t,
                                source: i
                            };
                        }
                    }
                }
                function E(t) {
                    return !!T(t);
                }
                function I(t) {
                    var e = T(t);
                    e && C(e);
                }
                function C(t) {
                    z(t.item, t.source) && (ot = t.item.cloneNode(!0), ut.emit("cloned", ot, t.item, "copy")), 
                    G = t.source, W = t.item, it = rt = m(t.item), ut.dragging = !0, ut.emit("drag", W, G);
                }
                function k() {
                    return !1;
                }
                function P() {
                    if (ut.dragging) {
                        var t = ot || W;
                        M(t, p(t));
                    }
                }
                function A() {
                    at = !1, a(!0), h(!0);
                }
                function D(t) {
                    if (A(), ut.dragging) {
                        var e = ot || W, n = g("clientX", t), i = g("clientY", t), r = c(Q, n, i), o = F(r, n, i);
                        o && (ot && lt.copySortSource || !ot || o !== G) ? M(e, o) : lt.removeOnSpill ? N() : L();
                    }
                }
                function M(t, e) {
                    var n = p(t);
                    ot && lt.copySortSource && e === G && n.removeChild(W), $(e) ? ut.emit("cancel", t, G, G) : ut.emit("drop", t, e, G, rt), 
                    B();
                }
                function N() {
                    if (ut.dragging) {
                        var t = ot || W, e = p(t);
                        e && e.removeChild(t), ut.emit(ot ? "cancel" : "remove", t, e, G), B();
                    }
                }
                function L(t) {
                    if (ut.dragging) {
                        var e = arguments.length > 0 ? t : lt.revertOnSpill, n = ot || W, i = p(n), r = $(i);
                        r === !1 && e && (ot ? i.removeChild(ot) : G.insertBefore(n, it)), r || e ? ut.emit("cancel", n, G, G) : ut.emit("drop", n, i, G, rt), 
                        B();
                    }
                }
                function B() {
                    var t = ot || W;
                    A(), H(), t && S.rm(t, "gu-transit"), st && clearTimeout(st), ut.dragging = !1, 
                    ct && ut.emit("out", t, ct, G), ut.emit("dragend", t), G = W = ot = it = rt = st = ct = null;
                }
                function $(t, e) {
                    var n;
                    return n = void 0 !== e ? e : Q ? rt : m(ot || W), t === G && n === it;
                }
                function F(t, e, i) {
                    function r() {
                        var r = n(o);
                        if (r === !1) return !1;
                        var s = q(o, t), a = J(o, s, e, i), c = $(o, a);
                        return c ? !0 : lt.accepts(W, o, G, a);
                    }
                    for (var o = t; o && !r(); ) o = p(o);
                    return o;
                }
                function U(t) {
                    function e(t) {
                        ut.emit(t, l, ct, G);
                    }
                    function n() {
                        f && e("over");
                    }
                    function i() {
                        ct && e("out");
                    }
                    if (Q) {
                        t.preventDefault();
                        var r = g("clientX", t), o = g("clientY", t), s = r - Z, a = o - tt;
                        Q.style.left = s + "px", Q.style.top = a + "px";
                        var l = ot || W, u = c(Q, r, o), d = F(u, r, o), f = null !== d && d !== ct;
                        (f || null === d) && (i(), ct = d, n());
                        var v = p(l);
                        if (d === G && ot && !lt.copySortSource) return void (v && v.removeChild(l));
                        var h, y = q(d, u);
                        if (null !== y) h = J(d, y, r, o); else {
                            if (lt.revertOnSpill !== !0 || ot) return void (ot && v && v.removeChild(l));
                            h = it, d = G;
                        }
                        (null === h && f || h !== l && h !== m(l)) && (rt = h, d.insertBefore(l, h), ut.emit("shadow", l, d, G));
                    }
                }
                function V(t) {
                    S.rm(t, "gu-hide");
                }
                function X(t) {
                    ut.dragging && S.add(t, "gu-hide");
                }
                function Y() {
                    if (!Q) {
                        var t = W.getBoundingClientRect();
                        Q = W.cloneNode(!0), Q.style.width = d(t) + "px", Q.style.height = f(t) + "px", 
                        S.rm(Q, "gu-transit"), S.add(Q, "gu-mirror"), lt.mirrorContainer.appendChild(Q), 
                        r(j, "add", "mousemove", U), S.add(lt.mirrorContainer, "gu-unselectable"), ut.emit("cloned", Q, W, "mirror");
                    }
                }
                function H() {
                    Q && (S.rm(lt.mirrorContainer, "gu-unselectable"), r(j, "remove", "mousemove", U), 
                    p(Q).removeChild(Q), Q = null);
                }
                function q(t, e) {
                    for (var n = e; n !== t && p(n) !== t; ) n = p(n);
                    return n === j ? null : n;
                }
                function J(t, e, n, i) {
                    function r() {
                        var e, r, o, s = t.children.length;
                        for (e = 0; s > e; e++) {
                            if (r = t.children[e], o = r.getBoundingClientRect(), a && o.left + o.width / 2 > n) return r;
                            if (!a && o.top + o.height / 2 > i) return r;
                        }
                        return null;
                    }
                    function o() {
                        var t = e.getBoundingClientRect();
                        return s(a ? n > t.left + d(t) / 2 : i > t.top + f(t) / 2);
                    }
                    function s(t) {
                        return t ? m(e) : e;
                    }
                    var a = "horizontal" === lt.direction, c = e !== t ? o() : r();
                    return c;
                }
                function z(t, e) {
                    return "boolean" == typeof lt.copy ? lt.copy : lt.copy(t, e);
                }
                var K = arguments.length;
                1 === K && Array.isArray(t) === !1 && (e = t, t = []);
                var Q, G, W, Z, tt, et, nt, it, rt, ot, st, at, ct = null, lt = e || {};
                void 0 === lt.moves && (lt.moves = u), void 0 === lt.accepts && (lt.accepts = u), 
                void 0 === lt.invalid && (lt.invalid = k), void 0 === lt.containers && (lt.containers = t || []), 
                void 0 === lt.isContainer && (lt.isContainer = l), void 0 === lt.copy && (lt.copy = !1), 
                void 0 === lt.copySortSource && (lt.copySortSource = !1), void 0 === lt.revertOnSpill && (lt.revertOnSpill = !1), 
                void 0 === lt.removeOnSpill && (lt.removeOnSpill = !1), void 0 === lt.direction && (lt.direction = "vertical"), 
                void 0 === lt.ignoreInputTextSelection && (lt.ignoreInputTextSelection = !0), void 0 === lt.mirrorContainer && (lt.mirrorContainer = O.body);
                var ut = b({
                    containers: lt.containers,
                    start: I,
                    end: P,
                    cancel: L,
                    remove: N,
                    destroy: y,
                    canMove: E,
                    dragging: !1
                });
                return lt.removeOnSpill === !0 && ut.on("over", V).on("out", X), i(), ut;
            }
            function r(t, n, i, r) {
                var o = {
                    mouseup: "touchend",
                    mousedown: "touchstart",
                    mousemove: "touchmove"
                }, s = {
                    mouseup: "pointerup",
                    mousedown: "pointerdown",
                    mousemove: "pointermove"
                }, a = {
                    mouseup: "MSPointerUp",
                    mousedown: "MSPointerDown",
                    mousemove: "MSPointerMove"
                };
                e.navigator.pointerEnabled ? _[n](t, s[i], r) : e.navigator.msPointerEnabled ? _[n](t, a[i], r) : (_[n](t, o[i], r), 
                _[n](t, i, r));
            }
            function o(t) {
                if (void 0 !== t.touches) return t.touches.length;
                if (void 0 !== t.which && 0 !== t.which) return t.which;
                if (void 0 !== t.buttons) return t.buttons;
                var e = t.button;
                return void 0 !== e ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : void 0;
            }
            function s(t) {
                var e = t.getBoundingClientRect();
                return {
                    left: e.left + a("scrollLeft", "pageXOffset"),
                    top: e.top + a("scrollTop", "pageYOffset")
                };
            }
            function a(t, n) {
                return "undefined" != typeof e[n] ? e[n] : j.clientHeight ? j[t] : O.body[t];
            }
            function c(t, e, n) {
                var i, r = t || {}, o = r.className;
                return r.className += " gu-hide", i = O.elementFromPoint(e, n), r.className = o, 
                i;
            }
            function l() {
                return !1;
            }
            function u() {
                return !0;
            }
            function d(t) {
                return t.width || t.right - t.left;
            }
            function f(t) {
                return t.height || t.bottom - t.top;
            }
            function p(t) {
                return t.parentNode === O ? null : t.parentNode;
            }
            function v(t) {
                return "INPUT" === t.tagName || "TEXTAREA" === t.tagName || "SELECT" === t.tagName || h(t);
            }
            function h(t) {
                return t ? "false" === t.contentEditable ? !1 : "true" === t.contentEditable ? !0 : h(p(t)) : !1;
            }
            function m(t) {
                function e() {
                    var e = t;
                    do e = e.nextSibling; while (e && 1 !== e.nodeType);
                    return e;
                }
                return t.nextElementSibling || e();
            }
            function y(t) {
                return t.targetTouches && t.targetTouches.length ? t.targetTouches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t;
            }
            function g(t, e) {
                var n = y(e), i = {
                    pageX: "clientX",
                    pageY: "clientY"
                };
                return t in i && !(t in n) && i[t] in n && (t = i[t]), n[t];
            }
            var b = n(356), _ = n(362), S = n(365), O = document, j = O.documentElement;
            t.exports = i;
        }).call(e, function() {
            return this;
        }());
    },
    356: function(t, e, n) {
        "use strict";
        var i = n(357), r = n(358);
        t.exports = function o(t, e) {
            var n = e || {}, o = {};
            return void 0 === t && (t = {}), t.on = function(e, n) {
                return o[e] ? o[e].push(n) : o[e] = [ n ], t;
            }, t.once = function(e, n) {
                return n._once = !0, t.on(e, n), t;
            }, t.off = function(e, n) {
                var i = arguments.length;
                if (1 === i) delete o[e]; else if (0 === i) o = {}; else {
                    var r = o[e];
                    if (!r) return t;
                    r.splice(r.indexOf(n), 1);
                }
                return t;
            }, t.emit = function() {
                var e = i(arguments);
                return t.emitterSnapshot(e.shift()).apply(this, e);
            }, t.emitterSnapshot = function(e) {
                var s = (o[e] || []).slice(0);
                return function() {
                    var o = i(arguments), a = this || t;
                    if ("error" === e && n.throws !== !1 && !s.length) throw 1 === o.length ? o[0] : o;
                    return s.forEach(function c(i) {
                        n.async ? r(i, o, a) : i.apply(a, o), i._once && t.off(e, i);
                    }), t;
                };
            }, t;
        };
    },
    357: function(t, e) {
        t.exports = function n(t, e) {
            return Array.prototype.slice.call(t, e);
        };
    },
    358: function(t, e, n) {
        "use strict";
        var i = n(359);
        t.exports = function r(t, e, n) {
            t && i(function r() {
                t.apply(n || null, e || []);
            });
        };
    },
    359: function(t, e, n) {
        (function(e) {
            var n, i = "function" == typeof e;
            n = i ? function(t) {
                e(t);
            } : function(t) {
                setTimeout(t, 0);
            }, t.exports = n;
        }).call(e, n(360).setImmediate);
    },
    360: function(t, e, n) {
        (function(t, i) {
            function r(t, e) {
                this._id = t, this._clearFn = e;
            }
            var o = n(361).nextTick, s = Function.prototype.apply, a = Array.prototype.slice, c = {}, l = 0;
            e.setTimeout = function() {
                return new r(s.call(setTimeout, window, arguments), clearTimeout);
            }, e.setInterval = function() {
                return new r(s.call(setInterval, window, arguments), clearInterval);
            }, e.clearTimeout = e.clearInterval = function(t) {
                t.close();
            }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
                this._clearFn.call(window, this._id);
            }, e.enroll = function(t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
            }, e.unenroll = function(t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
            }, e._unrefActive = e.active = function(t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function n() {
                    t._onTimeout && t._onTimeout();
                }, e));
            }, e.setImmediate = "function" == typeof t ? t : function(t) {
                var n = l++, i = arguments.length < 2 ? !1 : a.call(arguments, 1);
                return c[n] = !0, o(function r() {
                    c[n] && (i ? t.apply(null, i) : t.call(null), e.clearImmediate(n));
                }), n;
            }, e.clearImmediate = "function" == typeof i ? i : function(t) {
                delete c[t];
            };
        }).call(e, n(360).setImmediate, n(360).clearImmediate);
    },
    362: function(t, e, n) {
        (function(e) {
            "use strict";
            function i(t, e, n, i) {
                return t.addEventListener(e, n, i);
            }
            function r(t, e, n) {
                return t.attachEvent("on" + e, l(t, e, n));
            }
            function o(t, e, n, i) {
                return t.removeEventListener(e, n, i);
            }
            function s(t, e, n) {
                var i = u(t, e, n);
                return i ? t.detachEvent("on" + e, i) : void 0;
            }
            function a(t, e, n) {
                function i() {
                    var t;
                    return v.createEvent ? (t = v.createEvent("Event"), t.initEvent(e, !0, !0)) : v.createEventObject && (t = v.createEventObject()), 
                    t;
                }
                function r() {
                    return new f(e, {
                        detail: n
                    });
                }
                var o = -1 === p.indexOf(e) ? r() : i();
                t.dispatchEvent ? t.dispatchEvent(o) : t.fireEvent("on" + e, o);
            }
            function c(t, n, i) {
                return function r(n) {
                    var r = n || e.event;
                    r.target = r.target || r.srcElement, r.preventDefault = r.preventDefault || function o() {
                        r.returnValue = !1;
                    }, r.stopPropagation = r.stopPropagation || function s() {
                        r.cancelBubble = !0;
                    }, r.which = r.which || r.keyCode, i.call(t, r);
                };
            }
            function l(t, e, n) {
                var i = u(t, e, n) || c(t, e, n);
                return y.push({
                    wrapper: i,
                    element: t,
                    type: e,
                    fn: n
                }), i;
            }
            function u(t, e, n) {
                var i = d(t, e, n);
                if (i) {
                    var r = y[i].wrapper;
                    return y.splice(i, 1), r;
                }
            }
            function d(t, e, n) {
                var i, r;
                for (i = 0; i < y.length; i++) if (r = y[i], r.element === t && r.type === e && r.fn === n) return i;
            }
            var f = n(363), p = n(364), v = e.document, h = i, m = o, y = [];
            e.addEventListener || (h = r, m = s), t.exports = {
                add: h,
                remove: m,
                fabricate: a
            };
        }).call(e, function() {
            return this;
        }());
    },
    363: function(t, e) {
        (function(e) {
            function n() {
                try {
                    var t = new i("cat", {
                        detail: {
                            foo: "bar"
                        }
                    });
                    return "cat" === t.type && "bar" === t.detail.foo;
                } catch (e) {}
                return !1;
            }
            var i = e.CustomEvent;
            t.exports = n() ? i : "function" == typeof document.createEvent ? function r(t, e) {
                var n = document.createEvent("CustomEvent");
                return e ? n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail) : n.initCustomEvent(t, !1, !1, void 0), 
                n;
            } : function o(t, e) {
                var n = document.createEventObject();
                return n.type = t, e ? (n.bubbles = Boolean(e.bubbles), n.cancelable = Boolean(e.cancelable), 
                n.detail = e.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n;
            };
        }).call(e, function() {
            return this;
        }());
    },
    364: function(t, e) {
        (function(e) {
            "use strict";
            var n = [], i = "", r = /^on/;
            for (i in e) r.test(i) && n.push(i.slice(2));
            t.exports = n;
        }).call(e, function() {
            return this;
        }());
    },
    365: function(t, e) {
        "use strict";
        function n(t) {
            var e = o[t];
            return e ? e.lastIndex = 0 : o[t] = e = new RegExp(s + t + a, "g"), e;
        }
        function i(t, e) {
            var i = t.className;
            i.length ? n(e).test(i) || (t.className += " " + e) : t.className = e;
        }
        function r(t, e) {
            t.className = t.className.replace(n(e), " ").trim();
        }
        var o = {}, s = "(?:^|\\s)", a = "(?:\\s|$)";
        t.exports = {
            add: i,
            rm: r
        };
    }
});