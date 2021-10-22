# Folders

## Core
This folder has the source code files that will run on Marketing Cloud.

## Snippet
Contains code snippets that can be used in new development.

# Files

## CodeExecutor.ampscript
- Runs ampscript, server-side javascript and html, usign the TreatAsContent function.
- Designed to run on a JSON Code Resource (Cloudpage).
- It is used in a CodeResource to generate an endpoint for Ampscript Studio.

## CodeExecutorLastRelease.ampscript
- This code gets the latest version of Code Executor from this repository.
- Runs an instance of Code Executor. 
- Also it is used in a CodeResource to generate an endpoint for Ampscript Studio.
- It usually takes longer to execute the code due to the API call.
