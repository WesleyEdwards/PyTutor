const phanonExercises = {
  id: 857,
  lesson: {
    id: 857,
    title: "2.1.1 - print",
    course_id: null,
    position: 0,
    published: null,
    created_at: "2020-04-21T21:57:41.016Z",
    updated_at: "2021-08-26T20:51:40.580Z",
    open_date: null,
    close_date: null,
    due_date: null,
    permit_paste: true,
  },
  exercises: [
    {
      id: 10488,
      position: 0,
      instructions:
        "Press the run button. The following will be printed to the screen:\n\n```\nHello world\n```\n\nChange the program to print\n\n```\nHello world!\n```\n\n*Hint: Add an exclamation mark after the `d`.*",
      solution_code: 'print("Hello world!")\n\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello world")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\nphanon_test(out == \'Hello world!\\n\', "Success!", "You must print out \'Hello world!\'. Be sure to add the exclamation mark.")\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10521,
      position: 1,
      instructions:
        "Press the run button. The following will be printed to the screen:\n\n```\nHello world!\n```\n\nChange the program to print\n\n```\nHello World!\n```\n\n*Hint: Make the ```w``` uppercase.*",
      solution_code: 'print("Hello World!")',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello world!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "You must print out \'Hello World!\'. Did you make the \'w\' uppercase?")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10554,
      position: 2,
      instructions:
        "We write code to create programs. Change the following code to print\n\n```\nGoodbye Alien!\n```",
      solution_code: 'print("Goodbye Alien!")',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello Alien!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Goodbye Alien!\\n\', "Success!", "Incorrect output.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10585,
      position: 3,
      instructions: "Change the program to print\n\n```\nHello Alien!\n```",
      solution_code: 'print("Hello Alien!")',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello Alien!\\n\', "Success!", "Incorrect output.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10619,
      position: 4,
      instructions:
        "Change the code to print\n\n```\nHello Alien!\nGoodbye Alien!\n```\n\n*Hint: Change only the second ```print``` statement.*",
      solution_code: 'print("Hello Alien!")\nprint("Goodbye Alien!")',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello Alien!")\nprint("Hello Alien!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello Alien!\\nGoodbye Alien!\\n\', "Success!", "Incorrect output.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10651,
      position: 5,
      instructions:
        "Sometimes our code has errors. Run the following code to see what happens. Then add a closing quote mark to fix the problem.",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello World!)\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10681,
      position: 6,
      instructions:
        "This code has a syntax error. Run the code to see what happens then fix the problem.\n\n*Hint: it has something to do with quotes.* *Hint: if you get stuck, try looking at the previous exercise.*",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint(Hello World!)\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10710,
      position: 7,
      instructions:
        "This code has a syntax error. Run the code to see what happens then fix the problem.\n\n*Hint: A word is mispelled.*",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprin("Hello World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10740,
      position: 8,
      instructions: "This code has a syntax error. Fix the problem.",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nrint("Hello World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10769,
      position: 9,
      instructions: "This code has multiple syntax errors. Fix the problems.",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nrint(Hello World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10798,
      position: 10,
      instructions:
        "This code has a tricky syntax error. It has to do with a quote mark. You need to remove one of them.",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello" World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10824,
      position: 11,
      instructions:
        "Anything inside quote marks is called a string. Change the code to print\n```\nLove to cook!\n```\n\n*Hint: You'll replace `Hello World!` with `Love to cook!`*",
      solution_code: 'print("Love to cook!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Hello World!")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Love to cook!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10848,
      position: 12,
      instructions:
        "Change the second string to `Soccer`. The following should be output:\n```\nBaseball\nSoccer\n```",
      solution_code: 'print("Baseball")\nprint("Soccer")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Baseball")\nprint("Football")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Baseball\\nSoccer\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10871,
      position: 13,
      instructions: "Fix the error. The code should print\n```\nBaseball\n```",
      solution_code: 'print("Baseball")\n\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint("Base"ball")\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Baseball\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10891,
      position: 14,
      instructions: "Write code to output\n\n```\nHello World!\n```",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint()\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10910,
      position: 15,
      instructions: "Write code to output\n\n```\nHello Alien!\n```",
      solution_code: 'print("Hello Alien!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint()\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello Alien!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10926,
      position: 16,
      instructions:
        "Write code to output\n\n```\nHello World!\n```\n\n*Heads up: don't forget the parentheses!*",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10942,
      position: 17,
      instructions: "Write code to output\n\n```\nHello World!\n```",
      solution_code: 'print("Hello World!")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\n\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Hello World!\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10958,
      position: 18,
      instructions:
        "Write code to output\n\n```\nTake me out to the ballgame.\n```\n\n*Heads up: don't forget the period at the end.*",
      solution_code: 'print("Take me out to the ballgame.")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\n\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Take me out to the ballgame.\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10972,
      position: 19,
      instructions:
        "Write code to output\n\n```\nPing pong\nTennis\n```\n\n*Heads up: make sure your capitalization is correct.*",
      solution_code: 'print("Ping pong")\nprint("Tennis")\n',
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\n\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'Ping pong\\nTennis\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
    {
      id: 10984,
      position: 20,
      instructions:
        "We can print things other than strings. Press run to see that the code prints 5. Change the code to print the number 6.",
      solution_code: "print(6)\n",
      solution_tests_passing: true,
      test_code:
        '\n### BEGIN_STUDENT\nprint(5)\n### END_STUDENT\n\nout = phanon_get_stdout()\ncode = phanon_get_program()\n\n"""\nTests\n"""\n# phanon_test_pass("Success output")\n# phanon_test_fail("Failure output")\nphanon_test(out == \'6\\n\', "Success!", "Incorrect output.")\n# phanon_test(code.find(\'\\\\n\')>-1, "Success!", "You must use the \'\\\\n\' character and use only one print statement.")\n# phanon_test_equals(actualValue, expectedValue, "identifierName")\n# phanon_test_greater_than(actualValue, expectedValue, "identifierName")\n# phanon_test_less_than(actualValue, expectedValue, "identifierName")\n# phanon_test_presence(value, "identifierName")\n# phanon_test_not_empty(value, "identifierName")\n\n"""\nHidden tests\nStudents will not see any output indicating what caused the failure\nonly that a test failed\n"""\n# phanon_h_test_equals(actualValue, expectedValue)\n# phanon_h_test_greater_than(actualValue, expectedValue)\n# phanon_h_test_less_than(actualValue, expectedValue)\n# phanon_h_test_presence(value)\n# phanon_h_test_not_empty(value)\n',
      course_id: 111,
      lesson_id: 857,
    },
  ],
};
