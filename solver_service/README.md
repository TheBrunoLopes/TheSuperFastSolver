## Folder Structure
```
solver_service/
    Dockerfile              - Dockerfile used to create an image used in the docker-compose.yaml located in the root folder
    README.md               - This is the document you are reading
    requirements.txt        - File that specifies dependencies to be installed using pip
    swagger.yaml            - Document that specifies the REST interface following the openApi specification standards
    application.py          - Entrypoint for the application
    solver_service/         - Package containing all the code necessary to run the python application (application.py)
        business/           - Business logic code here 
            controllers/    - Since this application is a REST service, every endpoint is mapped to function present here
            utils/          - Collection of functions used by diferent controllers
        crud/               - Has all the methods needed to access the mongo database
    test/                   - Has unit tests. Run them using *pytest*
```

To analyse the code, I suggest going to `localhost:4001/v1/ui/` to see all the endpoints
 and then going to the `controllers/` directory to see each endpoint function and follow from there. 

## Some problems considered and solved
### Circular dependencies

```
f1 = f2 + 1
f2 = 3 * f3
f3 = f1
```
The function definitions that can be seen above, create a circular dependency.
In this project we calculate the expressions recursively. 
By keeping track of what functions we are solving at the moment we detected this problem easily.

### Optimizing the solving process
```
f1 = f2 * f2 * f3 + f4 - f6
f2 = f3 - f4 * f7
f4 = f5 - 1 - f6
f3 = f5 * 2
f5 = 1 + f7
f6 = 3 - 3 * 3
f7 = 4
```
As we can see if we tried to solve f1, we would need to solve many functions that it depends on (`f1,f2,f3...f7`) 
And for each of those functions would also need to solve other functions as well.
In order to optimize this process, we only calculate a function once during the solving process.
If they appear later during this process, we don't need to calculate them again.
 
### Regex for the name of each function
The name of the functions follow this format: [\w-_]+
This regex means that the name of a function can end in a minus, e.g., "func-2" is valid, and "func---2" is valid as well.
For instance, "f2-4" could be the name of a function: "f2-4", or an expression: "f2" minus "4".

I solved this problem by enforcing spaces between operators and values/functions.
e.g.:
```
    Valid function: f1 = 2 + f3 + f4
    Invalid fuction f2 = 2+f3+f4
```

Another problem is that the `\w` symbol is equivalent to `[0-9a-zA-Z_]` which means that `22` is a valid name for a function.
This should not be happen, because would want that to be a value instead.
Other languages enforce a `[a-zA-Z_]` character at the beginning of the name of the function.


