var Game = /** @class */ (function () {
    function Game(root) {
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        var _this = this;
        this.root = root;
        setInterval(function () {
            _this.wood += _this.population;
        }, 1000);
        for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
            var type = types_1[_a];
            this.addType(type);
        }
    }
    Object.defineProperty(Game.prototype, "board", {
        get: function () {
            return this.root.querySelector(".board");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "population", {
        get: function () {
            return Number(this.root.querySelector(".population").innerHTML) || 0;
        },
        set: function (n) {
            this.root.querySelector(".population").innerHTML = String(n);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "wood", {
        get: function () {
            return Number(this.root.querySelector(".wood").innerHTML) || 0;
        },
        set: function (n) {
            this.root.querySelector(".wood").innerHTML = String(n);
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.addType = function (btype) {
        var _this = this;
        var btn = btype.button();
        this.root.querySelector(".buttons").appendChild(btn);
        btn.addEventListener("click", function () {
            btype.addTo(_this);
        });
    };
    return Game;
}());
var BuildingType = /** @class */ (function () {
    function BuildingType(name, cap, cost, max) {
        this.name = name;
        this.capacity = cap;
        this.cost = cost;
        if (max !== undefined) {
            this.max = max;
        }
        else {
            this.max = Infinity;
        }
    }
    BuildingType.prototype.count = function (game) {
        return game.board.getElementsByClassName(this.className).length;
    };
    Object.defineProperty(BuildingType.prototype, "className", {
        get: function () {
            return this.name.replace(/\s/g, "-");
        },
        enumerable: true,
        configurable: true
    });
    BuildingType.prototype.button = function () {
        var btn = document.createElement("button");
        var self = this;
        var name = this.name;
        var self = this;
        name = name.replace(/-/g, " ");
        btn.innerText = "Build " + name;
        btn.title = "-" + this.cost;
        return btn;
    };
    BuildingType.prototype.create = function () {
        var e = document.createElement("div");
        e.classList.add("building");
        e.classList.add(this.className);
        e.innerHTML = this.name[0];
        e.title = String(this.capacity);
        return e;
    };
    BuildingType.prototype.addTo = function (game) {
        if (game.wood < this.cost || this.count(game) >= this.max) {
            return;
        }
        game.board.appendChild(this.create());
        game.population += this.capacity;
        game.wood -= this.cost;
    };
    return BuildingType;
}());
var hut = new BuildingType("Hut", 1, 30);
var town = new BuildingType("Town Center", 4, 200, 1);
window.addEventListener("load", function () {
    var game = new Game(document.body, hut, town);
    game.wood = 30;
    hut.addTo(game);
});
console.log("Hello");
