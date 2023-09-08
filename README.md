# TSDParser

[![Nuget](https://img.shields.io/nuget/vpre/TSDParser.svg?style=flat-square)](https://www.nuget.org/packages/TSDParser)
[![Nuget)](https://img.shields.io/nuget/dt/TSDParser.svg?style=flat-square)](https://www.nuget.org/packages/TSDParser)
[![codecov](https://codecov.io/gh/IvanJosipovic/TSDParser/branch/alpha/graph/badge.svg?token=K5WBqEitwL)](https://codecov.io/gh/IvanJosipovic/TSDParser)

## What is this?

This project uses Node.JS and returns a C# representation of the TypeScript Abstract Syntax Tree

## Requirements

Node.JS must be installed for this library to work.

## How to use

```cshrap
var parsed = await TSDParser.ParseDefinition("""
/**
* interface comment
*/
export interface Test1 {
    /**
    * prop comment
    */
    prop: string;
    method(): void;
}
""");
```
