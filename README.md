# AngularNotes

## Package management

The application uses *yarn* to package management. Thus, run `yarn` to install all the dependencies.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## General Approach
The project makes extensive use of inheritance and abstract classes, as well as global state management.

## Advantages and disadvantages

The advantage is the ease of adding new annotations. The disadvantage is that the page.component is overloaded with business logic.
One solution to this problem is to use an abstract parent page class, which additionally makes possible new page classes.

## Known issues

The annotation may go out of a canvas.
To solve the problem, it is necessary to track changes in the size and movement of annotations while increasing / decreasing the size of the canvas.
