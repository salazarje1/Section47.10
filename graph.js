class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex); 
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.nodes.add(node); 
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1); 
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1); 
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(node => {
      node.adjacent.delete(vertex); 
    })
    this.nodes.delete(vertex); 
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, visitedStack=new Set()) {
    visitedStack.add(start.value);
    for(let neighbor of start.adjacent){
      if(!visitedStack.has(neighbor.value)){
        visitedStack.add(neighbor.value);
        this.depthFirstSearch(neighbor, visitedStack); 
      }
    }
    return Array.from(visitedStack); 
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let VisitedQueue = [start];
    let seen = new Set(); 
    while(VisitedQueue.length){
      let currPerson = VisitedQueue.shift(); 

      seen.add(currPerson.value); 

      for(let neighbor of currPerson.adjacent){
        if(!seen.has(neighbor.value)){
          VisitedQueue.push(neighbor);
          seen.add(neighbor.value); 
        }
      }
    }
    return Array.from(seen);  
  }
}

module.exports = {Graph, Node}