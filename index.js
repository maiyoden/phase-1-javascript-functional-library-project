// Collection Functions (Arrays or Objects)

// myEach
function myEach(collection, callback) {
    const isArray = Array.isArray(collection);
    const keys = isArray ? collection : Object.keys(collection);
    
    for (let i = 0; i < keys.length; i++) {
        const key = isArray ? i : keys[i];
        const result = callback(collection[key], key, collection);
        if (result === false) break; // Exit early if callback returns false
    }
    
    return collection; // Return the original collection
}

// myMap
function myMap(collection, callback) {
    const result = [];
    myEach(collection, function(value, key) {
        result.push(callback(value, key, collection));
    });
    return result; // Return the new array
}

// myReduce
function myReduce(collection, callback, acc) {
    const isArray = Array.isArray(collection);
    const keys = isArray ? collection : Object.keys(collection);
    let startIndex = 0;

    // If no initial accumulator is provided, use the first element
    if (acc === undefined) {
        const firstKey = isArray ? 0 : keys[0];
        acc = collection[firstKey];
        startIndex = isArray ? 1 : 1; // Start from the second element/key
    }

    for (let i = startIndex; i < keys.length; i++) {
        const key = isArray ? i : keys[i];
        acc = callback(acc, collection[key], collection);
    }

    return acc; // Return the accumulated value
}

// myFind
function myFind(collection, predicate) {
    let result;
    myEach(collection, function(value, key) {
        if (predicate(value, key, collection)) {
            result = value;
            return false; // Exit early
        }
    });
    return result; // Return the found value or undefined
}

// myFilter
function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, function(value, key) {
        if (predicate(value, key, collection)) {
            result.push(value);
        }
    });
    return result; // Return the array of filtered values
}

// mySize
function mySize(collection) {
    return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
}

// Array Functions

// myFirst
function myFirst(array, n) {
    if (n === undefined) {
        return array[0]; // Return the first element
    }
    return array.slice(0, n); // Return the first n elements
}

// myLast
function myLast(array, n) {
    if (n === undefined) {
        return array[array.length - 1]; // Return the last element
    }
    return array.slice(-n); // Return the last n elements
}

// BONUS: mySortBy
function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const aValue = callback(a);
        const bValue = callback(b);
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
    });
}

// BONUS: myFlatten
function myFlatten(array, shallow = false, newArr = []) {
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            if (shallow) {
                newArr.push(...array[i]);
            } else {
                myFlatten(array[i], shallow, newArr);
            }
        } else {
            newArr.push(array[i]);
        }
    }
    return newArr;
}

// Object Functions

// myKeys
function myKeys(object) {
    return Object.keys(object); // Return the keys of the object
}

// myValues
function myValues(object) {
    return Object.values(object); // Return the values of the object
}