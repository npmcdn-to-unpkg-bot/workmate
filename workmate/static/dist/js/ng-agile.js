webpackJsonp([ 0 ], {
    0: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(97), a = n(118);
        n(301);
        var c = n(330), l = n(331), u = n(332), d = n(335), f = n(336), p = n(337), h = n(338), v = n(502), y = function() {
            function t() {}
            return t = r([ i.Component({
                selector: "agile-app",
                template: '\n        <div class="messages"><alert-block></alert-block></div>\n        <story-list></story-list>\n    ',
                directives: [ v.StoryListComponent, h.AlertBlockComponent ],
                providers: [ s.HTTP_PROVIDERS, i.provide(s.RequestOptions, {
                    useClass: c.ExRequestOptions
                }), l.AlertService, u.StoryService, d.StoryStateService, f.StoryTypeService, p.TagService ]
            }), o("design:paramtypes", []) ], t);
        }();
        e.AgileComponent = y, a.bootstrap(y);
    },
    330: function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, o = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, i = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = function(t) {
            function e() {
                t.call(this), this.headers.append("X-CSRFToken", this.getCookie("csrftoken"));
            }
            return r(e, t), e.prototype.getCookie = function(t) {
                var e = "; " + document.cookie, n = e.split("; " + t + "=");
                return 2 == n.length ? n.pop().split(";").shift() : void 0;
            }, e.prototype.appendHeaders = function(t, e) {
                this.headers.append(t, e);
            }, e = o([ s.Injectable(), i("design:paramtypes", []) ], e);
        }(a.BaseRequestOptions);
        e.ExRequestOptions = c;
    },
    331: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(35), a = function() {
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
                this._dataStore.alerts.forEach(function(n, r) {
                    n.id === t.id && e._dataStore.alerts.splice(r, 1);
                }), this._dataObserver.next(this._dataStore.alerts);
            }, t.prototype.getNextId = function() {
                return this._nextId++;
            }, t = r([ i.Injectable(), o("design:paramtypes", []) ], t);
        }();
        e.AlertService = a;
    },
    332: function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, o = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, i = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var r = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this.effortChoices = [ {
                    id: "0.5",
                    text: "0.5 Points"
                }, {
                    id: "1.0",
                    text: "1 Point"
                }, {
                    id: "2.0",
                    text: "2 Points"
                }, {
                    id: "3.0",
                    text: "3 Points"
                }, {
                    id: "5.0",
                    text: "5 Points"
                } ], this._baseUrl = "/api/v1/story/", this._resourceName = "story", this.objects$ = new u.Observable(function(t) {
                    return r._objectsObserver = t;
                }).share();
            }
            return r(e, t), e = o([ s.Injectable(), i("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryService = d;
    },
    333: function(t, e, n) {
        "use strict";
        var r = n(330), o = n(334), i = n(35), s = function() {
            function t(t, e) {
                var n = this;
                this._http = t, this._AlertService = e, this._baseUrl = "", this._resourceName = "", 
                this._postOptions = new r.ExRequestOptions(), this.meta$ = new i.Observable(function(t) {
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
                    e._dataStore.objects.forEach(function(r, o) {
                        r.id === t.id && (e._dataStore.objects[o] = t, n = !0);
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
                    e._dataStore.objects.forEach(function(n, r) {
                        n.id === t.id && (e._dataStore.objects[r] = t, e._dataStore.objects[r]._validation_errors = {});
                    }), e._objectsObserver.next(e._dataStore.objects);
                }, function(n) {
                    return e.handleError(n, t);
                }, function() {
                    return e.handleCompleted();
                });
            }, t.prototype.delete = function(t) {
                var e = this;
                this._http.delete("" + this._baseUrl + t + "/").subscribe(function(n) {
                    e._dataStore.objects.forEach(function(n, r) {
                        n.id === t && e._dataStore.objects.splice(r, 1);
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
            }, t.prototype.handleCompleted = function(t) {
                this.createAlert("success", t || "Completed successfully");
            }, t.prototype.handleError = function(t, e) {
                var n = JSON.parse(t._body), r = "";
                return e && n.hasOwnProperty(this._resourceName) ? (e._validation_errors = n[this._resourceName], 
                r = "The data failed validation, please fix any issues and re-submit.") : r = n.message || n.error_message || "An unknown server error occurred.", 
                this.createAlert("error", r), i.Observable.throw(r);
            }, t.prototype.createAlert = function(t, e) {
                this._AlertService.createAlert(new o.Alert({
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
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, o = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, i = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var r = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/story_state/", 
                this._resourceName = "story_state", this.objects$ = new u.Observable(function(t) {
                    return r._objectsObserver = t;
                }).share();
            }
            return r(e, t), e = o([ s.Injectable(), i("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryStateService = d;
    },
    336: function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, o = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, i = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var r = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/story_type/", 
                this._resourceName = "story_type", this.objects$ = new u.Observable(function(t) {
                    return r._objectsObserver = t;
                }).share();
            }
            return r(e, t), e = o([ s.Injectable(), i("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.StoryTypeService = d;
    },
    337: function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t;
            }
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
        }, o = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, i = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, s = n(1), a = n(97), c = n(331), l = n(333), u = n(35), d = function(t) {
            function e(e, n) {
                var r = this;
                t.call(this, e, n), this._http = e, this._AlertService = n, this._baseUrl = "/api/v1/tag/", 
                this._resourceName = "tag", this.objects$ = new u.Observable(function(t) {
                    return r._objectsObserver = t;
                }).share();
            }
            return r(e, t), e = o([ s.Injectable(), i("design:paramtypes", [ a.Http, c.AlertService ]) ], e);
        }(l.BaseService);
        e.TagService = d;
    },
    338: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(202), a = n(339), c = n(331), l = '\n    <alert *ngFor="let alert of _alerts; let i = index" [type]="alert.type" dismissible="alert.dismissable" (close)="closeAlert(i)">\n        {{ alert.message }}\n    </alert>\n  ', u = function() {
            function t(t) {
                this._AlertService = t;
            }
            return t.prototype.ngOnInit = function() {
                var t = this;
                this._AlertService.alerts$.subscribe(function(e) {
                    return t._alerts = e;
                });
            }, t.prototype.closeAlert = function(t) {
                this._alerts.splice(t, 1);
            }, t = r([ i.Component({
                selector: "alert-block",
                directives: [ a.AlertComponent, s.CORE_DIRECTIVES ],
                template: l
            }), o("design:paramtypes", [ c.AlertService ]) ], t);
        }();
        e.AlertBlockComponent = u;
    },
    502: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(503), a = n(332), c = n(335), l = n(336), u = n(337), d = n(504), f = n(505), p = n(519), h = n(521), v = n(522), y = function() {
            function t(t, e, n, r, o) {
                this._StoryService = t, this._StoryStateService = e, this._StoryTypeService = n, 
                this._TagService = r, this._DragulaService = o, this._newBacklogOpened = !1, this._newIceboxOpened = !1, 
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
                var e = t[0], n = (t[1], e.attributes["data-id"].value), r = this._stories.find(function(t) {
                    return t.id == n;
                }), o = "icebox" == e.parentElement.attributes["data-list"].value;
                r.icebox = o, this._StoryService.update(r);
            }, t = r([ i.Component({
                selector: "story-list",
                template: h.htmlTemplate,
                directives: [ v.Dragula, f.StoryDetailComponent, p.StoryListItemComponent ],
                viewProviders: [ v.DragulaService ],
                pipes: [ d.FilterPipe ]
            }), o("design:paramtypes", [ a.StoryService, c.StoryStateService, l.StoryTypeService, u.TagService, v.DragulaService ]) ], t);
        }();
        e.StoryListComponent = y;
    },
    503: function(t, e) {
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
    504: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = function() {
            function t() {}
            return t.prototype.transform = function(t, e) {
                var n = e;
                if (n && Array.isArray(t)) {
                    var r = Object.keys(n);
                    return t.filter(function(t) {
                        return r.reduce(function(e, r) {
                            return e && t[r] === n[r];
                        }, !0);
                    });
                }
                return t;
            }, t = r([ i.Pipe({
                name: "filter",
                pure: !1
            }), o("design:paramtypes", []) ], t);
        }();
        e.FilterPipe = s;
    },
    505: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(506), a = n(507), c = n(516), l = n(332), u = n(335), d = n(336), f = n(337), p = n(518), h = function() {
            function t(t, e, n, r) {
                this._StoryService = t, this._StoryStateService = e, this._StoryTypeService = n, 
                this._TagService = r;
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
            }, r([ i.Input(), o("design:type", Object) ], t.prototype, "story", void 0), t = r([ i.Component({
                selector: "[story-detail]",
                template: p.htmlTemplate,
                directives: [ a.BSSelect, c.BSSelectMultiple ]
            }), o("design:paramtypes", [ l.StoryService, u.StoryStateService, d.StoryTypeService, f.TagService ]) ], t);
        }();
        e.StoryDetailComponent = h;
    },
    506: function(t, e) {
        "use strict";
        var n = function() {
            function t(t) {
                this.completed = t.completed, this.description = t.description;
            }
            return t;
        }();
        e.StoryTask = n;
    },
    507: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(202), a = n(508), c = n(515), l = function() {
            function t(t) {
                this._items = [], this.value = [], this._vm = t, t.valueAccessor = this;
            }
            return t.prototype.ngOnInit = function() {
                for (var t = 0; t < this.choices.length; t++) {
                    var e = {
                        id: this.choices[t].id,
                        text: this.choices[t][this.textLabel]
                    };
                    this._items.push(e), !this._selectedItem || this.choices[t].id != this._selectedItem.id && this.choices[t].id != this._selectedItem || (this.value = [ e ]);
                }
            }, t.prototype.writeValue = function(t) {
                this._selectedItem = t;
            }, t.prototype.registerOnChange = function(t) {
                this._onChange = t;
            }, t.prototype.registerOnTouched = function(t) {
                this._onTouched = t;
            }, t.prototype.selected = function(t) {
                for (var e = 0; e < this.choices.length; e++) if (this.choices[e].id == t.id) {
                    var n = this.choices[e][this.boundValueAttr] || this.choices[e];
                    this.writeValue(n), this._vm.viewToModelUpdate(n);
                }
            }, t.prototype.removed = function(t) {
                var e = null;
                this.writeValue(e), this._vm.viewToModelUpdate(e);
            }, t.prototype.typed = function(t) {}, t.prototype.refreshValue = function(t) {
                this.value = t;
            }, r([ i.Input(), o("design:type", Object) ], t.prototype, "choices", void 0), r([ i.Input(), o("design:type", String) ], t.prototype, "textLabel", void 0), 
            r([ i.Input(), o("design:type", String) ], t.prototype, "boundValueAttr", void 0), 
            t = r([ i.Component({
                selector: "[bs-select], bs-select",
                directives: [ a.SELECT_DIRECTIVES ],
                template: c.htmlTemplate
            }), o("design:paramtypes", [ s.NgModel ]) ], t);
        }();
        e.BSSelect = l;
    },
    515: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n    \n    <ng-select \n        [allowClear]="false"\n        [items]="_items"\n        [initData]="value" \n        (data)="refreshValue($event)"\n        (selected)="selected($event)"\n        (removed)="removed($event)"\n        (typed)="typed($event)"\n        placeholder="">\n    </ng-select>\n    \n';
    },
    516: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(202), a = n(508), c = n(517), l = function() {
            function t(t) {
                this._selectedItems = [], this._items = [], this.value = [], this._vm = t, t.valueAccessor = this;
            }
            return t.prototype.ngOnInit = function() {
                if (this.choices) for (var t = 0; t < this.choices.length; t++) {
                    var e = {
                        id: this.choices[t].id,
                        text: this.choices[t][this.textLabel]
                    };
                    this._items.push(e);
                    var n = this.findById(this._selectedItems, e.id);
                    n && this.value.push(e);
                }
            }, t.prototype.writeValue = function(t) {
                this._selectedItems = t;
            }, t.prototype.registerOnChange = function(t) {
                this._onChange = t;
            }, t.prototype.registerOnTouched = function(t) {
                this._onTouched = t;
            }, t.prototype.selected = function(t) {
                var e = this.findById(this.choices, t.id);
                e && (this._selectedItems.push(e), this._vm.viewToModelUpdate(this._selectedItems));
            }, t.prototype.removed = function(t) {
                var e = this.findById(this._selectedItems, t.id);
                if (e) {
                    var n = this._selectedItems.indexOf(e);
                    this._selectedItems.splice(n, 1), this._vm.viewToModelUpdate(this._selectedItems);
                }
            }, t.prototype.typed = function(t) {}, t.prototype.refreshValue = function(t) {
                this.value = t;
            }, t.prototype.findById = function(t, e) {
                for (var n = 0; n < t.length; n++) if (t[n].id == e) return t[n];
                return null;
            }, r([ i.Input(), o("design:type", Object) ], t.prototype, "choices", void 0), r([ i.Input(), o("design:type", String) ], t.prototype, "textLabel", void 0), 
            r([ i.Input(), o("design:type", String) ], t.prototype, "addedClass", void 0), t = r([ i.Component({
                selector: "[bs-select-multiple], bs-select-multiple",
                directives: [ a.SELECT_DIRECTIVES ],
                template: c.htmlTemplate
            }), o("design:paramtypes", [ s.NgModel ]) ], t);
        }();
        e.BSSelectMultiple = l;
    },
    517: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n    \n    <ng-select \n        [allowClear]="false"\n        [multiple]="true"\n        [items]="_items"\n        [initData]="value" \n        (data)="refreshValue($event)"\n        (selected)="selected($event)"\n        (removed)="removed($event)"\n        (typed)="typed($event)"\n        placeholder="">\n    </ng-select>\n    \n';
    },
    518: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <hr/>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.title}">\n        <textarea class="form-control" [(ngModel)]="story.title" rows="2"></textarea>\n    </div>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.type}">\n        <label>Type</label>\n        <bs-select [(ngModel)]="story.type" [choices]="_types" [textLabel]="\'title\'"></bs-select>\n    </div>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.effort}">\n        <label>Effort</label>\n        <bs-select [(ngModel)]="story.effort" [choices]="_StoryService.effortChoices" [textLabel]="\'text\'" [boundValueAttr]="\'id\'"></bs-select>\n    </div>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.state}">\n        <label>State</label>\n        <bs-select [(ngModel)]="story.state" [choices]="_states" [textLabel]="\'title\'"></bs-select>\n    </div>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.description}">\n        <label>Description</label>\n        <textarea class="form-control" [(ngModel)]="story.description" rows="3"></textarea>\n    </div>\n    <div class="form-group" [ngClass]="{\'has-error\': story._validation_errors?.tags}">\n        <label>Tags</label>\n        <bs-select-multiple [(ngModel)]="story.tags" [choices]="_tags" [textLabel]="\'title\'"></bs-select-multiple>\n    </div>\n    <div [ngClass]="{\'has-error\': story._validation_errors?.tasks}">\n        <a class="pull-right" href="javascript:void(0);" (click)="addTask()">Add Task</a>\n        <label>Tasks </label>\n        <div class="form-group has-feedback" *ngFor="let task of story.tasks">\n            <i class="glyphicon glyphicon-ok form-control-feedback clickable" [ngClass]="{\'text-green\': task.completed, \'text-gray\': !task.completed}" (click)="task.completed = !task.completed"></i>\n            <input class="form-control" [(ngModel)]="task.description">\n        </div>\n    </div>\n    <button *ngIf="story.id" class="btn btn-flat" (click)="delete()">Delete</button>\n    <button class="btn btn-primary btn-flat pull-right" (click)="save()">Save</button>\n';
    },
    519: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(505), a = n(520), c = function() {
            function t() {
                this._opened = !1, this.toggle = function() {
                    this._opened = !this._opened;
                };
            }
            return r([ i.Input(), o("design:type", Object) ], t.prototype, "story", void 0), 
            t = r([ i.Component({
                selector: "[story-list-item]",
                template: a.htmlTemplate,
                directives: [ s.StoryDetailComponent ]
            }), o("design:paramtypes", []) ], t);
        }();
        e.StoryListItemComponent = c;
    },
    520: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <div class="tools">\n        <i class="fa fa-edit" (click)="toggle()"></i>\n    </div>\n    <span class="description">{{ story.title }}</span>\n    <div class="text text-muted" *ngIf="story.effort">Effort: {{ story.effort }}</div>\n    <div class="form" *ngIf="_opened" story-detail [story]="story"></div>\n    \n';
    },
    521: function(t, e) {
        "use strict";
        e.htmlTemplate = '\n\n    <div class="row">\n        <div class="col-sm-6">\n            <div class="box">\n                <div class="box-header with-border">\n                    <h3 class="box-title">Backlog</h3>\n                    <div class="box-tools pull-right">\n                        <a class="btn btn-box-tool" (click)="createNew(true)"><i class="fa fa-plus"></i></a>\n                    </div>\n                </div>\n                <div class="box-body box-comments" *ngIf="_newBacklogOpened" >\n                    <div class="box-comment" story-detail [story]="_newBacklogStory"></div>\n                </div>\n                <div class="box-body">\n                    <ul class="story-list" style="min-height: 50px;" [dragula]=\'"first-bag"\' [attr.data-list]="\'backlog\'">\n                        <li class="story-list-item handle" *ngFor="let story of _stories | filter : {icebox: false}" [attr.data-id]="story.id" story-list-item [story]="story"></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class="col-sm-6">\n            <div class="box">\n                <div class="box-header with-border">\n                    <h3 class="box-title">Icebox</h3>\n                    <div class="box-tools pull-right">\n                        <a class="btn btn-box-tool" (click)="createNew(false)"><i class="fa fa-plus"></i></a>\n                    </div>\n                </div>\n                <div class="box-body box-comments" *ngIf="_newIceboxOpened">\n                    <div class="box-comment" story-detail [story]="_newIceboxStory"></div>\n                </div>\n                <div class="box-body">\n                    <ul class="story-list" style="min-height: 50px;" [dragula]=\'"first-bag"\' [attr.data-list]="\'icebox\'">\n                        <li class="story-list-item handle" *ngFor="let story of _stories | filter : {icebox: true}" [attr.data-id]="story.id" story-list-item [story]="story"></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n\n';
    },
    522: function(t, e, n) {
        "use strict";
        function r(t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
        }
        var o = n(523), i = n(524);
        r(n(523)), r(n(524)), Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            directives: [ o.Dragula ],
            providers: [ i.DragulaService ]
        };
    },
    523: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(1), s = n(524), a = n(525), c = function() {
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
            }, r([ i.Input("dragula"), o("design:type", String) ], t.prototype, "bag", void 0), 
            r([ i.Input(), o("design:type", Object) ], t.prototype, "dragulaModel", void 0), 
            t = r([ i.Directive({
                selector: "[dragula]"
            }), o("design:paramtypes", [ i.ElementRef, s.DragulaService ]) ], t);
        }();
        e.Dragula = c;
    },
    524: function(t, e, n) {
        "use strict";
        var r = this && this.__decorate || function(t, e, n, r) {
            var o, i = arguments.length, s = 3 > i ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (3 > i ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
            return i > 3 && s && Object.defineProperty(e, n, s), s;
        }, o = this && this.__metadata || function(t, e) {
            return "object" == typeof Reflect && "function" == typeof Reflect.metadata ? Reflect.metadata(t, e) : void 0;
        }, i = n(525), s = n(1), a = function() {
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
                var n = this.add(t, i(e));
                this.handleModels(t, n.drake);
            }, t.prototype.handleModels = function(t, e) {
                var n, r, o, i, s = this;
                e.on("remove", function(n, o) {
                    e.models && (i = e.models[e.containers.indexOf(o)], i.splice(r, 1), s.removeModel.emit([ t, n, o ]));
                }), e.on("drag", function(t, e) {
                    n = t, r = s.domIndexOf(t, e);
                }), e.on("drop", function(a, c, l) {
                    if (e.models && c) {
                        if (o = s.domIndexOf(a, c), i = e.models[e.containers.indexOf(l)], c === l) i.splice(o, 0, i.splice(r, 1)[0]); else {
                            var u = n === a, d = e.models[e.containers.indexOf(c)], f = u ? i[r] : JSON.parse(JSON.stringify(i[r]));
                            u && i.splice(r, 1), d.splice(o, 0, f), c.removeChild(a);
                        }
                        s.dropModel.emit([ t, a, c, l ]);
                    }
                });
            }, t.prototype.setupEvents = function(t) {
                t.initEvents = !0;
                var e = this, n = function(n) {
                    function r() {
                        var r = Array.prototype.slice.call(arguments);
                        e[n].emit([ t.name ].concat(r));
                    }
                    t.drake.on(n, r);
                };
                this.events.forEach(n);
            }, t.prototype.domIndexOf = function(t, e) {
                return Array.prototype.indexOf.call(e.children, t);
            }, t = r([ s.Injectable(), o("design:paramtypes", []) ], t);
        }();
        e.DragulaService = a;
    },
    525: function(t, e, n) {
        (function(e) {
            "use strict";
            function r(t, e) {
                function n(t) {
                    return -1 !== ut.containers.indexOf(t) || lt.isContainer(t);
                }
                function r(t) {
                    var e = t ? "remove" : "add";
                    o(j, e, "mousedown", w), o(j, e, "mouseup", D);
                }
                function a(t) {
                    var e = t ? "remove" : "add";
                    o(j, e, "mousemove", R);
                }
                function v(t) {
                    var e = t ? "remove" : "add";
                    _[e](j, "selectstart", x), _[e](j, "click", x);
                }
                function m() {
                    r(!0), D({});
                }
                function x(t) {
                    at && t.preventDefault();
                }
                function w(t) {
                    et = t.clientX, nt = t.clientY;
                    var e = 1 !== i(t) || t.metaKey || t.ctrlKey;
                    if (!e) {
                        var n = t.target, r = T(n);
                        r && (at = r, a(), "mousedown" === t.type && (h(n) ? n.focus() : t.preventDefault()));
                    }
                }
                function R(t) {
                    if (at) {
                        if (0 === i(t)) return void D({});
                        if (void 0 === t.clientX || t.clientX !== et || void 0 === t.clientY || t.clientY !== nt) {
                            if (lt.ignoreInputTextSelection) {
                                var e = b("clientX", t), n = b("clientY", t), r = O.elementFromPoint(e, n);
                                if (h(r)) return;
                            }
                            var o = at;
                            a(!0), v(), P(), C(o);
                            var c = s(W);
                            Z = b("pageX", t) - c.left, tt = b("pageY", t) - c.top, S.add(it || W, "gu-transit"), 
                            Y(), U(t);
                        }
                    }
                }
                function T(t) {
                    if (!(ut.dragging && G || n(t))) {
                        for (var e = t; p(t) && n(p(t)) === !1; ) {
                            if (lt.invalid(t, e)) return;
                            if (t = p(t), !t) return;
                        }
                        var r = p(t);
                        if (r && !lt.invalid(t, e)) {
                            var o = lt.moves(t, r, e, y(t));
                            if (o) return {
                                item: t,
                                source: r
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
                    K(t.item, t.source) && (it = t.item.cloneNode(!0), ut.emit("cloned", it, t.item, "copy")), 
                    Q = t.source, W = t.item, rt = ot = y(t.item), ut.dragging = !0, ut.emit("drag", W, Q);
                }
                function k() {
                    return !1;
                }
                function P() {
                    if (ut.dragging) {
                        var t = it || W;
                        M(t, p(t));
                    }
                }
                function A() {
                    at = !1, a(!0), v(!0);
                }
                function D(t) {
                    if (A(), ut.dragging) {
                        var e = it || W, n = b("clientX", t), r = b("clientY", t), o = c(G, n, r), i = V(o, n, r);
                        i && (it && lt.copySortSource || !it || i !== Q) ? M(e, i) : lt.removeOnSpill ? N() : B();
                    }
                }
                function M(t, e) {
                    var n = p(t);
                    it && lt.copySortSource && e === Q && n.removeChild(W), L(e) ? ut.emit("cancel", t, Q, Q) : ut.emit("drop", t, e, Q, ot), 
                    $();
                }
                function N() {
                    if (ut.dragging) {
                        var t = it || W, e = p(t);
                        e && e.removeChild(t), ut.emit(it ? "cancel" : "remove", t, e, Q), $();
                    }
                }
                function B(t) {
                    if (ut.dragging) {
                        var e = arguments.length > 0 ? t : lt.revertOnSpill, n = it || W, r = p(n), o = L(r);
                        o === !1 && e && (it ? r.removeChild(it) : Q.insertBefore(n, rt)), o || e ? ut.emit("cancel", n, Q, Q) : ut.emit("drop", n, r, Q, ot), 
                        $();
                    }
                }
                function $() {
                    var t = it || W;
                    A(), H(), t && S.rm(t, "gu-transit"), st && clearTimeout(st), ut.dragging = !1, 
                    ct && ut.emit("out", t, ct, Q), ut.emit("dragend", t), Q = W = it = rt = ot = st = ct = null;
                }
                function L(t, e) {
                    var n;
                    return n = void 0 !== e ? e : G ? ot : y(it || W), t === Q && n === rt;
                }
                function V(t, e, r) {
                    function o() {
                        var o = n(i);
                        if (o === !1) return !1;
                        var s = J(i, t), a = q(i, s, e, r), c = L(i, a);
                        return c ? !0 : lt.accepts(W, i, Q, a);
                    }
                    for (var i = t; i && !o(); ) i = p(i);
                    return i;
                }
                function U(t) {
                    function e(t) {
                        ut.emit(t, l, ct, Q);
                    }
                    function n() {
                        f && e("over");
                    }
                    function r() {
                        ct && e("out");
                    }
                    if (G) {
                        t.preventDefault();
                        var o = b("clientX", t), i = b("clientY", t), s = o - Z, a = i - tt;
                        G.style.left = s + "px", G.style.top = a + "px";
                        var l = it || W, u = c(G, o, i), d = V(u, o, i), f = null !== d && d !== ct;
                        (f || null === d) && (r(), ct = d, n());
                        var h = p(l);
                        if (d === Q && it && !lt.copySortSource) return void (h && h.removeChild(l));
                        var v, m = J(d, u);
                        if (null !== m) v = q(d, m, o, i); else {
                            if (lt.revertOnSpill !== !0 || it) return void (it && h && h.removeChild(l));
                            v = rt, d = Q;
                        }
                        (null === v && f || v !== l && v !== y(l)) && (ot = v, d.insertBefore(l, v), ut.emit("shadow", l, d, Q));
                    }
                }
                function F(t) {
                    S.rm(t, "gu-hide");
                }
                function X(t) {
                    ut.dragging && S.add(t, "gu-hide");
                }
                function Y() {
                    if (!G) {
                        var t = W.getBoundingClientRect();
                        G = W.cloneNode(!0), G.style.width = d(t) + "px", G.style.height = f(t) + "px", 
                        S.rm(G, "gu-transit"), S.add(G, "gu-mirror"), lt.mirrorContainer.appendChild(G), 
                        o(j, "add", "mousemove", U), S.add(lt.mirrorContainer, "gu-unselectable"), ut.emit("cloned", G, W, "mirror");
                    }
                }
                function H() {
                    G && (S.rm(lt.mirrorContainer, "gu-unselectable"), o(j, "remove", "mousemove", U), 
                    p(G).removeChild(G), G = null);
                }
                function J(t, e) {
                    for (var n = e; n !== t && p(n) !== t; ) n = p(n);
                    return n === j ? null : n;
                }
                function q(t, e, n, r) {
                    function o() {
                        var e, o, i, s = t.children.length;
                        for (e = 0; s > e; e++) {
                            if (o = t.children[e], i = o.getBoundingClientRect(), a && i.left + i.width / 2 > n) return o;
                            if (!a && i.top + i.height / 2 > r) return o;
                        }
                        return null;
                    }
                    function i() {
                        var t = e.getBoundingClientRect();
                        return s(a ? n > t.left + d(t) / 2 : r > t.top + f(t) / 2);
                    }
                    function s(t) {
                        return t ? y(e) : e;
                    }
                    var a = "horizontal" === lt.direction, c = e !== t ? i() : o();
                    return c;
                }
                function K(t, e) {
                    return "boolean" == typeof lt.copy ? lt.copy : lt.copy(t, e);
                }
                var z = arguments.length;
                1 === z && Array.isArray(t) === !1 && (e = t, t = []);
                var G, Q, W, Z, tt, et, nt, rt, ot, it, st, at, ct = null, lt = e || {};
                void 0 === lt.moves && (lt.moves = u), void 0 === lt.accepts && (lt.accepts = u), 
                void 0 === lt.invalid && (lt.invalid = k), void 0 === lt.containers && (lt.containers = t || []), 
                void 0 === lt.isContainer && (lt.isContainer = l), void 0 === lt.copy && (lt.copy = !1), 
                void 0 === lt.copySortSource && (lt.copySortSource = !1), void 0 === lt.revertOnSpill && (lt.revertOnSpill = !1), 
                void 0 === lt.removeOnSpill && (lt.removeOnSpill = !1), void 0 === lt.direction && (lt.direction = "vertical"), 
                void 0 === lt.ignoreInputTextSelection && (lt.ignoreInputTextSelection = !0), void 0 === lt.mirrorContainer && (lt.mirrorContainer = O.body);
                var ut = g({
                    containers: lt.containers,
                    start: I,
                    end: P,
                    cancel: B,
                    remove: N,
                    destroy: m,
                    canMove: E,
                    dragging: !1
                });
                return lt.removeOnSpill === !0 && ut.on("over", F).on("out", X), r(), ut;
            }
            function o(t, n, r, o) {
                var i = {
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
                e.navigator.pointerEnabled ? _[n](t, s[r], o) : e.navigator.msPointerEnabled ? _[n](t, a[r], o) : (_[n](t, i[r], o), 
                _[n](t, r, o));
            }
            function i(t) {
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
                var r, o = t || {}, i = o.className;
                return o.className += " gu-hide", r = O.elementFromPoint(e, n), o.className = i, 
                r;
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
            function h(t) {
                return "INPUT" === t.tagName || "TEXTAREA" === t.tagName || "SELECT" === t.tagName || v(t);
            }
            function v(t) {
                return t ? "false" === t.contentEditable ? !1 : "true" === t.contentEditable ? !0 : v(p(t)) : !1;
            }
            function y(t) {
                function e() {
                    var e = t;
                    do e = e.nextSibling; while (e && 1 !== e.nodeType);
                    return e;
                }
                return t.nextElementSibling || e();
            }
            function m(t) {
                return t.targetTouches && t.targetTouches.length ? t.targetTouches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t;
            }
            function b(t, e) {
                var n = m(e), r = {
                    pageX: "clientX",
                    pageY: "clientY"
                };
                return t in r && !(t in n) && r[t] in n && (t = r[t]), n[t];
            }
            var g = n(526), _ = n(532), S = n(535), O = document, j = O.documentElement;
            t.exports = r;
        }).call(e, function() {
            return this;
        }());
    },
    526: function(t, e, n) {
        "use strict";
        var r = n(527), o = n(528);
        t.exports = function i(t, e) {
            var n = e || {}, i = {};
            return void 0 === t && (t = {}), t.on = function(e, n) {
                return i[e] ? i[e].push(n) : i[e] = [ n ], t;
            }, t.once = function(e, n) {
                return n._once = !0, t.on(e, n), t;
            }, t.off = function(e, n) {
                var r = arguments.length;
                if (1 === r) delete i[e]; else if (0 === r) i = {}; else {
                    var o = i[e];
                    if (!o) return t;
                    o.splice(o.indexOf(n), 1);
                }
                return t;
            }, t.emit = function() {
                var e = r(arguments);
                return t.emitterSnapshot(e.shift()).apply(this, e);
            }, t.emitterSnapshot = function(e) {
                var s = (i[e] || []).slice(0);
                return function() {
                    var i = r(arguments), a = this || t;
                    if ("error" === e && n.throws !== !1 && !s.length) throw 1 === i.length ? i[0] : i;
                    return s.forEach(function c(r) {
                        n.async ? o(r, i, a) : r.apply(a, i), r._once && t.off(e, r);
                    }), t;
                };
            }, t;
        };
    },
    527: function(t, e) {
        t.exports = function n(t, e) {
            return Array.prototype.slice.call(t, e);
        };
    },
    528: function(t, e, n) {
        "use strict";
        var r = n(529);
        t.exports = function o(t, e, n) {
            t && r(function o() {
                t.apply(n || null, e || []);
            });
        };
    },
    529: function(t, e, n) {
        (function(e) {
            var n, r = "function" == typeof e;
            n = r ? function(t) {
                e(t);
            } : function(t) {
                setTimeout(t, 0);
            }, t.exports = n;
        }).call(e, n(530).setImmediate);
    },
    530: function(t, e, n) {
        (function(t, r) {
            function o(t, e) {
                this._id = t, this._clearFn = e;
            }
            var i = n(531).nextTick, s = Function.prototype.apply, a = Array.prototype.slice, c = {}, l = 0;
            e.setTimeout = function() {
                return new o(s.call(setTimeout, window, arguments), clearTimeout);
            }, e.setInterval = function() {
                return new o(s.call(setInterval, window, arguments), clearInterval);
            }, e.clearTimeout = e.clearInterval = function(t) {
                t.close();
            }, o.prototype.unref = o.prototype.ref = function() {}, o.prototype.close = function() {
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
                var n = l++, r = arguments.length < 2 ? !1 : a.call(arguments, 1);
                return c[n] = !0, i(function o() {
                    c[n] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(n));
                }), n;
            }, e.clearImmediate = "function" == typeof r ? r : function(t) {
                delete c[t];
            };
        }).call(e, n(530).setImmediate, n(530).clearImmediate);
    },
    532: function(t, e, n) {
        (function(e) {
            "use strict";
            function r(t, e, n, r) {
                return t.addEventListener(e, n, r);
            }
            function o(t, e, n) {
                return t.attachEvent("on" + e, l(t, e, n));
            }
            function i(t, e, n, r) {
                return t.removeEventListener(e, n, r);
            }
            function s(t, e, n) {
                var r = u(t, e, n);
                return r ? t.detachEvent("on" + e, r) : void 0;
            }
            function a(t, e, n) {
                function r() {
                    var t;
                    return h.createEvent ? (t = h.createEvent("Event"), t.initEvent(e, !0, !0)) : h.createEventObject && (t = h.createEventObject()), 
                    t;
                }
                function o() {
                    return new f(e, {
                        detail: n
                    });
                }
                var i = -1 === p.indexOf(e) ? o() : r();
                t.dispatchEvent ? t.dispatchEvent(i) : t.fireEvent("on" + e, i);
            }
            function c(t, n, r) {
                return function o(n) {
                    var o = n || e.event;
                    o.target = o.target || o.srcElement, o.preventDefault = o.preventDefault || function i() {
                        o.returnValue = !1;
                    }, o.stopPropagation = o.stopPropagation || function s() {
                        o.cancelBubble = !0;
                    }, o.which = o.which || o.keyCode, r.call(t, o);
                };
            }
            function l(t, e, n) {
                var r = u(t, e, n) || c(t, e, n);
                return m.push({
                    wrapper: r,
                    element: t,
                    type: e,
                    fn: n
                }), r;
            }
            function u(t, e, n) {
                var r = d(t, e, n);
                if (r) {
                    var o = m[r].wrapper;
                    return m.splice(r, 1), o;
                }
            }
            function d(t, e, n) {
                var r, o;
                for (r = 0; r < m.length; r++) if (o = m[r], o.element === t && o.type === e && o.fn === n) return r;
            }
            var f = n(533), p = n(534), h = e.document, v = r, y = i, m = [];
            e.addEventListener || (v = o, y = s), t.exports = {
                add: v,
                remove: y,
                fabricate: a
            };
        }).call(e, function() {
            return this;
        }());
    },
    533: function(t, e) {
        (function(e) {
            function n() {
                try {
                    var t = new r("cat", {
                        detail: {
                            foo: "bar"
                        }
                    });
                    return "cat" === t.type && "bar" === t.detail.foo;
                } catch (e) {}
                return !1;
            }
            var r = e.CustomEvent;
            t.exports = n() ? r : "function" == typeof document.createEvent ? function o(t, e) {
                var n = document.createEvent("CustomEvent");
                return e ? n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail) : n.initCustomEvent(t, !1, !1, void 0), 
                n;
            } : function i(t, e) {
                var n = document.createEventObject();
                return n.type = t, e ? (n.bubbles = Boolean(e.bubbles), n.cancelable = Boolean(e.cancelable), 
                n.detail = e.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n;
            };
        }).call(e, function() {
            return this;
        }());
    },
    534: function(t, e) {
        (function(e) {
            "use strict";
            var n = [], r = "", o = /^on/;
            for (r in e) o.test(r) && n.push(r.slice(2));
            t.exports = n;
        }).call(e, function() {
            return this;
        }());
    },
    535: function(t, e) {
        "use strict";
        function n(t) {
            var e = i[t];
            return e ? e.lastIndex = 0 : i[t] = e = new RegExp(s + t + a, "g"), e;
        }
        function r(t, e) {
            var r = t.className;
            r.length ? n(e).test(r) || (t.className += " " + e) : t.className = e;
        }
        function o(t, e) {
            t.className = t.className.replace(n(e), " ").trim();
        }
        var i = {}, s = "(?:^|\\s)", a = "(?:\\s|$)";
        t.exports = {
            add: r,
            rm: o
        };
    }
});