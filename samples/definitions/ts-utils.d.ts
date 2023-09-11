/**
 * Appends the `elms` to the `target` where the elms may be an array, a single object
 * or an iterator object
 * @group Array
 * @group Iterator
 * @example
 * ```ts
 * let theArray = arrAppend([], 1);
 * arrAppend(theArray, [ 2, 3, 4 ]);
 * arrAppend(theArray, [ "a", "b", "c" ]);
 * // theArray is now [ 1, 2, 3, 4, "a", "b", "c" ]
 * ```
 * @param target - The target array
 * @param elms - The item, array of items an iterable or iterator object of items to add to the target
 * @returns The passed in target array
 * @example
 * ```ts
 * // Adding a single value
 * arrAppend([], undefined);            // []
 * arrAppend([], 0);                    // [ 0 ]
 * arrAppend([1], undefined);           // [ 1 ]
 * arrAppend([1], 2);                   // [ 1, 2 ]
 *
 * // Adding an array
 * arrAppend([], [] as number[]);       // []
 * arrAppend([], [0]);                  // [ 0 ]
 * arrAppend([1], []);                  // [ 1 ]
 * arrAppend([1], [2]);                 // [ 1, 2 ]
 *
 * // Adding with an iterator
 * arrAppend([], ([] as number[]).values());    // []
 * arrAppend([], [0].values());         // [ 0 ]
 * arrAppend([1], [].keys());           // [ 1 ]
 * arrAppend([1], [2].values());        // [ 1, 2 ]
 * arrAppend([1], [2].keys());          // [ 1, 0 ] - 0 is from the index from the first element
 * ```
 */
export declare function arrAppend<T>(target: T[], elms: T | T[] | Iterator<T>): T[];

/**
 * Deep copy handler to identify and copy arrays.
 * @since 0.4.4
 * @group Object - Deep Copy
 * @param details - The details object for the current property being copied
 * @returns `true` if the current value is a function otherwise `false`
 */
export declare function arrayDeepCopyHandler(details: IObjDeepCopyHandlerDetails): boolean;

/**
 * The arrContains() method determines whether an array contains a certain value among its
 * entries, returning true or false as appropriate.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @param theArray - The array or array like object of elements to be searched.
 * @param searchElement - The value to search for
 * @param fromIndex - The optional Zero-based index at which to start searching, converted to an integer.
 * - Negative index counts back from the end of the array — if fromIndex < 0, fromIndex + array.length
 * is used. However, the array is still searched from front to back in this case.
 * - If fromIndex < -array.length or fromIndex is omitted, 0 is used, causing the entire array to be searched.
 * - If fromIndex >= array.length, the array is not searched and false is returned.
 * @returns A boolean value which is true if the value searchElement is found within the array (or the part of
 * the array indicated by the index fromIndex, if specified).
 * @example
 * ```ts
 * arrContains([1, 2, 3], 2);       // true
 * arrContains([1, 2, 3], 4);       // false
 * arrContains([1, 2, 3], 3, 3);    // false
 * arrContains([1, 2, 3], 3, -1);   // true
 * arrContains([1, 2, NaN], NaN);   // true
 * arrContains(["1", "2", "3"], 3 as any); // false
 *
 * // Array Like
 * arrContains({ length: 3, 0: 1, 1: 2, 2: 3 }, 2);       // true
 * arrContains({ length: 3, 0: 1, 1: 2, 2: 3 }, 4);       // false
 * arrContains({ length: 3, 0: 1, 1: 2, 2: 3 }, 3, 3);    // false
 * arrContains({ length: 3, 0: 1, 1: 2, 2: 3 }, 3, -1);   // true
 * arrContains({ length: 3, 0: 1, 1: 2, 2: NaN }, NaN);   // true
 * arrContains({ length: 3, 0: "1", 1: "2", 2: "3" }, 3 as any); // false
 * ```
 */
export declare const arrContains: <T>(theArray: ArrayLike<T>, searchElement: T, fromIndex?: number) => boolean;

/**
 * The arrEvery() method is an iterative method. It calls a provided callbackFn function once for
 * each element in an array, until the callbackFn returns a falsy value. If such an element is found,
 * arrEvery() immediately returns false and stops iterating through the array. Otherwise, if callbackFn
 * returns a truthy value for all elements, every() returns true.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return `true` if the callbackFn returns a `truthy` value for every array elements. Otherwise `false`.
 * @example
 * ```ts
 * function isBigEnough<T>(element: T, index: number, array: T[]) {
 *   return element >= 10;
 * }
 *
 * arrEvery([12, 5, 8, 130, 44], isBigEnough);   // false
 * arrEvery([12, 54, 18, 130, 44], isBigEnough); // true
 *
 * const isSubset = <T>(array1: T[], array2: T[]) => arrEvery(array2, (element) => arrIncludes(array1, element));
 *
 * isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6]);  // true
 * isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7]);  // false
 *
 * arrEvery([1, , 3], (x) => x !== undefined);  // true
 * arrEvery([2, , 2], (x) => x === 2);          // true
 *
 * // Array Like combinations
 * isSubset([1, 2, 3, 4, 5, 6, 7], { length: 3, 0: 5, 1: 7, 2: 6}); // true
 * isSubset([1, 2, 3, 4, 5, 6, 7], { length: 3, 0: 5, 1: 8, 2: 7}); // false
 *
 * isSubset({ length: 7, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 }, [ 5, 7, 6 ]); // true
 * isSubset({ length: 7, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 }, [5, 8, 7]); // false
 *
 * isSubset({ length: 7, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 }, { length: 3, 0: 5, 1: 7, 2: 6}); // true
 * isSubset({ length: 7, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7 }, { length: 3, 0: 5, 1: 8, 2: 7}); // false
 * ```
 */
export declare const arrEvery: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => theArray is T[];

/**
 * The arrFilter() method creates a shallow copy of a portion of a given array, filtered down to just the elements
 * from the given array that pass the test implemented by the provided function.
 *
 * The filter() method is an iterative method. It calls a provided callbackFn function once for each element in an
 * array, and constructs a new array of all the values for which callbackFn returns a truthy value. Array elements
 * which do not pass the callbackFn test are not included in the new array.
 *
 * `callbackFn` is invoked only for array indexes which have assigned values. It is not invoked for empty slots in
 * sparse arrays.
 *
 * The arrFilter() method is a copying method. It does not alter this but instead returns a shallow copy that contains
 * the same elements as the ones from the original array (with some filtered out). However, the function provided as
 * callbackFn can mutate the array. Note, however, that the length of the array is saved before the first invocation
 * of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrFilter()
 * began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by callbackFn, its value passed to the `callbackFn`
 * will be the value at the time that element gets visited. Deleted elements are not visited.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of the elements.
 * @typeParam E - Identifies a more specific instance of the base array type.
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return A shallow copy of a portion of the given array, filtered down to just the elements from the given
 * array that pass the test implemented by the provided function. If no elements pass the test, an empty array
 * will be returned.
 * @example
 * ```ts
 * function isBigEnough<T>(value: T) {
 *   return value >= 10;
 * }
 *
 * const filtered = arrFilter([12, 5, 8, 130, 44], isBigEnough);
 * // filtered is [12, 130, 44]
 *
 * const arrayLikeFiltered = arrFilter({ length: 5, 0: 12, 1: 5, 2: 8, 3: 130, 4: 44}, isBigEnough);
 * // arrayLikeFiltered is [12, 130, 44]
 *
 * const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
 *
 * function isPrime(num) {
 *   for (let i = 2; num > i; i++) {
 *     if (num % i === 0) {
 *       return false;
 *     }
 *   }
 *   return num > 1;
 * }
 *
 * console.log(arrFilter(array, isPrime)); // [2, 3, 5, 7, 11, 13]
 * ```
 */
export declare const arrFilter: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => T[] | E[];

/**
 * The arrFind() method returns the first element in the provided array that satisfies
 * the provided testing function. If no values satisfy the testing function, undefined
 * is returned.
 * - If you need the index of the found element in the array, use {@link arrFindIndex}.
 * - If you need to find the index of a value, use arrIndexOf(). (It's similar to {@link arrFindIndex}, but
 * checks each element for equality with the value instead of using a testing function.)
 * - If you need to find if a value exists in an array, use {@link arrIncludes}. Again, it checks each element for
 * equality with the value instead of using a testing function.
 * - If you need to find if any element satisfies the provided testing function, use {@link arrSome}.
 *
 * The arrFind() method is an iterative method. It calls a provided `callbackFn` function once for each element
 * in an array in ascending-index order, until `callbackFn` returns a truthy value. arrFind() then returns that
 * element and stops iterating through the array. If callbackFn never returns a truthy value, arrFind() returns
 * undefined.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in
 * sparse arrays behave the same as undefined.
 *
 * arrFind() does not mutate the array on which it is called, but the function provided as callbackFn can.
 * Note, however, that the length of the array is saved before the first invocation of `callbackFn`. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrFind() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by callbackFn, its value passed to the
 * `callbackFn` will be the value at the time that element gets visited. Deleted elements are visited as if they
 * were undefined.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The first element in the array that satisfies the provided testing function. Otherwise, undefined
 * is returned.
 * @example
 * ```ts
 * const inventory = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 },
 * ];
 *
 * function isCherries(fruit) {
 *   return fruit.name === "cherries";
 * }
 *
 * console.log(arrFind(inventory, isCherries));
 * // { name: 'cherries', quantity: 5 }
 *
 * function isPrime(element, index, array) {
 *   let start = 2;
 *   while (start <= Math.sqrt(element)) {
 *     if (element % start++ < 1) {
 *       return false;
 *     }
 *   }
 *   return element > 1;
 * }
 *
 * console.log(arrFind([4, 6, 8, 12], isPrime)); // undefined, not found
 * console.log(arrFind([4, 5, 8, 12], isPrime)); // 5
 *
 * // Array Like
 * console.log(arrFind({ length: 4, 0: 4, 1: 6, 2: 8, 3: 12 }, isPrime)); // undefined, not found
 * console.log(arrFind({ length: 4:, 0: 4, 1: 5, 2: 8, 3: 12 }, isPrime)); // 5
 * ```
 */
export declare const arrFind: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => T | E;

/**
 * The arrFindIndex() method returns the index of the first element in an array that satisfies the provided testing
 * function. If no elements satisfy the testing function, -1 is returned.
 *
 * The arrFindIndex() is an iterative method. It calls a provided callbackFn function once for each element in an
 * array in ascending-index order, until callbackFn returns a truthy value. arrFindIndex() then returns the index
 * of that element and stops iterating through the array. If `callbackFn` never returns a truthy value, arrFindIndex()
 * returns -1.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse
 * arrays behave the same as undefined.
 *
 * arrFindIndex() does not mutate the array on which it is called, but the function provided as `callbackFn` can.
 * Note, however, that the length of the array is saved before the first invocation of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrFindIndex() began.
 * - Changes to already-visited indexes do not cause `callbackFn` to be invoked on them again.
 * If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the `callbackFn`
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The index of the first element in the array that passes the test. Otherwise, -1.
 * @example
 * ```ts
 * const inventory: Array<{ name: string, quantity: number}> = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 }
 * ];
 *
 * function isCherries(fruit: { name: string, quantity: number}) {
 *   return fruit.name === "cherries";
 *  }
 *
 * arrFindIndex(inventory, isCherries); // 2
 *
 * function isPrime(element: number) {
 *   if (element % 2 === 0 || element < 2) {
 *     return false;
 *   }
 *
 *   for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
 *     if (element % factor === 0) {
 *       return false;
 *     }
 *   }
 *   return true;
 * }
 *
 * arrFindIndex([4, 6, 8, 9, 12], isPrime) // -1
 * arrFindIndex([4, 6, 7, 9, 12], isPrime) // 2
 *
 * // Array Like
 * arrFindIndex({ length: 5, 0: 4, 1: 6, 2: 8, 3: 9, 4: 12 }, isPrime) // -1
 * arrFindIndex({ length: 5:, 0: 4, 1: 6, 2: 7, 3: 9, 4: 12 }, isPrime) // 2
 * ```
 */
export declare const arrFindIndex: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => number;

/**
 * The arrFindLast() method iterates the array in reverse order and returns the value of the first element that
 * satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned.
 * - If you need the index of the found element in the array, use arrFindLastIndex().
 * - If you need to find the index of a value, use arrLastIndexOf(). (It's similar to arrFindLastIndex(), but checks
 * each element for equality with the value instead of using a testing function.)
 * - If you need to find if a value exists in an array, use {@link arrIncludes}. Again, it checks each element for
 * equality with the value instead of using a testing function.
 * - If you need to find if any element satisfies the provided testing function, use {@link arrSome}.
 *
 * The arrFindLast() method is an iterative method. It calls a provided callbackFn function once for each element
 * in an array in descending-index order, until callbackFn returns a truthy value. arrFindLast() then returns that
 * element and stops iterating through the array. If `callbackFn` never returns a truthy value, arrFindLast() returns
 * undefined.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse
 * arrays behave the same as undefined.
 *
 * arrFindLast() does not mutate the array on which it is called, but the function provided as `callbackFn` can.
 * Note, however, that the length of the array is saved before the first invocation of `callbackFn`. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrFindLast() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the `callbackFn`
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The last element in the array that satisfies the provided testing function. Otherwise, undefined
 * is returned.
 * @example
 * ```ts
 * const inventory = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 },
 * ];
 *
 * function isCherries(fruit) {
 *   return fruit.name === "cherries";
 * }
 *
 * console.log(arrFindLast(inventory, isCherries));
 * // { name: 'cherries', quantity: 5 }
 *
 * function isPrime(element, index, array) {
 *   let start = 2;
 *   while (start <= Math.sqrt(element)) {
 *     if (element % start++ < 1) {
 *       return false;
 *     }
 *   }
 *   return element > 1;
 * }
 *
 * console.log(arrFindLast([4, 6, 8, 12], isPrime)); // undefined, not found
 * console.log(arrFindLast([4, 5, 7, 12], isPrime)); // 7
 *
 * // Array Like
 * console.log(arrFindLast({ length: 4, 0: 4, 1: 6, 2: 8, 3: 12 }, isPrime)); // undefined, not found
 * console.log(arrFindLast({ length: 4, 0: 4, 1: 5, 2: 7, 3: 12 }, isPrime)); // 7
 * ```
 */
export declare const arrFindLast: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => T | E;

/**
 * The arrFindLastIndex() method iterates the array in reverse order and returns the index of the first element that
 * satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
 *
 * The arrFindLastIndex() method is an iterative method. It calls a provided `callbackFn` function once for each element
 * in an array in descending-index order, until callbackFn returns a truthy value. arrFindLastIndex() then returns the
 * index of that element and stops iterating through the array. If callbackFn never returns a truthy value, returns -1.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse arrays
 * behave the same as undefined.
 *
 * arrFindLastIndex() does not mutate the array on which it is called, but the function provided as callbackFn can.
 * Note, however, that the length of the array is saved before the first invocation of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrFindLastIndex() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the callbackFn
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The index of the last (highest-index) element in the array that passes the test. Otherwise -1 if
 * no matching element is found.
 * @example
 * ```ts
 * const inventory: Array<{ name: string, quantity: number}> = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 }
 * ];
 *
 * let called = 0;
 * function isCherries(fruit: { name: string, quantity: number}) {
 *   called++;
 *   return fruit.name === "cherries";
 * }
 *
 * arrFindLastIndex(inventory, isCherries)' // 2
 * // called === 1
 *
 * called = 0;
 * function isPrime(element: number) {
 *   called++;
 *   if (element % 2 === 0 || element < 2) {
 *     return false;
 *   }
 *   for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
 *     if (element % factor === 0) {
 *       return false;
 *     }
 *   }
 *   return true;
 * }
 *
 * arrFindLastIndex([4, 6, 8, 9, 12], isPrime); // -1
 * // called === 5
 *
 * called = 0;
 * arrFindLastIndex([4, 6, 7, 9, 12], isPrime); // 2
 * // called === 3
 *
 * // Array Like
 * called = 0;
 * arrFindLastIndex({ length: 5: 0: 4, 1: 6, 2: 8, 3: 9, 4: 12 }, isPrime); // -1
 * // called === 5
 *
 * called = 0;
 * arrFindLastIndex({ length: 5: 0: 4, 1: 6, 2: 7, 3: 9, 4: 12 }, isPrime); // 2
 * // called === 3

 * ```
 */
export declare const arrFindLastIndex: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => number;

/**
 * Calls the provided `callbackFn` function once for each element in an array in ascending index order. It is not invoked for index properties
 * that have been deleted or are uninitialized. And unlike the ES6 forEach() you CAN stop or break the iteration by returning -1 from the
 * `callbackFn` function.
 *
 * The range (number of elements) processed by arrForEach() is set before the first call to the `callbackFn`. Any elements added beyond the range
 * or elements which as assigned to indexes already processed will not be visited by the `callbackFn`.
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the element type of the array
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackfn A `synchronous` function that accepts up to three arguments. arrForEach calls the callbackfn function one time for each element in the array.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, null or undefined
 * the array will be used as the this value.
 * @remarks
 * arrForEach expects a `synchronous` function.
 * arrForEach does not wait for promises. Make sure you are aware of the implications while using promises (or async functions) as forEach callback.
 * @example
 * ```ts
 * const items = ['item1', 'item2', 'item3'];
 * const copyItems = [];
 *
 * // before using for loop
 * for (let i = 0; i < items.length; i++) {
 *   copyItems.push(items[i]);
 * }
 *
 * // before using forEach()
 * items.forEach((item) => {
 *   copyItems.push(item);
 * });
 *
 * // after
 * arrForEach(items, (item) => {
 *   copyItems.push(item);
 *   // May return -1 to abort the iteration
 * });
 *
 * // Also supports input as an array like object
 * const items = { length: 3, 0: 'item1', 1: 'item2', 2: 'item3' };
 * ```
 */
export declare function arrForEach<T = any>(theArray: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => void | number, thisArg?: any): void;

/**
 * Creates an new shallow-copied array from an array-like object or an iterable.
 * @since 0.9.7
 * @group ArrayLike
 * @group Array
 * @group Iterator
 * @typeParam T - Identifies the element type of the array-like or iterable.
 * @typeParam U - Identifies returned type of the array
 * @param theValue - An array-like object or iterable to convert to an array.
 * @param mapfn - A {@link ArrFromMapFn | mapping function} to call on every element of the array. If provided, every
 * value to be added to the array is first passed through this map function, and the return
 * value is added to the array instead. The function is called with the following arguments:
 * @param thisArg Value of 'this' used to invoke the mapfn.
 * @example
 * ```ts
 * arrFrom("Hello");
 * // [ "H", "e", "l", "l", "o" ]
 *
 * arrFrom(new Set(["Hello", "Darkness", "my", "old", "friend"]));
 * // ["Hello", "Darkness", "my", "old", "friend"]
 *
 * let map = new Map([
 *   [ 1, "Hello" ],
 *   [ 2, "Darkness" ],
 *   [ 3, "my" ],
 *   [ 4, "old" ],
 *   [ 5, "friend"]
 * ]);
 *
 * arrFrom(map.values());
 * // ["Hello", "Darkness", "my", "old", "friend"]
 *
 * arrFrom(map.keys());
 * // [ 1, 2, 3, 4, 5 ]
 *
 * arrFrom(map.entries());
 * // [ [ 1, "Hello" ], [ 2, "Darkness" ], [ 3, "my" ], [ 4, "old" ], [ 5, "friend"] ]
 *
 * // With a Mapping function
 * const map = new Map([
 *   [ 1, "Hello" ],
 *   [ 2, "Darkness" ],
 *   [ 3, "my" ],
 *   [ 4, "old" ],
 *   [ 5, "friend"]
 * ]);
 *
 * arrFrom(map, ([ key, value ]) => ({ [key]: value }));
 * // [ {"1": "Hello"}, {"2": "Darkness"}, {"3": "my"}, {"4": "old"}, {"5": "friend"} ]
 * ```
 */
export declare const arrFrom: <T, U = T>(theValue: ArrayLike<T> | Iterable<T>, mapFn?: ArrFromMapFn<T, U>, thisArg?: any) => U[];

/**
 * Callback signature for {@link arrFrom} mapFn that is called for every element of array. Each time mapFn
 * executes, the returned value is added to newArray.
 *
 * @since 0.9.7
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of the array elements
 * @typeParam R - Identifies the type of the elements returned by the map function, defaults to T.
 * @param value - The current element being processed in the array.
 * @param index - The index of the current element being processed in the array.
 */
export declare type ArrFromMapFn<T, R = T> = (value: T, index?: number) => R;

/**
 * The arrIncludes() method determines whether an array includes a certain value among its
 * entries, returning true or false as appropriate.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @param theArray - The array or array like object of elements to be searched.
 * @param searchElement - The value to search for
 * @param fromIndex - The optional Zero-based index at which to start searching, converted to an integer.
 * - Negative index counts back from the end of the array — if fromIndex < 0, fromIndex + array.length
 * is used. However, the array is still searched from front to back in this case.
 * - If fromIndex < -array.length or fromIndex is omitted, 0 is used, causing the entire array to be searched.
 * - If fromIndex >= array.length, the array is not searched and false is returned.
 * @returns A boolean value which is true if the value searchElement is found within the array (or the part of
 * the array indicated by the index fromIndex, if specified).
 * @example
 * ```ts
 * arrIncludes([1, 2, 3], 2);       // true
 * arrIncludes([1, 2, 3], 4);       // false
 * arrIncludes([1, 2, 3], 3, 3);    // false
 * arrIncludes([1, 2, 3], 3, -1);   // true
 * arrIncludes([1, 2, NaN], NaN);   // true
 * arrIncludes(["1", "2", "3"], 3 as any); // false
 *
 * // Array Like
 * arrIncludes({ length: 3, 0: 1, 1: 2, 2: 3 }, 2);       // true
 * arrIncludes({ length: 3, 0: 1, 1: 2, 2: 3 }, 4);       // false
 * arrIncludes({ length: 3, 0: 1, 1: 2, 2: 3 }, 3, 3);    // false
 * arrIncludes({ length: 3, 0: 1, 1: 2, 2: 3 }, 3, -1);   // true
 * arrIncludes({ length: 3, 0: 1, 1: 2, 2: NaN }, NaN);   // true
 * arrIncludes({ length: 3, 0: "1", 1: "2", 2: "3" }, 3 as any); // false
 * ```
 */
export declare const arrIncludes: <T>(theArray: ArrayLike<T>, searchElement: T, fromIndex?: number) => boolean;

/**
 * The arrIndexOf() method returns the first index at which a given element can be found in the array,
 * or -1 if it is not present.
 * `arrIndexOf()` compares searchElement to elements of the Array using strict equality (the same
 * method used by the === or triple-equals operator).
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @param theArray - The array or array like object of elements to be searched.
 * @param searchElement - The element to locate in the array.
 * @param fromIndex - The index to start the search at. If the index is greater than or equal to
 * the array's length, -1 is returned, which means the array will not be searched. If the provided
 * index value is a negative number, it is taken as the offset from the end of the array.
 * Note: if the provided index is negative, the array is still searched from front to back. If the
 * provided index is 0, then the whole array will be searched. Default: 0 (entire array is searched).
 * @return The first index of the element in the array; -1 if not found.
 * @example
 * ```ts
 * const array = [2, 9, 9];
 * arrIndexOf(array, 2);     // 0
 * arrIndexOf(array, 7);     // -1
 * arrIndexOf(array, 9, 2);  // 2
 * arrIndexOf(array, 2, -1); // -1
 * arrIndexOf(array, 2, -3); // 0
 *
 * let indices: number[] = [];
 * const array = ['a', 'b', 'a', 'c', 'a', 'd'];
 * const element = 'a';
 * let idx = arrIndexOf(array, element);
 * while (idx !== -1) {
 *   indices.push(idx);
 *   idx = arrIndexOf(array, element, idx + 1);
 * }
 * console.log(indices);
 * // [0, 2, 4]
 *
 * function updateVegetablesCollection (veggies, veggie) {
 *     if (arrIndexOf(veggies, veggie) === -1) {
 *         veggies.push(veggie);
 *         console.log('New veggies collection is : ' + veggies);
 *     } else {
 *         console.log(veggie + ' already exists in the veggies collection.');
 *     }
 * }
 *
 * let veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];
 *
 * updateVegetablesCollection(veggies, 'spinach');
 * // New veggies collection is : potato,tomato,chillies,green-pepper,spinach
 * updateVegetablesCollection(veggies, 'spinach');
 * // spinach already exists in the veggies collection.
 *
 * // Array Like
 * let arrayLike = {
 *   length: 3,
 *   0: "potato",
 *   1: "tomato",
 *   2: "chillies",
 *   3: "green-pepper"  // Not checked as index is > length
 * };
 *
 * arrIndexOf(arrayLike, "potato"); // 0
 * arrIndexOf(arrayLike, "tomato"); // 1
 * arrIndexOf(arrayLike, "chillies"); 2
 * arrIndexOf(arrayLike, "green-pepper"); // -1
 * ```
 */
export declare const arrIndexOf: <T>(theArray: ArrayLike<T>, searchElement: T, fromIndex?: number) => number;

/**
 * The arrLastIndexOf() method returns the last index at which a given element can be found in the array,
 * or -1 if it is not present.
 * `arrLastIndexOf()` compares searchElement to elements of the Array using strict equality (the same
 * method used by the === or triple-equals operator). [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
 * values are never compared as equal, so arrLastIndexOf() always returns -1 when searchElement is NaN.
 *
 * The arrLastIndexOf() method skips empty slots in sparse arrays.
 *
 * The arrLastIndexOf() method is generic. It only expects the this value to have a length property and integer-keyed properties.
 *
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @param theArray - The array or array like object of elements to be searched.
 * @param searchElement - The element to locate in the array.
 * @param fromIndex - Zero-based index at which to start searching backwards, converted to an integer.
 * - Negative index counts back from the end of the array — if fromIndex < 0, fromIndex + array.length is used.
 * - If fromIndex < -array.length, the array is not searched and -1 is returned. You can think of it conceptually
 * as starting at a nonexistent position before the beginning of the array and going backwards from there. There
 * are no array elements on the way, so searchElement is never found.
 * - If fromIndex >= array.length or fromIndex is omitted, array.length - 1 is used, causing the entire array to
 * be searched. You can think of it conceptually as starting at a nonexistent position beyond the end of the array and going backwards from there. It eventually reaches the real end position of the array, at which point it starts searching backwards through the actual array elements.
 * @return The first index of the element in the array; -1 if not found.
 * @example
 * ```ts
 * const numbers = [2, 5, 9, 2];
 * arrLastIndexOf(numbers, 2); // 3
 * arrLastIndexOf(numbers, 7); // -1
 * arrLastIndexOf(numbers, 2, 3); // 3
 * arrLastIndexOf(numbers, 2, 2); // 0
 * arrLastIndexOf(numbers, 2, -2); // 0
 * arrLastIndexOf(numbers, 2, -1); // 3
 *
 * let indices: number[] = [];
 * const array = ["a", "b", "a", "c", "a", "d"];
 * const element = "a";
 * let idx = arrLastIndexOf(array, element);
 * while (idx !== -1) {
 *   indices.push(idx);
 *   idx = arrLastIndexOf(array, element, idx ? idx - 1 : -(array.length + 1));
 * }
 * console.log(indices);
 * // [4, 2, 0]
 *
 * function updateVegetablesCollection (veggies, veggie) {
 *     if (arrLastIndexOf(veggies, veggie) === -1) {
 *         veggies.push(veggie);
 *         console.log('New veggies collection is : ' + veggies);
 *     } else {
 *         console.log(veggie + ' already exists in the veggies collection.');
 *     }
 * }
 *
 * let veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];
 *
 * updateVegetablesCollection(veggies, 'spinach');
 * // New veggies collection is : potato,tomato,chillies,green-pepper,spinach
 * updateVegetablesCollection(veggies, 'spinach');
 * // spinach already exists in the veggies collection.
 *
 * // Array Like
 * let arrayLike = {
 *   length: 3,
 *   0: "potato",
 *   1: "tomato",
 *   2: "chillies",
 *   3: "green-pepper"  // Not checked as index is > length
 * };
 *
 * arrLastIndexOf(arrayLike, "potato"); // 0
 * arrLastIndexOf(arrayLike, "tomato"); // 1
 * arrLastIndexOf(arrayLike, "chillies"); 2
 * arrLastIndexOf(arrayLike, "green-pepper"); // -1
 * ```
 */
export declare const arrLastIndexOf: <T>(theArray: ArrayLike<T>, searchElement: T, fromIndex?: number) => number;

/**
 * The arrMap() method creates a new array populated with the results of calling a provided function on every
 * element in the calling array.
 *
 * `arrMap` calls a provided callbackFn function once for each element in an array, in order, and constructs
 * a new array from the results. callbackFn is invoked only for indexes of the array which have assigned
 * values (including undefined).
 *
 * It is not called for missing elements of the array; that is:
 * - indexes that have never been set;
 * - indexes which have been deleted.
 *
 * @since 0.3.3
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of the array elements
 * @typeParam R - Identifies the type of the elements returned by the callback function, defaults to T.
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn - The function that is called for evetn element of `theArray`.
 * @param thisArg - The value to use as the `this` when executing the `callbackFn`.
 * @example
 * ```ts
 * const numbers = [1, 4, 9];
 * const roots = arrMap(numbers, (num) => Math.sqrt(num));
 *
 * // roots is now     [1, 2, 3]
 * // numbers is still [1, 4, 9]
 *
 * const kvArray = [{ key: 1, value: 10 },
 *                  { key: 2, value: 20 },
 *                  { key: 3, value: 30 }];
 *
 * const reformattedArray = arrMap(kvArray, ({ key, value}) => ({ [key]: value }));
 *
 * // reformattedArray is now [{1: 10}, {2: 20}, {3: 30}],
 *
 * // kvArray is still:
 * // [{key: 1, value: 10},
 * //  {key: 2, value: 20},
 * //  {key: 3, value: 30}]
 *
 * // Also supports Array Like objects with same output
 * const kvArray = {
 *   length: 3,
 *   0: { key: 1, value: 10 },
 *   1: { key: 2, value: 20 },
 *   2: { key: 3, value: 30 }
 * };
 * ```
 */
export declare const arrMap: <T, R = T>(theArray: ArrayLike<T>, callbackFn: ArrMapCallbackFn<T, R>, thisArg?: any) => R[];

/**
 * Callback signature for {@link arrMap} that is called for every element of array. Each time callbackFn
 * executes, the returned value is added to newArray.
 *
 * @since 0.3.3
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of the array elements
 * @typeParam R - Identifies the type of the elements returned by the callback function, defaults to T.
 * @param value - The current element being processed in the array.
 * @param index - The index of the current element being processed in the array.
 * @param array - The array that the `map` function was called on.
 */
export declare type ArrMapCallbackFn<T, R = T> = (value: T, index?: number, array?: T[]) => R;

/**
 * The `ArrPredicateCallbackFn` function is used for {@link arrEvery} and {@link arrFilter},
 * it should return a `truthy` value to indicate a matching element has been found.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @typeParam E - Identifies the type of the return array elements (defaults to T)
 * @param value - The cuirrent element of the array being processed.
 * @param index - The index of the current elemety of the array being processed.
 * @param array - The array being processed.
 * @returns A boolean value indicating that the value is of the type expected (the test is true)
 */
export declare type ArrPredicateCallbackFn<T, E extends T> = (value: T, index: number, array: T[]) => value is E;

/**
 * The `ArrPredicateCallbackFn2` function is used for {@link arrEvery} and {@link arrFilter},
 * it should return a `truthy` value to indicate a matching element has been found.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @typeParam E - Identifies the type of the return array elements (defaults to T)
 * @param value - The cuirrent element of the array being processed.
 * @param index - The index of the current elemety of the array being processed.
 * @param array - The array being processed.
 */
export declare type ArrPredicateCallbackFn2<T> = (value: T, index: number, array: T[]) => unknown;

/**
 * The arrReduce() method executes a user-supplied "reducer" callback function on each element of the array,
 * in order, passing in the return value from the calculation on the preceding element. The final result of
 * running the reducer across all elements of the array is a single value.
 *
 * The first time that the callback is run there is no "return value of the previous calculation". If supplied,
 * an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial
 * value and iteration starts from the next element (index 1 instead of index 0).
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
 * @returns The value that results from running the "reducer" callback function to completion over the entire array.
 * @example
 * ```ts
 * const getMax = (a: number, b: number) => Math.max(a, b);
 *
 * // callback is invoked for each element in the array starting at index 0
 * arrReduce([1, 100], getMax, 50); // 100
 * arrReduce([    50], getMax, 10); // 50
 *
 * // callback is invoked once for element at index 1
 * arrReduce([1, 100], getMax);     // 100
 *
 * // callback is not invoked
 * arrReduce([    50], getMax);     // 50
 * arrReduce([      ], getMax, 1);  // 1
 *
 * arrReduce([      ], getMax);     // throws TypeError
 *
 * // Also supports Array like objects
 * arrReduce({ length: 2, 0: 1, 1: 100 }, getMax, 50); // 100
 * arrReduce({ length: 1, 0: 50 }, getMax, 10); // 50
 *
 * // callback is invoked once for element at index 1
 * arrReduce({ length: 2, 0: 1, 1: 100 }, getMax);     // 100
 *
 * // callback is not invoked
 * arrReduce({ length: 1, 0: 50 }, getMax);     // 50
 * arrReduce({ length: 0 }, getMax, 1);  // 1
 * ```
 */
export declare const arrReduce: <T, R = T>(theArray: ArrayLike<T>, callbackfn: ArrReduceCallbackFn<T, R>, initialValue?: T | R) => R;

/**
 * The `reducer` function called for {@link arrReduce}.
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the type of array elements
 * @typeParam R - Identifies the type of the return array elements (defaults to T)
 * @param previousValue - The value resulting from the previous call to callbackFn. On first call, initialValue if
 * specified, otherwise the value of array[0].
 * @param currentValue - The value of the current element. On first call, the value of array[0] if an initialValue
 * was specified, otherwise the value of array[1].
 * @param currentIndex - The index position of currentValue in the array. On first call, 0 if initialValue was
 * specified, otherwise 1.
 * @param array -The array being traversed.
 */
export declare type ArrReduceCallbackFn<T, R = T> = (previousValue: T | R, currentValue: T, currentIndex: number, array: T[]) => R;

/**
 * The arrSlice() method returns a shallow copy of a portion of an array into a new array object
 * selected from start to end (end not included) where start and end represent the index of items
 * in that array. The original array will not be modified.
 *
 * The `arrSlice()` method is a copying method. It does not alter this but instead returns a shallow
 * copy that contains some of the same elements as the ones from the original array.
 *
 * The `arrSlice()` method preserves empty slots. If the sliced portion is sparse, the returned arra
 * is sparse as well.
 *
 * The `arrSlice()` method is generic. It only expects the this value to have a length property and
 * integer-keyed properties.
 *
 * For both start and end, a negative index can be used to indicate an offset from the end of the array.
 * For example, -2 refers to the second to last element of the array.
 * @since 0.9.3
 * @group Array
 * @group ArrayLike
 * @param start Zero-based index at which to start extraction, converted to an integer.
 * - Negative index counts back from the end of the array — if start < 0, start + array.length is used.
 * - If start < -array.length or start is omitted, 0 is used.
 * - If start >= array.length, nothing is extracted.
 * @param end Zero-based index at which to end extraction, converted to an integer. slice() extracts
 * up to but not including end.
 * - Negative index counts back from the end of the array — if end < 0, end + array.length is used.
 * - If end < -array.length, 0 is used.
 * - If end >= array.length or end is omitted, array.length is used, causing all elements until the
 * end to be extracted.
 * - If end is positioned before or at start after normalization, nothing is extracted.
 * @example
 * ```ts
 * const lyrics = ["Hello", "Darkness", "my", "old", "friend.", "I've", "come", "to", "talk" ];
 *
 * arrSlice(lyrics);        // [ "Hello", "Darkness", "my", "old", "friend.", "I've", "come", "to", "talk" ]
 * arrSlice(lyrics, 1, 3);  // [ "Darkness", "my" ]
 * arrSlicw(lyrics, 2);     // [ "my", "old", "friend.", "I've", "come", "to", "talk" ]
 * arrSlice(lyrics, 2, 4);  // [ "my", "old" ]
 * arrSlice(lyrics, 1, 5);  // [ "Darkness", "my", "old", "friend." ]
 * arrSlice(lyrics, -2);    // [ "to", "talk" ]
 * arrSlice(lyrics, 2, -1); // [ "my", "old", "friend.", "I've", "come", "to" ]
 * ```
 */
export declare const arrSlice: <T>(theArray: ArrayLike<T>, start?: number, end?: number) => T[];

/**
 * The arrSome() method tests whether at least one element in the array passes the test implemented by the
 * provided function. It returns true if, in the array, it finds an element for which the provided function
 * returns true; otherwise it returns false. It doesn't modify the array.
 *
 * The arrSome() method is an iterative method. It calls a provided `callbackFn` function once for each element
 * in an array, until the `callbackFn` returns a truthy value. If such an element is found, arrSome() immediately
 * returns true and stops iterating through the array. Otherwise, if callbackFn returns a falsy value for all
 * elements, some() returns false.
 *
 * arrSome() acts like the "there exists" quantifier in mathematics. In particular, for an empty array, it
 * returns false for any condition.
 *
 * `callbackFn` is invoked only for array indexes which have assigned values. It is not invoked for empty slots
 * in sparse arrays.
 *
 * arrSome() does not mutate the array on which it is called, but the function provided as callbackFn can.
 * Note, however, that the length of the array is saved before the first invocation of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to arrSome() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the
 * `callbackFn` will be the value at the time that element gets visited. Deleted elements are not visited.
 * - The arrSome() method is generic. It only expects the this value to have a length property and integer-keyed properties.
 * @since 0.8.0
 * @group Array
 * @group ArrayLike
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return `true` if the callback function returns a truthy value for at least one element in the array.
 * Otherwise, `false`.
 */
export declare const arrSome: <T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any) => boolean;

/**
 * The asString() method returns a string representing the value by
 * explicitly using `String(`value`)`.
 *
 * @since 0.4.3
 * @group String
 * @group Conversion
 * @group Value
 * @param value - The value to get a string representation of
 * @example
 * ```ts
 * const arr = [ 1, 2, 3];
 * asString(arr);       // "1,2,3"
 * asString(null);      // "null"
 * asString(undefined); // "undefined"
 * asString(42);        // "42"
 * asString(Symbol.for("Hello"));   // "Symbol(Hello)"
 * ```
 */
export declare const asString: (value: any) => string;

/**
 * The signatire of the function to override clearing a previous timeout created with the {@link TimeoutOverrideFn}, it will be passed
 * the result returned from the {@link TimeoutOverrideFn} call.
 * @since 0.4.5
 * @group Timer
 * @param timeoutId - The value returned from the previous {@link TimeoutOverrideFn}.
 */
export declare type ClearTimeoutOverrideFn = (timeoutId: number | any) => void;

/**
 * Create an iterator which is backed by the provided array, unlike a normal
 * array iterators where the array cannot be modified function creates
 * a shallow copy of the array using `slice()` so that you are free to modify
 * the original array.
 *
 * This will still return an iterator if the provided `values` is null or
 * undefined which will result in no entries.
 * @since 0.4.2
 * @group Iterator
 * @param values - The source array to create an iterator from
 * @returns A new iterator
 * @example
 * ```ts
 * let cnt = 0;
 * let values = [];
 * iterForOf(createArrayIterator([10, 20, 5, 15]), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * ```
 */
export declare function createArrayIterator<T>(values: T[]): Iterator<T>;

/**
 * Create a Custom Error class which may be used to throw custom errors.
 * @group Error
 * @param name - The name of the Custom Error
 * @param constructCb - [Optional] An optional callback function to call when a
 * new Customer Error instance is being created.
 * @param errorBase - [Optional] (since v0.9.6) The error class to extend for this class, defaults to Error.
 * @returns A new Error `class`
 * @example
 * ```ts
 * import { createCustomError, isError } from "@nevware21/ts-utils";
 *
 * // For an error that just contains a message
 * let myCustomErrorError = createCustomError("MessageError");
 *
 * try {
 *     throw new myCustomErrorError("Error Message!");
 * } catch(e) {
 *      // e.name === MessageError
 *      // isError(e) === true;
 *      // Object.prototype.toString.call(e) === "[object Error]";
 * }
 *
 * // Or a more complex error object
 * interface MyCriticalErrorConstructor extends CustomErrorConstructor {
 *     new(message: string, file: string, line: number, col: number): MyCriticalError;
 *     (message: string, file: string, line: number, col: number): MyCriticalError;
 * }
 *
 * interface MyCriticalError extends Error {
 *     readonly errorId: number;
 *     readonly args: any[];        // Holds all of the arguments passed during construction
 * }
 *
 * let _totalErrors = 0;
 * let myCustomError = createCustomError<MyCriticalErrorConstructor>("CriticalError", (self, args) => {
 *     _totalErrors++;
 *     self.errorId = _totalErrors;
 *     self.args = args;
 * });
 *
 * try {
 *     throw new myCustomError("Not Again!");
 * } catch(e) {
 *      // e.name === CriticalError
 *      // isError(e) === true;
 *      // Object.prototype.toString.call(e) === "[object Error]";
 * }
 *
 * // ----------------------------------------------------------
 * // Extending another custom error class
 * // ----------------------------------------------------------
 *
 * let AppError = createCustomError("ApplicationError");
 * let theAppError = new appError();
 *
 * isError(theAppError);                    // true
 * theAppError instanceof Error;            // true
 * theAppError instanceof AppError;         // true
 *
 * let StartupError = createCustomError("StartupError", null, AppError);
 * let theStartupError = new StartupError();
 *
 * isError(theStartupError);                // true
 * theStartupError instanceof Error;        // true
 * theStartupError instanceof AppError;     // true
 * theStartupError instanceof StartupError; // true
 * ```
 */
export declare function createCustomError<T extends ErrorConstructor = CustomErrorConstructor, B extends ErrorConstructor = ErrorConstructor>(name: string, constructCb?: ((self: any, args: IArguments) => void) | null, errorBase?: B): T;

/**
 * Create a TypeScript style enum class which is a mapping that maps from the key -> value and the value -> key.
 * This is effectively the same as defining a non-constant enum, but this only repeats the "Name" of the enum value once.
 * @group Enum
 * @example
 * ```ts
 * const enum Animal {
 *    Dog = 0,
 *    Cat = 1,
 *    Butterfly = 2,
 *    Bear = 3
 * }
 * const Animals = createEnum<typeof Animal>({
 *    Dog: Animal.Dog,
 *    Cat: Animal.Cat,
 *    Butterfly: Animal.Butterfly,
 *    Bear: Animal.Bear
 * });
 * // You end up with an object that maps everything to the name
 * Animals.Dog === 0;           // true
 * Animals[0] === "Dog";        // true
 * Animals["Dog"] === 0;        // true
 * Animals.Cat === 1;           // true
 * Animals[1] === "Cat";        // true
 * Animals["Cat"] === 1;        // true
 * ```

 * @param values - The values to populate on the new object
 * @typeParam E - Identifies the const enum type being mapped
 * @returns A new frozen (immutable) object which looks and acts like a TypeScript Enum class.
 */
export declare function createEnum<E>(values: {
    [key in keyof E]: E[keyof E];
}): EnumCls<E>;

/**
 * Create a map object which contains both the property key and value which both map to the key,
 * E[key] => key and E[value] => key.
 * @group Enum
 * @example
 * ```ts
 * const enum Animal {
 *    Dog = 0,
 *    Cat = 1,
 *    Butterfly = 2,
 *    Bear = 3
 * }
 * const animalMap = createEnumKeyMap<typeof Animal>({
 *    Dog: Animal.Dog,
 *    Cat: Animal.Cat,
 *    Butterfly: Animal.Butterfly,
 *    Bear: Animal.Bear
 * });
 * // You end up with an object that maps everything to the name
 * animalMap.Dog === "Dog";         // true
 * animalMap[0] === "Dog";          // true
 * animalMap["Dog"] === "Dog";      // true
 * animalMap.Cat === "Cat";         // true
 * animalMap[1] === "Cat";          // true
 * animalMap["Cat"] === "Cat";      // true
 * // Helper function to always return the "Name" of the type of animal
 * function getAnimalType(type: string | number | Animal) {
 *     return animalMap[type];
 * }
 * ```
 * @param values - The values to populate on the new object
 * @typeParam E - Identifies the const enum type being mapped
 * @returns A new frozen (immutable) object which contains a property for each key and value that returns the value.
 */
export declare function createEnumKeyMap<E>(values: {
    [key in keyof E]: E[keyof E];
}): EnumNameMap<E>;

/**
 * Create a map object which contains both the perperty key and value which both map to the resulting value,
 * E[key] => value and E[value] => value.
 * @group Enum
 * @example
 * ```ts
 * const enum Animal {
 *    Dog = 0,
 *    Cat = 1,
 *    Butterfly = 2,
 *    Bear = 3
 * }
 * const animalMap = createEnumValueMap<typeof Animal>({
 *    Dog: Animal.Dog,
 *    Cat: Animal.Cat,
 *    Butterfly: Animal.Butterfly,
 *    Bear: Animal.Bear
 * });
 * // You end up with an object that maps everything to the name
 * animalMap.Dog === 0;     // true
 * animalMap[0] === 0;      // true
 * animalMap["Dog"] === 0;  // true
 * animalMap.Cat === 1;     // true
 * animalMap[1] === 1;      // true
 * animalMap["Cat"] === 1;  // true
 *
 * // Helper function to always return the "Name" of the type of animal
 * function getAnimalValue(type: string | number | Animal) {
 *     return animalMap[type];
 * }
 * ```

 * @param values - The values to populate on the new object
 * @typeParam E - Identifies the const enum type being mapped
 * @returns A new frozen (immutable) object which contains a property for each key and value that returns the value.
 */
export declare function createEnumValueMap<E>(values: {
    [key in keyof E]: E[keyof E];
}): EnumValueMap<E>;

/**
 * Create a simple filename style regular expression from the string value, converting any embedded
 * filename wildcard characters `'*'` and `'?'`.
 * If the source string contains folder seperators both `'/'` and `'\'` are treated as synonomous.
 * Each wildcard match will be captured as it's own group.
 * The supported matching values are
 * - `'*'` Matches any characters zero or more times (including folder seperators '`'/`' or `'\'`)
 * - `'?'` Matches any single character once only (including folder seperators `'/'` or `'\'`)
 * - `'/'` Matches either `'/'` or `'\'` character, not captured as a group
 * - `'\'` Matches either `'/'` or `'\'` character, not captured as a group
 *
 * @since 0.9.0
 * @group RegExp
 * @param value - The string value to converted
 * @param ignoreCase - Flag to indicate whether the regular expression should be case-sensitive, Defaults
 * to false.
 * @param fullMatch - Flag to identify whether the RegExp should be wrapped with `'^'` and `'$'` to
 * incidate match the entire string only.
 * @returns The new Regular Expression created from the provided value.
 * @example
 * ```ts
 * let regex = createFilenameRegex("*.txt");
 *
 * lat matches = regex.exec("Hello");
 * matches; // null
 *
 * let matches = regex.exec("ug.txt");
 * matches[0]; // "ug.txt"
 * matches[1]; // "ug"
 *
 * let matches = regex.exec(" ug.txt ");
 * matches[0]; // " ug.txt"
 * matches[1]; // " ug"
 *
 * let matches = regex.exec("C:\\temp\\ug.txt");
 * matches[0]; // "C:\\temp\\ug.txt"
 * matches[1]; // "C:\\temp\\ug"
 *
 * let matches = regex.exec("/var/log/ug.txt");
 * matches[0]; // "/var/log/ug.txt"
 * matches[1]; // "/var/log/ug"
 * ```
 */
export declare function createFilenameRegex(value: string, ignoreCase?: boolean, fullMatch?: boolean): RegExp;

/**
 * Create a deferred proxy function which will call the named function of the result of the hostFn, this enables
 * creating bound functions which when called call the proxy the function to a different host (this) instance.
 *
 * This is different from `fnBind` which is provided with the concrete function and `this` instances, while the proxy
 * will lazily obtain the `this` and the function is obtained by looking up the named function from the returned
 * host (`this`) instance.
 *
 * @since 0.9.8
 * @group Function
 * @param hostFn - A function to get the current host and thisArg that will be called
 * @param funcName - The name of the function to call on the host
 * @returns The result of calling the function with the specified `this` value and arguments.
 * @example
 * ```ts
 * const module1 = {
 *     prefix: "Hello",
 *     x: 21,
 *     getX() {
 *         return this.x;
 *     },
 *     log(value: string) {
 *         return this.prefix + " " + value + " : " + this.x
 *     }
 * };
 *
 * // The 'this' parameter of 'getX' is bound to 'module'.
 * module1.getX(); // 21
 * module1.log("Darkness"); // Hello Darkness : 21
 *
 * // Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
 * let module2 = {
 *     prefix: "my",
 *     x: 42
 * };
 *
 * let getHost = () => {
 *     return module1;
 * };
 *
 * let deferredFn = createFnDeferredProxy(getHost, "getX");
 *
 * deferredFn();   // 21
 *
 * module2.defX = deferredFn;
 *
 * module2.defX();  // 21
 * ```
 */
export declare const createFnDeferredProxy: <H, F extends (...args: any) => any>(hostFn: () => H, funcName: TypeFuncNames<H>) => F;

/**
 * Create an iterable which conforms to the `Iterable` protocol, it uses the provided `ctx` to
 * create an `Iterator` via {@link createIterator}.
 *
 * @see [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
 * @since 0.4.2
 * @group Iterator
 * @typeParam T - Identifies the type that will be returned by the iterator
 * @param ctx - The context used to manage the iteration over the items.
 * @returns A new Iterable instance
 * @example
 * ```ts
 * let current = 0;
 * let next = 1;
 * let done = false;
 * let fibCtx: CreateIteratorContext<number> = {
 *     n: function() {
 *         fibCtx.v = current;
 *         current = next;
 *         next = fibCtx.v + next;
 *
 *         // Return not done
 *         return false;
 *     },
 *     r: function(value) {
 *         done = true;
 *         return value;
 *     }
 * };
 *
 * let values: number[] = [];
 * iterForOf(createIterable(fibCtx), (value) => {
 *     values.push(value);
 *     if (values.length === 10) {
 *         return -1;
 *     }
 * });
 *
 * // Done is true
 * // done === true
 * // Values: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * ```
 */
export declare function createIterable<T>(ctx: CreateIteratorContext<T>): Iterable<T>;

/**
 * Create an iterator which conforms to the `Iterator` protocol, it uses the provided `ctx` to
 * managed moving to the `next`.
 *
 * @see [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)
 * @since 0.4.2
 * @group Iterator
 * @typeParam T - Identifies the type that will be returned by the iterator
 * @param ctx - The context used to manage the iteration over the items.
 * @returns A new Iterator instance
 * @example
 * ```ts
 * let idx = -1;
 * let theValues = [ 5, 10, 15, 20, 25, 30 ];
 *
 * function getNextFn() {
 *     idx++;
 *     let isDone = idx >= theValues.length;
 *     if (!isDone) {
 *         // this is passed as the current iterator
 *         // so you can directly assign the next "value" that will be returned
 *         this.v = theValues[idx];
 *     }
 *
 *     return isDone;
 * }
 *
 * let theIterator = createIterator<number>({ n: getNextFn });
 *
 * let values: number[] = [];
 * iterForOf(theIterator, (value) => {
 *     values.push(value);
 * });
 *
 * // Values: [5, 10, 15, 20, 25, 30 ]
 * ```
 */
export declare function createIterator<T>(ctx: CreateIteratorContext<T>): Iterator<T>;

/**
 * The context used to manage how the {@link createIterator} returns and moves to the next item,
 * and provides to the current value `v`.
 * @since 0.4.2
 * @group Iterator
 */
export declare interface CreateIteratorContext<T> {
    /**
     * A function that returns a boolean to indicate whether it was able to produce
     * the next value in the sequence.
     * @param args - Optional additional arguments that where passed to the iterator `next` function.
     * @return `true` if a new value was produced and assigned to the `v` of the context, otherwise `false`
     */
    n: (...args: any) => boolean;
    /**
     * The current value to be assigned to the returned iterator result, the next `n`
     * function should assign this value to the context as part of incrementing to
     * the next value.
     */
    v?: T;
    /**
     * Optional function that accepts zero or one argument. This function is called via the
     * iterator `return` function when the iterator caller does not intend to make any more
     * `next()` calls so the implementation and can perform any cleanup actions.
     * @return [Optional] value to be included in the final iteration result
     */
    r?: (value?: T) => T | undefined;
    /**
     * A function that accepts zero or one argument. The function is called via the iterator
     * `throw` function when that the iterator caller detects an error condition, and e is
     * typically an Error instance.
     * @return [Optional] value to be included in the final iteration result
     */
    t?: (e?: any) => T | undefined;
}

/**
 * Creates proxy functions on the target which internally will call the source version with all arguments passed to the target method.
 *
 * @since 0.9.8
 * @group Function
 * @param target - The target object to be assigned with the source properties and functions
 * @param host - The host instance or a function to return the host instance which contains the
 * functions and will be assigned as the `this` for the function being called.
 * @param funcDefs - An array of function definitions on how each named function will be
 * proxied onto the target.
 * @return The original target after all proxies have been assigned
 * @example
 * ```ts
 * let test = {
 *     x: 21,
 *     func1() {
 *         return this.x;
 *     }
 * };
 *
 * test.func1();        // 21
 * let newTarget = createProxyFuncs({} as any, test, [
 *     { n: "func1" },
 *     { n: "func1", as: "aliasFn" }
 * ]);
 *
 * newTarget.func1();   // 21
 * newTarget.aliasFn();   // 21
 *
 * newTarget.x = 42;
 *
 * // The return is still using the `this.x` from the original `test` as it's proxied
 * newTarget.func1();   // 21
 * newTarget.aliasFn();   // 21
 *
 * let getHostFn = () => {
 *    return test;
 * };
 *
 * newTarget = createProxyFuncs({} as any, getHostFn, [
 *     { n: "func1" },
 *     { n: "func1", as: "aliasFn" }
 * ]);
 *
 * newTarget.func1();   // 21
 * newTarget.aliasFn();   // 21
 *
 * newTarget.x = 42;
 *
 * // The return is still using the `this.x` from the original `test` as it's proxied
 * newTarget.func1();   // 21
 * newTarget.aliasFn();   // 21
 * ```
 */
export declare const createProxyFuncs: <T, H>(target: T, host: H | (() => H), funcDefs: ProxyFunctionDef<T, H>[]) => T;

/**
 * Create a simple range iterator which will return an iterator that increments it's value from
 * `start` to `end` by the `step`.
 * - If `end` is omitted, null or undefined the value will be set to `start`
 * - If the `step` value is omitted, null, undefined or zero then it will default to 1 if end > start otherwise -1.
 *
 * @since 0.4.2
 * @group Iterator
 * @param start - The initial value of the numeric iterator
 * @param end - The inclusive maximum (or minimum when moving backwards) value of the iterator.
 * @param step - The step size for each iteration, may be positive or negative. Defaults to 1 when
 * start <= end and -1 when start > end. Zero is treated as not provided.
 * @returns A new iterator which will return a numeric value between start and end at step intervals
 * @example
 * ```ts
 * let cnt = 0;
 * iterForOf(createRangeIterator(0, -1, 1), (value) => {
 *     // Will never get called as -1 < 0
 * });
 *
 * cnt = 0;
 * let values: number[] = [];
 * iterForOf(createRangeIterator(1, 1), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 1
 * // values: [ 1 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(10, null as any), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 1
 * // values: [ 10 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(-10, undefined as any), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 1
 * // values: [ -10 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(5, 20, 5), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 4
 * // values: [ 5, 10, 15, 20 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(20, 5, -5), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 4
 * // values: [ 20, 15, 10, 5 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(20, 15), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 6
 * // values: [ 20, 19, 18, 17, 16, 15 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(-1, 1), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 3;
 * // values: [ -1, 0, 1 ]
 *
 * cnt = 0;
 * values = [];
 * iterForOf(createRangeIterator(1, -1), (value) => {
 *     cnt++;
 *     values.push(value);
 * });
 * // cnt === 3;
 * // values: [ 1, 0, -1 ]
 * ```
 */
export declare function createRangeIterator(start: number, end: number, step?: number): Iterator<number>;

/**
 * Create a map object which contains both the perperty key and value which both map to the requested
 * generic mapValue with a type of V, E[key] => mapValue and E[value] => mapValue.
 * @group Enum
 * @example
 * ```ts
 * const enum Animal {
 *    Dog = 0,
 *    Cat = 1,
 *    Butterfly = 2,
 *    Bear = 3
 * };
 * // Creates a simple mapping to a string value
 * const animalFamilyMap = createValueMap<typeof Animal, string>({
 *    Dog: [ Animal.Dog, "Canidae"],
 *    Cat: [ Animal.Cat, "Felidae"],
 *    Butterfly: [ Animal.Butterfly, "Papilionidae"],
 *    Bear: [ Animal.Bear, "Ursidae"]
 * });
 * // You end up with an object that maps everything to the name
 * animalMap.Dog === "Canidae";     // true with typeof animalMap.Dog is "string"
 * animalMap[0] === "Canidae";      // true with typeof animalMap[0] is "string"
 * animalMap["Dog"] === "Canidae";  // true with typeof animalMap["Dog"] is "string"
 * animalMap.Cat === "Felidae";     // true with typeof animalMap.Cat is "string"
 * animalMap[1] === "Felidae";      // true with typeof animalMap[1] is "string"
 * animalMap["Cat"] === "Felidae";  // true with typeof animalMap["Cat"] is "string"
 * ```
 * @param values - The values to populate on the new object
 * @typeParam E - Identifies the const enum type (eg. typeof Animal);
 * @typeParam V - Identifies the type of the mapping `string`; `number`; etc is not restructed to primitive types.
 * @returns A new frozen (immutable) object which contains a property for each key and value that returns the defiend mapped value.
 */
export declare function createSimpleMap<E, V>(values: {
    [key in keyof E]: [E[keyof E], V];
}): EnumTypeMap<E, V>;

/**
 * Creates a non-running (paused) timer which will execute a function or specified piece of code when enabled and the timer expires,
 * this is simular to using `scheduleTimeout` but the timer is not enabled (running) and you MUST call `refresh` to start the timer.
 *
 * The timer may be cancelled (cleared) by calling the `cancel()` function on the returned {@link ITimerHandler}, or
 * you can "reschedule" and/or "restart" the timer by calling the `refresh()` function on the returned {@link ITimerHandler}
 * instance
 *
 * @since 0.7.0
 * @group Timer
 *
 * @param callback - The function to be executed after the timer expires.
 * @param timeout - The time, in milliseconds that the timer should wait before the specified
 * function or code is executed. If this parameter is omitted, a value of 0 is used, meaning
 * execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by `callback`.
 * @returns A {@link ITimerHandler} instance which can be used to cancel the timeout.
 * @example
 * ```ts
 * let timeoutCalled = false;
 * let theTimeout = createTimeout(() => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // As the timer is not started you will need to call "refresh" to start the timer
 * theTimeout.refresh();
 *
 * // or set enabled to true
 * theTimeout.enabled = true;
 * ```
 */
export declare function createTimeout<A extends any[]>(callback: (...args: A) => void, timeout: number, ...args: A): ITimerHandler;

/**
 * Creates a non-running (paused) timer which will execute a function or specified piece of code when enabled once the timer expires.
 * The overrideFn will be used to create the timer, this is simular to using `scheduleTimeoutWith` but the timer is not enabled (running)
 * and you MUST call `refresh` to start the timer.
 *
 * The timer may be cancelled (cleared) by calling the `cancel()` function on the returned {@link ITimerHandler}, or
 * you can "reschedule" and/or "restart" the timer by calling the `refresh()` function on the returned {@link ITimerHandler}
 * instance
 *
 * @since 0.7.0
 * @group Timer
 *
 * @param overrideFn - setTimeout override function this will be called instead of the `setTimeout`, if the value
 * of `overrideFn` is null or undefined it will revert back to the native `setTimeout`. May also be an array with contains
 * both the setTimeout and clearTimeout override functions, if either is not provided the default native functions will be used
 * @param callback - The function to be executed after the timer expires.
 * @param timeout - The time, in milliseconds that the timer should wait before the specified
 * function or code is executed. If this parameter is omitted, a value of 0 is used, meaning
 * execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by `callback`.
 * @returns A {@link ITimerHandler} instance which can be used to cancel the timeout.
 * @example
 * ```ts
 * let timeoutCalled = false;
 * // Your own "setTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newSetTimeoutFn(callback: TimeoutOverrideFn) {
 *     overrideCalled ++;
 *     return setTimeout(callback, timeout);
 * }
 *
 * let theTimeout = createTimeoutWith(newSetTimeoutFn, () => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // As the timer is not started you will need to call "refresh" to start the timer
 * theTimeout.refresh();
 *
 * // or set enabled to true
 * theTimeout.enabled = true;
 * ```
 * @example
 * ```ts
 * let timeoutCalled = false;
 * // Your own "setTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newSetTimeoutFn(callback: TimeoutOverrideFn) {
 *     overrideCalled ++;
 *     return setTimeout(callback, timeout);
 * }
 *
 * // Your own "clearTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newClearTimeoutFn(timeoutId: number) {
 *     overrideCalled ++;
 *     return clearTimeout( timeout);
 * }
 *
 * let theTimeout = createTimeoutWith([newSetTimeoutFn, newClearTimeoutFn], () => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // As the timer is not started you will need to call "refresh" to start the timer
 * theTimeout.refresh();
 *
 * // or set enabled to true
 * theTimeout.enabled = true;
 * ```
 */
export declare function createTimeoutWith<A extends any[]>(overrideFn: TimeoutOverrideFn | TimeoutOverrideFuncs, callback: (...args: A) => void, timeout: number, ...args: A): ITimerHandler;

/**
 * Create a strongly types map object which contains both the perperty key and value which both map
 * to the requested mapValue,
 * E[key] => mapValue and E[value] => mapValue.
 * - E = the const enum type (typeof Animal);
 * - V = Identifies the valid values for the keys, this should include both the enum numeric and string key of the type. The
 * resulting "Value" of each entry identifies the valid values withing the assignments.
 * @group Enum
 * @example
 * ```ts
 * // Create a strongly types map
 * const animalFamilyMap = createTypeMap<typeof Animal, {
 *     // Defined the enum lookups
 *     [Animal.Dog]: "Canidae",
 *     [Animal.Cat]: "Felidae",
 *     [Animal.Butterfly]: "Papilionidae",
 *     [Animal.Bear]: "Ursidae",
 *     // Defined Named reference
 *     Dog: "Canidae",
 *     Cat: "Felidae",
 *     Butterfly: "Papilionidae",
 *     Bear: "Ursidae",
 * }>({
 *     Dog: [ Animal.Dog, "Canidae"],
 *     Cat: [ Animal.Cat, "Felidae"],
 *     Butterfly: [ Animal.Butterfly, "Papilionidae"],
 *     Bear: [ Animal.Bear, "Ursidae"]
 * });
 * // You end up with a strongly types result for each value
 * animalMap.Dog === "Canidae";     // true with typeof animalMap.Dog is (const) "Canidae"
 * animalMap[0] === "Canidae";      // true with typeof animalMap[0] is "Canidae"
 * animalMap["Dog"] === "Canidae";  // true with typeof animalMap["Dog"] is "Canidae"
 * animalMap.Cat === "Felidae";     // true with typeof animalMap.Cat is "Felidae"
 * animalMap[1] === "Felidae";      // true with typeof animalMap[1] is "Felidae"
 * animalMap["Cat"] === "Felidae";  // true with typeof animalMap["Cat"] is "Felidae"
 *
 * or using an interface to define the direct string mappings
 *
 * interface IAnimalFamilyMap {
 *     Dog: "Canidae",
 *     Cat: "Felidae",
 *     Butterfly: "Papilionidae",
 *     Bear: "Ursidae"
 * }
 *
 * // Create a strongly types map
 * const animalFamilyMap = createTypeMap<typeof Animal, IAnimalFamilyMap & {
 *     // Defined the enum lookups
 *     [Animal.Dog]: "Canidae",
 *     [Animal.Cat]: "Felidae",
 *     [Animal.Butterfly]: "Papilionidae",
 *     [Animal.Bear]: "Ursidae"
 * }>({
 *     Dog: [ Animal.Dog, "Canidae"],
 *     Cat: [ Animal.Cat, "Felidae"],
 *     Butterfly: [ Animal.Butterfly, "Papilionidae"],
 *     Bear: [ Animal.Bear, "Ursidae"]
 * });
 *
 * // You also end up with a strongly types result for each value
 * animalMap.Dog === "Canidae";     // true with typeof animalMap.Dog is (const) "Canidae"
 * animalMap[0] === "Canidae";      // true with typeof animalMap[0] is "Canidae"
 * animalMap["Dog"] === "Canidae";  // true with typeof animalMap["Dog"] is "Canidae"
 * animalMap.Cat === "Felidae";     // true with typeof animalMap.Cat is "Felidae"
 * animalMap[1] === "Felidae";      // true with typeof animalMap[1] is "Felidae"
 * animalMap["Cat"] === "Felidae";  // true with typeof animalMap["Cat"] is "Felidae"
 * ```
 * @param values - The values to populate on the new object
 * @typeParam E - Identifies the enum type
 * @typeParam T - Identifies the return type that is being created via the mapping.
 * @returns A new frozen (immutable) object which contains a property for each key and value that returns the defined mapped value.
 */
export declare function createTypeMap<E, T>(values: {
    [key in keyof E]: [E[keyof E], T[keyof T]];
}): T;

/**
 * Create a simple wildcard regular expression from the string value, converting any embedded wildcard
 * `'*'` characters to match any character zero or more times (including folder seperators `'/'` or `'\'`),
 * while escaping all other characters.
 * The supported matching values are
 * - `'*'` Matches any characters zero or more times (including folder seperators '`'/`' or `'\'`)
 * @since 0.9.0
 * @group RegExp
 * @param value - The value to be converted into a RegExp, if the value is not a string it will coerced
 * to a string.
 * @param ignoreCase - Flag to indicate whether the regular expression should be case-sensitive, Defaults
 * to false.
 * @param fullMatch - Flag to identify whether the RegExp should be wrapped with `'^'` and `'$'` to
 * incidate match the entire string only.
 * @returns The new Regular Expression created from the provided value.
 * @example
 * ```ts
 * let regex = createWildcardRegex("Hello*");
 *
 * let matches = regex.exec("Hello");
 * matches[0]; // "Hello";
 * matches[1]; // ""
 *
 * let matches = regex.exec("Hello Darkness");
 * matches[0]; // "Hello Darkness"
 * matches[1]; // " Darkness"
 *
 * let matches = regex.exec("Darkness Hello");
 * matches[0];  // "Hello"
 * matches[1]; // ""
 *
 * let regex.exec("Darkness Hello.");
 * matches[0]; // "Hello."
 * matches[1]; // "."
 * ```
 */
export declare function createWildcardRegex(value: string, ignoreCase?: boolean, fullMatch?: boolean): RegExp;

/**
 * Defines the definition of the custom error constructor
 * Used by: {@link createCustomError}
 * @group Error
 */
export declare interface CustomErrorConstructor<T extends Error = Error> extends ErrorConstructor {
    new(message?: string): T;
    (message?: string): T;
    readonly prototype: T;
}

/**
 * Deep copy handler to identify and copy Date instances.
 * @since 0.4.4
 * @group Object - Deep Copy
 * @param details - The details object for the current property being copied
 * @returns `true` if the current value is a function otherwise `false`
 */
export declare function dateDeepCopyHandler(details: IObjDeepCopyHandlerDetails): boolean;

/**
 * Create a new object by merging the passed arguments, this is effectively the same as calling `objExtend({}, ...theArgs)` where
 * all of the arguments are added to a new object that is returned.
 * @group Object
 * @param target - The original object to be extended.
 * @param theArgs - The optional number of arguments to be copied
 * @returns - A new object or the original
 */
export declare function deepExtend<T>(target: T, ...theArgs: any): T & any;

/**
 * Returns string representation of an object suitable for diagnostics logging.
 * @group Error
 * @group Diagnostic
 * @param object - The object to be converted to a diagnostic string value
 * @param format - Identifies whether the JSON value should be formated
 * - `true` - Format with 4 spaces
 * - 'number' - The number of spaces to format with
 * - `false` (or not Truthy) - Do not format
 */
export declare function dumpObj(object: any, format?: boolean | number): string;

/**
 * Return the number of milliseconds that have elapsed since the provided `startTime`
 * the `startTime` MUST be obtained from {@link perfNow} to ensure the correct elapsed
 * value is returned.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param startTime - The startTime obtained from `perfNow`
 * @returns The number of milliseconds that have elapsed since the startTime.
 * @example
 * ```ts
 * let start = perfNow();
 * // Do some work
 * let totalTime = elapsedTime(start);
 * ```
 */
export declare function elapsedTime(startTime: number): number;

/**
 * Encode the provided string to a safe HTML form, converting the base `&`, `<`, `>`, `\"` and `'`
 * characters into their HTML encoded representations
 * @since 0.9.0
 * @group Conversion
 * @group Value
 * @param value - The string value to be converted into a HTML safe form
 * @returns The converted string as HTML
 * @example
 * ```ts
 * encodeAsHtml("HelloDarkness"); // "HelloDarkness"
 * encodeAsHtml("Hello Darkness"); // "Hello Darkness"
 * encodeAsHtml("hello.Darkness"); // "hello.Darkness"
 * encodeAsHtml("hello-Darkness"); // "hello-Darkness"
 * encodeAsHtml("hello_Darkness"); // "hello_Darkness"
 * encodeAsHtml("abc-123"); // "abc-123"
 * encodeAsHtml("0abc0"); // "0abc0"
 * encodeAsHtml("\"HelloDarkness\""); // "&quot;HelloDarkness&quot;"
 * encodeAsHtml("\"Hello Darkness\""); // "&quot;Hello Darkness&quot;"
 * encodeAsHtml("\"hello Darkness\""); // "&quot;hello Darkness&quot;"
 * encodeAsHtml("\"hello Darkness\""); // "&quot;hello Darkness&quot;"
 * encodeAsHtml("\"hello .,#<[]>Darkness\""); // "&quot;hello .,#&lt;[]&gt;Darkness&quot;"
 * encodeAsHtml("<script src=\"javascript:alert('Hello');\"></script>"); // "&lt;script src=&quot;javascript:alert(&#39;Hello&#39;);&quot;&gt;&lt;/script&gt;"
 * ```
 */
export declare function encodeAsHtml(value: string): string;

/**
 * Encode the value into a JSON string, if the provided value is a string this will encode
 * any character that is not an alpha, numeric, space or some special characters as `\uXXXX`
 * and will always be returned wrapped in double quotes `"xxx"`, if the value is any other
 * object it will be encoded using JSON.stringify() and if there is an exception encoding
 * with JSON.stringify() it will return the exception as a string using {@link dumpObj}().
 * @since 0.9.0
 * @group Conversion
 * @group Value
 * @param value - The value to be encoded as JSON
 * @param format - Identifies whether the JSON value should be formatted when an object
 * - `true` - Format with 4 spaces
 * - 'number' - The number of spaces to format with
 * - `false` (or not Truthy) - Do not format*
 * @returns A JSON encoded string representation of the value.
 * @example
 * ```ts
 * // String values
 * encodeAsJson("abc.123"); // "\"abc.123\""
 * encodeAsJson("321-abc"); // "\"321-abc\""
 * encodeAsJson("Hello darkness, my \"old\" friend..."); // "\"Hello darkness, my \\\"old\\\" friend...\""
 * encodeAsJson("Hello: Darkness"); // "\"Hello: Darkness\""
 * encodeAsJson("Hello\\u003A Darkness"); // "\"Hello\\\\u003A Darkness\""
 * encodeAsJson("`!@#$%^&*()_-+=[]{}:;'<>?"); // "\"\\u0060!@#$%^&*()_-+=[]{}:;\\u0027<>?\""
 * encodeAsJson("0"); // "\"0\""
 * encodeAsJson("1"); // "\"1\""
 *
 * encodeAsJson([]); // "[]"
 * encodeAsJson(["A"]); // "[\"A\"]"
 * encodeAsJson([0]); // "[0]"
 * encodeAsJson([false]); // "[false]"
 * encodeAsJson(new Array(1)); // "[null]"
 * encodeAsJson(true); // "true",
 * encodeAsJson(false); // "false"
 *
 * encodeAsJson({}); // "{}"
 * encodeAsJson({ Hello: "Darkness" }); // "{\"Hello\":\"Darkness\"}");
 * ```
 */
export declare function encodeAsJson<T>(value: T, format?: boolean | number): string;

/**
 * A type that identifies an enum class generated from a constant enum.
 * @group Enum
 * @typeParam E - The constant enum type
 *
 * Returned from {@link createEnum}
 */
export declare type EnumCls<E = any> = {
    readonly [key in keyof E extends string | number | symbol ? keyof E : never]: key extends string ? E[key] : key;
} & {
        readonly [key in keyof E]: E[key];
    };

/**
 * A type that identifies an object whose property values are generally mapped to the key of the source type.
 * @group Enum
 * @typeParam E - The source constant enum type which identifies the keys and values
 * @typeParam T - The resulting type with the keys from the source type.
 *
 * Returned from {@link createEnumKeyMap}
 */
export declare type EnumNameMap<E = any, T = {
    readonly [key in keyof E]: key extends string ? key : keyof E;
}> = {
    readonly [key in keyof E extends string | number | symbol ? keyof E : never]: key extends string ? key : keyof E;
} & T;

/**
 * A type that maps the keys of E to the type of V.
 * @group Enum
 * @typeParam E - The type of object that defines the Key (typically a constant enum)
 * @typeParam V - The value type, typically `string`, `number` but may also be a complex type.
 * @typeParam T - The resulting type with the keys from the source type.
 *
 * Returned from {@link createSimpleMap}
 */
export declare type EnumTypeMap<E, V, T = {
    readonly [key in keyof E]: V;
}> = {
    readonly [key in keyof E extends string ? keyof E : never]: V;
} & T;

/**
 * A type that identifies an object whose property values are mapped to the resulting values of the source objects keys.
 * @group Enum
 * @typeParam E - The source type which identifies the keys.
 * @typeParam T - The resulting type with the keys from the source type.
 *
 * Returned from {@link createEnumValueMap}
 */
export declare type EnumValueMap<E = any, T = {
    readonly [key in keyof E]: E[keyof E];
}> = {
    readonly [key in keyof E extends string | number | symbol ? keyof E : never]: key extends string ? E[key] : E[key];
} & T;

/**
 * The `fnApply` function calls the specified `fn` function with the given `thisArg` as the `this` value,
 * and the optional `argArray` arguments provided as an array (or an Array-Like Object).
 *
 * Normally, when calling a function, the value of `this` inside the function is the object that the
 * function was accessed on. With `fnApply()`, you can assign an arbitrary value as this when calling an
 * existing function, without first attaching the function to the object as a property. This allows you
 * to use methods of one object as generic utility functions.
 *
 * You can also use any kind of object which is ArrayLike as the second parameter. In practice, this means
 * that it needs to have a length property, and integer ("index") properties in the range (0..length - 1).
 * For example, you could use a NodeList, or a custom object like `{ 'length': 2, '0': 'eat', '1': 'bananas' }`.
 * You can also use `arguments`.
 *
 * @since 0.9.8
 * @group Function
 *
 * @param fn - The function to be called
 * @param thisArg - The value of `this` provided for the call to `fn`. If the function is not in strict mode,
 * `null` and `undefined` will be replaced with the global object, and primitive values will be converted to objects.
 * @param argArray - An array-like object, specifying the arguments with which `fn` should be called, or `null` or
 * `undefined` if no arguments should be provided to the function.
 * @returns The result of calling the function with the specified `this` value and arguments.
 * @example
 * ```ts
 * // min / max number in an array
 * let max = fnApply(Math.max, null, [ 21, 42, 84, 168, 7, 3 ]);
 * // 168
 *
 * let min = fnApply(Math.min, null, [ 21, 42, 84, 168, 7, 3 ]);
 * // 3
 *
 * const module1 = {
 *     prefix: "Hello",
 *     x: 21,
 *     getX() {
 *         return this.x;
 *     },
 *     log(value: string) {
 *         return this.prefix + " " + value + " : " + this.x
 *     }
 * };
 *
 * // The 'this' parameter of 'getX' is bound to 'module'.
 * module1.getX(); // 21
 * module1.log("Darkness"); // Hello Darkness : 21
 *
 * // Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
 * let module2 = {
 *     prefix: "my",
 *     x: 42
 * };
 *
 * // Call the function of module1 with module2 as it's this
 * fnApply(module1.getX, module2); // 42
 * fnApply(module1.log, module2, [ "friend" ]); // my friend : 42
 * ```
 */
export declare const fnApply: <F extends (...args: any) => any, T>(fn: F, thisArg: T, argArray?: ArrayLike<any>) => ReturnType<F>;

/**
 * Creates a new function that when called will set the value of `thisArg` as the `this` keyword
 * value whrn calling the provided `fn` instance, and all of the arguments passed to the new
 * function will be passed along to the original provided instance.
 * @param fn - The function instance to be called
 * @param thisArg - The value to be used as the `this` when calling the `fn`
 * @returns The value returned by the original `fn` after executing with the provided `thisArg`.
 * @since 0.9.8
 * @group Function
 * @example
 * ```ts
 * const module1 = {
 *     x: 21,
 *     getX() {
 *         return this.x;
 *     },
 * };
 *
 * // The 'this' parameter of 'getX' is bound to 'module'.
 * console.log(module1.getX()); // 21
 *
 * // Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
 * let module2 = {
 *     x: 42
 * };
 *
 * module2.getX = fnBind(module1.getX, module2);
 * module2.getX(); // 42
 *
 * // It can also be used to proxy to the original function from the new one
 * module2.getX = fnBind(module1.getX, module1);
 * module2.getX(); // 21
 * ```
 */
export declare const fnBind: <F extends Function, T>(fn: F, thisArg: T) => F;

/**
 * The `fnCall` function calls the function with the given `thisArg` as the `this` value and with
 * al of the `_args` provided as it's `arguments.
 *
 * > This is almost identical to `fnApply`, except that the function arguments are passed to `fnCall`
 * individually as a list, while with `fnApply` that are combined into a single array argument.
 *
 * Normally, when calling a function, the value of `this` inside the function is the object that the
 * function was accessed on. With `fnCall()`, you can pass an arbitrary value as the `this` when calling an
 * existing function, without first attaching the function to the object as a property. This allows you
 * to use methods of one object as generic utility functions.
 *
 * @since 0.9.8
 * @group Function
 *
 * @param fn - The function to be called
 * @param thisArg - The value of `this` provided for the call to `fn`. If the function is not in strict mode,
 * `null` and `undefined` will be replaced with the global object, and primitive values will be converted to objects.
 * @param _args - The zero or more arguments to be passed to the `fn` function.
 * @returns The result of calling the function with the specified `this` value and arguments.
 * @example
 * ```ts
 * // min / max number in an array
 * let max = fnCall(Math.max, null, 21, 42, 84, 168, 7, 3);
 * // 168
 *
 * let min = fnCall(Math.min, null, 21, 42, 84, 168, 7, 3);
 * // 3
 *
 * const module1 = {
 *     prefix: "Hello",
 *     x: 21,
 *     getX() {
 *         return this.x;
 *     },
 *     log(value: string) {
 *         return this.prefix + " " + value + " : " + this.x
 *     }
 * };
 *
 * // The 'this' parameter of 'getX' is bound to 'module'.
 * module1.getX(); // 21
 * module1.log("Darkness"); // Hello Darkness : 21
 *
 * // Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
 * let module2 = {
 *     prefix: "my",
 *     x: 42
 * };
 *
 * // Call the function of module1 with module2 as it's this
 * fnCall(module1.getX, module2); // 42
 * fnCall(module1.log, module2, "friend"); // my friend : 42
 * ```
 */
export declare const fnCall: <F extends (...args: any) => any, T>(fn: F, thisArg: T, ..._args: any[]) => ReturnType<F>;

/**
 * Deep copy handler to identify and copy functions. This handler just returns the original
 * function so the original function will be assigned to any new deep copied instance.
 * @since 0.4.4
 * @group Object - Deep Copy
 * @param details - The details object for the current property being copied
 * @returns `true` if the current value is a function otherwise `false`
 */
export declare function functionDeepCopyHandler(details: IObjDeepCopyHandlerDetails): boolean;

/**
 * Return the global `document` instance.
 * @group Environment
 * @returns
 */
export declare const getDocument: () => Document;

/**
 * Returns the current global scope object, for a normal web page this will be the current
 * window, for a Web Worker this will be current worker global scope via "self". The internal
 * implementation returns the first available instance object in the following order
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS standard)
 * - <null> (When all else fails)
 * While the return type is a Window for the normal case, not all environments will support all
 * of the properties or functions. And this caches the lookup of the global as in some environments
 * this can be an expensive operation.
 * @group Environment
 * @param useCached - [Optional] used for testing to bypass the cached lookup, when `true` this will
 * cause the cached global to be reset.
 */
export declare const getGlobal: (useCached?: boolean) => Window;

/**
 * Returns the global `history` instance
 * @group Environment
 * @returns
 */
export declare const getHistory: () => History | null;

/**
 * Return the named global object if available, will return null if the object is not available.
 * @group Environment
 * @param name The globally named object
 * @param useCached - [Optional] used for testing to bypass the cached lookup, when `true` this will
 * cause the cached global to be reset.
 * @example
 * ```ts
 * // This does not cause the evaluation to occur
 * window.myGlobal = "Hello";
 * let cachedValue = getInst("myGlobal");
 * // cachedValue === "Hello"
 *
 * window.myGlobal = "Darkness";
 * // getInst("myGlobal") === "Darkness"
 *
 * let promiseCls = getInst("Promise");
 * // May throw if the global is not supported by the runtime
 * // otherwise the Promise class.
 * ```
 */
export declare const getInst: <T>(name: string, useCached?: boolean) => T;

/**
 * Helper to obtain the integer value using base 10 conversion from a string,
 * also handles `null`, `undefined` and `Nan` cases which will all return the
 * default value.
 * @group Conversion
 * @group Value
 * @param value - The string or numeric value to get the integer value from
 * @param defValue - The default value if unsuccessful
 * @returns The default or parsed value.
 */
export declare function getIntValue(value?: string | number, defValue?: number): number;

/**
 * If Symbols are supported then get the property of the global Symbol, if Symbol's are
 * not supported and noPoly is true it returns null. Used to access the well known symbols.
 * @group Symbol
 * @param name - The property name to return (if it exists) for Symbol
 * @param noPoly - Flag indicating whether to return a polyfill if symbols are not supported.
 * @returns The value of the property if present
 * @example
 * ```ts
 * // If Symbol is supported in the runtime
 * getKnownSymbol("toStringTag") === Symbol.toStringTag;                // true
 * getKnownSymbol(WellKnownSymbols.toStringTag) === Symbol.toStringTag; // true
 * ```
 */
export declare function getKnownSymbol<T = symbol>(name: string | WellKnownSymbols, noPoly?: boolean): T;

/**
 * Create and return an readonly {@link ILazyValue} instance which will cache and return the value returned
 * by the callback function. The callback function will only be called once, multiple access of the value
 * does not cause re-execution of the callback as the result from the first call is cached internally.
 * @since 0.4.5
 * @group Lazy
 * @param cb - The callback function to fetch the value to be lazily evaluated and cached
 * @returns A new readonly {@link ILazyValue} instance which wraps the callback and will be used to cache
 * the result of the callback
 * @example
 * ```ts
 * // This does not cause the evaluation to occur
 * let cachedValue = getLazy(() => callSomeExpensiveFunction());
 * let theValue;
 *
 * // Just checking if there is an object still does not cause the evaluation
 * if (cachedValue) {
 *     // This will cause the evaluation to occur and the result will be cached
 *     theValue = cachedValue.v;
 * }
 *
 * // Accessing the value again will not cause the re-evaluation to occur, it will just return the same
 * // result value again.
 * theValue === cachedValue.v;  // true
 *
 * ```
 */
export declare function getLazy<T>(cb: () => T): ILazyValue<T>;

/**
 * Helper to return the length value of an object, this will return the value
 * of the "length" property. Generally used to return the length of a string or array.
 *
 * @since 0.4.2
 * @group Array
 * @group String
 * @group String
 * @group Array
 * @group Object
 * @param value - The value to return the length property from, must contain a `length` property
 * @example
 * ```ts
 * getLength("");               // returns 0
 * getLength("Hello World");    // returns 11
 * getLength([]);               // returns 0;
 * getLength([0, 1, 2, 3]);     // returns 4;
 * getLength({ length: 42});    // returns 42
 * getLength({ length: () => 53; }); // returns the function that if called would return 53
 * ```
 */
export declare const getLength: <T extends GetLengthImpl>(value: T) => T["length"];

/**
 * Interface to identify that an object contains the length property used as a type
 * constraint for {@link getLength}
 *
 * @since 0.4.2
 * @group String
 * @group Array
 * @group Object
 */
export declare interface GetLengthImpl {
    /**
     * Identifies the property that returns the length of the instance
     */
    length: unknown;
}

/**
 * Returns the global `navigator` instance
 * @group Environment
 * @returns
 */
export declare const getNavigator: () => Navigator;

/**
 * Returns the global `performance` Object if available, which can be used to
 * gather performance information about the current document. It serves as the
 * point of exposure for the Performance Timeline API, the High Resolution Time
 * API, the Navigation Timing API, the User Timing API, and the Resource Timing API.
 *
 * @since 0.4.4
 * @group Environment
 * @returns The global performance object if available.
 */
export declare function getPerformance(): Performance;

/**
 * If Symbols are supported then attempt to return the named Symbol
 * @group Symbol
 * @returns The value of the named Symbol (if available)
 */
export declare function getSymbol(): Symbol;

/**
 * Get the named value from the target object where the path is represented by the string iterator
 * or iterable to separate the nested objects of the heirarchy / path to the value. If the target
 * does not contain the full path the iterator will not be completed.
 *
 * The order of processing of the iterator is not reset if you add or remove elements to the iterator,
 * the actual behavior will depend on the iterator imeplementation.
 *
 * If the passed `iter` is both an Iterable<T> and Iterator<T> the Iterator<T> interface takes preceedence.
 * @since 0.9.1
 * @group Value
 * @param target - The source object that contains the value
 * @param iter - The iter identifying the path of the final key value
 * @param defValue - If the final value or any intervening object in the heirarchy is not present
 * the default value will be returned
 * @returns The value located based on the path or the defaule value
 * @example
 * ```ts
 * let theValue = {
 *   Hello: {
 *      Darkness: {
 *          my: "old"
 *      }
 *   },
 *   friend: "I've",
 *   come: {
 *      to: {
 *          see: "you"
 *      }
 *   }
 * };
 *
 * let value = getValueByKey(theValue, ["Hello", "Darkness", "my"], "friend");
 * // value === "my"
 *
 * let value = getValueByKey(theValue, ["My", "Old"], "friend");
 * // value === "friend"
 *
 * let value = getValueByKey(theValue, ["come", "to"], "friend");
 * // value === { see: "you" }
 *
 * let value = getValueByKey(theValue, ["friend"], "friend");
 * // value === "I've"
 * ```
 */
export declare function getValueByIter<V, T extends object = any>(target: T, iter: Iterator<string> | Iterable<string>, defValue?: V): V;

/**
 * Get the named value from the target object where the path may be presented by a string which
 * contains "." characters to separate the nested objects of the heirarchy / path to the value.
 * @since 0.9.1
 * @group Value
 * @param target - The source object that contains the value
 * @param path - The path identifing the location where the value should be located
 * @param defValue - If the final value or any intervening object in the heirarchy is not present
 * the default value will be returned
 * @returns The value located based on the path or the defaule value
 * @example
 * ```ts
 * let theValue = {
 *   Hello: {
 *      Darkness: {
 *          my: "old"
 *      }
 *   },
 *   friend: "I've",
 *   come: {
 *      to: {
 *          see: "you"
 *      }
 *   }
 * };
 *
 * let value = getValueByKey(theValue, "Hello.Darkness.my", "friend");
 * // value === "my"
 *
 * let value = getValueByKey(theValue, "My.Old", "friend");
 * // value === "friend"
 *
 * let value = getValueByKey(theValue, "come.to", "friend");
 * // value === { see: "you" }
 *
 * let value = getValueByKey(theValue, "friend", "friend");
 * // value === "I've"
 * ```
 */
export declare function getValueByKey<V, T extends object = any>(target: T, path: string, defValue?: V): V;

/**
 * Return the global `window` instance.
 * @group Environment
 * @returns
 */
export declare const getWindow: () => Window;

/**
 * Identify whether the runtime contains a `document` object
 * @group Environment
 * @returns - True if a `document` exists
 */
export declare const hasDocument: () => boolean;

/**
 * Identifies whether the runtime contains a `history` object
 * @group Environment
 * @returns
 */
export declare const hasHistory: () => boolean;

/**
 * Identifies if the runtime supports the `requestIdleCallback` API.
 *
 * @since 0.4.4
 * @group Timer
 * @group Environment
 *
 * @returns True if the runtime supports `requestIdleCallback` otherwise false.
 * @example
 * ```ts
 * let nativeIdleTimeouts = hasIdleCallback();
 * // true === idle timeouts are supported by the runtime otherwise false and the {@linke scheduleIdleCallback}
 * will use `setTimeout` instead.
 * ```
 */
export declare function hasIdleCallback(): boolean;

/**
 * Identify whether the runtimne contains a `navigator` object
 * @group Environment
 * @returns
 */
export declare const hasNavigator: () => boolean;

/**
 * Identify whether the runtimne contains a `performance` object
 *
 * @since 0.4.4
 * @group Environment
 * @returns
 */
export declare function hasPerformance(): boolean;

/**
 * Helper to identify whether the runtime support the Symbols either via native or an installed polyfill
 * @group Symbol
 * @returns true if Symbol's are support otherwise false
 */
export declare function hasSymbol(): boolean;

/**
 * Return whether the value appears to have any `value`, this helper returns true for
 * - value is not null, undefined or string value of "undefined"
 * - value === false
 * - value === 0
 * - An array with a length >= 1
 * - A valid Date
 * - If object has a `length` property or function and the returned value.length or value.length() !== 0
 * - If object has a `byteLength` property or function and the returned value.byteLength or value.byteLength() !== 0
 * - If object has a `size` property or function and the returned value.size or value.size() !== 0
 * - If object has a `valueOf` function then the returned value hasValue(value.valueOf()) to a maximum recursion of 5 levels
 * - If object with at least 1 key of it's own property (hasOwnProperty)
 * - else if isTruthy (empty string, etc)
 * @group Value Check
 * @param value - The value to be checked
 * @example
 * ```ts
 * // False
 * hasValue(null);                              // false
 * hasValue(undefined);                         // false
 * hasValue("undefined");                       // false (Special Case)
 * hasValue("");                                // false -- use: !strIsNullOrEmpty("")
 * hasValue([]);                                // false
 * hasValue(/[a-z]/g);                          // false
 * hasValue(new RegExp(""));                    // false
 * hasValue(new ArrayBuffer(0));                // false
 * hasValue(new Error("Test Error"));           // false
 * hasValue(new TypeError("Test TypeError"));   // false
 * hasValue(new TestError("Test TestError"));   // false
 * hasValue(Promise.reject());                  // false
 * hasValue(Promise.resolve());                 // false
 * hasValue(new Promise(() => {}));             // false
 * hasValue({});                                // false
 * hasValue(Object.create(null));               // false
 * hasValue(polyObjCreate(null));               // false
 *
 * // Objects with length / size property or function
 * hasValue({ length: 0 });                     // false
 * hasValue({ length: () => 0 });               // false
 * hasValue({ byteLength: 0 });                 // false
 * hasValue({ byteLength: () => 0 });           // false
 * hasValue({ size: 0 });                       // false
 * hasValue({ size: () => 0 });                 // false
 * hasValue({ count: 0 });                      // false
 * hasValue({ count: undefined as any });       // false
 * hasValue({ count: null as any });            // false
 * hasValue({ count: () => 0 });                // false
 * hasValue({ count: () => undefined as any }); // false
 * hasValue({ count: () => null as any });      // false
 * hasValue({ valueOf: () => undefined as any});// false
 * hasValue({ valueOf: () => null as any });    // false

 * // True
 * hasValue("null");                    // true
 * hasValue("0");                       // true
 * hasValue("1");                       // true
 * hasValue("aa");                      // true
 * hasValue(new Date());                // true
 * hasValue(0);                         // true
 * hasValue(1);                         // true
 * hasValue(_dummyFunction);            // true
 * hasValue(["A"]);                     // true
 * hasValue([0]);                       // true
 * hasValue([false]);                   // true
 * hasValue(new Array(1));              // true
 * hasValue(true);                      // true
 * hasValue(false);                     // true
 * hasValue("true");                    // true
 * hasValue("false");                   // true
 * hasValue((/[a-z]/g).exec("hello"));  // true
 * hasValue(new ArrayBuffer(1));        // true
 * hasValue(_dummyError());             // true
 * hasValue(_simplePromise());          // true
 * hasValue(_simplePromiseLike());      // true
 *
 * // Boolean objects
 * hasValue(new Boolean(true));         // true
 * hasValue(new Boolean(false));        // true
 * hasValue(new Boolean("true"));       // true
 * hasValue(new Boolean("false"));      // true
 * hasValue(new Boolean("0"));          // true
 * hasValue(new Boolean(0));            // true
 * hasValue(new Boolean("1"));          // true
 * hasValue(new Boolean(1));            // true
 *
 * // Boolean values
 * hasValue(Boolean(true));             // true
 * hasValue(Boolean(false));            // true
 * hasValue(Boolean("true"));           // true
 * hasValue(Boolean("false"));          // true
 * hasValue(Boolean("0"));              // true
 * hasValue(Boolean(0));                // true
 * hasValue(Boolean("1"));              // true
 * hasValue(Boolean(1));                // true

 * // Objects with length / size property or function
 * hasValue({ length: 1 });             // true
 * hasValue({ length: () => 1 });       // true
 * hasValue({ byteLength: 1 });         // true
 * hasValue({ byteLength: () => 1 });   // true
 * hasValue({ size: 1 });               // true
 * hasValue({ size: () => 1 });         // true
 * hasValue({ count: 1 });              // true
 * hasValue({ count: () => 1 });        // true
 * hasValue({ valueOf: () => 0 });      // true
 * hasValue({ valueOf: () => 1 });      // true
 * ```
 */
export declare function hasValue(value: any): boolean;

/**
 * Identify whether the runtime contains a `window` object
 * @group Environment
 * @returns
 */
export declare const hasWindow: () => boolean;

/**
 * Interface of the object returned by the {@link getLazy} instance
 * @since 0.4.5
 * @group Lazy
 */
export declare interface ILazyValue<T> {
    /**
     * Returns the current cached value from the lazy lookup, if the callback function has not yet occurred
     * accessing the value will cause the lazy evaluation to occur and the result will be returned.
     */
    v: T;
    /**
     * Identifies if this instance is bypassing the internal caching mechanism which is used for testing
     */
    b?: boolean;
}

/**
 * Context details passed to the deep copy handler to allow it parse the current value based on the original source
 * and path to reach the current value. The provided value should be updated with the value to by copied into the
 * new deep copy and will be used when the handler returns true.
 * @since 0.4.4
 * @group Object - Deep Copy
 */
export declare interface IObjDeepCopyHandlerDetails {
    /**
     * Identifies the type of the value as per `typeof value`, saves each check having to process this value.
     */
    type: string;
    /**
     * Identifies whether the type of the value is considered to be a primitive value
     */
    isPrim: boolean;
    /**
     * Identifies whether the type is a plain object or not, this also saves each handler from checking
     * the `type`, currently the type will also be "object" if this is `true`.
     * @since 0.9.6
     */
    isPlain: boolean;
    /**
     * The current value to be processed, replace this value with the new deep copied value to use when returning
     * true from the handler. Ignored when the handler returns false.
     */
    readonly value: any;
    /**
     * Replace this value with the new deep copied value (defaults to the same as the value property) this value will be
     * used when returning true from the handler. Ignored when the handler returns false.
     */
    result: any;
    /**
     * A array of keys from the orginal source (origin) object which lead to the current value
     */
    path: Array<string | number | symbol>;
    /**
     * The original source object passed into the `objDeepCopy()` or `objCopyProps()` functions.
     */
    origin?: any;
    /**
     * Continue the deep copy with the current context and recursive checks, effectively calls {@link objDeepCopy}
     * but keeps the current context and recursive references.
     * @param source - The source object to be copied
     */
    copy<T>(source: T, key?: string | number | symbol): T;
    /**
     * Continue the deep copy with the current context and recursive checks by copying all of the properties
     * from the source to the target instance, effectively calls {@link objCopyProps} but keeps the current context
     * and recursive references.
     * @param target - The target object to populated
     * @param source - The source object to copy the properties from
     */
    copyTo<T>(target: T, source: T): T;
}

/**
 * Checks if the type of value is an Array.
 *
 * @group Type Identity
 * @group Array
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a Array, false otherwise.
 * @example
 * ```ts
 * import { isArray, isObject } from "@nevware21/ts-utils";
 *
 * function performAction(value: any) {
 *     if (isArray(value) || isObject(value)) {
 *         // Do something
 *     } else {
 *         // Do something else
 *     }
 * }
 * ```
 */
export declare const isArray: <T = any>(arg: any) => arg is Array<T>;

/**
 * Checks if the type of value is a ArrayBuffer object.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a ArrayBuffer, false otherwise.
 */
export declare const isArrayBuffer: (value: any) => value is ArrayBuffer;

/**
 * Checks if the type of value is a Blob object.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a Blob, false otherwise.
 */
export declare const isBlob: (value: any) => value is Blob;

/**
 * Checks if the type of value is a boolean.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a boolean, false otherwise.
 */
export declare const isBoolean: (value: any) => value is boolean;

/**
 * Check if an object is of type Date
 * @group Type Identity
 * @example
 * ```ts
 * import { isDate } from "@nevware21/ts-utils";
 *
 * let _theDate = null;
 *
 * function getSetDate(newDate?: any) {
 *     _theDate = isDate(newDate) ? newDate : new Date();
 *
 *     return _theDate;
 * }
 * ```
 */
export declare const isDate: (value: any) => value is Date;

/**
 * Checks if the passed value is defined, which means it has any value and is not undefined.
 * A string value of "undefined" is considered to be defined.
 * @group Value Check
 * @param arg - The value to check
 * @returns true if arg has a value (is not === undefined)
 * @example
 * ```ts
 * isDefined(null);         // false
 * isDefined(undefined);    // false
 * isDefined("undefined");  // true
 *
 * let value = null;
 * isDefined(value);        // false
 * let value = undefined;
 * isDefined(value);        // false
 *
 * isDefined("");           // true
 * isDefined(0);            // true
 * isDefined(new Date());   // true
 * isDefined(true);         // true
 * isDefined(false);        // true
 * ```
 */
export declare function isDefined(arg: any): boolean;

/**
 * Checks if the type of value is a Error object.
 * @group Type Identity
 * @group Error
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a Error, false otherwise.
 */
export declare const isError: (value: any) => value is Error;

/**
 * Checks if the type of value is a File object.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a File, false otherwise.
 */
export declare const isFile: (value: any) => value is File;

/**
 * Checks if the type of value is a FormData object.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a FormData, false otherwise.
 */
export declare const isFormData: (value: any) => value is FormData;

/**
 * Checks to see if the past value is a function value
 * @group Type Identity
 * @param value - The value to check
 * @returns
 * @example
 * ```ts
 * function myFunction() { }
 * isFunction(null);            // false
 * isFunction(undefined);       // false
 * isFunction("null");          // false
 * isFunction("undefined");     // false
 * isFunction("1");             // false
 * isFunction("aa");            // false
 * isFunction(new Date());      // false
 * isFunction(1);               // false
 * isFunction("");              // false
 * isFunction(myFunction);      // true
 * isFunction([]);              // false
 * isFunction(new Array(1));    // false
 * ```
 */
export declare const isFunction: (value: any) => value is Function;

/**
 * Checks if the value looks like it is iterable, contains a [symbol.iterator].
 *
 * @since 0.4.0
 * @group Type Identity
 * @group Iterator
 * @typeParam T - Identifies the return type of the iterator
 * @param value - The value to be checked
 * @returns {boolean} True if the value is an Iterable, otherwise false
 * @example
 * ```ts
 * isIterable(null);        // false
 * isIterable(undefined);   // false
 * isIterable("null");      // true (Strings are iterable)
 * isIterable([]);          // true (Arrays are iterable)
 * ```
 */
export declare function isIterable<T = any>(value: any): value is Iterable<T>;

/**
 * Checks if the type of value looks like an iterator instance (contains a next function).
 *
 * @since 0.4.0
 * @group Type Identity
 * @group Iterator
 * @typeParam T - Identifies the return type of the iterator defaults to any
 * @param value - The value to be checked
 * @returns {boolean} True if the value is an Iterator, otherwise false
 * @example
 * ```ts
 * isIterator(null);        // false
 * isIterator(undefined);   // false
 * isIterator("null");      // false (Strings are iterable but not iterators)
 * isIterator([]);          // false (Arrays are iterable but not iterators)
 * isIterator({
 *     next: function() { return true }
 * });                      // true, iterators must contain a "next" function
 * ```
 */
export declare function isIterator<T = any>(value: any): value is Iterator<T>;

/**
 * Simple method to determine if we are running in a node environment
 * @group Environment
 * @returns True if you are
 */
export declare const isNode: () => boolean;

/**
 * Checks if the type of value does not evaluate to true value, handling some special
 * case usages of Boolean(true/false) and new Boolean(true/false).
 * @group Value Check
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is not truthy, false otherwise.
 */
export declare function isNotTruthy(value: any): boolean;

/**
 * Checks if the provided value is null, undefined or contains the string value of "undefined".
 * @group Type Identity
 * @group Value Check
 * @param value - The value to check
 * @returns `true` if the value is `null` or `undefined`
 * @example
 * ```ts
 * isNullOrUndefined(null);         // true
 * isNullOrUndefined(undefined);    // true
 * isNullOrUndefined("undefined");  // true
 *
 * let value = null;
 * isNullOrUndefined(value);        // true
 * let value = undefined;
 * isNullOrUndefined(value);        // true
 *
 * isNullOrUndefined("");           // false
 * isNullOrUndefined(0);            // false
 * isNullOrUndefined(new Date());   // false
 * isNullOrUndefined(true);         // false
 * isNullOrUndefined(false);        // false
 * ```
 */
export declare function isNullOrUndefined(value: any): boolean;

/**
 * Checks if the type of value is a number.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a number, false otherwise.
 */
export declare const isNumber: (value: any) => value is number;

/**
 * Checks to see if the past value is an object value
 * @group Type Identity
 * @group Object
 * @typeParam T - The object type, defaults to any
 * @param value - The value to check
 * @returns
 */
export declare function isObject<T>(value: T): value is T;

/**
 * Checks to see if the past value is a plain object (not a class/array) value.
 * Object are considered to be "plain" if they are created with no prototype `Object.create(null)`
 * or by using the Object global (native) function, all other "objects" ar
 * @since 0.4.4
 * @group Type Identity
 * @group Object
 * @param value - The value to check
 * @returns true if `value` is a normal plain object
 * @example
 * ```ts
 * console.log(isPlainObject({ 0: 'a', 1: 'b', 2: 'c' }));      // true
 * console.log(isPlainObject({ 100: 'a', 2: 'b', 7: 'c' }));    // true
 * console.log(isPlainObject(objCreate(null)));                 // true
 *
 * const myObj = objCreate({}, {
 *   getFoo: {
 *     value() { return this.foo; }
 *   }
 * });
 * myObj.foo = 1;
 * console.log(isPlainObject(myObj));                   // true
 *
 * console.log(isPlainObject(['a', 'b', 'c']));         // false
 * console.log(isPlainObject(new Date()));              // false
 * console.log(isPlainObject(new Error("An Error")));   // false
 * console.log(isPlainObject(null));                    // false
 * console.log(isPlainObject(undefined));               // false
 * console.log(isPlainObject("null"));                  // false
 * console.log(isPlainObject("undefined"));             // false
 * console.log(isPlainObject("1"));                     // false
 * console.log(isPlainObject("aa"));                    // false
 * ```
 */
export declare function isPlainObject(value: any): value is object;

/**
 * Identifies whether the provided value is a JavaScript [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
 * which is when is it not an object and has no methods or properties. There are 7 primitive data types:
 * - string
 * - number
 * - bigint
 * - boolean
 * - undefined
 * - null
 * - symbol
 *
 * Most of the time, a primitive value is represented directly at the lowest level of the language implementation.
 *
 * All primitives are immutable; that is, they cannot be altered. It is important not to confuse a primitive itself
 * with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value
 * can not be changed in the ways that objects, arrays, and functions can be altered. The language does not offer
 * utilities to mutate primitive values.
 * @since 0.4.4
 * @group Type Identity
 * @param value - The value to check whether it's a primitive value
 * @example
 * ```ts
 * isPrimitive(null);                   // true
 * isPrimitive(undefined);              // true
 * isPrimitive("null");                 // true
 * isPrimitive("undefined");            // true
 * isPrimitive("1");                    // true
 * isPrimitive("aa");                   // true
 * isPrimitive(1);                      // true
 * isPrimitive(Number(2));              // true
 * isPrimitive("");                     // true
 * isPrimitive(String(""));             // true
 * isPrimitive(true);                   // true
 * isPrimitive(false);                  // true
 * isPrimitive("true");                 // true
 * isPrimitive("false");                // true
 * isPrimitive(BigInt(42));             // true
 * isPrimitive(Symbol.for("Hello"));    // true
 *
 * isPrimitive(new String("aa"));       // false
 * isPrimitive(new Date());             // false
 * isPrimitive(_dummyFunction);         // false
 * isPrimitive([]);                     // false
 * isPrimitive(new Array(1));           // false
 * isPrimitive(new Boolean(true));      // false
 * isPrimitive(new Boolean(false));     // false
 * isPrimitive(new Boolean("true"));    // false
 * isPrimitive(new Boolean("false"));   // false
 * ```
 */
export declare const isPrimitive: (value: any) => value is string | number | bigint | boolean | symbol;

/**
 * Identifies whether the provided value is a JavaScript [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
 * which is when is it not an object and has no methods or properties. There are 6 primitive data types:
 * - string
 * - number
 * - bigint
 * - boolean
 * - undefined
 * - symbol
 *
 * Most of the time, a primitive value is represented directly at the lowest level of the language implementation.
 *
 * All primitives are immutable; that is, they cannot be altered. It is important not to confuse a primitive itself
 * with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value
 * can not be changed in the ways that objects, arrays, and functions can be altered. The language does not offer
 * utilities to mutate primitive values.
 * @since 0.9.6
 * @group Type Identity
 * @param theType - The type as a string value to be checked whther it's a primitive type, this should be the value
 * returned from `typeof value`.
 * @example
 * ```ts
 * isPrimitiveType(null);                   // false
 * isPrimitiveType(undefined);              // false
 * isPrimitiveType("null");                 // false
 * isPrimitiveType("undefined");            // false
 * isPrimitiveType("1");                    // false
 * isPrimitiveType("aa");                   // false
 * isPrimitiveType(1);                      // false
 * isPrimitiveType(Number(2));              // false
 * isPrimitiveType("");                     // false
 * isPrimitiveType(String(""));             // false
 * isPrimitiveType(true);                   // false
 * isPrimitiveType(false);                  // false
 * isPrimitiveType("true");                 // false
 * isPrimitiveType("false");                // false
 * isPrimitiveType(BigInt(42));             // false
 * isPrimitiveType(Symbol.for("Hello"));    // false
 *
 * isPrimitiveType("string");               // true
 * isPrimitiveType("number");               // true
 * isPrimitiveType("boolean");              // true
 * isPrimitiveType("undefined");            // true
 * isPrimitiveType("symbol");               // true
 * isPrimitiveType("bigint");               // true
 * ```
 */
export declare const isPrimitiveType: (theType: string) => boolean;

/**
 * Checks if the type of value is a Promise instance (contains then and catch functions).
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a Promise, false otherwise.
 */
export declare function isPromise<T>(value: any): value is Promise<T>;

/**
 * Checks if the type of value is a PromiseLike instance (contains a then function).
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a PromiseLike, false otherwise.
 */
export declare function isPromiseLike<T>(value: any): value is PromiseLike<T>;

/**
 * Determines if a value is a regular expression object.
 * @group Type Identity
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
export declare const isRegExp: (value: any) => value is RegExp;

/**
 * Checks if the provided value is null, undefined only, a string value of "undefined" is NOT considered
 * to be undefined.
 * @group Type Identity
 * @group Value Check
 * @param value - The value to check
 * @returns
 * @example
 * ```ts
 * isStrictNullOrUndefined(null);         // true
 * isStrictNullOrUndefined(undefined);    // true
 * isStrictNullOrUndefined("undefined");  // false
 *
 * let value = null;
 * isStrictNullOrUndefined(value);        // true
 * let value = undefined;
 * isStrictNullOrUndefined(value);        // true
 *
 * isStrictNullOrUndefined("");           // false
 * isStrictNullOrUndefined(0);            // false
 * isStrictNullOrUndefined(new Date());   // false
 * isStrictNullOrUndefined(true);         // false
 * isStrictNullOrUndefined(false);        // false
 * ```
 */
export declare function isStrictNullOrUndefined(value: any): boolean;

/**
 * Checks if the provided value is undefined, a string value of "undefined" is NOT considered
 * to be undefined.
 * @group Type Identity
 * @group Value Check
 * @param value - The value to check
 * @returns true if the typeof value === UNDEFINED
 * @example
 * ```ts
 * isStrictUndefined(undefined);    // true
 *
 * isStrictUndefined(null);         // false
 * isStrictUndefined("null");       // false
 * isStrictUndefined("undefined");  // false
 * isStrictUndefined("1");          // false
 * isStrictUndefined("aa");         // false
 * isStrictUndefined(new Date());   // false
 * isStrictUndefined(0);            // false
 * isStrictUndefined(1);            // false
 * isStrictUndefined("");           // false
 * ```
 */
export declare function isStrictUndefined(arg: any): arg is undefined;

/**
 * Checks to see if the past value is a string value
 * @group Type Identity
 * @group String
 * @param value - The value to check
 * @returns
 * @example
 * ```ts
 * isString("");            // true
 * isString("null");        // true
 * isString("undefined");   // true
 * isString(String(""));    // true
 *
 * isString(null);          // false
 * isString(undefined);     // false
 * isString(0);             // false
 * ```
 */
export declare const isString: (value: any) => value is string;

/**
 * Checks if the type of value is a symbol.
 * @group Symbol
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a symbol, false otherwise.
 */
export declare const isSymbol: (value: any) => value is symbol;

/**
 * Checks if the type of value is a PromiseLike instance (contains a then function).
 * This is an alias for {@link isPromiseLike}.
 * @group Type Identity
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is a PromiseLike, false otherwise.
 */
export declare const isThenable: <T>(value: any) => value is PromiseLike<T>;

/**
 * Checks if the type of value evaluates to true value, handling some special
 * case usages of Boolean(true/false) and new Boolean(true/false).
 * @group Value Check
 * @param {any} value - Value to be checked.
 * @return {boolean} True if the value is not truthy, false otherwise.
 */
export declare function isTruthy(value: any): boolean;

/**
 * Validate if the provided value object is of the expected type
 * @group Type Identity
 * @param value - The value to check
 * @param theType - The expected type name as a string
 * @returns `true` if the value matches the provided type
 */
export declare function isTypeof(value: any, theType: string): boolean;

/**
 * Checks if the provided value is undefined or contains the string value "undefined",
 * if you want to consider the string value as undefined see {@link isStrictUndefined}
 * @group Type Identity
 * @group Value Check
 * @param value - The value to check
 * @returns true if the value is undefined or "undefined", otherwise false
 * @example
 * ```ts
 * isUndefined(undefined);              // true
 * isUndefined("undefined");            // true
 *
 * isUndefined(null);                   // false
 * isUndefined("null");                 // false
 * isUndefined("1");                    // false
 * isUndefined("aa");                   // false
 * isUndefined(new Date());             // false
 * isUndefined(1);                      // false
 * isUndefined("");                     // false
 * isUndefined(_dummyFunction);         // false
 * isUndefined([]);                     // false
 * isUndefined(new Array(1));           // false
 * isUndefined(true);                   // false
 * isUndefined(false);                  // false
 * isUndefined("true");                 // false
 * isUndefined("false");                // false
 * isUndefined(new Boolean(true));      // false
 * isUndefined(new Boolean(false));     // false
 * isUndefined(new Boolean("true"));    // false
 * isUndefined(new Boolean("false"));   // false
 * isUndefined(Boolean(true));          // false
 * isUndefined(Boolean(false));         // false
 * isUndefined(Boolean("true"));        // false
 * isUndefined(Boolean("false"));       // false
 * isUndefined(new RegExp(""));         // false
 * isUndefined(new ArrayBuffer(0));     // false
 * isUndefined(new Error("Test Error"));// false
 * isUndefined(new TypeError("Test TypeError"));    // false
 * isUndefined(new TestError("Test TestError"));    // false
 * isUndefined(_dummyError());          // false
 * isUndefined(Promise.reject());       // false
 * isUndefined(Promise.resolve());      // false
 * isUndefined(new Promise(() => {}));  // false
 * isUndefined(_simplePromise());       // false
 * isUndefined(_simplePromiseLike());   // false
 * isUndefined(Object.create(null));    // false
 * isUndefined(polyObjCreate(null));    // false
 * ```
 */
export declare function isUndefined(value: any): boolean;

/**
 * Helper to identify if you are running as a Dedicated, Shared or Service worker
 * @group Environment
 * @returns True if the environment you are in looks like a Web Worker
 */
export declare const isWebWorker: () => boolean;

/**
 * Calls the provided `callbackFn` function once for each element in the iterator or iterator returned by
 * the iterable and processed in the same order as returned by the iterator. As with the {@link arrForEach}
 * you CAN stop / break the iteration by returning -1 from the`callbackFn` function.
 *
 * The order of processing is not reset if you add or remove elements to the iterator, the actual behavior
 * will depend on the iterator imeplementation.
 *
 * If the passed `iter` is both an Iterable<T> and Iterator<T> the Iterator<T> interface takes preceedence.
 * @remarks
 * If Symbols are NOT supported then the iterable MUST be using the same polyFill for the well know symbols,
 * if you are targetting a mixed environment you SHOULD either
 * - only use the polyfill Symbol's provided by this library
 * - ensure that you add any symbol polyfills BEFORE these utilities
 * iterForOf expects a `synchronous` function.
 * iterForOf does not wait for promises. Make sure you are aware of the implications while using
 * promises (or async functions) as forEach callback.
 *
 * @since 0.4.2
 * @group Iterator
 * @typeParam T - Identifies the element type of the iterator
 * @param callbackfn A `synchronous` function that accepts up to three arguments. iterForOf calls the
 * callbackfn function one time for each element returned by the iterator.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is
 * omitted, null or undefined the iterator will be used as the this value.
 * @throws Any exception thrown while processing the iterator
 * @example
 * ```ts
 * const items = {
 *     'item1': 'value1',
 *     'item2': 'value2',
 *     'item3': 'value3
 * };
 * const copyItems = [];
 *
 * iterForOf(items, (item) => {
 *   copyItems.push(item);
 *   // May return -1 to abort the iteration
 * });
 * ```
 */
export declare function iterForOf<T>(iter: Iterator<T> | Iterable<T>, callbackfn: (value: T, count?: number, iter?: Iterator<T>) => void | number, thisArg?: any): void;

/**
 * A Timer handler which is returned from {@link scheduleTimeout} which contains functions to
 * cancel or restart (refresh) the timeout function.
 *
 * @since 0.4.4
 * @group Timer
 */
export declare interface ITimerHandler {
    /**
     * Cancels a timeout that was previously scheduled, after calling this function any previously
     * scheduled timer will not execute.
     * @example
     * ```ts
     * let theTimer = scheduleTimeout(...);
     * theTimer.cancel();
     * ```
     */
    cancel(): void;
    /**
     * Reschedules the timer to call its callback at the previously specified duration
     * adjusted to the current time. This is useful for refreshing a timer without allocating
     * a new JavaScript object.
     *
     * Using this on a timer that has already called its callback will reactivate the timer.
     * Calling on a timer that has not yet executed will just reschedule the current timer.
     * @example
     * ```ts
     * let theTimer = scheduleTimeout(...);
     * // The timer will be restarted (if already executed) or rescheduled (if it has not yet executed)
     * theTimer.refresh();
     * ```
     */
    refresh(): ITimerHandler;
    /**
     * When called, requests that the event loop not exit so long when the ITimerHandler is active.
     * Calling timer.ref() multiple times will have no effect. By default, all ITimerHandler objects
     * will create "ref'ed" instances, making it normally unnecessary to call timer.ref() unless
     * timer.unref() had been called previously.
     * @since 0.7.0
     * @returns the ITimerHandler instance
     * @example
     * ```ts
     * let theTimer = createTimeout(...);
     *
     * // Make sure the timer is referenced (the default) so that the runtime (Node) does not terminate
     * // if there is a waiting referenced timer.
     * theTimer.ref();
     * ```
     */
    ref(): this;
    /**
     * When called, the any active ITimerHandler instance will not require the event loop to remain
     * active (Node.js). If there is no other activity keeping the event loop running, the process may
     * exit before the ITimerHandler instance callback is invoked. Calling timer.unref() multiple times
     * will have no effect.
     * @since 0.7.0
     * @returns the ITimerHandler instance
     * @example
     * ```ts
     * let theTimer = createTimeout(...);
     *
     * // Unreference the timer so that the runtime (Node) may terminate if nothing else is running.
     * theTimer.unref();
     * ```
     */
    unref(): this;
    /**
     * If true, any running referenced `ITimerHandler` instance will keep the Node.js event loop active.
     * @since 0.7.0
     * @example
     * ```ts
     * let theTimer = createTimeout(...);
     *
     * // Unreference the timer so that the runtime (Node) may terminate if nothing else is running.
     * theTimer.unref();
     * let hasRef = theTimer.hasRef(); // false
     *
     * theTimer.ref();
     * hasRef = theTimer.hasRef(); // true
     * ```
     */
    hasRef(): boolean;
    /**
     * Gets or Sets a flag indicating if the underlying timer is currently enabled and running.
     * Setting the enabled flag to the same as it's current value has no effect, setting to `true`
     * when already `true` will not {@link ITimerHandler.refresh | refresh}() the timer.
     * And setting to 'false` will {@link ITimerHandler.cancel | cancel}() the timer.
     * @since 0.8.1
     * @example
     * ```ts
     * let theTimer = createTimeout(...);
     *
     * // Check if enabled
     * theTimer.enabled; // false
     *
     * // Start the timer
     * theTimer.enabled = true;     // Same as calling refresh()
     * theTimer.enabled; //true
     *
     * // Has no effect as it's already running
     * theTimer.enabled = true;
     *
     * // Will refresh / restart the time
     * theTimer.refresh()
     *
     * let theTimer = scheduleTimeout(...);
     *
     * // Check if enabled
     * theTimer.enabled; // true
     * ```
     */
    enabled: boolean;
}

/**
 * Create and return an readonly {@link ILazyValue} instance which will cache and return the named global
 * value if available, will return `null` if the named global object is not available or if the runtime
 * throws an exception when attempting to access the global object.
 * Unlike {@link getInst} the value is cached after the first access, so if the global value changes after
 * the initial fetch the original cached value is still returned.
 * @since 0.9.5
 * @group Environment
 * @group Lazy
 * @group Safe
 * @param name The name of the global object to get.
 * @returns A new readonly {@link ILazyValue} instance which will lazily attempt to return the globally
 * available named instance.
 * @example
 * ```ts
 * // This does not cause the evaluation to occur
 * window.myGlobal = "Hello";
 * let cachedValue = lazySafeGetInst("myGlobal");
 * // cachedValue.v === "Hello"
 *
 * window.myGlobal = "Darkness";
 * // cachedValue.v === "Hello"
 *
 * let promiseCls = lazySafeGetInst("Promise");
 * // null if Promise is not supported in the runtime
 * // otherwise the Promise class.
 * ```
 */
export declare const lazySafeGetInst: <T>(name: string) => ILazyValue<T>;

/**
 * Create a simple glob style regular expression from the string value, converting `'**'`, `'*'` and `'?'`
 * characters. Unlike {@link createFilenameRegex} the `'*'` and `'?'` will NOT match folder seperator
 * characters `'/'` and `'\'`.
 * If the source string contains folder seperators both `'/'` and `'\'` are treated as synonomous
 * Each wildcard match will be captured as it's own group.
 * The supported matching values are
 * - `'**'` Matches any characters zero or more times include folder seperators `'/'` or `'\'`
 * - `'*'` Matches any characters zero or more times, except `'/'` or `'\'`
 * - `'?'` Matches any single character once only, except `'/'` or `'\'`
 * - `'/'` Matches either `'/'` or `'\'` character, not captured as a group
 * - `'\'` Matches either `'/'` or `'\'` character, not captured as a group
 *
 * @since 0.9.0
 * @group RegExp
 * @param value - The string value to converted.
 * @param ignoreCase - Flag to indicate whether the regular expression should be case-sensitive, Defaults
 * to false.
 * @param fullMatch - Flag to identify whether the RegExp should be wrapped with `'^'` and `'$'` to
 * incidate match the entire string only.
 * @returns The new Regular Expression created from the provided value.
 * @example
 * ```ts
 * let regex = makeGlobRegex("src\\**\\*.ts");
 *
 * let matches = regex.exec("Hello");
 * matches; // null
 *
 * let matches = regex.exec("Src/index.ts");
 * matches; // null - Specify the ignoreCase if you want this to match
 *
 * let matches = regex.exec("src/index.ts");
 * matches[0]; // "src/index.ts"
 * matches[1]; // undefined;
 * matches[2]; // "index"
 *
 * let matches = regex.exec("src\\index.ts");
 * matches[0]; // "src\\index.ts"
 * matches[1]; // undefined;
 * matches[2]; // "index"
 *
 * let matches = regex.exec("src/helpers/regexp.ts");
 * matches[0]; // "src/helpers/regexp.ts"
 * matches[1]; // "helpers/"
 * matches[2]; // "regexp"
 *
 * let matches = regex.exec("src\\helpers/regexp.ts");
 * matches[0]; // "src\\helpers/regexp.ts"
 * matches[1]; // "helpers/"
 * matches[2]; // "regexp"
 *
 * let matches = regex.exec(" src/index.tsx ");
 * matches[0]; // "src/index.ts"
 * matches[1]; // undefined
 * matches[2]; // "index"
 *
 * let matches = regex.exec(" src/helpers/regexp.ts. ");
 * matches[0]; // "src/helpers/regexp.ts"
 * matches[1]; // "helpers/"
 * matches[2]; // "regexp"]);
 * ```
 */
export declare function makeGlobRegex(value: string, ignoreCase?: boolean, fullMatch?: boolean): RegExp;

/**
 * Adds or replaces an iterable implementation that conforms to the `Iterable` protocol to the target instance, it
 * uses the provided `ctx` to create an `Iterator` via {@link createIterator}.
 *
 * @see [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
 * @since 0.4.2
 * @group Iterator
 * @typeParam T - Identifies the target type
 * @typeParam I - Identifies the type that will be returned by the iterator
 * @param ctx - The context used to manage the iteration over the items.
 * @returns A new Iterable instance
 * @example
 * ```ts
 * let current = 0;
 * let next = 1;
 * let done = false;
 * let fibCtx: CreateIteratorContext<number> = {
 *     n: function() {
 *         fibCtx.v = current;
 *         current = next;
 *         next = fibCtx.v + next;
 *
 *         // Return not done, so it will just continue
 *         return false;
 *     }
 * };
 *
 * let values: number[] = [];
 * let theIterable: Iterable<T> = makeIterable({}, fibCtx);
 *
 * iterForOf(theIterable, (value) => {
 *     values.push(value);
 *     if (values.length === 10) {
 *         return -1;
 *     }
 * });
 *
 * // Values: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * ```
 */
export declare function makeIterable<T, I>(target: T, ctx: CreateIteratorContext<I>): T & Iterable<I>;

/**
 * The `mathCeil()` function always rounds a number up to the next largest integer.
 * @group Math
 * @param x - A number
 * @returns The smallest integer greater than or equal to the given number.
 */
export declare const mathCeil: (x: number) => number;

/**
 * The `mathFloor()` function returns the largest integer less than or equal to a given number.
 * @group Math
 * @param x - A number
 * @returns A number representing the largest integer less than or equal to the specified number.
 */
export declare const mathFloor: (x: number) => number;

/**
 * The `mathMax()` function returns the largest of the zero or more numbers given as input
 * parameters, or NaN if any parameter isn't a number and can't be converted into one.
 *
 * If no arguments are given, the result is -Infinity.
 *
 * If at least one of arguments cannot be converted to a number, the result is NaN.
 *
 * @since 0.4.2
 * @group Math
 * @param values - Zero or more numbers among which the largest value will be selected and returned.
 * @returns The largest of the given numbers. If any one or more of the parameters cannot be
 * converted into a number, NaN is returned. The result is -Infinity if no parameters are provided.
 * @example
 * ```ts
 * mathMax(10, 20);   //  20
 * mathMax(-10, -20); // -10
 * mathMax(-10, 20);  //  20
 * ```
 */
export declare const mathMax: (...values: number[]) => number;

/**
 * The mathMin() function returns the lowest-valued number passed into it, or NaN if any
 * parameter isn't a number and can't be converted into one.
 *
 * If no arguments are given, the result is Infinity.
 *
 * If at least one of arguments cannot be converted to a number, the result is NaN.
 *
 * @since 0.4.2
 * @group Math
 * @param values - Zero or more numbers among which the lowest value will be selected and returned.
 * @returns The smallest of the given numbers. If any one or more of the parameters cannot
 * be converted into a number, NaN is returned. The result is Infinity if no parameters are provided.
 * @example
 * ```ts
 * const x = 10, y = -20;
 * const z = Math.min(x, y); // -20
 * ```
 */
export declare const mathMin: (...values: number[]) => number;

/**
 * Convert the provided value to an integer
 * @group Math
 * @param value - The value to be converted to an integer.
 * @param throwInfinity - [Optional] Throws RangeError if value is Infinity, defaults to false
 * @returns The value converted to an integer
 */
export declare function mathToInt(value: any, throwInfinity?: boolean): number;

/**
 * The `mathTrunc()` function returns the integer part of a number by removing any fractional digits.
 * Unlike the other three Math methods: Math.floor(), Math.ceil() and Math.round(), the way `mathTrunc()`
 * works is very simple. It truncates (cuts off) the dot and the digits to the right of it, no matter
 * whether the argument is a positive or negative number.
 * The argument passed to this method will be converted to number type implicitly.
 * @group Math
 * @param value - The value to be truncated
 * @returns The integer path of the given number
 */
export declare const mathTrunc: (x: number) => number;

/**
 * Returns a new unique Symbol value. If noPoly is true and symbols are not supported
 * then this will return null.
 * @group Symbol
 * @param description Description of the new Symbol object.
 * @param noPoly - Flag indicating whether to return a polyfil if symbols are not supported.
 * @returns The new symbol
 */
export declare function newSymbol(description?: string | number, noPoly?: boolean): symbol;

/**
 * Validates that the string name conforms to the JS IdentifierName specification and if not
 * normalizes the name so that it would. This method does not identify or change any keywords
 * meaning that if you pass in a known keyword the same value will be returned.
 * @since 0.9.0
 * @group Conversion
 * @group Value
 * @param jsName - The string value to validate
 * @param camelCase - Optionally (see [1]) convert into CamelCase with the leading character either
 * - `true` => lowercase
 * - 'false' => uppercase
 * - undefined => not converted
 * @return The original string name, if it conforms to the JS naming convention otherwise an encoded version.
 *
 * > **[1]**: Camel casing the name will remove all non-word characters from the result
 * so you will NOT end up with any leading, embedded or trailing `_` characters which may cause
 * duplicate results for different string values.
 * @example
 * ```ts
 * normalizeJsName("HelloDarkness"); // "HelloDarkness"
 * normalizeJsName("Hello Darkness"); // "Hello_Darkness"
 * normalizeJsName("hello Darkness"); // "hello_Darkness"
 * normalizeJsName("hello Darkness"); // "hello_Darkness"
 * normalizeJsName("hello.Darkness"); // "hello_Darkness"
 * normalizeJsName("hello-Darkness"); // "hello_Darkness"
 * normalizeJsName("hello_Darkness"); // "hello_Darkness"
 * normalizeJsName("abc-123"); // "abc_123"
 * normalizeJsName("0abc0"); // "0abc0"
 * normalizeJsName("\"HelloDarkness\""); // "_HelloDarkness_"
 * normalizeJsName("\"Hello Darkness\""); // "_Hello_Darkness_"
 * normalizeJsName("\"hello Darkness\""); // "_hello_Darkness_"
 * normalizeJsName("\"hello Darkness\""); // "_hello_Darkness_"
 * normalizeJsName("\"hello .,#[]Darkness\""); // "_hello______Darkness_"
 *
 * normalizeJsName("HelloDarkness", true); // "helloDarkness"
 * normalizeJsName("Hello Darkness", true); // "helloDarkness"
 * normalizeJsName("hello Darkness", true); // "helloDarkness"
 * normalizeJsName("hello Darkness", true); // "helloDarkness"
 * normalizeJsName("hello.Darkness", true); // "helloDarkness"
 * normalizeJsName("hello-Darkness", true); // "helloDarkness"
 * normalizeJsName("hello_Darkness", true); // "helloDarkness"
 * normalizeJsName("abc-123", true); // "abc123"
 * normalizeJsName("0abc0", true); // "0abc0"
 * normalizeJsName("\"HelloDarkness\"", true); // "helloDarkness"
 * normalizeJsName("\"Hello Darkness\"", true); // "helloDarkness"
 * normalizeJsName("hello \"Darkness\"", true); // "helloDarkness"
 * normalizeJsName("hello \"Darkness\"", true); // "helloDarkness"
 * normalizeJsName("\"hello .,#[]Darkness\"", true); // "helloDarkness"
 * ```
 */
export declare function normalizeJsName(jsName: string, camelCase?: boolean): string;

/**
 * The `objAssign()` method copies all enumerable own properties from one or more source objects
 * to a target object. It returns the modified target object.
 *
 * Properties in the target object are overwritten by properties in the sources if they have the
 * same key. Later sources' properties overwrite earlier ones.
 *
 * The objAssign() method only copies enumerable and own properties from a source object to a
 * target object. It uses `Get` on the source and `Set` on the target, so it will invoke
 * [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and
 * [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).
 * Therefore it assigns properties, versus copying or defining new properties. This may make it
 * unsuitable for merging new properties into a prototype if the merge sources contain getters.
 *
 * For copying property definitions (including their enumerability) into prototypes, use
 * {@link objGetOwnPropertyDescriptor} and {@link objDefineProp} instead.
 *
 * Both String and Symbol properties are copied.
 *
 * In case of an error, for example if a property is non-writable, a TypeError is raised, and
 * the target object is changed if any properties are added before the error is raised.
 * @group Object
 * @example
 * ```ts
 * const obj = { a: 1 };
 * const copy = objAssign({}, obj);
 * console.log(copy); // { a: 1 }
 *
 * const o1 = { a: 1 };
 * const o2 = { b: 2 };
 * const o3 = { c: 3 };
 *
 * const obj = objAssign(o1, o2, o3);
 * console.log(obj); // { a: 1, b: 2, c: 3 }
 * console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
 * ```
 */
export declare const objAssign: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T_1 extends {}, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2 extends {}, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};

/**
 * Object helper to copy all of the enumerable properties from the source object to the target, the
 * properties are copied via {@link objDeepCopy}. Automatic handling of recursive properties was added in v0.4.4
 * @group Object
 * @param target - The target object to populated
 * @param source - The source object to copy the properties from
 * @param handler - An optional callback that lets you provide / overide the deep cloning (Since 0.4.4)
 * @returns The target object
 * @example
 * ```ts
 * let a: any = { a: 1 };
 * let b: any = { b: 2, d: new Date(), e: new TestClass("Hello Darkness") };
 * a.b = b;        // { a: 1, b: { b: 2} }
 * b.a = a;        // { a: 1, b: { b: 2, a: { a: 1, { b: 2, a: ... }}}}
 *
 * function copyHandler(details: IObjDeepCopyHandlerDetails) {
 *     // details.origin === a
 *     // details.path[] is the path to the current value
 *     if (details.value && isDate(details.value)) {
 *         // So for the date path === [ "b", "d" ] which represents
 *         // details.origin["b"]["d"] === The Date
 *
 *         // Create a clone the Date object and set as the "newValue"
 *         details.value = new Date(details.value.getTime());
 *
 *         // Return true to indicate that we have "handled" the conversion
 *         // See objDeepCopy example for just reusing the original value (just don't replace details.value)
 *         return true;
 *     }
 *
 *     return false;
 * }
 *
 * let c: any = objCopyProps({}, a, copyHandler);
 *
 * assert.notEqual(a, c, "check a and c are not the same");
 * assert.ok(c !== c.b.a, "The root object won't be the same for the target reference as are are copying properties to our target");
 * assert.ok(c.b === c.b.a.b, "Check that the 2 'b' references are the same object");
 * assert.ok(c.b.a === c.b.a.b.a, "Check that the 2 'a' references are the same object");
 * assert.ok(c.b.d === c.b.a.b.d, "Check that the 2 'd' references are the same object");
 * assert.ok(isDate(c.b.d), "The copied date is still real 'Date' instance");
 * assert.notEqual(c.b.d, a.b.d, "And the copied date is not the same as the original");
 * assert.equal(c.b.d.getTime(), a.b.d.getTime(), "But the dates are the same");
 *
 * assert.ok(isObject(c.b.d), "The copied date is now an object");
 * ```
 */
export declare function objCopyProps<T>(target: T, source: any, handler?: ObjDeepCopyHandler): any;

/**
 * Creates an object that has the specified prototype, and that optionally contains specified properties. This helper exists to avoid adding a polyfil
 * for older browsers that do not define Object.create eg. ES3 only, IE8 just in case any page checks for presence/absence of the prototype implementation.
 * Note: For consistency this will not use the Object.create implementation if it exists as this would cause a testing requirement to test with and without the implementations
 * @group Object
 * @param obj Object to use as a prototype. May be null
 */
export declare const objCreate: {
    (o: object): any;
    (o: object, properties: PropertyDescriptorMap & ThisType<any>): any;
};

/**
 * Performs a deep copy of the source object, this is designed to work with base (plain) objects, arrays and primitives
 * if the source object contains class objects they will either be not cloned or may be considered non-operational after
 * performing a deep copy. ie. This is performing a deep copy of the objects properties so that altering the copy will
 * not mutate the source object hierarchy.
 * Automatic handling of recursive properties was added in v0.4.4.
 * @group Object
 * @group Object - Deep Copy
 * @param source - The source object to be copied
 * @param handler - An optional callback that lets you provide / overide the deep cloning (Since 0.4.4)
 * @return A new object which contains a deep copy of the source properties
 * @example
 * ```ts
 * let a: any = { a: 1 };
 * let b: any = { b: 2, d: new Date(), e: new TestClass("Hello Darkness") };
 * a.b = b;        // { a: 1, b: { b: 2} }
 * b.a = a;        // { a: 1, b: { b: 2, a: { a: 1, { b: 2, a: ... }}}}
 *
 * function copyHandler(details: IObjDeepCopyHandlerDetails) {
 *     // details.origin === a
 *     // details.path[] is the path to the current value
 *     if (details.value && isDate(details.value)) {
 *         // So for the date path === [ "b", "d" ] which represents
 *         // details.origin["b"]["d"] === The Date
 *
 *         // Return true to indicate that we have "handled" the conversion
 *         // Which in this case will reuse the existing instance (as we didn't replace details.value)
 *         // See objCopyProps example for replacing the Date instance
 *         return true;
 *     }
 *
 *     return false;
 * }
 *
 * let c: any = objDeepCopy(a, copyHandler);
 *
 * assert.notEqual(a, c, "check a and c are not the same");
 * assert.ok(c === c.b.a, "The root object won't be the same for the target reference");
 * assert.ok(c.b === c.b.a.b, "Check that the 2 'b' references are the same object");
 * assert.ok(c.b.a === c.b.a.b.a, "Check that the 2 'a' references are the same object");
 * assert.ok(c.b.d === c.b.a.b.d, "Check that the 2 'd' references are the same object");
 * assert.ok(isDate(c.b.d), "The copied date is still real 'Date' instance");
 * assert.equal(c.b.d, a.b.d, "And the copied date is the original date");
 * assert.equal(c.b.d.getTime(), a.b.d.getTime(), "But the dates are the same");
 * assert.ok(isObject(c.b.d), "The copied date is now an object");
 * assert.ok(!isError(c.b.e), "The copied error is no longer a real 'Error' instance");
 * assert.ok(isObject(c.b.e), "The copied error is now an object");
 * assert.equal(42, c.b.e.value, "Expect that the local property was copied");
 * ```
 */
export declare function objDeepCopy<T>(source: T, handler?: ObjDeepCopyHandler): T;

/**
 * An optional deep copy handler that lets you provide your own logic for deep copying objects, will
 * only be called once per object/property combination, so if an object is recursively included it
 * will only get called for the first instance.
 * Handlers SHOULD assign the "result" value with the new target instance BEFORE performing any additional deep copying,
 * so any recursive objects will get a reference to the new instance and not keep attempting to create new copies.
 * @since 0.4.4
 * @group Object - Deep Copy
 * @return true if handled and the value in details should be used otherwise false to continue with the default handling
 * The library includes several helpers which can be reused by any user provided handler
 * - {@link functionDeepCopyHandler} - Used to copy functions
 * - {@link arrayDeepCopyHandler} - Used to copy arrays
 * - {@link plainObjDeepCopyHandler} - Used to copy plain objects
 * - {@link dateDeepCopyHandler} - Used to copy date instances
 */
export declare type ObjDeepCopyHandler = (details: IObjDeepCopyHandlerDetails) => boolean;

/**
 * Perform a deep freeze on the object and all of it's contained values / properties by recursively calling
 * `objFreeze()` on all enumerable properties of the object and on each property returned.
 * @group Object
 * @param value - the object to be completly frozen.
 * @returns The originally passed in object.
 */
export declare function objDeepFreeze<T>(value: T): T;

/**
 * The objDefine() method defines a new or modifies an existing single property accessors for the target object based
 * on the configuration defined for the propDesc argument of type {@link ObjDefinePropDescriptor}. This will call
 * {@link objDefineProp} after creating the required PropertyDescriptor populating defaults for the propDesc values.
 * Note, the default values (true) for `configurable` and `enumerable` are different from the defaults provided by objDefineProp.
 * @since 0.6.0
 * @group Object
 * @param target - The object on which to define the property.
 * @param key - The name of the property to be defined or modified
 * @param propDesc - An object which defines the Property Descriptor mappings for the mapping.
 * @returns The target object.
 */
export declare function objDefine<T>(target: T, key: keyof T, propDesc: ObjDefinePropDescriptor): T;

/**
 * Try to define get/set object property accessors for the target object/prototype, this will provide compatibility with
 * existing API definition when run within an ES5+ container that supports accessors but still enable the code to be loaded
 * and executed in an ES3 container, providing basic IE8 compatibility.
 * @deprecated It is recommended that you use {@link objDefine} instead {@link objDefineAccessors} as this internally creates
 * the {@link ObjDefinePropDescriptor} definition based on your provided arguments. And only using a minimum set of functions
 * reduces your overall bundle size.
 * @group Object
 * @param target - The object on which to define the property.
 * @param prop - The name of the property to be defined or modified.
 * @param getProp - The getter function to wire against the getter.
 * @param setProp - The setter function to wire against the setter.
 * @param configurable - Can the value be changed, defaults to true
 * @param enumerable - Should this get property be enumerable, defaults to true.
 * @returns The object that was passed to the function
 */
export declare function objDefineAccessors<T, V = any>(target: T, prop: PropertyKey, getProp?: (() => V) | null, setProp?: ((v: V) => void) | null, configurable?: boolean, enumerable?: boolean): T;

/**
 * Try to define a get object property accessor for the target object, if a function is past as the value this will
 * be assumed to be a getter function and NOT the value.
 * @deprecated It is recommended that you use {@link objDefine} instead {@link objDefineGet} or {@link objDefineAccessors}
 * as it provides a deterministic way for identifying whether the value is a value or a function rather than wrapping any
 * function value in another function.
 * @group Object
 * @param target - The object on which to define the property.
 * @param key - The name of the property to be defined or modified
 * @param value - The value or a function that returns the value
 * @param configurable - Can the value be changed, defaults to true.
 * @param enumerable - Should this get property be enumerable, defaults to true.
 * @returns The object that was passed to the function
 */
export declare function objDefineGet<T, V = any>(target: T, key: PropertyKey, value: (() => V) | V, configurable?: boolean, enumerable?: boolean): T;

/**
 * Defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
 * This is a wrapper for [Object.defineProperty](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/defineproperty)
 *
 * This method allows a precise addition to or modification of a property on an object. Normal property addition through
 * assignment creates properties which show up during property enumeration (for...in loop or objKeys method), whose
 * values may be changed, and which may be deleted. This method allows these extra details to be changed from their
 * defaults. By default, properties added using objDefineProp() are not writable, not enumerable, and not configurable.
 *
 * Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. A data
 * descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property
 * described by a getter-setter pair of functions. A descriptor must be one of these two flavors; it cannot be both.
 *
 * This is an alias for Object.defineProperty
 * @group Object
 * @param target - The object on which to define the property.
 * @param key - The name or Symbol of the property to be defined or modified.
 * @param descriptor - The descriptor for the property being defined or modified.
 */
export declare const objDefineProp: <T>(target: T, key: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>) => T;

/**
 * Definition of the Property Descriptor mappings for the objDefine functions.
 * If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor.
 * If a descriptor has both [value or writable] and [get or set] keys, an exception is thrown.
 * Bear in mind that these attributes are not necessarily the descriptor's own properties. Inherited
 * properties will be considered as well. In order to ensure these defaults are preserved, you might
 * freeze existing objects in the descriptor object's prototype chain upfront, specify all options
 * explicitly, or point to null with {@link objCreate}(null).
 * @since 0.6.0
 * @group Object
 */
export declare interface ObjDefinePropDescriptor<V = any> {
    /**
     * Identifies if this property should be configurable (true) when this value is set to false,
     * - the type of this property cannot be changed between data property and accessor property, and
     * - the property may not be deleted, and
     * - other attributes of its descriptor cannot be changed (however, if it's a data descriptor with writable: true,
     * the value can be changed, and writable can be changed to false).
     * Defaults to true.
     */
    c?: boolean;
    /**
     * Identifies if this property will be visible during enumeration of the properties on the corresponding object.
     * Defaults to true.
     */
    e?: boolean;
    /**
     * __data descriptor__
     * The value associated with the property. Can be any valid JavaScript value (number, object, function, etc.).
     * Defaults to undefined.
     */
    v?: V;
    /**
     * A Lazy value instance which will be used to return the value, this will be wrapped in a getter function.
     * @since 0.9.4
     */
    l?: ILazyValue<V>;
    /**
     * true if the value associated with the property may be changed with an assignment operator. Defaults to false.
     */
    w?: boolean;
    /**
     * A function which serves as a getter for the property, or undefined if there is no getter. When the property
     * is accessed, this function is called without arguments and with this set to the object through which the
     * property is accessed (this may not be the object on which the property is defined due to inheritance). The
     * return value will be used as the value of the property. Defaults to undefined.
     */
    g?(): V;
    /**
     * A function which serves as a setter for the property, or undefined if there is no setter. When the property
     * is assigned, this function is called with one argument (the value being assigned to the property) and with
     * this set to the object through which the property is assigned. Defaults to undefined.
     * @param value
     */
    s?(value: V): void;
}

/**
 * An object whose keys represent the names of properties to be defined or modified and whose values are objects
 * describing those properties. Each value in props must be either a data descriptor or an accessor descriptor;
 * it cannot be both (see {@link ObjDefinePropDescriptor} for more details).
 * @since 0.6.0
 * @group Object
 */
export declare type ObjDefinePropDescriptorMap = {
    [key: PropertyKey]: ObjDefinePropDescriptor;
};

/**
 * The objDefineProperties() method defines new or modifies existing properties directly on an object, returning the object.
 * This is a wrapper for [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
 * @since 0.6.0
 * @group Object
 * @param target - The object on which to define or modify properties.
 * @param props - An object whose keys represent the names of properties to be defined or modified and whose values are
 * objects describing those properties. Each value in props must be either a data descriptor or an accessor descriptor;
 * it cannot be both (see {@link ObjDefinePropDescriptorMap} for more details).
 * @returns
 */
export declare const objDefineProperties: <T>(target: T, props: PropertyDescriptorMap & ThisType<any>) => T;

/**
 * The objDefineProps() method defines new or modifies existing properties directly for the target object using the keys
 * and configuration from the propDescMap argument. This will call {@link objDefineProperties} after creating the required
 * PropertyDescriptorMap from the propDescMap values.
 * Note, the default values (true) for `configurable` and `enumerable` are different from the defaults provided by objDefineProperties.
 * @since 0.6.0
 * @group Object
 * @param target - The object on which to define or modify properties.
 * @param propDescMap - An object whose keys represent the names of properties to be defined or modified and whose values are
 * objects describing those properties. Each value in props must be either a data descriptor or an accessor descriptor;
 * it cannot be both (see {@link ObjDefinePropDescriptorMap} for more details).
 * @returns The target object.
 */
export declare function objDefineProps<T>(target: T, propDescMap: ObjDefinePropDescriptorMap): T;

/**
 * Returns an array of key/values of the enumerable properties of an object
 * @since 0.9.7
 * @group Object
 * @group ArrayLike
 * @param value Object that contains the properties and methods.
 * @example
 * ```ts
 * objEntries({ Hello: "Darkness", my: "old", friend: "." });
 * // [ [ "Hello", "Darkness" ], [ "my", "old"], [ "friend", "." ] ]
 *
 * // Array-like object
 * objEntries({ 0: "a", 1: "b", 2: "c" }));
 * // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
 *
 * // Array-like object with random key ordering
 * objEntries({ 100: "a", 2: "b", 7: "c" });
 * // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]*
 * ```
 */
export declare const objEntries: <T = any>(value: {} | {
    [s: string]: T;
} | ArrayLike<T>) => [string, T][];

/**
 * Extend the target object by merging the passed arguments into it
 * @group Object
 * @param target - The object to be extended or overwritten
 * @param theArgs - The optional number of arguments to be copied
 * @returns - A new object or the original
 */
export declare function objExtend<T>(target: T, ...theArgs: any): T & any;

/**
 * Calls the provided `callbackFn` function once for each key in an object. This is equivelent to `arrForEach(Object.keys(theObject), callbackFn)` or
 * if not using the array helper `Object.keys(theObject).forEach(callbackFn)` except that this helper avoid creating a temporary of the object
 * keys before iterating over them and like the `arrForEach` helper you CAN stop or break the iteration by returning -1 from the `callbackFn` function.
 * @group Object
 * @typeParam T - The object type
 * @param callbackfn  A function that accepts up to two arguments, the key name and the current value of the property represented by the key.
 * @param thisArg  [Optional] An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, null or undefined
 * the object will be used as the this value.
 * @example
 * ```ts
 * function performAction<T>(target: T, source: any) {
 *    if (!isNullOrUndefined(source)) {
 *        objForEachKey(source, (key, value) => {
 *            // Set the target with a reference to the same value with the same name
 *            target[key] = value;
 *        });
 *    }
 *
 *    return target;
 * }
 * ```
 */
export declare function objForEachKey<T>(theObject: T, callbackfn: (key: string, value: T[keyof T]) => void | number, thisArg?: any): void;

/**
 * The `objFreeze()` method freezes an object. A frozen object can no longer be changed; freezing an object
 * prevents new properties from being added to it, existing properties from being removed, prevents changing the
 * enumerability, configurability, or writability of existing properties, and prevents the values of existing
 * properties from being changed. In addition, freezing an object also prevents its prototype from being changed.
 * `objFreeze()` returns the same object that was passed in.
 *
 * Nothing can be added to or removed from the properties set of a frozen object. Any attempt to do so will fail,
 * either silently or by throwing a TypeError exception (most commonly, but not exclusively, when in strict mode).
 *
 * For data properties of a frozen object, values cannot be changed, the writable and configurable attributes are
 * set to false. Accessor properties (getters and setters) work the same (and still give the illusion that you are
 * changing the value). Note that values that are objects can still be modified, unless they are also frozen. As
 * an object, an array can be frozen; after doing so, its elements cannot be altered and no elements can be added
 * to or removed from the array.
 *
 * `objFreeze()` returns the same object that was passed into the function. It does not create a frozen copy.
 * @group Object
 * @param value - The object to freeze.
 * @returns The object that was passed to the function.
 */
export declare const objFreeze: <T>(value: T) => T;

/**
 * The objGetOwnPropertyDescriptor() method returns an object describing the configuration of a specific property on
 * a given object (that is, one directly present on an object and not in the object's prototype chain). The object
 * returned is mutable but mutating it has no effect on the original property's configuration.
 * @since 0.4.3
 * @group Object
 * @param target - Object that contains the property.
 * @param prop - Name of the property.
 * @returns A property descriptor of the given property if it exists on the object, otherwise undefined.
 *
 * @example
 * ```ts
 * o = {};
 * objDefineProp(o, 'qux', {
 *   value: 8675309,
 *   writable: false,
 *   enumerable: false
 * });
 * d = objGetOwnPropertyDescriptor(o, 'qux');
 * // d is {
 * //   value: 8675309,
 * //   writable: false,
 * //   enumerable: false,
 * //   configurable: false
 * // }
 *
 * objGetOwnPropertyDescriptor('foo', 0);
 * // TypeError: "foo" is not an object  // ES5 code
 *
 * objGetOwnPropertyDescriptor('foo', 0);
 * // Object returned by ES2015 code: {
 * //   configurable: false,
 * //   enumerable: true,
 * //   value: "f",
 * //   writable: false
 * // }
 * ```
 * Note: In ES5, if the first argument to this method is not an object (a primitive), then it will cause a TypeError. In ES2015, a non-object first argument will be coerced to an object at first.
 */
export declare const objGetOwnPropertyDescriptor: (target: any, prop: PropertyKey) => PropertyDescriptor | undefined;

/**
 * The objGetPrototypeOf() method returns the prototype (i.e. the value of the internal `Prototype` property)
 * of the specified value.
 * @since 0.4.4
 * @group Object
 * @param value - The object whose prototype is to be returned, which may be null.
 */
export declare const objGetPrototypeOf: (value: any) => any;

/**
 * The objHasOwn() method returns a boolean indicating whether the object
 * has the specified property as its own property (as opposed to inheriting it).
 * If the property is inherited, or does not exist, the method returns false.
 *
 * The objHasOwn() method returns true if the specified property is a direct property
 * of the object — even if the property value is null or undefined. The method returns
 * false if the property is inherited, or has not been declared at all. Unlike the in operator,
 * this method does not check for the specified property in the object's prototype chain.
 *
 * It is recommended over {@link objHasOwnProperty} () because it works for objects created using
 * objCreate(null) and with objects that have overridden the inherited hasOwnProperty() method.
 * While it is possible to workaround these problems by calling Object.prototype.hasOwnProperty()
 * on an external object, Object.hasOwn() is more intuitive.
 *
 * @since 0.4.3
 * @group Object
 * @param obj - The object being evaluated
 * @param prop - The String or Symbol of the property to test
 * @returns `true` if the object has the specified property as own property; otherwise `false`
 * @example
 * ```ts
 * let example = {};
 * objHasOwn(example, 'prop');   // false
 *
 * example.prop = 'exists';
 * objHasOwn(example, 'prop');   // true - 'prop' has been defined
 *
 * example.prop = null;
 * objHasOwn(example, 'prop');   // true - own property exists with value of null
 *
 * example.prop = undefined;
 * objHasOwn(example, 'prop');   // true - own property exists with value of undefined
 * ```
 */
export declare const objHasOwn: <T = any>(obj: T, prop: PropertyKey) => boolean;

/**
 * The objHasOwnProperty() method returns a boolean indicating whether the object
 * has the specified property as its own property (as opposed to inheriting it).
 *
 * The objHasOwnProperty() method returns true if the specified property is a direct
 * property of the object — even if the value is null or undefined. The method returns
 * false if the property is inherited, or has not been declared at all. Unlike the in
 * operator, this method does not check for the specified property in the object's
 * prototype chain.
 *
 * The method can be called on most JavaScript objects, because most objects descend
 * from Object, and hence inherit its methods. For example Array is an Object, so you
 * can use objHasOwnProperty() method to check whether an index exists:
 * @group Object
 * @param obj - The object being evaluated
 * @param prop - The String or Symbol of the property to test
 * @returns `true` if the object has the specified property as own property; otherwise `false`
 * @example
 * ```ts
 * let example = {};
 * objHasOwnProperty(example, 'prop');   // false
 *
 * example.prop = 'exists';
 * objHasOwnProperty(example, 'prop');   // true - 'prop' has been defined
 *
 * example.prop = null;
 * objHasOwnProperty(example, 'prop');   // true - own property exists with value of null
 *
 * example.prop = undefined;
 * objHasOwnProperty(example, 'prop');   // true - own property exists with value of undefined
 * ```
 */
export declare function objHasOwnProperty<T = any>(obj: T, prop: PropertyKey): boolean;

/**
 * The `objKeys()` method returns an array of a given object's own enumerable property names, iterated in
 * the same order that a normal loop would.
 *
 * objKeys() returns an array whose elements are strings corresponding to the enumerable properties found
 * directly upon object. The ordering of the properties is the same as that given by looping over the
 * properties of the object manually.
 * @group Object
 * @param value - The object to obtain a copy of the keys from
 * @returns An array of the properties names for the value object.
 * @example
 * ```ts
 * // simple array
 * const arr = ['a', 'b', 'c'];
 * console.log(objKeys(arr)); // console: ['0', '1', '2']
 *
 * // array-like object
 * const obj = { 0: 'a', 1: 'b', 2: 'c' };
 * console.log(objKeys(obj)); // console: ['0', '1', '2']
 *
 * // array-like object with random key ordering
 * const anObj = { 100: 'a', 2: 'b', 7: 'c' };
 * console.log(objKeys(anObj)); // console: ['2', '7', '100']
 *
 * // getFoo is a property which isn't enumerable
 * const myObj = objCreate({}, {
 *   getFoo: {
 *     value() { return this.foo; }
 *   }
 * });
 * myObj.foo = 1;
 * console.log(objKeys(myObj)); // console: ['foo']
 * ```
 */
export declare function objKeys(value: any): string[];

/**
 * The `objSeal()` method seals an object, preventing new properties from being added to it and marking all
 * existing properties as non-configurable. Values of present properties can still be changed as long as they
 * are writable.
 * @group Object
 * @param value - The object which should be sealed.
 * @returns The object being sealed.
 */
export declare const objSeal: <T>(value: T) => T;

/**
 * The objSetPrototypeOf() method sets the prototype (i.e., the internal [Prototype] property) of a specified
 * object to another object or null.
 * @group Object
 * @param obj - The object which is to have it's prototype set.
 * @param proto - The object's new prototype (an object or null)
 * @returns The specified object.
 */
export declare function objSetPrototypeOf(obj: any, proto: object): any;

/**
 * The `objToString()` method returns a string representing the object. This explicitly
 * always calls the `Object.prototype.toString()` method.
 *
 * An object's toString() method is most commonly invoked when that object undergoes:
 * - explicit type conversion to a string (for example, String(myObject))
 * - implicit type coercion into a string (for example, myObject + "hello world")
 *
 * @group Object
 * @param value - The object to be converted into a string
 * @returns A string representation of the object
 * @example
 * ```ts
 * objToString(new Date()); // [object Date]
 * objToString(new String()); // [object String]
 *
 * // Math has its Symbol.toStringTag
 * objToString(Math); // [object Math]
 *
 * objToString(undefined); // [object Undefined]
 * objToString(null); // [object Null]
 * ```
 */
export declare function objToString(value: any): string;

/**
 * Returns the number of milliseconds that has elapsed since the time origin, if
 * the runtime does not support the `performance` API it will fallback to return
 * the number of milliseconds since the unix epoch.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @returns The number of milliseconds as a `DOMHighResTimeStamp` double value or
 * an integer depending on the runtime.
 * @example
 * ```ts
 * let now = perfNow();
 * ```
 */
export declare function perfNow(): number;

/**
 * Deep copy handler to identify and copy plain objects.
 * @since 0.4.4
 * @group Object - Deep Copy
 * @param details - The details object for the current property being copied
 * @returns `true` if the current value is a function otherwise `false`
 */
export declare function plainObjDeepCopyHandler(details: IObjDeepCopyHandlerDetails): boolean;

/**
 * The polyArrFind() method returns the first element in the provided array that satisfies
 * the provided testing function. If no values satisfy the testing function, undefined
 * is returned.
 * - If you need the index of the found element in the array, use {@link arrFindIndex}.
 * - If you need to find the index of a value, use arrIndexOf(). (It's similar to {@link arrFindIndex}, but checks
 * each element for equality with the value instead of using a testing function.)
 * - If you need to find if a value exists in an array, use arrIncludes(). Again, it checks each element for
 * equality with the value instead of using a testing function.
 * - If you need to find if any element satisfies the provided testing function, use {@link arrSome}.
 *
 * The polyArrFind() method is an iterative method. It calls a provided `callbackFn` function once for each element
 * in an array in ascending-index order, until `callbackFn` returns a truthy value. polyArrFind() then returns that
 * element and stops iterating through the array. If callbackFn never returns a truthy value, polyArrFind() returns
 * undefined.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in
 * sparse arrays behave the same as undefined.
 *
 * polyArrFind() does not mutate the array on which it is called, but the function provided as callbackFn can.
 * Note, however, that the length of the array is saved before the first invocation of `callbackFn`. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to polyArrFind() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by callbackFn, its value passed to the
 * `callbackFn` will be the value at the time that element gets visited. Deleted elements are visited as if they
 * were undefined.
 * @since 0.8.0
 * @group Polyfill
 * @group Array
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @return The first element in the array that satisfies the provided testing function. Otherwise, undefined
 * is returned.
 * @example
 * ```ts
 * const inventory = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 },
 * ];
 *
 * function isCherries(fruit) {
 *   return fruit.name === "cherries";
 * }
 *
 * console.log(polyArrFind(inventory, isCherries));
 * // { name: 'cherries', quantity: 5 }
 *
 * function isPrime(element, index, array) {
 *   let start = 2;
 *   while (start <= Math.sqrt(element)) {
 *     if (element % start++ < 1) {
 *       return false;
 *     }
 *   }
 *   return element > 1;
 * }
 *
 * console.log(polyArrFind([4, 6, 8, 12], isPrime)); // undefined, not found
 * console.log(polyArrFind([4, 5, 8, 12], isPrime)); // 5
 * ```
 */
export declare function polyArrFind<T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any): T | E | undefined;

/**
 * The polyArrFindIndex() method returns the index of the first element in an array that satisfies the provided testing
 * function. If no elements satisfy the testing function, -1 is returned.
 *
 * The polyArrFindIndex() is an iterative method. It calls a provided callbackFn function once for each element in an
 * array in ascending-index order, until callbackFn returns a truthy value. polyArrFindIndex() then returns the index
 * of that element and stops iterating through the array. If `callbackFn` never returns a truthy value, polyArrFindIndex()
 * returns -1.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse
 * arrays behave the same as undefined.
 *
 * polyArrFindIndex() does not mutate the array on which it is called, but the function provided as `callbackFn` can.
 * Note, however, that the length of the array is saved before the first invocation of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to polyArrFindIndex() began.
 * - Changes to already-visited indexes do not cause `callbackFn` to be invoked on them again.
 * If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the `callbackFn`
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Polyfill
 * @group Array
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The index of the first element in the array that passes the test. Otherwise, -1.
 * @example
 * ```ts
 * ```
 */
export declare function polyArrFindIndex<T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any): number;

/**
 * The polyArrFindLast() method iterates the array in reverse order and returns the value of the first element that
 * satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned.
 * - If you need the index of the found element in the array, use {@link arrFindLastIndex}.
 * - If you need to find the index of a value, use arrLastIndexOf(). (It's similar to {@link arrFindLastIndex}, but checks
 * each element for equality with the value instead of using a testing function.)
 * - If you need to find if a value exists in an array, use arrIncludes(). Again, it checks each element for
 * equality with the value instead of using a testing function.
 * - If you need to find if any element satisfies the provided testing function, use {@link arrSome}.
 *
 * The polyArrFindLast() method is an iterative method. It calls a provided callbackFn function once for each element
 * in an array in descending-index order, until callbackFn returns a truthy value. polyArrFindLast() then returns that
 * element and stops iterating through the array. If `callbackFn` never returns a truthy value, polyArrFindLast() returns
 * undefined.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse
 * arrays behave the same as undefined.
 *
 * polyArrFindLast() does not mutate the array on which it is called, but the function provided as `callbackFn` can.
 * Note, however, that the length of the array is saved before the first invocation of `callbackFn`. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to polyArrFindLast() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the `callbackFn`
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Polyfill
 * @group Array
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The last element in the array that satisfies the provided testing function. Otherwise, undefined
 * is returned.
 * @example
 * ```ts
 * const inventory = [
 *   { name: "apples", quantity: 2 },
 *   { name: "bananas", quantity: 0 },
 *   { name: "cherries", quantity: 5 },
 * ];
 *
 * function isCherries(fruit) {
 *   return fruit.name === "cherries";
 * }
 *
 * console.log(polyArrFindLast(inventory, isCherries));
 * // { name: 'cherries', quantity: 5 }
 *
 * function isPrime(element, index, array) {
 *   let start = 2;
 *   while (start <= Math.sqrt(element)) {
 *     if (element % start++ < 1) {
 *       return false;
 *     }
 *   }
 *   return element > 1;
 * }
 *
 * console.log(polyArrFindLast([4, 6, 8, 12], isPrime)); // undefined, not found
 * console.log(polyArrFindLast([4, 5, 7, 12], isPrime)); // 7
 * ```
 */
export declare function polyArrFindLast<T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any): T | E | undefined;

/**
 * The polyArrFindLastIndex() method iterates the array in reverse order and returns the index of the first element that
 * satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
 *
 * The polyArrFindLastIndex() method is an iterative method. It calls a provided `callbackFn` function once for each element
 * in an array in descending-index order, until callbackFn returns a truthy value. polyArrFindLastIndex() then returns the
 * index of that element and stops iterating through the array. If callbackFn never returns a truthy value, returns -1.
 *
 * `callbackFn` is invoked for every index of the array, not just those with assigned values. Empty slots in sparse arrays
 * behave the same as undefined.
 *
 * polyArrFindLastIndex() does not mutate the array on which it is called, but the function provided as callbackFn can.
 * Note, however, that the length of the array is saved before the first invocation of callbackFn. Therefore:
 * - `callbackFn` will not visit any elements added beyond the array's initial length when the call to polyArrFindLastIndex() began.
 * - Changes to already-visited indexes do not cause callbackFn to be invoked on them again.
 * - If an existing, yet-unvisited element of the array is changed by `callbackFn`, its value passed to the callbackFn
 * will be the value at the time that element gets visited. Deleted elements are visited as if they were undefined.
 * @since 0.8.0
 * @group Polyfill
 * @group Array
 * @typeParam T - Identifies the base type of array elements
 * @typeParam E - Identifies a more specific instance of the base array type
 * @param theArray - The array or array like object of elements to be searched.
 * @param callbackFn A function that accepts up to three arguments of type {@link ArrPredicateCallbackFn} or
 * {@link ArrPredicateCallbackFn2}. The predicate function is called for each element in the thArray until
 * the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
 * @param thisArg - A value to use as this when executing callbackFn. Defaults to the array if not provided.
 * @return The index of the last (highest-index) element in the array that passes the test. Otherwise -1 if
 * no matching element is found.
 */
export declare function polyArrFindLastIndex<T, E extends T>(theArray: ArrayLike<T>, callbackFn: ArrPredicateCallbackFn<T, E> | ArrPredicateCallbackFn2<T>, thisArg?: any): number;

/**
 * The polyArrFrom creates an new shallow-copied array from an array-like object or an iterable.
 * @since 0.9.7
 * @group Polyfill
 * @group ArrayLike
 * @group Array
 * @group Iterator
 * @typeParam T - Identifies the element type of the array-like or iterable.
 * @typeParam U - Identifies returned type of the array
 * @param theValue - An array-like object or iterable to convert to an array.
 * @param mapfn - A {@link ArrFromMapFn | mapping function} to call on every element of the array. If provided, every
 * value to be added to the array is first passed through this map function, and the return
 * value is added to the array instead. The function is called with the following arguments:
 * @param thisArg Value of 'this' used to invoke the mapfn.
 * @example
 * ```ts
 * polyArrFrom("Hello");
 * // [ "H", "e", "l", "l", "o" ]
 *
 * polyArrFrom(new Set(["Hello", "Darkness", "my", "old", "friend"]));
 * // ["Hello", "Darkness", "my", "old", "friend"]
 *
 * let map = new Map([
 *   [ 1, "Hello" ],
 *   [ 2, "Darkness" ],
 *   [ 3, "my" ],
 *   [ 4, "old" ],
 *   [ 5, "friend"]
 * ]);
 *
 * polyArrFrom(map.values());
 * // ["Hello", "Darkness", "my", "old", "friend"]
 *
 * polyArrFrom(map.keys());
 * // [ 1, 2, 3, 4, 5 ]
 *
 * polyArrFrom(map.entries());
 * // [ [ 1, "Hello" ], [ 2, "Darkness" ], [ 3, "my" ], [ 4, "old" ], [ 5, "friend"] ]
 *
 * polyArrFrom(map, ([ key, value ]) => ({ [key]: value }));
 * // [ {"1": "Hello"}, {"2": "Darkness"}, {"3": "my"}, {"4": "old"}, {"5": "friend"} ]
 * ```
 */
export declare function polyArrFrom<T, U = T>(theValue: ArrayLike<T> | Iterable<T>, mapFn?: ArrFromMapFn<T, U>, thisArg?: any): U[];

/**
 * The polyArrIncludes() method determines whether an array includes a certain value among its
 * entries, returning true or false as appropriate.
 * Note: The polyfill does not handle NaN correctly.
 * @since 0.8.0
 * @group Array
 * @group Polyfill
 * @param theArray - The array or array like object of elements to be searched.
 * @param searchElement - The value to search for
 * @param fromIndex - The optional Zero-based index at which to start searching, converted to an integer.
 * - Negative index counts back from the end of the array — if fromIndex < 0, fromIndex + array.length
 * is used. However, the array is still searched from front to back in this case.
 * - If fromIndex < -array.length or fromIndex is omitted, 0 is used, causing the entire array to be searched.
 * - If fromIndex >= array.length, the array is not searched and false is returned.
 * @returns A boolean value which is true if the value searchElement is found within the array (or the part of
 * the array indicated by the index fromIndex, if specified).
 */
export declare function polyArrIncludes<T>(theArray: ArrayLike<T>, searchElement: T, fromIndex?: number): boolean;

/**
 * Returns the polyfill version of a well-known global symbol, this will only return
 * known values.
 * @example
 * ```ts
 * // Always returns the polyfill version, even if Symbols are supported in the runtime
 * polyGetKnownSymbol("toStringTag") === polyGetKnownSymbol("toStringTag");                // true
 * polyGetKnownSymbol(WellKnownSymbols.toStringTag) === polyGetKnownSymbol("toStringTag"); // true
 * polyGetKnownSymbol("toStringTag") !== Symbol.toStringTag;                // true
 * polyGetKnownSymbol(WellKnownSymbols.toStringTag) !== Symbol.toStringTag; // true
 * polyGetKnownSymbol("toStringTag") !== polySymbolFor("toStringTag");      // true
 * polyGetKnownSymbol(WellKnownSymbols.toStringTag) !== polySymbolFor("toStringTag"); // true
 * polyGetKnownSymbol("toStringTag") !== polyNewSymbol("toStringTag");      // true
 * polyGetKnownSymbol(WellKnownSymbols.toStringTag) !== polyNewSymbol("toStringTag"); // true
 * ```
 * @group Polyfill
 * @group Symbol
 * @param name - The property name to return (if it exists) for Symbol
 * @returns The value of the property if present
 */
export declare function polyGetKnownSymbol(name: string | WellKnownSymbols): symbol;

/**
 * Polyfill support function for Array.isArray
 * @group Polyfill
 * @group Array
 * @param value - The value to be checked
 * @returns true if the value is an array otherwise false.
 */
export declare function polyIsArray<T>(value: any): value is T[];

/**
 * Returns a new (polyfill) Symbol object for the provided description that's guaranteed to be unique.
 * Symbols are often used to add unique property keys to an object that won't collide with keys any
 * other code might add to the object, and which are hidden from any mechanisms other code will
 * typically use to access the object. That enables a form of weak encapsulation, or a weak form of
 * information hiding.
 * @group Polyfill
 * @group Symbol
 * @param description - The description of the symbol
 * @returns A new polyfill version of a Symbol object
 */
export declare function polyNewSymbol(description?: string | number): symbol;

/**
 * Returns an array of key/values of the enumerable properties of an object
 * @since 0.9.7
 * @group Polyfill
 * @group Object
 * @group ArrayLike
 * @param value Object that contains the properties and methods.
 * @example
 * ```ts
 * polyObjEntries({ Hello: "Darkness", my: "old", friend: "." });
 * // [ [ "Hello", "Darkness" ], [ "my", "old"], [ "friend", "." ] ]
 *
 * // Array-like object
 * polyObjEntries({ 0: "a", 1: "b", 2: "c" }));
 * // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
 *
 * // Array-like object with random key ordering
 * polyObjEntries({ 100: "a", 2: "b", 7: "c" });
 * // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]*
 * ```
 */
export declare function polyObjEntries<T = any>(value: {} | {
    [s: string]: T;
} | ArrayLike<T>): [string, T][];

/**
 * The polyObjHasOwn() method is a polyfill for {@link objHasOwn} when the native
 * [Object.hasOwnreturns](https://caniuse.com/?search=hasOwn) is not supported, it returns a
 * boolean indicating whether the object has the specified property as its own property (as
 * opposed to inheriting it). If the property is inherited, or does not exist, the method
 * returns false.
 *
 * The objHasOwn() method returns true if the specified property is a direct property
 * of the object — even if the property value is null or undefined. The method returns
 * false if the property is inherited, or has not been declared at all. Unlike the in operator,
 * this method does not check for the specified property in the object's prototype chain.
 *
 * It is recommended over objHasOwnProperty() because it works for objects created using
 * objCreate(null) and with objects that have overridden the inherited hasOwnProperty() method.
 * While it is possible to workaround these problems by calling Object.prototype.hasOwnProperty()
 * on an external object, Object.hasOwn() is more intuitive.
 *
 * @since 0.4.3
 * @group Object
 * @group Polyfill
 * @param obj - The object being evaluated
 * @param prop - The String or Symbol of the property to test
 * @returns `true` if the object has the specified property as own property; otherwise `false`
 * @example
 * ```ts
 * let example = {};
 * polyObjHasOwn(example, 'prop');   // false
 *
 * example.prop = 'exists';
 * polyObjHasOwn(example, 'prop');   // true - 'prop' has been defined
 *
 * example.prop = null;
 * polyObjHasOwn(example, 'prop');   // true - own property exists with value of null
 *
 * example.prop = undefined;
 * polyObjHasOwn(example, 'prop');   // true - own property exists with value of undefined
 * ```
 */
export declare function polyObjHasOwn<T = any>(obj: T, prop: PropertyKey): boolean;

/**
 * Returns the names of the enumerable string properties and methods of an object. This helper exists to avoid adding a polyfil for older browsers
 * that do not define Object.keys eg. ES3 only, IE8 just in case any page checks for presence/absence of the prototype implementation.
 * Note: For consistency this will not use the Object.keys implementation if it exists as this would cause a testing requirement to test with and without the implementations
 * @group Polyfill
 * @group Object
 * @param obj Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
export declare function polyObjKeys(obj: any): string[];

/**
 * The polyStrIncludes() method performs a case-sensitive search to determine whether one string
 * may be found within another string, returning `true` or `false` as appropriate.
 * @since 0.9.0
 * @group String
 * @group Polyfill
 * @param value - The string value to be searched.
 * @param searchString - A string to be searched for within the value. Cannot be a regex. All
 * values that are not regexes are coerced to strings, so omitting it or passing undefined
 * causes `strIncludes()` to search for the string "undefined", which is rarely what you want.
 * @param position - The position within the string at which to begin searching for searchString. (Defaults to 0.)
 * @returns `true` if the search string is found anywhere within the given string value, including
 * when searchString is an empty string; otherwise, `false`.
 * @throws TypeError If searchString is a regex.
 */
export declare function polyStrIncludes(value: string, searchString: string, position?: number): boolean;

/**
 * The polyStrSubstr() method returns a portion of the string, starting at the specified index and extending for a given
 * number of characters afterwards.
 *
 * @since 0.4.2
 * @group String
 * @group Polyfill
 * @param value - The string value to return the substring from.
 * @param start - The index of the first character to include in the returned substring.
 * @param length - The number of characters to extract.
 * @returns A new string containing the specified part of the given string.
 */
export declare function polyStrSubstr(value: string, start: number, length?: number): string;

/**
 * The `polyStrSymSplit()` splits a string into substrings using the [`Symbol.split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split)
 * method from the splitter object to provide custom behavior. It uses {@link getKnownSymbol}
 * to get the {@link WellKnownSymbols.split} symbol which will return the polyfill symbol value.
 * @since 0.9.1
 * @group Polyfill
 * @group String
 * @param value - The string value to be split into substrings.
 * @param splitter - The object which contains a Symbol.split method, Omitting splitter or passing
 * an object that doesn't contain a Symbol.split causes it to return an array with the calling
 * string as a single element.
 * @param limit - A non-negative integer specifying a limit on the number of substrings to be
 * included in the array. If provided, splits the string at each occurrence of the specified
 * separator, but stops when limit entries have been placed in the array. Any leftover text is
 * not included in the array at all.
 * - The array may contain fewer entries than limit if the end of the string is reached before
 * the limit is reached.
 * - If limit is 0, [] is returned.
 * @return An Array of strings, split at each point where the separator occurs in the given string.
 * @example
 * ```ts
 * const splitByNumber = {
 *   [getKnownSymbol<typeof Symbol.split>(WellKnownSymbols.split)]: (str: string) => {
 *     let num = 1;
 *     let pos = 0;
 *     const result = [];
 *     while (pos < str.length) {
 *       const matchPos = strIndexOf(str, asString(num), pos);
 *       if (matchPos === -1) {
 *         result.push(strSubstring(str, pos));
 *         break;
 *       }
 *       result.push(strSubstring(str, pos, matchPos));
 *       pos = matchPos + asString(num).length;
 *       num++;
 *     }
 *     return result;
 *   }
 * };
 *
 * const myString = "a1bc2c5d3e4f";
 * console.log(polyStrSymSplit(myString, splitByNumber)); // [ "a", "bc", "c5d", "e", "f" ]
 * ```
 */
export declare function polyStrSymSplit(value: string, splitter: {
    [Symbol.split](string: string, limit?: number): string[];
}, limit?: number): string[];

/**
 * The trim() method removes whitespace from both ends of a string and returns a new string,
 * without modifying the original string. Whitespace in this context is all the whitespace
 * characters (space, tab, no-break space, etc.) and all the line terminator characters
 * (LF, CR, etc.).
 * @group Polyfill
 * @group String
 * @param value - The string value to be trimmed.
 * @returns A new string representing str stripped of whitespace from both its beginning and end.
 * If neither the beginning or end of str has any whitespace, a new string is still returned (essentially
 * a copy of str), with no exception being thrown.
 * To return a new string with whitespace trimmed from just one end, use `strTrimStart()` or `strTrimEnd()`.
 */
export declare const polyStrTrim: (value: string) => string;

/**
 * The `polyStrTrimEnd()` method removes whitespace from the end of a string.
 * @group Polyfill
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its end (right side).
 * If the end of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const polyStrTrimEnd: (value: string) => string;

/**
 * The `polyStrTrimStart()` method removes whitespace from the beginning of a string.
 * @group Polyfill
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its beginning (left side).
 * If the beginning of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const polyStrTrimStart: (value: string) => string;

/**
 * Returns a Symbol object from the global symbol registry matching the given key if found.
 * Otherwise, returns a new symbol with this key.
 * @group Polyfill
 * @group Symbol
 * @param key key to search for.
 */
export declare function polySymbolFor(key: string): symbol;

/**
 * Returns a key from the global symbol registry matching the given Symbol if found.
 * Otherwise, returns a undefined.
 * @group Polyfill
 * @group Symbol
 * @param sym Symbol to find the key for.
 */
export declare function polySymbolKeyFor(sym: symbol): string | undefined;

/**
 * Polyfill fallback to return the number of milliseconds that have elapsed since January 1, 1970 00:00:00 UTC.
 *
 * To offer protection against timing attacks and fingerprinting, the precision of dateNow()
 * might get rounded depending on browser settings. In Firefox, the privacy.reduceTimerPrecision
 * preference is enabled by default and defaults to 20µs in Firefox 59; in 60 it will be 2ms.
 *
 * @since 0.4.4
 * @group Timer
 * @group Polyfill
 *
 * @returns A Number representing the milliseconds elapsed since the UNIX epoch.
 * @example
 * ```ts
 * let now = polyUtcNow();
 * ```
 */
export declare function polyUtcNow(): number;

/**
 * The Definition of how proxy functions should be applied to target objects
 */
export declare type ProxyFunctionDef<T, H> = {
    /**
     * Identifies the host function name
     */
    n: TypeFuncNames<H>;
    /**
     * Use this name as on the target for the proxied function, defaults to the same
     * as the host function when not defined.
     */
    as?: TypeFuncNames<T>;
    /**
     * If the target already includes the function should it be replaced, defaults to false.
     */
    rp?: boolean;
};

/**
 * Read the arguments from the provided array, iterator /  or generator function
 * When processing an Iterable and a negative start or end is provided the entire
 * iterator will be processed into an array before applying the start / end restrictions
 * and when undefined or >= 0 any iterator will not be fully processed.
 * @param theArgs - The arguments to process, may be ArrayLike or an Iterable
 * @param start Zero-based index at which to start extraction, converted to an integer.
 * - Negative index counts back from the end of the array or iteration
 * - if start < 0, start + (array.length || iterator.count) is used.
 * - If start < -array.length or start is omitted, 0 is used.
 * - If start >= array.length, nothing is extracted.
 * @param end Zero-based index at which to end extraction, converted to an integer. readArgs() extracts
 * up to but not including end.
 * - Negative index counts back from the end of the array — if end < 0, end + array.length is used.
 * - If end < -array.length, 0 is used.
 * - If end >= array.length or end is omitted, array.length is used, causing all elements until the
 * end to be extracted.
 * - If end is positioned before or at start after normalization, nothing is extracted.
 * @returns A new array with the extracted elements
 * @example
 * ```ts
 * function myFunc<T>(firstArg: T, ...otherArgs) {
 *    // Read all of the arguments
 *    let allArgs = readArgs(arguments);
 *
 *    // Get all of the arguments after the first
 *    let optArgs = readArgs(arguments, 1);
 * }
 *
 * myFunc("Hello");
 * myFunc("Hello", "Darkness", "my", "old", "friend", ".");
 *
 * function* myGenerator() {
 *   yield "Hello";
 *   yield "Darkness";
 *   yield "my";
 *   yield "old";
 *   yield "friend";
 * }
 *
 * function* myGenerator2() {
 *   yield "I've";
 *   yield "come";
 *   yield "to";
 *   yield "talk";
 *   yield "with";
 *   yield "you";
 *   yield "again";
 * }
 *
 * readArgs(myGenerator());
 * // [ "Hello", "Darkness", "my", "old", "friend"]);
 *
 * readArgs(myGenerator(), 1);
 * // [ "Darkness", "my", "old", "friend"]);
 *
 * readArgs(myGenerator2());
 * // [ "I've", "come", "to", "talk", "with", "you", "again" ]);
 *
 * readArgs(myGenerator2(), 0, -2);
 * // [ "I've", "come", "to", "talk", "with" ]);
 *
 * readArgs(myGenerator2(), -3, -2);
 * // [ "with" ]);

 * ```
 */
export declare const readArgs: <T = any>(theArgs: ArrayLike<T> | Iterable<T>, start?: number, end?: number) => T[];

/**
 * Function to safely execute a callback function, if the function throws the provided default
 * value will be returned.
 * @since 0.9.5
 * @group Safe
 * @param cb - Callback function be wrapped with an exception
 * @param defValue - The default value to return when an exception is thrown
 * @returns The result of the callback function or the default if an exception occurred calling the callback
 * function.
 * @example
 * ```ts
 * let theExpression = "{ invalid: json value";
 *
 * let result = safeGet(() => {
 *     return JSON.parse(theExpression);
 * }, {});
 *
 * // result === {};
 * ```
 */
export declare function safeGet<T = boolean>(cb: () => T, defValue: T): T;

/**
 * Create and return an readonly {@link ILazyValue} instance which will cache and return the value returned
 * by the callback function. The callback function will only be called once, multiple access of the value
 * does not cause re-execution of the callback as the result from the first call is cached internally.
 * If the callback throws the default value will be returned.
 * @since 0.9.5
 * @group Lazy
 * @group Safe
 * @param cb - The callback function to fetch the value to be lazily evaluated and cached
 * @param defValue - The default value to return when an exception is thrown
 * @returns A new readonly {@link ILazyValue} instance which wraps the callback and will be used to cache
 * the result of the callback
 * @example
 * ```ts
 * // This does not cause the evaluation to occur
 * let cachedValue = safeGetLazy(() => callSomeExpensiveFunctionWhichMightThrow(), "someDefaultValue");
 * let theValue;
 *
 * // Just checking if there is an object still does not cause the evaluation
 * if (cachedValue) {
 *     // This will cause the evaluation to occur and the result will be cached
 *     theValue = cachedValue.v;
 * }
 *
 * // Accessing the value again will not cause the re-evaluation to occur, it will just return the same
 * // result value again.
 * theValue === cachedValue.v;  // true
 *
 * ```
 */
export declare function safeGetLazy<T = boolean>(cb: () => T, defValue: T): ILazyValue<T>;

/**
 * Queues a function to be called during a browser's idle periods. This enables developers to
 * perform background and low priority work on the main event loop, without impacting latency-critical
 * events such as animation and input response. Functions are generally called in first-in-first-out
 * order; however, callbacks which have a timeout specified may be called out-of-order if necessary
 * in order to run them before the timeout elapses.
 *
 * You can call scheduledleCallback() within an idle callback function to schedule another callback to
 * take place no sooner than the next pass through the event loop.
 *
 * If the runtime does not support the [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
 * it will fallback to use `setTimeout` with either the provided timeout or the current default idle
 * timeout, which can be set via {@link setDefaultIdleTimeout}. It will always supply a deadline which
 * indicates that the request timed out.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param callback - A reference to a function that should be called in the near future, when the
 * event loop is idle. The callback function is passed an [IdleDeadline](https://w3c.github.io/requestidlecallback/#dom-idledeadline)
 * object describing the amount of time available and whether or not the callback has been run because
 * the timeout period expired.
 * @param options - Contains optional configuration parameters. Currently only one property is defined:
 * `timeout` If the number of milliseconds represented by this parameter has elapsed and the callback
 * has not already been called, then a task to execute the callback is queued in the event loop (even
 * if doing so risks causing a negative performance impact). timeout must be a positive value or it
 * is ignored.
 * @returns A handle which can be used to cancel the callback by passing it into the `cancelIdleCallback()`
 * method.
 * @example
 * ```ts
 * let idleCalled = false;
 * let idleTimedOut = false;
 * let theIdleTimer = scheduleIdleCallback((idleDeadline: IdleDeadline) => {
 *     // This callback will be called when the system is idle (via requestIdleCallback) or after the provided timeout 100ms
 *     idleCalled = true;
 *     idleTimedOut = idleDeadline?.didTimeout;
 *     while ((idleDeadline.timeRemaining() > 0 || deadline.didTimeout)) {
 *         // Do some background operations while there is time remaining or we timed out
 *         // Unlike interval timers this callback will NOT be called again unless you call "refresh"
 *         // to restart it or create a new idle timer
 *     }
 * }, 100);
 *
 * // Instead of calling cancelIdleCallback() with the returned value from requestIdleCallback() the returned
 * // handler instance can be used instead to cancel the idle timer
 * theIdleTimer.cancel();
 * theIdleTimer.enabled;    // false
 *
 * // You can start the timer via enabled
 * theIdleTimer.enabled = true;
 *
 * // You can also "restart" the timer, whether it has previously triggered not not via the `refresh()`
 * theIdleTimer.refresh();
 * ```
 */
export declare function scheduleIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): ITimerHandler;

/**
 * Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param callback - The function to be executed after the timer expires.
 * @param timeout - The time, in milliseconds that the timer should wait before the specified
 * function or code is executed. If this parameter is omitted, a value of 0 is used, meaning
 * execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by `callback`.
 * @returns A {@link ITimerHandler} instance which can be used to cancel or refresh the interval.
 * @example
 * ```ts
 * let intervalCalled = 0;
 * let theIntervalTimer = scheduleInvertal(() => {
 *     // This callback will be called every 100ms as this uses setInterval()
 *     intervalCalled++;
 * }, 100);
 *
 * // Instead of calling clearInterval() with the returned value from setInterval() the returned
 * // handler instance can be used instead to cancel the timer
 * theIntervalTimer.cancel();
 * theIntervalTimer.enabled;    // false
 *
 * // You can start the timer via enabled
 * theIntervalTimer.enabled = true;
 *
 * // Or you can also "restart" the timer, whether it has previously triggered not not via the `refresh()`
 * theIntervalTimer.refresh();
 * ```
 */
export declare function scheduleInterval<A extends any[]>(callback: (...args: A) => void, timeout: number, ...args: A): ITimerHandler;

/**
 * Creates and starts a timer which executes a function or specified piece of code once the timer expires, this is simular
 * to using `setTimeout` but provides a return object for cancelling and restarting (refresh) the timer.
 *
 * The timer may be cancelled (cleared) by calling the `cancel()` function on the returned {@link ITimerHandler}, or
 * you can "reschedule" and/or "restart" the timer by calling the `refresh()` function on the returned {@link ITimerHandler}
 * instance
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param callback - The function to be executed after the timer expires.
 * @param timeout - The time, in milliseconds that the timer should wait before the specified
 * function or code is executed. If this parameter is omitted, a value of 0 is used, meaning
 * execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by `callback`.
 * @returns A {@link ITimerHandler} instance which can be used to cancel the timeout.
 * @example
 * ```ts
 * let timeoutCalled = false;
 * let theTimeout = scheduleTimeout(() => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // Instead of calling clearTimeout() with the returned value from setTimeout() the returned
 * // handler instance can be used instead to cancel the timer
 * theTimeout.cancel();
 * theTimeout.enabled;    // false
 *
 * // You can start the timer via enabled
 * theTimeout.enabled = true;
 *
 * // You can also "restart" the timer, whether it has previously triggered not not via the `refresh()`
 * theTimeout.refresh();
 * ```
 */
export declare function scheduleTimeout<A extends any[]>(callback: (...args: A) => void, timeout: number, ...args: A): ITimerHandler;

/**
 * Creates and starts a timer which executes a function or specified piece of code once the timer expires. The overrideFn will be
 * used to create the timer, this is simular to using `setTimeout` but provides a return object for cancelling and restarting
 * (refresh) the timer.
 *
 * The timer may be cancelled (cleared) by calling the `cancel()` function on the returned {@link ITimerHandler}, or
 * you can "reschedule" and/or "restart" the timer by calling the `refresh()` function on the returned {@link ITimerHandler}
 * instance
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param overrideFn - setTimeout override function this will be called instead of the `setTimeout`, if the value
 * of `overrideFn` is null or undefined it will revert back to the native `setTimeout`. May also be an array with contains
 * both the setTimeout and clearTimeout override functions, if either is not provided the default native functions will be used
 * @param callback - The function to be executed after the timer expires.
 * @param timeout - The time, in milliseconds that the timer should wait before the specified
 * function or code is executed. If this parameter is omitted, a value of 0 is used, meaning
 * execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by `callback`.
 * @returns A {@link ITimerHandler} instance which can be used to cancel the timeout.
 * @example
 * ```ts
 * let timeoutCalled = false;
 * // Your own "setTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newSetTimeoutFn(callback: TimeoutOverrideFn) {
 *     overrideCalled ++;
 *     return setTimeout(callback, timeout);
 * }
 *
 * let theTimeout = scheduleTimeoutWith(newSetTimeoutFn, () => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // Instead of calling clearTimeout() with the returned value from setTimeout() the returned
 * // handler instance can be used instead to cancel the timer
 * theTimeout.cancel();
 * theTimeout.enabled;    // false
 *
 * // You can start the timer via enabled
 * theTimeout.enabled = true;
 *
 * // You can also "restart" the timer, whether it has previously triggered not not via the `refresh()`
 * theTimeout.refresh();
 * ```
 * @example
 * ```ts
 * let timeoutCalled = false;
 * // Your own "setTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newSetTimeoutFn(callback: TimeoutOverrideFn) {
 *     overrideCalled ++;
 *     return setTimeout(callback, timeout);
 * }
 *
 * // Your own "clearTimeout" implementation to allow you to perform additional operations or possible wrap
 * // the callback to add timings.
 * function newClearTimeoutFn(timeoutId: number) {
 *     overrideCalled ++;
 *     return clearTimeout( timeout);
 * }
 *
 * let theTimeout = scheduleTimeoutWith([newSetTimeoutFn, newClearTimeoutFn], () => {
 *     // This callback will be called after 100ms as this uses setTimeout()
 *     timeoutCalled = true;
 * }, 100);
 *
 * // Instead of calling clearTimeout() with the returned value from setTimeout() the returned
 * // handler instance can be used instead to cancel the timer, internally this will call the newClearTimeoutFn
 * theTimeout.cancel();
 * theTimeout.enabled;    // false
 *
 * // You can start the timer via enabled
 * theTimeout.enabled = true;
 *
 * // You can also "restart" the timer, whether it has previously triggered not not via the `refresh()`
 * theTimeout.refresh();
 * ```
 */
export declare function scheduleTimeoutWith<A extends any[]>(overrideFn: TimeoutOverrideFn | TimeoutOverrideFuncs, callback: (...args: A) => void, timeout: number, ...args: A): ITimerHandler;

/**
 * Test Hook function used to cause the internal caching of objects to be bypassed, this should never
 * be enabled for production as it has additional performance impact caused by the repetitive creation
 * of the lazy wrappers.
 * @group Lazy
 * @since 0.5.0
 * @param newValue - When `true` will cause all new lazy implementations to bypass the cached lookup.
 */
export declare function setBypassLazyCache(newValue: boolean): void;

/**
 * Set the idle timeout fallback timeout which is used when the runtime does not support `requestIdleCallback`
 * the default idle timeout will be used for the scheduled timer. Defaults to 100ms
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param timeout - The time in milliseconds that the timer should wait before calling the idle function.
 */
export declare function setDefaultIdleTimeout(timeout: number): void;

/**
 * Set the idle timeout fallback simulated maximum execution time, used when the runtime doesn't
 * support `requestIdleTimeout` to simulate the [IdleDeadline](https://w3c.github.io/requestidlecallback/#dom-idledeadline)
 * `timeRemaining` value.
 * This value is used as the base time of the [IdleDeadline.timeRemaining](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline/timeRemaining)
 * less the start time the callback was called. Defaults to 50ms.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @param maxTime - The maximum execution time in milliseconds.
 */
export declare function setDefaultMaxExecutionTime(maxTime: number): void;

/**
 * Set the named value on the target object where the path is represented by the string iterator
 * or iterable to separate the nested objects of the heirarchy / path to the value.
 *
 * The order of processing of the iterator is not reset if you add or remove elements to the iterator,
 * the actual behavior will depend on the iterator imeplementation.
 *
 * If the passed `iter` is both an Iterable<T> and Iterator<T> the Iterator<T> interface takes preceedence.
 * @since 0.9.1
 * @group Value
 * @param target - The target object
 * @param iter - The iter identifying the path of the final key value
 * @param value - The value to set
 * @example
 * ```ts
 * let theValue = { };
 * setValueByIter(theValue, ["Hello", "Darkness", "my"], "old");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } } }
 * setValueByIter(theValue, ["friend"], "I've");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } }, friend: "I've" }
 * setValueByIter(theValue, ["come", "to", "see"], "you");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } }, friend: "I've", come: { to : { see: "you" } } }
 * ```
 */
export declare function setValueByIter<T>(target: any, iter: Iterator<string> | Iterable<string>, value: T): void;

/**
 * Set the named value on the target object where the path may be presented by a string which
 * contains "." characters to separate the nested objects of the heirarchy / path to the value.
 * @since 0.9.1
 * @group Value
 * @param target - The target object
 * @param path - The path identifying the location of the final key value
 * @param value - The value to set
 * @example
 * ```ts
 * let theValue = { };
 * setValueByKey(theValue, "Hello.Darkness.my", "old");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } } }
 * setValueByKey(theValue, "friend", "I've");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } }, friend: "I've" }
 * setValueByKey(theValue, "come.to.see", "you");
 * // Resulting Object: { Hello: { Darkness: { my: "old" } }, friend: "I've", come: { to : { see: "you" } } }
 * ```
 */
export declare function setValueByKey<T>(target: any, path: string, value: T): void;

/**
 * Convert the provided value to `camelCased` string, you can optionally specifify whether the
 * first caracter is upper cased (lowercase by default)from kebab `-` or snake `_` case.
 * All whitespace characters are removed
 * If the value is not a string it will be converted.
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @param value - The value to be converted to camelCased string
 * @param upperFirst - Optionally, uppercase the first character of the first word, so when `true`
 * this will produce a Pascal Cased result.
 * @returns The `camelCased` version of the provided value.
 * @example
 * ```ts
 * strCamelCase(null);                  // "null"
 * strCamelCase(undefined);             // "undefined"
 * strCamelCase("hello darkness");      // "helloDarkness"
 * strCamelCase("hello_darkness");      // "helloDarkness"
 * strCamelCase("_hello_darkness");     // "helloDarkness"
 * strCamelCase("hello-darkness");      // "helloDarkness"
 * strCamelCase("-hello-darkness");     // "helloDarkness"
 * strCamelCase("hello darkness, my old friend."); // "helloDarknessMyOldFriend"
 *
 * // Uppercase first character
 * strCamelCase("hello darkness", true); // "HelloDarkness"
 * strCamelCase("hello_darkness", true); // "HelloDarkness"
 * strCamelCase("_hello_darkness", true); // "HelloDarkness"
 * strCamelCase("hello-darkness", true); // "HelloDarkness"
 * strCamelCase("-hello-darkness", true); // "HelloDarkness"
 * strCamelCase("hello darkness, my old friend.", true); // "HelloDarknessMyOldFriend"
 * ```
 */
export declare function strCamelCase<T>(value: T, upperFirst?: boolean): string;

/**
 * The strContains() method performs a __case-sensitive__ search to determine whether one string
 * may be found within another string, returning `true` or `false` as appropriate.
 *
 * This method lets you determine whether or not a string includes another string.
 * @since 0.9.0
 * @group String
 * @param value - The string value to be searched.
 * @param searchString - A string to be searched for within the value. Cannot be a regex. All
 * values that are not regexes are coerced to strings, so omitting it or passing undefined
 * causes `strContains()` to search for the string "undefined", which is rarely what you want.
 * @param position - The position within the string at which to begin searching for searchString. (Defaults to 0.)
 * @returns `true` if the search string is found anywhere within the given string value, including
 * when searchString is an empty string; otherwise, `false`.
 * @throws TypeError If searchString is a regex.
 */
export declare const strContains: (value: string, searchString: string, position?: number) => boolean;

/**
 * This method lets you determine whether or not a string ends with another string. This method is case-sensitive.
 * @group String
 * @param value - The value to be checked
 * @param searchString - The characters to be searched for at the end of `value` string.
 * @param length - If provided, it is used as the length of `value`. Defaults to value.length.
 */
export declare const strEndsWith: (value: string, searchString: string, length?: number) => boolean;

/**
 * The strIncludes() method performs a __case-sensitive__ search to determine whether one string
 * may be found within another string, returning `true` or `false` as appropriate.
 *
 * This method lets you determine whether or not a string includes another string.
 * @since 0.9.0
 * @group String
 * @param value - The string value to be searched.
 * @param searchString - A string to be searched for within the value. Cannot be a regex. All
 * values that are not regexes are coerced to strings, so omitting it or passing undefined
 * causes `strIncludes()` to search for the string "undefined", which is rarely what you want.
 * @param position - The position within the string at which to begin searching for searchString. (Defaults to 0.)
 * @returns `true` if the search string is found anywhere within the given string value, including
 * when searchString is an empty string; otherwise, `false`.
 * @throws TypeError If searchString is a regex.
 */
export declare const strIncludes: (value: string, searchString: string, position?: number) => boolean;

/**
 * The `strIndexOf()` method, given two arguments: the string and a substring to search for, searches
 * the entire calling string, and returns the index of the first occurrence of the specified substring.
 * Given a thrid argument: a number, the method returns the first occurrence of the specified substring
 * at an index greater than or equal to the specified number.
 * @group String
 * @param value - The value to be checked for the seeach string
 * @param searchString - The substring to search for in the value
 * @param position - The starting position to search from
 * @example
 * ```ts
 * strIndexOf('hello world', '') // returns 0
 * strIndexOf('hello world', '', 0) // returns 0
 * strIndexOf('hello world', '', 3) // returns 3
 * strIndexOf('hello world', '', 8) // returns 8
 *
 * // However, if the thrid argument is greater than the length of the string
 * strIndexOf('hello world', '', 11) // returns 11
 * strIndexOf('hello world', '', 13) // returns 11
 * strIndexOf('hello world', '', 22) // returns 11
 *
 * strIndexOf('Blue Whale', 'Blue')      // returns  0
 * strIndexOf('Blue Whale', 'Blute')     // returns -1
 * strIndexOf('Blue Whale', 'Whale', 0)  // returns  5
 * strIndexOf('Blue Whale', 'Whale', 5)  // returns  5
 * strIndexOf('Blue Whale', 'Whale', 7)  // returns -1
 * strIndexOf('Blue Whale', '')          // returns  0
 * strIndexOf('Blue Whale', '', 9)       // returns  9
 * strIndexOf('Blue Whale', '', 10)      // returns 10
 * strIndexOf('Blue Whale', '', 11)      // returns 10
 * ```
 */
export declare const strIndexOf: (value: string, searchString: string, position?: number) => number;

/**
 * Checks whether the passed `value` is null, undefined or an empty string.
 * @group String
 * @param value - The string value to be checked.
 * @returns `true` if the string is null, undefined or an empty string.
 */
export declare function strIsNullOrEmpty(value: string): boolean;

/**
 * This method checks if the string `value` is null, undefined, an empty string or only contains
 * whiltespace `\t \r \n \f \v` characters.
 * @group String
 * @param value - The string value to be checked.
 * @returns `true` if the string is null, undefined an empty string or contains only whitespace characters.
 */
export declare function strIsNullOrWhiteSpace(value: string): boolean;

/**
 * Convert the provided value to `kebab-cased` string, you can optionally specify whther the result
 * is all uppercased by passing `true` as the optional `scream` argument, otherwise the entire result
 * will be lowercased.
 * If the value is not a string it will be converted.
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @param value - The value to be converted to kebab-case string
 * @param scream - Optionally return the result as UpperCase (Screaming).
 * @returns The `kebab-cased` version of the provided value
 * @example
 * ```ts
 * strKebabCase(null);              // "null"
 * strKebabCase(undefined);         // "undefined"
 * strKebabCase("hello darkness");  // "hello-darkness"
 * strKebabCase("hello_darkness");  // "hello-darkness"
 * strKebabCase("_hello_darkness"); // "-hello-darkness"
 * strKebabCase("hello darkness, my old friend."); // "hello-darkness-my-old-friend-"
 *
 * // Add optional SCREAM flag
 * strKebabCase("hello darkness", true);    // "HELLO-DARKNESS"
 * strKebabCase("hello_darkness", true);    // "HELLO-DARKNESS"
 * strKebabCase("_hello_darkness", true);   // "-HELLO-DARKNESS"
 * strKebabCase("hello darkness, my old friend.", true); // "HELLO-DARKNESS-MY-OLD-FRIEND-"
 * ```
 */
export declare function strKebabCase<T>(value: T, scream?: boolean): string;

/**
 * The `strLastIndexOf()` method, given two arguments: the string and a substring to search for, searches
 * the entire calling string, and returns the index of the last occurrence of the specified substring.
 * Given a third argument: a number, the method returns the last occurrence of the specified substring
 * at an index less than or equal to the specified number.
 * @group String
 * @param value - The value to be checked for the seeach string
 * @param searchString - The substring to search for in the value
 * @param position - The starting position to search from
 * @example
 * ```ts
 * strLastIndexOf('canal', 'a');     // returns 3
 * strLastIndexOf('canal', 'a', 2);  // returns 1
 * strLastIndexOf('canal', 'a', 0);  // returns -1
 * strLastIndexOf('canal', 'x');     // returns -1
 * strLastIndexOf('canal', 'c', -5); // returns 0
 * strLastIndexOf('canal', 'c', 0);  // returns 0
 * strLastIndexOf('canal', '');      // returns 5
 * strLastIndexOf('canal', '', 2);   // returns 2
 * ```
 */
export declare const strLastIndexOf: (value: string, searchString: string, position?: number) => number;

/**
 * Returns a substring of the string starting from the left.
 *
 * `strLeft()` extracts the number of characters from left of the string up to the count. In particular:
 * - If `count` is less than zero, strLeft() returns an empty string.
 * - If `count` is less than `value.length', strLeft() returns a new string with the `count` number of characters from the left of the string.
 * - If `count` is greater than `value.length`, then the value original value is returned.
 *
 * Any argument value that is NaN is treated as if it were 0.
 *
 * @since 0.4.2
 * @group String
 * @param value - The string value to return the substring from.
 * @param count - The number of characters to extract
 * @returns The substring based on the count number of characters from the right
 * @example
 * ```ts
 * strLeft("Nevware21", -1); // ""
 * strLeft("Nevware21", 0); // ""
 * strLeft("Nevware21", 1); // "N"
 * strLeft("Nevware21", 3); // "Nev"
 * strLeft("Nevware21", 21); // "Nevware21"
 * ```
 */
export declare function strLeft(value: string, count: number): string;

/**
 * Convert the provided value to a `Letter Cased` string, where the start of each word is
 * capitalized, all non-word character and spaces are retained.
 * If the value is not a string it will be converted.
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @param value - The value to be converted to letter case
 * @returns The Letter Cased version of the provided value
 * @example
 * ```ts
 * strLetterCase(null);             // "Null"
 * strLetterCase(undefined);        // "Undefined"
 * strLetterCase("hello darkness"); // "Hello Darkness"
 * strLetterCase("hello_darkness"); // "Hello_Darkness"
 * strLetterCase("_hello_darkness"); // "_Hello_Darkness"
 * strLetterCase("hello darkness, my old friend."); // "Hello Darkness; // My Old Friend."
 * ```
 */
export declare function strLetterCase<T>(value: T): string;

/**
 * The strLower() method returns the value of the string converted to lower case.
 * strLower() does not affect the value of the string str itself.
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @return A new string representing the calling string converted to lower case.
 * @throws TypeError - When called on null or undefined.
 * @example
 * ```ts
 * strLower("Hello");       // hello
 * strLower("darkness");    // darkness
 *
 * strLower(null);          // Throws TypeError
 * strLower(undefined);     // Throws TypeError
 * ```
 */
export declare const strLower: <T>(value: T) => string;

/**
 * The `strPadEnd()` method pads the current string with a given string (repeated, if needed) so that
 * the resulting string reaches a given length. The padding is applied from the end of the current string.
 * @group String
 * @param value - The value to be padded
 * @param targetLength - The length of the resulting string once the current `value`` has been padded. If
 * the `targetLength` is lower than `value.length`, the current string will be returned as-is.
 * @param padString - The string to pad the current `value` with. If padString is too long to stay within
 * `targetLength`, it will be truncated: for left-to-right languages the left-most part and for right-to-left
 * languages the right-most will be applied. The default value for this parameter is " " (U+0020).
 * @returns A String of the specified targetLength with the padString applied at the end of the current str.
 */
export declare const strPadEnd: (value: string, targetLength: number, padString?: string) => string;

/**
 * The `strPadStart()` method pads the current string with another string (multiple times, if needed)
 * until the resulting string reaches the given length. The padding is applied from the start of the
 * current string. This will use any native implementation if available, but will fall back to the
 * provided polyfill for runtimes that don't support [padStart](https://caniuse.com/?search=padStart)
 * @group String
 * @param value - The value to be padded
 * @param targetLength - The length of the resulting string once the current str has been padded.
 * If the value is less than str.length, then str is returned as-is.
 * @param padString - The string to pad the current str with. If padString is too long to stay within
 * the targetLength, it will be truncated from the end. The default value is the unicode "space"
 * character (U+0020).
 */
export declare const strPadStart: (value: string, targetLength: number, padString?: string) => string;

/**
 * The `strRepeat()` method constructs and returns a new string which contains the
 * specified number of copies of the string on which it was called, concatenated
 * together.
 * @group String
 * @param value - The value to be repeated
 * @param count - An integer between 0 and +Infinity, indicating the number of times to repeat the string.
 * @returns A new string containing the specified number of copies of the given string.
 * @throws RangeError: repeat count must be non-negative.
 * @throws RangeError: repeat count must be less than infinity and not overflow maximum string size.
 */
export declare const strRepeat: (value: string, count: number) => string;

/**
 * Returns a substring of the string starting from the right.
 *
 * `strRight()` extracts the number of characters from right of the string up to the count. In particular:
 * - If `count` is less than zero, strRight() returns an empty string.
 * - If `count` is less than `value.length', strRight() returns a new string with the `count` number of characters from the right of the string.
 * - If `count` is greater than `value.length`, then the value original value is returned.
 *
 * Any argument value that is NaN is treated as if it were 0.
 *
 * @since 0.4.2
 * @group String
 * @param value - The string value to return the substring from.
 * @param count - The number of characters to extract
 * @returns The substring based on the count number of characters from the right
 * @example
 * ```ts
 * strRight("Nevware21", -1); // ""
 * strRight("Nevware21", 0); // ""
 * strRight("Nevware21", 1); // "1"
 * strRight("Nevware21", 3); // "e21"
 * strRight("Nevware21", 21); // "Nevware21"
 * ```
 */
export declare function strRight(value: string, count: number): string;

/**
 * The `strSlice()` method extracts a section of a string and returns it as a new string, without
 * modifying the original string.
 * `strSlice()` extracts the text from one string and returns a new string. Changes to the text in one
 * string do not affect the other string.
 * `strSlice()` extracts up to but not including endIndex. str.slice(1, 4) extracts the second character
 * through the fourth character (characters indexed 1, 2, and 3).
 * As an example, strSlice(2, -1) extracts the third character through the second to last character
 * in the string.
 * @group String
 * @param value - The value to haveextract a number
 * @param beginIndex - The zero-based index at which to begin extraction.
 * If `beginIndex` is negative, `strSlice()` begins extraction from `value.length + beginIndex`.
 * (E.g. `strSlice("test", -2)` returns "st")
 * If `beginIndex` is omitted, undefined, or cannot be converted to a number (using Number(`beginIndex`)),
 * strSlice() begins extraction from the beginning of the string. (E.g. `strSlice("test")` returns "test")
 * If `beginIndex` is greater than or equal to `value.length`, an empty string is returned.
 * (E.g. `strSlice("test", 4)` returns "")
 * @param endIndex - The index of the first character to exclude from the returned substring.
 * If `endIndex` is omitted, undefined, or cannot be converted to a number (using Number(`endIndex`))
 * strSlice() extracts to the end of the string. (E.g. `strSlice("test", 2)` returns "st")
 * If `endIndex` is greater than `value.length`, strSlice() also extracts to the end of the string.
 * (E.g. strSlice("test", 2, 10)` returns "st")
 * If `endIndex` is negative, `strSlice()` treats it as `value.length + endIndex`. (E.g, if `endIndex`
 * is -2, it is treated as `value.length - 2` and `strSlice("test", 1, -2)` returns "e") .
 * If `endIndex` represents a position that is before the one represented by startIndex, `strSlice()`
 * returns "". (E.g `strSlice("test", 2, -10)`, strSlice("test", -1, -2)` or `strSlice("test", 3, 2)`).
 * @returns A new string containing the extracted section of the string.
 */
export declare const strSlice: (value: string, beginIndex: number, endIndex?: number) => string;

/**
 * Convert the provided value to `snake_cased` string, you can optionally specify whther the result
 * is all uppercased by passing `true` as the optional `scream` argument, otherwise the entire result
 * will be lowercased.
 * If the value is not a string it will be converted.
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @param value - The value to be converted to `snake_cased` string
 * @param scream - Optionally return the result as UpperCase (Screaming).
 * @returns The `snake-cased` version of the provided value
 * @example
 * ```ts
 * strSnakeCase(null);              // "null"
 * strSnakeCase(undefined);         // "undefined"
 * strSnakeCase("hello darkness");  // "hello_darkness"
 * strSnakeCase("hello_darkness");  // "hello_darkness"
 * strSnakeCase("_hello_darkness"); // "_hello_darkness"
 * strSnakeCase("hello-darkness");  // "hello_darkness"
 * strSnakeCase("-hello-darkness"); // "_hello_darkness"
 * strSnakeCase("hello darkness, my old friend."); // "hello_darkness_my_old_friend_"
 *
 * // Use optional Scream flag
 * strSnakeCase("hello darkness", true);    // "HELLO_DARKNESS"
 * strSnakeCase("hello_darkness", true);    // "HELLO_DARKNESS"
 * strSnakeCase("_hello_darkness", true);   // "_HELLO_DARKNESS"
 * strSnakeCase("hello-darkness", true);    // "HELLO_DARKNESS"
 * strSnakeCase("-hello-darkness", true);   // "_HELLO_DARKNESS"
 * strSnakeCase("hello darkness, my old friend.", true); // "HELLO_DARKNESS_MY_OLD_FRIEND_"
 * ```
 */
export declare function strSnakeCase<T>(value: T, scream?: boolean): string;

/**
 * The `strSplit()` splits a string into substrings using the pattern and divides a String
 * into an ordered list of substrings by searching for the pattern, puts these substrings
 * into an array, and returns the array.
 * @since 0.9.1
 * @group String
 * @param value - The string value to be split into substrings.
 * @param separator - The pattern describing where each split should occur. Can be undefined, a
 * string, or an object with a [`Symbol.split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split)
 * method (if supported) — the typical example being a regular expression. Omitting separator or
 * passing undefined causes strSplit() to return an array with the calling string as a single
 * element. All values that are not undefined or objects with a `@@split` method are coerced to strings.
 * @param limit - A non-negative integer specifying a limit on the number of substrings to be
 * included in the array. If provided, splits the string at each occurrence of the specified
 * separator, but stops when limit entries have been placed in the array. Any leftover text is
 * not included in the array at all.
 * - The array may contain fewer entries than limit if the end of the string is reached before
 * the limit is reached.
 * - If limit is 0, [] is returned.
 * @return An Array of strings, split at each point where the separator occurs in the given string.
 * @example
 * ```ts
 * strSplit("Oh brave new world that has such people in it.", " ");
 * // [ "Oh", "brave", "new", "world", "that", "has", "such", "people", "in", "it." ]
 *
 * strSplit("Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec", ",");
 * // [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
 * ```
 */
export declare const strSplit: (value: string, separator: string | RegExp, limit?: number) => string[];

/**
 * This method lets you determine whether or not a string begins with another string. This method is case-sensitive.
 * @group String
 * @param value - The value to be checked
 * @param searchString - The characters to be searched for at the start of the string
 * @param position - [Optional] The position in this string at which to begin searching for `searchString`.
 * Defaults to 0
 * @returns `true` if the given characters are found at the beginning of the string; otherwise, `false`.
 */
export declare const strStartsWith: (value: string, searchString: string, length?: number) => boolean;

/**
 * The strSubstr() method returns a portion of the string, starting at the specified index and extending for a given
 * number of characters afterwards.
 *
 * @since 0.4.2
 * @group String
 * @param value - The string value to return the substring from.
 * @param start - The index of the first character to include in the returned substring.
 * @param length - The number of characters to extract.
 * @returns A new string containing the specified part of the given string.
 */
export declare const strSubstr: (value: string, indexStart: number, indexEnd?: number) => string;

/**
 * The `strSubstring()` method returns the part of the string between the start and end indexes, or to the end of the string.
 *
 * `strSubstring()` extracts characters from indexStart up to but not including indexEnd. In particular:
 * - If `indexEnd` is omitted, strSubstring() extracts characters to the end of the string.
 * - If `indexStart` is equal to indexEnd, strSubstring() returns an empty string.
 * - If `indexStart` is greater than indexEnd, then the effect of strSubstring() is as if the two arguments were swapped; see example below.
 *
 * Any argument value that is less than 0 or greater than `value.length` is treated as if it were 0 and `value.length`, respectively.
 *
 * Any argument value that is NaN is treated as if it were 0.
 * @group String
 * @param value - The string value to return the substring from.
 * @param indexStart - The index of the first character to include in the returned substring.
 * @param indexEnd - The index of the first character to exclude from the returned substring.
 * @return A new string containing the specified part of the given string
 * @example
 * ```ts
 * const anyString = 'Nevware21';
 * // Displays 'N'
 * console.log(strSubstring(anyString, 0, 1));
 * console.log(strSubstring(anyString, 1, 0));
 *
 * // Displays 'Nevwar'
 * console.log(strSubstring(anyString, 0, 6));
 *
 * // Displays 'are21'
 * console.log(strSubstring(anyString, 4));
 *
 * // Displays 'are'
 * console.log(strSubstring(anyString, 4, 7));
 *
 * // Displays '21'
 * console.log(strSubstring(anyString, 7, 4));
 *
 * // Displays 'Nevware'
 * console.log(strSubstring(anyString, 0, 7));
 *
 * // Displays 'Nevware21'
 * console.log(strSubstring(anyString, 0, 10));
 * ```
 */
export declare const strSubstring: (value: string, indexStart: number, indexEnd?: number) => string;

/**
 * The `strSymSplit()` splits a string into substrings using the [`Symbol.split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split)
 * method from the splitter object to provide custom behavior. If the runtime supports symbols
 * then the default runtime `split` method will be called, It will use {@link getKnownSymbol}
 * to get the {@link WellKnownSymbols.split} symbol which will return the runtime symbol or the
 * polyfill symbol when not supported by the runtime.
 * @since 0.9.1
 * @group String
 * @param value - The string value to be split into substrings.
 * @param splitter - The object which contains a Symbol.split method, Omitting splitter or passing
 * an object that doesn't contain a Symbol.split causes it to return an array with the calling
 * string as a single element.
 * @param limit - A non-negative integer specifying a limit on the number of substrings to be
 * included in the array. If provided, splits the string at each occurrence of the specified
 * separator, but stops when limit entries have been placed in the array. Any leftover text is
 * not included in the array at all.
 * - The array may contain fewer entries than limit if the end of the string is reached before
 * the limit is reached.
 * - If limit is 0, [] is returned.
 * @return An Array of strings, split at each point where the separator occurs in the given string.
 * @example
 * ```ts
 * const splitByNumber = {
 *   [Symbol.split]: (str: string) => {
 *     let num = 1;
 *     let pos = 0;
 *     const result = [];
 *     while (pos < str.length) {
 *       const matchPos = strIndexOf(str, asString(num), pos);
 *       if (matchPos === -1) {
 *         result.push(strSubstring(str, pos));
 *         break;
 *       }
 *       result.push(strSubstring(str, pos, matchPos));
 *       pos = matchPos + asString(num).length;
 *       num++;
 *     }
 *     return result;
 *   }
 * };
 *
 * const myString = "a1bc2c5d3e4f";
 * console.log(strSymSplit(myString, splitByNumber)); // [ "a", "bc", "c5d", "e", "f" ]
 * ```
 */
export declare const strSymSplit: (value: string, splitter: {
    [Symbol.split](string: string, limit?: number): string[];
}, limit?: number) => string[];

/**
 * The trim() method removes whitespace from both ends of a string and returns a new string,
 * without modifying the original string. Whitespace in this context is all the whitespace
 * characters (space, tab, no-break space, etc.) and all the line terminator characters
 * (LF, CR, etc.).
 * @group String
 * @param value - The string value to be trimmed.
 * @returns A new string representing str stripped of whitespace from both its beginning and end.
 * If neither the beginning or end of str has any whitespace, a new string is still returned (essentially
 * a copy of str), with no exception being thrown.
 * To return a new string with whitespace trimmed from just one end, use `strTrimStart()` or `strTrimEnd()`.
 */
export declare const strTrim: (value: string) => string;

/**
 * The `strTrimEnd()` method removes whitespace from the end of a string.
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its end (right side).
 * If the end of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const strTrimEnd: (value: string) => string;

/**
 * Alias for `strTrimStart()` method removes whitespace from the beginning of a string.
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its beginning (left side).
 * If the beginning of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const strTrimLeft: (value: string) => string;

/**
 * Alias for `strTrimEnd()` method removes whitespace from the end of a string.
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its end (right side).
 * If the end of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const strTrimRight: (value: string) => string;

/**
 * The `strTrimStart()` method removes whitespace from the beginning of a string.
 * @group String
 * @param value - The value to be trimmed.
 * @returns A new string representing str stripped of whitespace from its beginning (left side).
 * If the beginning of str has no whitespace, a new string is still returned (essentially a copy of str),
 * with no exception being thrown.
 */
export declare const strTrimStart: (value: string) => string;

/**
 * The strUpper() method returns the calling string value converted to uppercase.
 * (the value will be converted to a string if it isn't one).
 * @since 0.9.0
 * @group String
 * @group Conversion
 * @param value - The string value to be converted to uppercase.
 * @return A new string representing the calling string converted to upper case.
 * @throws TypeError - When called on null or undefined.
 * @example
 * ```ts
 * strUpper("Hello");       // HELLO
 * strUpper("darkness");    // DARKNESS
 *
 * strUpper(null);          // Throws TypeError
 * strUpper(undefined);     // Throws TypeError
 * ```
 */
export declare const strUpper: <T>(value: T) => string;

/**
 * Returns a Symbol object from the global symbol registry matching the given key if found.
 * Otherwise, returns a new symbol with this key. This will always return a polyfill if symbols
 * are not supported.
 * @group Symbol
 * @param key key to search for.
 */
export declare function symbolFor(key: string): symbol;

/**
 * Returns a key from the global symbol registry matching the given Symbol if found.
 * Otherwise, returns a undefined. This will always attempt to lookup the polyfill
 * implementation if symbols are not supported
 * @group Symbol
 * @param sym Symbol to find the key for.
 */
export declare function symbolKeyFor(sym: symbol): string | undefined;

/**
 * Throw an error exception with the specified optional message
 * @group Error
 * @param message
 */
export declare function throwError(message?: string): never;

/**
 * Throw a RangeError with the specified optional message
 * @group Error
 * @param message
 */
export declare function throwRangeError(message?: string): never;

/**
 * Throw a type error with the specified optional message
 * @group Error
 * @param message
 */
export declare function throwTypeError(message?: string): never;

/**
 * Throw a custom `UnsupportedError` Error instance with the given message.
 * @group Error
 * @param message - The message to include in the exception
 * @example
 * ```ts
 * import { throwUnsupported } from "@nevware21/ts-utils";
 *
 * if (!window) {
 *     throwUnsupported("A window is needed for this operation");
 * }
 * ```
 */
export declare function throwUnsupported(message?: string): never;

/**
 * The signature of the override timeout function used to create a new timeout instance, it follows the same signature as
 * the native `setTimeout` API.
 * @since 0.4.4
 * @group Timer
 * @param callback - A function to be executed after the timer expires.
 * @param ms - The time, in milliseconds that the timer should wait before the specified function or code is executed.
 * If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
 * @param args - Additional arguments which are passed through to the function specified by callback.
 * @return The returned timeoutID is a positive integer value which identifies the timer created by the call to setTimeout().
 * This value can be passed to clearTimeout() to cancel the timeout.
 */
export declare type TimeoutOverrideFn = <TArgs extends any[]>(callback: (...args: TArgs) => void, ms?: number, ...args: TArgs) => number | any;

/**
 * Defines the array signature used to pass the override set and clean functions for creating a timeout.
 * The first index [0] is the set function to be used and the second index [1] is the clear function to be used.
 * @since 0.4.5
 * @group Timer
 */
export declare type TimeoutOverrideFuncs = [TimeoutOverrideFn | null, ClearTimeoutOverrideFn | null];

export declare type TypeFuncNames<T> = {
    [key in keyof T]: T[key] extends Function ? key : never;
}[keyof T];

/**
 * Return the number of milliseconds that have elapsed since January 1, 1970 00:00:00 UTC.
 *
 * To offer protection against timing attacks and fingerprinting, the precision of dateNow()
 * might get rounded depending on browser settings. In Firefox, the privacy.reduceTimerPrecision
 * preference is enabled by default and defaults to 20µs in Firefox 59; in 60 it will be 2ms.
 *
 * @since 0.4.4
 * @group Timer
 *
 * @returns A Number representing the milliseconds elapsed since the UNIX epoch.
 * @example
 * ```ts
 * let now = utcNow();
 * ```
 */
export declare function utcNow(): number;

/**
 * Identifies the Symbol static properties which are symbols themselves as a constant
 * enum to aid in minification when fetching them from the global symbol implementation.
 *
 * See: [Well Known Symbols](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols)
 * @group Symbol
 */
export declare const enum WellKnownSymbols {
    /**
     * The Symbol.asyncIterator symbol is a builtin symbol that is used to access an
     * object's @@asyncIterator method. In order for an object to be async iterable,
     * it must have a Symbol.asyncIterator key.
     *
     * See: [Symbol.asyncIterator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)
     */
    asyncIterator = 0,
    /**
     * The Symbol.hasInstance well-known symbol is used to determine if a constructor
     * object recognizes an object as its instance. The instanceof operator's behavior
     * can be customized by this symbol.
     *
     * See: [Symbol.hasInstance](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)
     */
    hasInstance = 1,
    /**
     * The @@isConcatSpreadable symbol (Symbol.isConcatSpreadable) can be defined as an
     * own or inherited property and its value is a boolean. It can control behavior for
     * arrays and array-like objects:
     * - For array objects, the default behavior is to spread (flatten) elements.
     * Symbol.isConcatSpreadable can avoid flattening in these cases.
     * - For array-like objects, the default behavior is no spreading or flattening.
     * Symbol.isConcatSpreadable can force flattening in these cases.
     *
     * See: [Symbol.isConcatSpreadable](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable)
     */
    isConcatSpreadable = 2,
    /**
     * Whenever an object needs to be iterated (such as at the beginning of a for..of loop),
     * its @@iterator method is called with no arguments, and the returned iterator is used
     * to obtain the values to be iterated.
     *
     * See: [Symbol.iterator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
     */
    iterator = 3,
    /**
     * This function is also used to identify if objects have the behavior of regular expressions.
     * For example, the methods String.prototype.startsWith(), String.prototype.endsWith() and
     * String.prototype.includes(), check if their first argument is a regular expression and
     * will throw a TypeError if they are. Now, if the match symbol is set to false (or a Falsy
     * value), it indicates that the object is not intended to be used as a regular expression object.
     *
     * See: [Symbol.match](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match)
     */
    match = 4,
    /**
     * The Symbol.matchAll well-known symbol returns an iterator, that yields matches of the regular
     * expression against a string. This function is called by the String.prototype.matchAll() method.
     *
     * See: [Symbol.matchAll](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/matchAll)
     */
    matchAll = 5,
    /**
     * The Symbol.replace well-known symbol specifies the method that replaces matched substrings
     * of a string. This function is called by the String.prototype.replace() method.
     *
     * For more information, [RegExp.prototype[@@replace]](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace)()
     * and [String.prototype.replace](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/replace)().
     *
     * See: [Symbol.replace](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/replace)
     */
    replace = 6,
    /**
     * The Symbol.search well-known symbol specifies the method that returns the index within a
     * string that matches the regular expression. This function is called by the
     * [String.prototype.search()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/search)
     * method.
     *
     * For more information, see [RegExp.prototype[@@search]](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@search)()
     * and [String.prototype.search()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/search).
     *
     * See: [Symbol.species](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species)
     */
    search = 7,
    /**
     * The well-known symbol Symbol.species specifies a function-valued property that the constructor
     * function uses to create derived objects.
     * See: [Symbol.species](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species)
     */
    species = 8,
    /**
     * The Symbol.split well-known symbol specifies the method that splits a string at the indices
     * that match a regular expression. This function is called by the String.prototype.split() method.
     *
     * For more information, see [RegExp.prototype[@@split]](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@split)()
     * and [String.prototype.split()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split).
     * See: [Symbol.split](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/split)
     */
    split = 9,
    /**
     * With the help of the Symbol.toPrimitive property (used as a function value), an object can be
     * converted to a primitive value. The function is called with a string argument hint, which
     * specifies the preferred type of the result primitive value. The hint argument can be one of
     * "number", "string", and "default".
     *
     * See: [Symbol.toPrimitive](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
     */
    toPrimitive = 10,
    /**
     * The Symbol.toStringTag well-known symbol is a string valued property that is used in the
     * creation of the default string description of an object. It is accessed internally by the
     * [Object.prototype.toString](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)()
     * method.
     *
     * See: [Symbol.toStringTag](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)
     */
    toStringTag = 11,
    /**
     * The Symbol.unscopables well-known symbol is used to specify an object value of whose own
     * and inherited property names are excluded from the with environment bindings of the associated
     * object.
     *
     * See: [Symbol.unscopables](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables)
     */
    unscopables = 12
}

export { }