using System;
using System.Collections.Generic;
using System.Text;

namespace TSDParser.Enums
{
    public enum SyntaxKind
    {
        StringLiteral = 11,
        QuestionToken = 58,
        Identifier = 80,
        NullKeyword = 106,
        VoidKeyword = 116,
        AnyKeyword = 133,
        BooleanKeyword = 136,
        ReadonlyKeyword = 148,
        NumberKeyword = 150,
        StringKeyword = 154,
        UndefinedKeyword = 157,
        Parameter = 169,
        PropertySignature = 171,
        MethodSignature = 173,
        IndexSignature = 181,
        TypeReference = 183,
        FunctionType = 184,
        TypeLiteral = 187,
        ArrayType = 188,
        ClassDeclaration = 263,
        InterfaceDeclaration = 264,
        ImportDeclaration = 272,
        ImportClause = 273,
        NamedImports = 275,
        ImportSpecifier = 276,
        HeritageClause = 298,
        SourceFile = 312,
    }
}
