---
layout: default
title: Run History
has_children: false
nav_order: 4
---

# Run History

## What is Run History?

It allows to analyze the execution of the code written in the Code Editor.
To see all the details, open the execution detail by clicking on the link in the lower panel.

![Run History in Code Editor](https://i.ibb.co/zHyFQWW/image.png)

## Use cases

- ✅ Review of execution logs
- ✅ Find errors and debug
- ✅ Get code coverage

## Log modes
This functionality consists of marking which lines of code were executed.
To carry out this point, a pre-processing of the code is carried out to add the capture of the lines executed.
There is no recommended type, feel free to try the one that best suits your code.

**General points**:
- The blank lines are always omitted in the logs.
- The logs affect the execution time of the code.
  - In small codes there is no significant impact.
  - Fewer lines to save is equals to more speed.

### None
- No pre-compilation, no logs.
- Notably faster than any other type of log.
- No impact on code execution time.

### Line
- Excellent to know what code was executed.
- It is used to debug it.
- Record all the lines whether they are HTML or AMPScript / SSJS.

### Code block
- Same as LINE except that it only saves the line executed when it is AMPScript or SSJS code.

### Custom
- Allows you to choose which sections will generate execution logs.
- Use `log.start` and `log.stop` (on a blank line, using double brackets) to define the sections.

## View Modes
Each execution is independent. Therefore the original code, the logs and the result are saved independently.

### Original
This is the view of the original code that was written in the Code Editor.

![View Mode: Original](https://i.ibb.co/XybgqN8/image.png)

### Pre-Compiled
This is the pre-compiled code. It has the added code for the execution logs to be saved.

![View Mode: Pre-Compiled](https://i.ibb.co/RCQFwFx/image.png)

### Lines Executed
This is the view of lines of code executed in chronological order. The first line was the first to run and so on.

![View Mode: Lines Executed](https://i.ibb.co/PG308Nn/image.png)

### Code Coverage
This is a mix between the original view and the executed lines view. In green are the lines that were executed at least once. The structure of the code is the same as the original code.

![View Mode: Code Coverage](https://i.ibb.co/1zrHsVP/image.png)

### Result
This is the result of the code. Rendered code is presented in an IFrame for the final view if it is html.

![View Mode: Result](https://i.ibb.co/mFV9yQW/image.png)