﻿using TSDParser.Enums;

namespace TSDParser.Class
{
    public class NamespaceImport : Node
    {
        public SyntaxKind Kind => SyntaxKind.NamespaceImport;

        public Identifier Name { get; set; }
    }
}
