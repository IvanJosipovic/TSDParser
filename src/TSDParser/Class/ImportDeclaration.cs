﻿using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ImportDeclaration : Node
    {
        public SyntaxKind Kind => SyntaxKind.ImportDeclaration;

        public ImportClause ImportClause { get; set; }

        public StringLiteral ModuleSpecifier { get; set; }
    }
}
