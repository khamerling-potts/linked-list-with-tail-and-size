class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.size = 0;
    this.tail = null;
    this.iterate((node) => {
      this.tail = node;
      this.size++;
    });
  }

  iterate(callback) {
    let count = 0;
    let temp = this.head;

    while (temp !== null) {
      const result = callback(temp, count);

      if (result === true) {
        return temp;
      }

      ++count;
      temp = temp.next;
    }

    return this.head;
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate((node) => console.log(node.value));
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let result = null;

    this.iterate((node) => {
      if (node.value === target) {
        result = node;

        return true;
      }
    });

    return result;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head;
    this.head = node;
    if (!node.next) this.tail = node;
    this.size++;
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    if (this.head === null) {
      this.addFirst(node);
      return;
    }

    this.tail.next = node;
    this.tail = node;
    this.size++;

    // this.iterate((currNode) => {
    //   if (currNode.next === null) {
    //     currNode.next = node;
    //     return true;
    //   }
    // });
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    const oldHead = this.head;

    if (oldHead !== null) {
      this.head = oldHead.next;
      this.size--;
    }

    if (this.size === 0) this.tail = null;

    return oldHead;
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if (this.head === null || this.head.next === null) {
      return this.removeFirst();
    }

    let oldTail = this.tail;

    this.iterate((node) => {
      if (node.next.next === null) {
        //oldTail = node.next;
        node.next = null;
        this.tail = node;
        return true;
      }
    });

    this.size--;

    return oldTail;
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
      return node;
    }

    if (idx === this.size - 1) this.tail = node;

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        node.next = currNode.next.next;
        currNode.next = node;

        return true;
      }
    });

    return node;
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node);
      return;
    }

    if (idx >= this.size - 1) {
      this.addLast(node);
      return;
    }
    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        const oldNext = currNode.next;
        currNode.next = node;
        node.next = oldNext;
        this.size++;
        return true;
      }
    });
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst();
    }

    if (idx >= this.size - 1) {
      return this.removeLast();
    }

    let oldNode = null;

    this.iterate((node, count) => {
      if (count === idx - 1) {
        oldNode = node.next;
        node.next = node.next.next;
        this.size--;
        return true;
      }
    });

    return oldNode;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

if (require.main === module) {
  let head = new Node(
    "one",
    new Node("two", new Node("three", new Node("four")))
  );
  let list = new LinkedList(head);
  let emptyList = new LinkedList();
  let oneItemList = new LinkedList(new Node("just one"));
}

module.exports = {
  Node,
  LinkedList,
};
