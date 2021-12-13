const fs = require('fs');

// create a graph class
class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }

    printGraph() {
        let get_keys = this.AdjList.keys();

        for (let i of get_keys) {
            let get_values = this.AdjList.get(i);
            let conc = "";

            for (let j of get_values) {
                conc += j + " ";
            }

            console.log(i + " -> " + conc);
        }
    }

    isSmallCave(node) {
        return /[a-z]/.test(node);
    }

    dfs(node, visited, paths) {
        visited.push(node);
        if (node === "end") {
            paths.push(visited.join`,`);
            return;
        }

        let adjNodes = this.AdjList.get(node);

        for (let i in adjNodes) {
            let neighbour = adjNodes[i];
            if (this.isSmallCave(neighbour) && visited.includes(neighbour)) {
                continue;
            }
            this.dfs(neighbour, visited.slice(), paths);
        }
    }

    dfsTwice(node, visited, visitedTwice, paths) {
        visited.push(node);
        if (node === "end") {
            paths.push(visited.join`,`);
            return;
        }

        let adjNodes = this.AdjList.get(node);

        for (let i in adjNodes) {
            let neighbour = adjNodes[i];
            if (neighbour === "start") {
                continue;
            }
            if (this.isSmallCave(neighbour) && visited.includes(neighbour)) {
                if (visitedTwice) {
                    continue;
                }
                if (visited.filter((x) => x === neighbour).length >= 2) {
                    continue;
                }
                this.dfsTwice(neighbour, visited.slice(), true, paths);
            } else {
                this.dfsTwice(neighbour, visited.slice(), visitedTwice, paths);
            }

        }
    }
}

let nodeSet = new Set();
let edges = [];
fs.readFileSync("input.txt").toString().split("\n").forEach(line => {
    let [from, to] = line.split('-');
    nodeSet.add(from);
    nodeSet.add(to);
    edges.push([from, to]);
})

let input = new Graph(nodeSet.size);
for (let node of nodeSet) input.addVertex(node);
edges.forEach(edge => input.addEdge(edge[0], edge[1]));
input.printGraph();





const visitCaves = function (input) {
    let paths = [];
    input.dfs("start", [], paths);
    return paths.length;
}

const visitCavesTwice = function (input) {
    let paths = [];
    input.dfsTwice("start", [], false, paths);
    return paths.length;
}

console.log("1*", visitCaves(input));
console.log("2*", visitCavesTwice(input));