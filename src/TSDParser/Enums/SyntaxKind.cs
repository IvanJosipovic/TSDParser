﻿namespace TSDParser.Enums;

public enum SyntaxKind
{
    FirstLiteralToken = 9,
    StringLiteral = 11,
    QuestionToken = 58,
    Identifier = 80,
    ConstKeyword = 87,
    ExportKeyword = 95,
    NullKeyword = 106,
    VoidKeyword = 116,
    PrivateKeyword = 123,
    ProtectedKeyword = 124,
    StaticKeyword = 126,
    FirstContextualKeyword = 128,
    AnyKeyword = 133,
    BooleanKeyword = 136,
    DeclareKeyword = 138,
    TypeOperator = 143,
    ReadonlyKeyword = 148,
    NumberKeyword = 150,
    StringKeyword = 154,
    UndefinedKeyword = 157,
    TypeParameter = 168,
    Parameter = 169,
    PropertySignature = 171,
    PropertyDeclaration = 172,
    MethodSignature = 173,
    MethodDeclaration = 174,
    Constructor = 176,
    IndexSignature = 181,
    TypeReference = 183,
    FunctionType = 184,
    ConstructorType = 185,
    TypeLiteral = 187,
    ArrayType = 188,
    TupleType = 189,
    UnionType = 192,
    IntersectionType = 193,
    IndexedAccessType = 199,
    MappedType = 200,
    ExpressionWithTypeArguments = 233,
    FunctionDeclaration = 262,
    ClassDeclaration = 263,
    InterfaceDeclaration = 264,
    TypeAliasDeclaration = 265,
    EnumDeclaration = 266,
    ImportDeclaration = 272,
    ImportClause = 273,
    NamespaceImport = 274,
    NamedImports = 275,
    ImportSpecifier = 276,
    ExportDeclaration = 278,
    NamedExports = 279,
    ExportSpecifier = 281,
    HeritageClause = 298,
    EnumMember = 306,
    SourceFile = 312,
    JSDocComment = 327
}
