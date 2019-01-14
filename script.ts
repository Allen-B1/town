class Game {
	root: HTMLElement;
	get board(): HTMLElement {
		return this.root.querySelector(".board");
	}
  
  constructor(root: HTMLElement, ...types: BuildingType[]) {  
  	this.root = root
    
		setInterval(() => {
    	this.wood += this.population;
    }, 1000)
    
    for (let type of types) {
        this.addType(type)
    }
  }
  
  get population() : number {
  	return Number(this.root.querySelector(".population").innerHTML) || 0
  }
  
  set population(n: number) {
  	this.root.querySelector(".population").innerHTML = String(n)
  }

    get wood() : number {
  	return Number(this.root.querySelector(".wood").innerHTML) || 0
  }
  
  set wood(n: number) {
	  this.root.querySelector(".wood").innerHTML = String(n)
  }

  addType(btype: BuildingType) : void {
  	    var btn = btype.button();
      this.root.querySelector(".buttons").appendChild(btn);
      btn.addEventListener("click", () => {
          btype.addTo(this);
      })
    
	}
}

class BuildingType {
	name: string; /* classname */
    capacity: number;
    cost: number;
    max: number;
  count(game: Game): number {
		return game.board.getElementsByClassName(this.className).length;
  }
	
	get className() : string {
		return this.name.replace(/\s/g, "-")
	}
  
  button() : HTMLElement {
    	var btn = document.createElement("button")
      var self = this
			var name = this.name
      var self = this
      name = name.replace(/-/g, " ")
			btn.innerText = "Build " + name
      btn.title = "-" + this.cost
			return btn
  }
  
  create () : HTMLElement {
    	var e = document.createElement("div")
      e.classList.add("building")
      e.classList.add(this.className)
      e.innerHTML = this.name[0]
      e.title = String(this.capacity)
      return e
  }
  
  addTo (game: Game) {
    if (game.wood < this.cost || this.count(game) >= this.max) {
      	return
    }
   	game.board.appendChild(this.create())
    game.population += this.capacity
    game.wood -= this.cost
  }
  
	constructor(name: string, cap: number, cost: number, max?: number) {
        this.name = name;
        this.capacity = cap;
        this.cost = cost;
        if (max !== undefined) {
            this.max = max;
        } else {
            this.max = Infinity;
        }
 	}
}

const hut = new BuildingType("Hut", 1, 30);
const town = new BuildingType("Town Center", 4, 200, 1);

window.addEventListener("load", () => {
    var game = new Game(document.body, hut, town);
    game.wood = 30;
    hut.addTo(game);
})

console.log("Hello")
