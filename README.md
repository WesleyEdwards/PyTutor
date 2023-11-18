# PyTutor

https://py-tutor.web.app/

## Overview

PyTutor is a learning tool designed to helps novice CS students make the transition from writing small to large programs.

Programs are complex. Successful software engineers are able to reduce cognitive load and focus on the task at hand rather than trying to keep track of the implementation of every part of the program at once.
PyTutor helps students develop the skill of reducing context-switching and cognitive load. Instead of creating a program bottom-up (implementing every little function when it is needed), PyTutor encourages students to create programs top-down (focussing on general structure first, then going back and implementing everything later).

## Explanation of the system (basic flow)

- As the student writes a program, they identify a specific task that needs to be completed (i.e. sorting a list of numbers).
- Instead of implementing the function immediately, the student uses the "Create Function" feature of PyTutor to generate a function, by giving a text explanation of the desired function.
- The AI model creates the function, and exposes just the function signature to the student (Not the generated implementation), but retains the AI implementation.
- The student is free to use the function within the program. The program will use the AI implementation when the student runs the program.
- Before submitting the assignment, the student will implement each of the functions in use (still only seeing function signatures).
- Once implemented, the Program will run using the student implementation rather than the AI implementation.
- After implementing each function, the student can submit the assignment.

## Considerations

- What if the AI model fails to correctly generate a function?
  - Once a function is generated, the student is encouraged to write a simple test to test the function. If the function fails the test, the student can edit their text explanation and provide examples to help the AI model generate the desired function.
- What if the student wants to use a function that is not generated by the AI model?

  - The student is free to create other functions, but if they aren't going to use the software for its intended purpose, they might as well just use a normal IDE.

- The tests created by the students can also be used to help the student test their own implementation of their functions.
- Students can remove, reorder, and rename functions as they see fit.

## Technologies/Libraries:

- ReactJs: https://react.dev/
- JoyUI: https://mui.com/joy-ui/getting-started/
- Code Mirror editor: https://www.npmjs.com/package/codemirror
- Python interpreter: https://www.npmjs.com/package/client-side-python-runner
- ExpressJs: https://expressjs.com/
- OpenAI: https://platform.openai.com/docs/libraries/node-js-library

## UI/UX
### Layout
![Screenshot from 2023-11-18 09-19-24](https://github.com/WesleyEdwards/PyTutor/assets/97990557/236ebbb1-76bc-4681-80ee-3b548991ca6d)

### Prompt AI to create a function
![Screenshot from 2023-11-18 09-18-41](https://github.com/WesleyEdwards/PyTutor/assets/97990557/e77fd47a-ad9a-4e8c-934b-7fd5510bb90d)

### Create a test for the function generated by AI to ensure that it works as expected
![Screenshot from 2023-11-18 09-07-55](https://github.com/WesleyEdwards/PyTutor/assets/97990557/78be3324-e3fc-45ca-ac47-c8c242bc6bdf)

### Implement the function
![Screenshot from 2023-11-18 09-10-45](https://github.com/WesleyEdwards/PyTutor/assets/97990557/145390f1-8896-40d5-ad9b-af4015dbea24)


