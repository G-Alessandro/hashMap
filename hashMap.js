class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = Array(initialCapacity)
      .fill(null)
      .map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [storedKey, value] of bucket) {
      if (storedKey === key) {
        return value;
      }
    }

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [key, _] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [_, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        entries.push(pair);
      }
    }
    return entries;
  }
}

const hashMap = new HashMap(0.75, 16);

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");

console.log(hashMap.get("apple")); // red
console.log(hashMap.has("banana")); // true
console.log(hashMap.length()); // 5

hashMap.set("apple", "green");
console.log(hashMap.get("apple")); // green
hashMap.remove("carrot");
console.log(hashMap.get("carrot")); // null

console.log(hashMap.keys()); // [ 'elephant', 'banana', 'apple', 'dog' ]
console.log(hashMap.values()); // [ 'gray', 'yellow', 'green', 'brown' ]
console.log(hashMap.entries()); // [[ 'elephant', 'gray' ],[ 'banana', 'yellow' ],[ 'apple', 'green' ], [ 'dog', 'brown' ]]

hashMap.clear();
console.log(hashMap.length()); // 0
