# PyTutor


## Overview
Pytutor is an app that helps CS students make the transition from writing small apps to large apps by leveraging the use of AI.

Programs are complex. Successful software engineers are able to reduce cognitve load and focus on the task at hand rather than trying to keep track of the implementation of every moving piece.
This development tool helps students get used to reduce the amount of context-switching. Instead of creating a program bottom-up (implementing every little function when it is needed), it encourages students to create programs top-down (focussing on general structure first, then going back and implementing everything. 


## Explanation of the system (basic flow)
- As the student goes about writing their program, they identify a specific task that needs to be completed (i.e. sorting a list of strings by the length of each string). Instead of implementing the function right away, they then use the AI model to generate a function for them.
- The student explains to the AI model what the function needs to do, giving necessary specifications.
- The AI model creates the function, and exposes just the function signature to the student. The implementation of the function is hidden from the student, but is kept within the program.
- The student is free to use the function within the program, and the program will run as if all the functions were already implemented.
- Before submitting the assignment, the student will go through each of the functions that the AI has created for them (only seeing the function signatures), and they will implement each of the functions.
- Once the student has implemented each of the functions and the program runs as expected, they can turn it in.


## Libraries used:
- ReactJs: https://react.dev/
- ExpressJs: https://expressjs.com/
- Code Mirror editor: https://www.npmjs.com/package/codemirror
- Python interpreter/transpiler?: https://www.npmjs.com/package/client-side-python-runner
- OpenAI: https://platform.openai.com/docs/libraries/node-js-library


