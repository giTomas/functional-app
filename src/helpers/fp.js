export const dispatch = (...fns) =>
        (...args) =>
          [...fns].map(fn =>
            fn(...args)).find((result) =>
              result !== undefined);

//function composition
export const compose = (...funcs) =>
              (value) =>
                funcs.reduceRight((v, fn) =>
                  fn(v), value);

export const pipe = (...funcs) =>
        (value) =>
          funcs.reduce((v, fn) => fn(v), value);

export const curry2 = (fn, ...args1) =>
        (...args2) =>
          fn(...args1, ...args2);

export const curry = (fn, ..args) =>
          args.length === fn.length
          ? fn(...args)
          : curry2.bind(this, fn, args);
