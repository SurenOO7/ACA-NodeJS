class myNode{
    constructor(value){
        this.prev = null;
        this.content = value;
        this.next = null
    }
}

class List {
    head = null;
    tail = null;
    push = (value) => {
        let node = new myNode(value);
        if ( this.head === null){
            this.head = node;
            this.tail = node
        }
        else{
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node
        }
    }
    unshift = (value) => {
        let node = new myNode(value);
        if ( this.head === null){
            this.head = node;
            this.tail = node
        }
        else{
            node.next = this.head
            this.head.prev = node
            this.head = node;
        }
    }
    pop = () => {
        const value = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return value
    }
    shift = () => {
        const value = this.head
        this.head = this.head.next;
        this.head.prev = null;
        return value
    }
    count = () =>{
        let quantity = 0;
        let counting = (value = this.head) => {
            quantity++
            if(value.next !== null || undefined){
                counting(value.next)
            }
            else{
                return
            }
        }
        counting()
        return quantity
    }
    delete = (value, node=this.head) =>{
        if(node.content === value){
            if(node.prev){
                node.prev.next=node.next 
            }
            else{
                this.shift(this.head)
            }
            if(node.next){
                node.next.prev=node.prev
            }
            else{
                this.pop(this.tail)
            }

            return
        }
        else{
            this.delete(value, node.next)
        }

        return
    }
}

let obj = new List()
obj.push("Prototype")
obj.push("123")
obj.push(124)
obj.push(222)
obj.push(33)
obj.push(44)
obj.push(55)
obj.push("Prototype")

// ----------------------------unshift----------------------------------
// obj.unshift("Vazgen")

// ----------------------------shift----------------------------------
// console.log(obj.shift())

// ----------------------------pop----------------------------------
// console.log(obj.pop())

// ----------------------------count----------------------------------
// console.log(obj.count())

// ----------------------------delete----------------------------------
// obj.delete("Prototype")


console.log(obj)






